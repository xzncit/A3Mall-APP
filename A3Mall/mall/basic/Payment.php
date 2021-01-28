<?php
// +----------------------------------------------------------------------
// | A3Mall
// +----------------------------------------------------------------------
// | Copyright (c) 2020 http://www.a3-mall.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: xzncit <158373108@qq.com>
// +----------------------------------------------------------------------
namespace mall\basic;

use think\facade\Config;
use mall\library\payment\alipay\Alipay;
use mall\library\payment\alipay\AlipayException;
use mall\library\wechat\chat\WeChat;
use mall\library\wechat\mini\WeMini;
use mall\utils\CString;
use think\facade\Db;
use think\facade\Request;
use mall\library\wechat\mini\payment\Order as MiniOrder;

class Payment {

    public static function handle($order_id){
        if(($order = Db::name("order")->where("id",$order_id)->find()) == false){
            throw new \Exception("您要支付的订单不存在！",0);
        }

        if(($payment = Db::name("payment")->where("id",$order["pay_type"])->find()) == false){
            throw new \Exception("您选择的支付方式不存在！",0);
        }

        if($order["pay_status"] == 1){
            return [
                "pay"=>99,
                "order_id"=>$order["id"],
                "msg"=>"您的订单己支付，请勿重复支付。"
            ];
        }

        try{
            // 检查是否为积分订单
            if($order["type"] == 1){
                Db::name("users")->where("id",Users::get("id"))->update([
                    "point"=>Db::raw("point-".$order["real_point"])
                ]);

                Db::name("users_log")->insert([
                    "user_id"=>Users::get("id"),
                    "order_no"=>$order["order_no"],
                    "action"=>1,
                    "operation"=>1,
                    "point"=>$order["real_point"],
                    "description"=>"成功购买了订单号：{$order["order_no"]}中的商品,积分减少{$order["real_point"]}",
                    "create_time"=>time()
                ]);
            }

            // 如果订单金额小于等于0 支付成功
            if($order["order_amount"] <= 0){
                Db::name("order_log")->insert([
                    'order_id' => $order["id"],
                    'username' => "system",
                    'action' => '付款',
                    'result' => '成功',
                    'note' => '订单【' . $order["order_no"] . '】付款' . $order["order_amount"] . '元',
                    'create_time' => time()
                ]);
                Order::payment($order["order_no"]);
                return [
                    "pay"=>0,
                    "order_id"=>$order["id"],
                    "msg"=>"支付成功"
                ];
            }
        }catch (\Exception $ex){
            throw new \Exception($ex->getMessage(),-99);
        }

        $result = [];
        $users = Db::name("users")->where("id",$order["user_id"])->find();
        $goods_array = Db::name("order_goods")->where("order_id",$order_id)->order("id","asc")->value("goods_array");
        $goods_title = "";
        if(!empty($goods_array)){
            $goods_array = json_decode($goods_array,true);
            $goods_title = "-" . CString::msubstr($goods_array["title"],30,false);
        }

        switch($payment["code"]){
            case "balance":
                if($order["order_amount"] > $users["amount"]){
                    throw new \Exception("您的余额不足，请充值。",0);
                }

                Db::startTrans();
                try{
                    Db::name("users")
                        ->where("id",$order["user_id"])
                        ->dec("amount",$order["order_amount"])
                        ->update();

                    Order::payment($order["order_no"]);
                    Db::name("order_log")->insert([
                        'order_id' => $order["id"],
                        'username' => "system",
                        'action' => '付款',
                        'result' => '成功',
                        'note' => '订单【' . $order["order_no"] . '】付款' . $order["order_amount"] . '元',
                        'create_time' => time()
                    ]);

                    Db::commit();
                }catch(\Exception $e){
                    Db::rollback();
                    // throw new \Exception("支付失败，请稍后在试。",-99);
                    throw new \Exception($e->getMessage());
                }

                try{
                    Sms::send(
                        ["mobile"=>$order["mobile"],"order_no"=>$order["order_no"]],
                        "payment_success"
                    );
                }catch (\Exception $ex){}

                $result = [
                    "pay"=>0,
                    "order_id"=>$order["id"],
                    "msg"=>"支付成功"
                ];
                break;
            case "wechat-app":
                try{
                    $web_name = Setting::get("web_name",true);
                    $rs = WeChat::Payment()->createOrder([
                        'body'             => $web_name . $goods_title,
                        'total_fee'        => $order["order_amount"] * 100,
                        'trade_type'       => 'APP',
                        'notify_url'       => createUrl('api/wechat/notify', [], false, true),
                        'out_trade_no'     => $order["order_no"],
                        'spbill_create_ip' => Request::ip(),
                    ]);

                    $params = WeChat::Payment()->createParamsForApp($rs["prepay_id"]);
                    $result = [
                        "pay"=>1,
                        "order_id"=>$order["id"],
                        "msg"=>"ok",
                        "result"=>[
                            "params"=>$params
                        ]
                    ];
                }catch(\Exception $e){
                    $result = [
                        "pay"=>99,
                        "order_id"=>$order["id"],
                        "msg"=>$e->getMessage()
                    ];
                }
                break;
            case "alipay-app":
                try{
                    $web_name = Setting::get("web_name",true);
                    $subject = empty($goods_title) ? $web_name : str_replace("-","",$goods_title);
                    $result = Alipay::instance()->app($subject, $order);
                }catch(AlipayException $ex){
                    $result = $ex->getRaw();
                }
                break;
        }

        return $result;
    }

    public static function rechang($payment_code,$price=0){
        if(empty($price) || $price <= 0){
            throw new \Exception("请输入您要充值的金额！",0);
        }

        if(($payment = Db::name("payment")->where("code",$payment_code)->find()) == false){
            throw new \Exception("您选择的支付方式不存在！",0);
        }

        $orderNo = "P".Order::orderNo();
        $result = [];
        $users = Db::name("users")->where("id",Users::get("id"))->find();
        Db::name("users_rechange")->insert([
            "user_id"=>Users::get("id"),
            "pay_type"=>$payment["id"],
            "order_no"=>$orderNo,
            "order_amount"=>$price,
            "payment_name"=>$payment["name"],
            "status"=>0,
            "create_time"=>time()
        ]);
        $order_id = Db::name("users_rechange")->getLastInsID();
        switch($payment["code"]){
            case "wechat-app":
                try{
                    $web_name = Setting::get("web_name",true);
                    $rs = WeChat::Payment()->createOrder([
                        'body'             => $web_name . "-会员充值",
                        'total_fee'        => $price * 100,
                        'trade_type'       => 'APP',
                        'notify_url'       => createUrl('api/wechat/notify', [], false, true),
                        'out_trade_no'     => $orderNo,
                        'spbill_create_ip' => Request::ip(),
                    ]);

                    $params = WeChat::Payment()->createParamsForApp($rs["prepay_id"]);
                    $result = [
                        "pay"=>1,
                        "order_id"=>$order_id,
                        "msg"=>"ok",
                        "result"=>[
                            "params"=>$params
                        ]
                    ];
                }catch(\Exception $e){
                    $result = [
                        "pay"=>99,
                        "order_id"=>$order_id,
                        "msg"=>$e->getMessage()
                    ];
                }
                break;
            case "alipay-app":
                try{
                    $web_name = Setting::get("web_name",true);
                    $result = Alipay::instance()->app($web_name . "-会员充值", [
                        "id"=>$order_id,
                        "order_no"=>$orderNo,
                        "order_amount"=>$price
                    ]);
                }catch(AlipayException $ex){
                    $result = $ex->getRaw();
                }
                break;
        }

        return $result;
    }
}