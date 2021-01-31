<h1 align="center">A3Mall商城系统</h1> 
<p align="center">
    <a href="http://www.a3-mall.com">
        <img src="https://img.shields.io/badge/Website-A3Mall-important.svg" />
    </a>
<a href="http://www.a3-mall.com">
        <img src="https://img.shields.io/badge/Licence-GPL3.0-green.svg" />
    </a>
    <a href="http://www.a3-mall.com">
        <img src="https://img.shields.io/badge/Edition-v1.0.0-blue.svg" />
    </a>
</p>
<p align="center">    
    <b>如果本系统对您有所帮助，您可以点右上角 "Star" 支持一下 谢谢！</b>
</p>


## 导航栏目
 [官网地址](http://www.a3-mall.com)
 | [H5/微信公众号商城下载](https://gitee.com/xzncit/A3Mall)
  [帮助文档](http://doc.a3-mall.com)

## 项目介绍
   A3Mall APP商城是免费开源商城系统，支持微信公众号商城、H5商城、小程序商城，支持多种营销活动，优惠劵、订单活动、团购、秒杀、会员特价、积分商品等功能。前后端功能开源。本系统基于ThinkPHP6框架。
   
## uniapp
当前A3Mall uniapp 只支持生成 android、ios，其他版本的后续都会支持的。
当前程序版本为测试版v1.0，在使用中有问题可以加群反馈。

## 软件架构
    PHP >= 7.2.0
    MySQL >= 5.6
    PDO PHP Extension
    MBstring PHP Extension
    FileInfo PHP Extension
   
## 安装A3Mall

```html
下载好程序文件，解压上传到web根目录
需要绑定域名访问到public目录，确保其它目录不在WEB目录下面
Linux下需要给程序根目录下的runtime目录权限
访问：http://域名.com/install
按照提示安装
```

## Linux Shell命令
```html
定时取消未支付订单
php think task cancle

定时签收已发货订单
php think task sign

定时处理完成订单
php think task complete

定时清理购物车
php think task cart

默认从后台获取订单配置时间
如果需要手动指定时间，可以使用：
php think task cancle|sign|complete|cart --time 30 (单位：天)
```
   
## QQ交流群
 <a target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=de316f1a1dbf61859529484891ee50369e3c2bc6fe37e15bb94f8bf731cc3482"><img border="0" src="//pub.idqqimg.com/wpa/images/group.png" alt="A3Mall开发交流群" title="A3Mall开发交流群"></a>


![输入图片说明](https://gitee.com/xzncit/A3Mall-APP/raw/master/readme/images/app/1.jpg "1.jpg")
![输入图片说明](https://gitee.com/xzncit/A3Mall-APP/raw/master/readme/images/app/2.jpg "2.jpg")
![输入图片说明](https://gitee.com/xzncit/A3Mall-APP/raw/master/readme/images/app/3.jpg "3.jpg")
![输入图片说明](https://gitee.com/xzncit/A3Mall-APP/raw/master/readme/images/app/4.jpg "4.jpg")
![输入图片说明](https://gitee.com/xzncit/A3Mall-APP/raw/master/readme/images/app/5.jpg "5.jpg")
![输入图片说明](https://gitee.com/xzncit/A3Mall-APP/raw/master/readme/images/app/6.jpg "6.jpg")
![输入图片说明](https://gitee.com/xzncit/A3Mall-APP/raw/master/readme/images/app/7.jpg "7.jpg")
![输入图片说明](https://gitee.com/xzncit/A3Mall-APP/raw/master/readme/images/app/8.jpg "8.jpg")


 **bug反馈**

如果您使用过程中发现BUG或者其他问题都欢迎大家提交Issue,或者发送邮件给我 158373108@qq.com，我们将及时修复并更新。
