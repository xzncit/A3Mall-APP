<?php
// +----------------------------------------------------------------------
// | A3Mall
// +----------------------------------------------------------------------
// | Copyright (c) 2020 http://www.a3-mall.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: xzncit <158373108@qq.com>
// +----------------------------------------------------------------------
namespace app\api\controller\pay;

use mall\basic\Order;
use mall\basic\Sms;
use mall\library\payment\alipay\Alipay;
use think\facade\Db;

class Index {

    public function notify(){
        $data = $_POST;

        // 检查订单号是否存在
        if(!isset($data["out_trade_no"])){
            return "failure";
        }

        $prefix = substr($data["out_trade_no"],0,1);
        if($prefix == "P"){
            $rechange = Db::name("users_rechange")->where("order_no",$data["out_trade_no"])->find();
            if(empty($rechange)){
                return "failure";
            }

            // 己充值成功的订单直接返回通知微信成功
            if($rechange["status"] == 1){
                return "success";
            }

            $payment = Db::name("payment")->where("id",$rechange["pay_type"])->find();
            if(empty($payment)){
                return "failure";
            }

            // 开启事务
            Db::startTrans();
            try{
                if (Alipay::instance()->verifyNotify($data,$payment["code"]) == false) {
                    throw new \Exception("验证签名错误",0);
                }

                Db::name("users_rechange")->where("order_no",$data["out_trade_no"])->update([
                    "status"=>1,
                    "transaction_id"=>$data["trade_no"],
                    "pay_time"=>time()
                ]);

                Db::name("users")
                    ->where("id",$rechange["user_id"])
                    ->inc("amount",$rechange["order_amount"])
                    ->update();

                Db::name("users_log")->insert([
                    "order_no"=>$data["out_trade_no"],
                    "user_id"=>$rechange["user_id"],
                    "action"=>0,
                    "operation"=>0,
                    "amount"=>$rechange["order_amount"],
                    "description"=>"充值成功，订单号：" . $data["out_trade_no"],
                    "create_time"=>time()
                ]);

                Db::commit();
                return "success";
            }catch(\Exception $ex){
                Db::rollback();
                Db::name("users_rechange")->where("order_no",$data["out_trade_no"])->update([
                    "status"=>2,
                    "transaction_id"=>$data["trade_no"],
                    "pay_time"=>time()
                ]);
                return "failure";
            }
        }

        // 签名验证
        $order = Db::name("order")->where("order_no",$data["out_trade_no"])->find();
        if(empty($order)){
            return "failure";
        }

        // 充值成功直接通知微信成功
        if($order["pay_status"] == 1){
            return "success";
        }

        $payment = Db::name("payment")->where("id",$order["pay_type"])->find();
        if(empty($payment)){
            return "failure";
        }

        // 开启事务
        Db::startTrans();
        try{
            if (Alipay::instance()->verifyNotify($data,$payment["code"]) == false) {
                throw new \Exception("验证签名错误",0);
            }

            Order::payment($data["out_trade_no"],0,"",$data["trade_no"]);
            Db::name("order_log")->insert([
                'order_id' => $order["id"],
                'username' => "system",
                'action' => '付款',
                'result' => '成功',
                'note' => '订单【' . $order["order_no"] . '】付款' . $order["order_amount"] . '元',
                'create_time' => time()
            ]);

            Db::commit();
        }catch (\Exception $ex){
            Db::rollback();
            return "failure";
        }

        // 不能放在订单的try里否则可能会导致订单执行 Db::rollback()
        try{
            Sms::send(
                ["mobile"=>$order["mobile"],"order_no"=>$order["order_no"]],
                "payment_success"
            );
        }catch (\Exception $ex){}

        return "success";
    }

}