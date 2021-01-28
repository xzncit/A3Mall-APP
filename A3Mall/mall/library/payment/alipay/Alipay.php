<?php
// +----------------------------------------------------------------------
// | A3Mall
// +----------------------------------------------------------------------
// | Copyright (c) 2020 http://www.a3-mall.com All rights reserved.
// +----------------------------------------------------------------------
// | Author: xzncit <158373108@qq.com>
// +----------------------------------------------------------------------
namespace mall\library\payment\alipay;

use Alipay\EasySDK\Kernel\Config;
use Alipay\EasySDK\Kernel\Factory;
use mall\utils\Tool;
use think\facade\Db;

class Alipay {

    private static $instance;

    private function __construct() {}

    public static function instance(){
        if (!self::$instance instanceof self) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function app($subject, $order){
        try {
            Factory::setOptions($this->getOptions("alipay-wap"));
            $alipay = Factory::payment()->app()
                ->asyncNotify(createUrl("api/pay/notify",[],false,true))
                ->pay($subject, $order["order_no"],$order["order_amount"]);

            return [
                "pay"=>2,
                "order_id"=>$order["id"],
                "msg"=>"ok",
                "result"=> [ "params"=>$alipay->body ]
            ];
        }catch (\Exception $e){
            throw new AlipayException($e->getMessage(),$e->getCode(),[
                "pay"=>99,
                "order_id"=>$order["id"],
                "msg"=>$e->getMessage()
            ]);
        }
    }

    public function verifyNotify($data,$payType){
        Factory::setOptions($this->getOptions($payType));
        return Factory::payment()->common()->verifyNotify($data);
    }

    private function getOptions($code=""){
        $payment = Db::name("payment")->where("code",$code)->find();
        if(empty($payment) || empty($payment["config"])){
            throw new AlipayException("支付方式未配置",0);
        }

        $config = json_decode($payment["config"],true);
        if(empty($config)){
            throw new AlipayException("支付方式未配置",0);
        }

        $options = new Config();
        $options->protocol = 'https';
        // $options->gatewayHost = 'openapi.alipaydev.com';
        $options->gatewayHost = 'openapi.alipay.com';
        $options->signType = 'RSA2';

        $options->appId = trim($config["app_id"]);

        // 为避免私钥随源码泄露，推荐从文件中读取私钥字符串而不是写入源码中
        $options->merchantPrivateKey = trim($config["merchantPrivateKey"]);

        if($config["type"] == 1){
            $options->alipayCertPath = Tool::getRootPath() . trim($config["merchantCertPath"],"/");
            $options->alipayRootCertPath = Tool::getRootPath() . trim($config["alipayCertPath"],"/");
            $options->merchantCertPath = Tool::getRootPath() . trim($config["alipayRootCertPath"],"/");
        }else{
            //注：如果采用非证书模式，则无需赋值上面的三个证书路径，改为赋值如下的支付宝公钥字符串即可
            $options->alipayPublicKey = trim($config["alipayPublicKey"]);
        }

        return $options;
    }

}