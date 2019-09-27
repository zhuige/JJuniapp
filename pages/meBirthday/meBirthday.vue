<template>
	<view class="page page-fill">
			<view class="page-block" style="margin-top: 20upx;">
				<picker mode="date" @change="timeChange">
					<view class="input">{{userInfo.birthday}}</view>
				</picker>
			</view>
			<button type="primary" class="submitBtn" @click="editBirthday">确认</button>
	</view>
</template>

<script>
	export default {
		name: 'meBirthday',
		data() {
			return {
				userInfo: {},
			}
		},
		onLoad() {
			let userInfo = this.getUserInfo();
			this.userInfo = userInfo;
		},
		methods: {
			timeChange(e) {
				this.userInfo.birthday = e.detail.value
			},
			editBirthday() {
				uni.setStorageSync("userInfo", this.userInfo);
				uni.navigateBack({
					url: '../meInfo/meInfo'
				});
			}
		}
	}
</script>

<style>
.page-fill {
		width: 100%;
		height: 100%;
		position: absolute;
	}

	.graywords {
		color: #EAEAEA;
	}

	.input {
		height: 80upx;
		line-height: 80upx;
		width: 500upx;
		margin-left: 40upx;
	}

	.submitBtn {
		width: 95%;
		margin-top: 40upx;
	}
</style>
