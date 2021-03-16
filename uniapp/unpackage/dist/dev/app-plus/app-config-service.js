
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/search/index","pages/search/list","pages/category/index","pages/public/login","pages/public/register","pages/public/forget","pages/coupon/index","pages/comments/view","pages/goods/index","pages/goods/list","pages/goods/view","pages/regiment/index","pages/regiment/view","pages/second/index","pages/second/view","pages/special/index","pages/special/view","pages/point/index","pages/cart/index","pages/cart/confirm","pages/cart/msg","pages/cart/info","pages/order/list","pages/order/detail","pages/order/express","pages/order/confirm_delivery","pages/order/refund","pages/order/evaluate","pages/order/service","pages/bill/cashlist","pages/bill/withdraw","pages/bill/fund","pages/ucenter/index","pages/ucenter/wallet","pages/ucenter/collect","pages/ucenter/address","pages/ucenter/address_editor","pages/ucenter/coupon","pages/ucenter/point","pages/ucenter/setting","pages/ucenter/help","pages/news/index","pages/news/list","pages/news/view"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"A3Mall","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#333","selectedColor":"#b71c1c","borderStyle":"black","backgroundColor":"#ffffff","list":[{"pagePath":"pages/index/index","iconPath":"static/tabbar/menu-1.png","selectedIconPath":"static/tabbar/menu-active-1.png","text":"首页"},{"pagePath":"pages/category/index","iconPath":"static/tabbar/menu-2.png","selectedIconPath":"static/tabbar/menu-active-2.png","text":"分类"},{"pagePath":"pages/cart/index","iconPath":"static/tabbar/menu-3.png","selectedIconPath":"static/tabbar/menu-active-3.png","text":"购物车"},{"pagePath":"pages/ucenter/index","iconPath":"static/tabbar/menu-4.png","selectedIconPath":"static/tabbar/menu-active-4.png","text":"我的"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"weex","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"A3Mall","compilerVersion":"3.1.4","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"A3Mall 素烟姿","navigationBarBackgroundColor":"#B91922","navigationBarTextStyle":"white","bounce":"none","titleNView":{"type":"default","searchInput":{"align":"left","backgroundColor":"rgba(255, 255, 255,1)","borderRadius":"16px","placeholder":"请输入关键字","disabled":true,"placeholderColor":"#606266"}}}},{"path":"/pages/search/index","meta":{},"window":{"navigationBarTitleText":"搜索商品","backgroundColor":"#FFFFFF","softinputNavBar":"none","titleNView":{"backgroundColor":"#ffffff"}}},{"path":"/pages/search/list","meta":{},"window":{"navigationBarBackgroundColor":"#B91922","navigationBarTextStyle":"white","navigationBarTitleText":"搜索商品","bounce":"none"}},{"path":"/pages/category/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"商品分类"}},{"path":"/pages/public/login","meta":{},"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"登录","navigationStyle":"custom","bounce":"none","titleNView":{"autoBackButton":true,"type":"transparent"}}},{"path":"/pages/public/register","meta":{},"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"注册","navigationStyle":"custom","bounce":"none","titleNView":{"autoBackButton":true,"type":"transparent"}}},{"path":"/pages/public/forget","meta":{},"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"找回密码","navigationStyle":"custom","bounce":"none","titleNView":{"autoBackButton":true,"type":"transparent"}}},{"path":"/pages/coupon/index","meta":{},"window":{"navigationBarBackgroundColor":"#B91922","navigationBarTextStyle":"white","navigationBarTitleText":"领劵","bounce":"none"}},{"path":"/pages/comments/view","meta":{},"window":{"navigationBarTitleText":"商品评论","backgroundColor":"#FFFFFF","titleNView":{"backgroundColor":"#ffffff"}}},{"path":"/pages/goods/index","meta":{},"window":{"navigationBarBackgroundColor":"#B91922","navigationBarTextStyle":"white","navigationBarTitleText":"商品列表","bounce":"none"}},{"path":"/pages/goods/list","meta":{},"window":{"navigationBarBackgroundColor":"#B91922","navigationBarTextStyle":"white","navigationBarTitleText":"商品列表","bounce":"none"}},{"path":"/pages/goods/view","meta":{},"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"商品详情","navigationStyle":"custom","bounce":"none","titleNView":{"autoBackButton":true,"type":"transparent","buttons":[{"text":"","fontSrc":"/static/font/iconfont/iconfont.ttf","fontSize":"19px","color":"#b91922","float":"right"}]}}},{"path":"/pages/regiment/index","meta":{},"window":{"navigationBarBackgroundColor":"#B91922","navigationBarTextStyle":"white","navigationBarTitleText":"团购列表","bounce":"none"}},{"path":"/pages/regiment/view","meta":{},"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"商品详情","navigationStyle":"custom","bounce":"none","titleNView":{"autoBackButton":true,"type":"transparent","buttons":[{"text":"","fontSrc":"/static/font/iconfont/iconfont.ttf","fontSize":"19px","color":"#b91922","float":"right"}]}}},{"path":"/pages/second/index","meta":{},"window":{"navigationBarBackgroundColor":"#B91922","navigationBarTextStyle":"white","navigationBarTitleText":"秒杀列表","bounce":"none"}},{"path":"/pages/second/view","meta":{},"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"商品详情","navigationStyle":"custom","bounce":"none","titleNView":{"autoBackButton":true,"type":"transparent","buttons":[{"text":"","fontSrc":"/static/font/iconfont/iconfont.ttf","fontSize":"19px","color":"#b91922","float":"right"}]}}},{"path":"/pages/special/index","meta":{},"window":{"navigationBarBackgroundColor":"#B91922","navigationBarTextStyle":"white","navigationBarTitleText":"会员特价","bounce":"none"}},{"path":"/pages/special/view","meta":{},"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"商品详情","navigationStyle":"custom","bounce":"none","titleNView":{"autoBackButton":true,"type":"transparent","buttons":[{"text":"","fontSrc":"/static/font/iconfont/iconfont.ttf","fontSize":"19px","color":"#b91922","float":"right"}]}}},{"path":"/pages/point/index","meta":{},"window":{"navigationBarBackgroundColor":"#B91922","navigationBarTextStyle":"white","navigationBarTitleText":"积分兑换","bounce":"none"}},{"path":"/pages/cart/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"购物车","navigationBarBackgroundColor":"#B91922","titleNView":{"buttons":[{"text":"","fontSrc":"/static/font/iconfont/iconfont.ttf","fontSize":"19px","color":"#ffffff","float":"right"}]}}},{"path":"/pages/cart/confirm","meta":{},"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"确认订单","navigationBarBackgroundColor":"#B91922"}},{"path":"/pages/cart/msg","meta":{},"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"订单信息","navigationBarBackgroundColor":"#B91922"}},{"path":"/pages/cart/info","meta":{},"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"订单信息","navigationBarBackgroundColor":"#B91922"}},{"path":"/pages/order/list","meta":{},"window":{"navigationBarBackgroundColor":"#B91922","navigationBarTextStyle":"white","navigationBarTitleText":"订单列表","bounce":"none"}},{"path":"/pages/order/detail","meta":{},"window":{"navigationBarBackgroundColor":"#B91922","navigationBarTextStyle":"white","navigationBarTitleText":"订单详情","bounce":"none"}},{"path":"/pages/order/express","meta":{},"window":{"navigationBarBackgroundColor":"#B91922","navigationBarTextStyle":"white","navigationBarTitleText":"物流信息","bounce":"none"}},{"path":"/pages/order/confirm_delivery","meta":{},"window":{"navigationBarBackgroundColor":"#B91922","navigationBarTextStyle":"white","navigationBarTitleText":"确认收货","bounce":"none"}},{"path":"/pages/order/refund","meta":{},"window":{"navigationBarBackgroundColor":"#B91922","navigationBarTextStyle":"white","navigationBarTitleText":"退款详情","bounce":"none"}},{"path":"/pages/order/evaluate","meta":{},"window":{"navigationBarBackgroundColor":"#B91922","navigationBarTextStyle":"white","navigationBarTitleText":"商品评价","bounce":"none"}},{"path":"/pages/order/service","meta":{},"window":{"navigationBarBackgroundColor":"#B91922","navigationBarTextStyle":"white","navigationBarTitleText":"售后列表","bounce":"none"}},{"path":"/pages/bill/cashlist","meta":{},"window":{"navigationBarBackgroundColor":"#B91922","navigationBarTextStyle":"white","navigationBarTitleText":"提现记录","bounce":"none"}},{"path":"/pages/bill/withdraw","meta":{},"window":{"navigationBarBackgroundColor":"#B91922","navigationBarTextStyle":"white","navigationBarTitleText":"申请提现","bounce":"none"}},{"path":"/pages/bill/fund","meta":{},"window":{"navigationBarBackgroundColor":"#B91922","navigationBarTextStyle":"white","navigationBarTitleText":"资金明细","bounce":"none"}},{"path":"/pages/ucenter/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"会员中心","navigationStyle":"custom","bounce":"none","titleNView":false}},{"path":"/pages/ucenter/wallet","meta":{},"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"我的钱包","navigationStyle":"custom","bounce":"none","titleNView":{"autoBackButton":true,"type":"transparent"}}},{"path":"/pages/ucenter/collect","meta":{},"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"我的收藏","navigationBarBackgroundColor":"#B91922","titleNView":{"buttons":[{"text":"","fontSrc":"/static/font/iconfont/iconfont.ttf","fontSize":"19px","color":"#ffffff","float":"right"}]}}},{"path":"/pages/ucenter/address","meta":{},"window":{"navigationBarBackgroundColor":"#B91922","navigationBarTextStyle":"white","navigationBarTitleText":"我的地址","bounce":"none"}},{"path":"/pages/ucenter/address_editor","meta":{},"window":{"navigationBarBackgroundColor":"#B91922","navigationBarTextStyle":"white","navigationBarTitleText":"编辑地址","bounce":"none"}},{"path":"/pages/ucenter/coupon","meta":{},"window":{"navigationBarBackgroundColor":"#B91922","navigationBarTextStyle":"white","navigationBarTitleText":"优惠劵","bounce":"none"}},{"path":"/pages/ucenter/point","meta":{},"window":{"navigationBarBackgroundColor":"#B91922","navigationBarTextStyle":"white","navigationBarTitleText":"我的积分","bounce":"none"}},{"path":"/pages/ucenter/setting","meta":{},"window":{"navigationBarBackgroundColor":"#B91922","navigationBarTextStyle":"white","navigationBarTitleText":"会员设置","bounce":"none"}},{"path":"/pages/ucenter/help","meta":{},"window":{"navigationBarBackgroundColor":"#B91922","navigationBarTextStyle":"white","navigationBarTitleText":"帮助中心","bounce":"none"}},{"path":"/pages/news/index","meta":{},"window":{"navigationBarBackgroundColor":"#B91922","navigationBarTextStyle":"white","navigationBarTitleText":"新闻列表","bounce":"none"}},{"path":"/pages/news/list","meta":{},"window":{"navigationBarBackgroundColor":"#B91922","navigationBarTextStyle":"white","navigationBarTitleText":"新闻列表","bounce":"none"}},{"path":"/pages/news/view","meta":{},"window":{"navigationBarBackgroundColor":"#B91922","navigationBarTextStyle":"white","navigationBarTitleText":"新闻详情","bounce":"none"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
