<template>
	<view>
		<view class="oauth">
			<view class="logo">
				<view>A3Mall</view>
				<view>素烟姿</view>
			</view>
			
			<view class="oauth-login">
				<block v-for="(item,index) in providerList" :key="index">
					<view :id="item.id" class="iconfont btn" v-if="item.icon != ''" @click="onLogin(item)"><text v-html="item.icon"></text>{{ item.name }}</view>
				</block>
			</view>
			
			<view class="other-login-type">
				<text>其他登录方式</text>
				<text>注册</text>
			</view>
		</view>
		
		<loading v-if="isLoading" :layer="true"></loading>
	</view>
</template>

<script>
	import loading from '../../components/tool/loading'
	export default {
		components: {
			loading
		},
		data() {
			return {
				isLoading: false,
				providerList: []
			}
		},
		onLoad() {
			uni.getProvider({
				service: "oauth",
				success:(result)=>{
					let data = result.provider.map((value)=>{
						let providerName = '';
						let icon = ""; 
						switch (value) {
							case 'apple':
								providerName = '苹果登录';
								icon = "&#xe62c;"; 
								break;
							case 'weixin':
								providerName = '微信登录';
								icon = "&#xe673;"; 
								break;
							case 'qq':
								providerName = 'QQ登录';
								icon = "&#xe611;"; 
								break;
						}
						return {
							name: providerName,
							icon: icon,
							id: value
						};
					});
					
					this.providerList = data.sort((x,y) => {
						return x.sort - y.sort
					});
				},
				fail: (error) => {}
			});
		},
		methods: {
			onLogin(provider){
				uni.login({
					provider: provider.id,
					success: (res) => {
						console.log('login success:', res);
						switch(provider.id){
							case "weixin":
							case "qq":
								this.otherLogin({
									access_token: access_token,
									openid: openid,
									type: provider.id
								}).then(result=>{
									if(result.status){
										this.$store.commit("UPDATEUSERS",result.data);
										this.$utils.switchTab('ucenter/index');
									}else{
										this.$utils.msg(result.info);
									}
								}).catch(err=>{
									uni.showModal({
										title: '授权失败',
										content: '获取授权失败：' + JSON.stringify(err)
									});
								});
								break;
							case "apple":
								uni.getUserInfo({  
									provider: 'apple',  
									success(result) {  
										console.log('getUserInfo success', result);
										
									},
									fail: (error) => {
										uni.showModal({
											title: '获取用户信息失败',
											content: '错误原因' + error.errMsg,
											showCancel: false
										});
									}
								})  
								break;
						}
					},
					fail: (err) => {
						uni.showModal({
							title: '授权失败',
							content: '获取授权失败：' + err
						});
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.oauth {
		width: 630rpx;
		height: 100vh;
		margin: 0 auto;
		.logo {
			width: 100%; height: 540rpx;
			view {
				text-align: center;
				&:first-child {
					padding-top: 200rpx;
					font-size: 68rpx; color: #b91922; font-weight: bold;
				}
				&:last-child {
					padding-top: 10rpx;
					font-size: 64rpx; color: #b91922;
				}
			}
		}
		.oauth-login {
			view {
				height: 89rpx; line-height: 89rpx;
				width: 100%; border: 1px solid #202020;
				border-radius: 50rpx; text-align: center; font-size: 32rpx;
				position: relative;
				margin-bottom: 40rpx;
				text {
					position: absolute;
					left: 65rpx;
					top: 50%; transform: translateY(-50%);
					font-size: 39rpx;
				}
			}
			#apple {
				
			}
			#weixin { background-color: #5db919; color: #fff; border-color: #5db919; }
			#qq { background-color: #379adf; color: #fff; border-color: #379adf; }
		}
		.other-login-type {
			width: 100%;
			font-size: 28rpx; color:#666;
			text-align: center;
			height: 100rpx; line-height: 100rpx;
			text {
				width: 50%;
				display: inline-block;
				position: relative; height: 100rpx; line-height: 100rpx;
				&:first-child {
					width: 49%;
					&::after {
						content: " "; background-color: #666; top: 50%; transform: translateY(-50%); right: 0;
						position: absolute; height: 29rpx; width: 2rpx;
					}
				}
			}
		}
	}
</style>
