<template>
	<view class="page page-fill">
			<view class="page-block" style="margin-top: 20upx;">
				<input type="text" name="nickname" v-model="userInfo.nickName" confirm-type="done" @confirm="editName" class="input" placeholder="请输入昵称" placeholder-class="graywords"
				 maxlength="10" />
			</view>
			<button type="primary" class="submitBtn" @click="editName">确认</button>
	</view>
</template>

<script>
	export default {
		name: 'meNickName',
		data() {
			return {
				userInfo: {}
			}
		},
		onLoad() {
			let userInfo = this.getUserInfo();
			this.userInfo = userInfo;
		},
		methods: {
			editName() {
				if(this.userInfo.nickName.trim() == undefined || this.userInfo.nickName.trim() == null || this.userInfo.nickName.trim() == '') {
					uni.showModal({
						showCancel: false,
						content: '账号或密码不能为空'
					})
				} else {
					this.userInfo.nickName = this.userInfo.nickName.trim();
					uni.setStorageSync("userInfo", this.userInfo);
					uni.navigateBack({
						url: '../meInfo/meInfo'
					});
				}
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
