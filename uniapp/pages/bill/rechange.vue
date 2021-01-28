<template>
	<view>
		<form>
			<view class="form-box">
				<view class="form-fields clear">
					<view class="title">充值方式</view>
					<view class="form-field-box">
						<picker @change="bindPickerChange" :value="index" :range="array">
							<view class="form-field-text">{{array[index]}}</view>
						</picker>
					</view>
				</view>
				 <view class="form-fields clear">
					<view class="title">提现金额</view>
					<view class="form-field-box">
						<input class="form-field-input" name="price" :value="price" placeholder="0.00" />
					</view>
				</view>
				<view class="form-submit">
					<view class="btn" :class="{ active: isActive }" @click="formSubmit">提交</view>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				array: ["微信支付","支付宝"],
				index: 0,
				price: "",
				isActive: false
			};
		},
		methods: { 
			bindPickerChange: function(e) {
				this.index = e.target.value
			},
			formSubmit(){
				if(this.isActive){
					return ;
				}
				
				let price = parseFloat(this.price);
				if(price <= 0 || this.price == ''){
					this.$utils.msg("请输入要充值金额");
					return ;
				}
				
				this.isActive = true;
				
				this.$http.paymentWallet({
					payment: this.array[this.index] == '微信支付' ? 'wechat' : 'alipay',
					source: 4,
					price: this.price
				}).then(res=>{
					if(res.status){
						this.resultOrderData(res.data);
					}else{
						this.$utils.msg(res.info);
					}
					this.isActive = false;
				}).catch(err=>{
					this.isActive = false;
					this.$utils.msg("连接网络出错，请稍后在试。");
				});
			},
			resultOrderData(data){
				switch (data.pay+"") {
					case "1":
						this.requestPayment(data.result.params,"wxpay");
						break;
					case "2":
						this.requestPayment(data.result.params,"alipay");
						break;
					case "99":
						this.$utils.msg(data.msg);
						break;
				
				}
			},
			async requestPayment(orderInfo,type) {
				if (!orderInfo) {
					uni.showModal({
						content: '获取支付信息失败',
						showCancel: false
					})
					return
				}
				
				let that = this;
				uni.requestPayment({
					type,
					orderInfo: orderInfo,
					success: (e) => {
						uni.showToast({
							title: "您己支付成功!",
							success: function (res){
								that.$utils.redirectTo('bill/fund');
							}
						})
					},
					fail: (e) => {
						uni.showModal({
							content: "支付失败,原因为: " + e.errMsg,
							showCancel: false
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.form-fields {
		width: 100%; float: left;
		height: 100rpx;
		line-height: 100rpx; 
		border-bottom: 1px solid #ebedf0;
		.title { 
			float: left; font-size: 30rpx;
			width: 200rpx; text-indent: 30rpx;
		}
		.form-field-box { 
			float: right; font-size: 30rpx; 
			width: 550rpx;
			.form-field-input {
				height: 100rpx;
				line-height: 100rpx; 
				font-size: 30rpx;
			}
		}
		
	}
	.form-submit {
		float: left;
		width: 100%;
		margin-top: 50rpx;
		.btn { 
			margin: 0 auto;
			width: 92%;
			height: 80rpx;
			line-height: 80rpx;
			display: block;
			text-align: center;
			font-size: 30rpx; 
			background-color: #b91922;
			border: 1px solid #b91922;
			border-radius: 10rpx;
			color: #fff;
		}
		.active { 
			background-color: #ffffff;
			border: 1px solid #d6d6d6;
			color: #a1a1a1;
		}
	}
</style>
