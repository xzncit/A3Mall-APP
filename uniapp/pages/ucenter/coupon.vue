<template>
	<view>
		<view class="top">
			<text :class="{active: isActive == 1}" @click="changeCoupon(1)">未使用</text>
			<text :class="{active: isActive == 2}" @click="changeCoupon(2)">己使用/己过期</text>
		</view>
		<view class="top-placeholder"></view>
		
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<view class="list-wrap">

				<view class="list-box">
					<view class="list-item" v-for="(item, index) in result" :key="index">
						<view class="l">
							<view>￥<text>{{item.amount}}</text></view>
							<view v-if="item.price > 0">满{{item.price}}可用</view>
							<view v-else>无门槛</view>
						</view>
						<view class="m">
							<view>{{item.name}}</view>
							<view>到期：{{ item.end_time }}</view>
						</view>
						<view class="r" :class="{'disable': isActive == 2}">
							<view @click="go">使用</view>
						</view>
					</view>
				</view>
	
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
	export default {
		mixins: [MescrollMixin],
		components:{
			MescrollBody,MescrollUni
		},
		data() {
			return {
				isActive:1,
				result: []
			}
		},
		methods: {
			go(){
				if(this.isActive == 2){
					return ;
				}
				
				this.$utils.navigateTo('goods/index');
			},
			changeCoupon(index){
				this.page = 1;
				this.isActive = index;
				this.result = [];
				setTimeout(()=>{
					this.mescroll.resetUpScroll();
				},1200);
			},
			downCallback(){
				setTimeout(()=>{
					this.mescroll.resetUpScroll();
				},1200);
			},
			triggerDownScroll(){
				this.mescroll.triggerDownScroll();
			},
			upCallback(page) {
				this.$http.getCoupon({
					type: this.isActive,
					page: page.num
				}).then((result)=>{
					this.mescroll.endByPage(result.data.list.length, result.data.total);
					if(result.status==1){
						if(page.num == 1) this.result = [];
						this.result = this.result.concat(result.data.list);
					}else if(result.status == -1){
						this.mescroll.endErr();
					}
				}).catch(error=>{
					this.mescroll.endErr();
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
.top-placeholder { height: 90rpx; width: 100% }
.top{
    width: 100%;
    position: fixed;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    height: 90rpx;
    line-height: 90rpx;
    text-align: center;
    background-color: #fff;
    font-size: 28rpx;
    color: #666;
	z-index: 999999;
	border-top: 2rpx solid #eee;
    border-bottom: 2rpx solid #eee;
    text{
        width: 50%;
    }
    text:first-child{
        width: 49%;
        border-right: 2rpx solid #eee;
    }
    .active{
        color: #e72a2a;
    }
}
.list-wrap{
    width: 100%;
    margin-top: 20rpx;
    .list-item{
        width: 92%;
        height: 200rpx;
        border-radius: 10rpx;
        background-color: #fff;
        margin: 0 auto 20rpx auto;
        font-size: 26rpx;
        position: relative;
        .l{
            position: absolute;
            width: 220rpx;
            height: 160rpx;
            top: 20rpx;
            left: 0;
            border-right: 1px dashed #ccc;
            view{
                color: red;
                display: block;
                text-align: center;
                height: 60rpx;
                line-height: 40rpx;
            }
            view:first-child{
                font-size: 32rpx;
                height: 100rpx;
                line-height: 120rpx;
                color: #ce3232;
                text{
                    font-size: 50rpx;
                    font-style: normal;
                    font-weight: bold;
                }
            }

        }
        .m{
            padding: 0 110rpx 0 220rpx;
            height: 160rpx;
            text-align: center;
            view{
                display: block;
            }
            view:first-child{
                padding-top: 50rpx;
                line-height: 50rpx;
                font-size: 35rpx;
                color: #333;
            }
            view:last-child{
                height: 50rpx;
                line-height: 50rpx;
                font-size: 28rpx; color: #999;
            }
        }
        .r {
            &:before {
                z-index: 11;
                content: " ";
                position: absolute;
                top: -16rpx;
                left: -16rpx;
                width: 32rpx;
                height: 24rpx;
                background-color: #f6f6f6;
                border-radius: 100rpx;
            }
            &:after {
                z-index: 11;
                content: " ";
                position: absolute;
                bottom: -16rpx;
                left: -16rpx;
                width: 32rpx;
                height: 24rpx;
                background-color: #f6f6f6;
                border-radius: 100rpx;
            }
            z-index: 1;
            position: absolute;
            right: 0;
            top: 0;
            width: 110rpx;
            height: 200rpx;
            line-height: 200rpx;
            float: right;
            text-align: center;
            background-color: #b91922;
            background-image: url(~@/static/images/coupon-circle.png);
            background-repeat: repeat-y;
            background-position: -4rpx center;
            background-size: 12rpx;
            view{
                font-size: 30rpx;
                color: #fff;
                display: block;
                text-align: center;
            }
        }
        .active{
            background-color: #e55f67;
        }
        .disable{
            background-color: #dbdadd;
        }
    }
}
</style>