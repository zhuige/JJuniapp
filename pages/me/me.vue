<template>
	<view class="page page-fill">
		<view class="header">
			<view v-if="userIsLogin">
				<image :src="userInfo.faceImage" class="face"></image>
			</view>
			<view v-else>
				<image src="http://122.152.205.72:88/group1/M00/00/05/CpoxxFw_-5-AFyVyAABLIH8xBTw233.png" class="face"></image>
			</view>

			<view class="info-wapper" v-if="userIsLogin">
				<view class="nickname">
					{{userInfo.nickName}}
				</view>
				<view class="nav-info">签名：{{userInfo.desc}}</view>
				<view class="nav-info">生日：{{userInfo.birthday}}</view>
			</view>
			<view v-else>
				<navigator url="../registLogin/registLogin">
					<view class="nickname regist-login">
						注册/登录
					</view>
				</navigator>
			</view>
			<view class="set-wapper" v-if="userIsLogin">
				<navigator url="../meInfo/meInfo">
					<image src="../../static/icos/settings.png" class="settings"></image>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "me",
		data() {
			return {
				userIsLogin: false,
				userInfo: {}
			};
		},
		onShow() {
			let userInfo = this.getUserInfo();
			if (userInfo != null) {
				this.userIsLogin = true;
				this.userInfo = userInfo;
			} else {
				this.userIsLogin = false;
				this.userInfo = {};
			}
		}
	}
</script>

<style>
	@import url("me.css");
</style>
