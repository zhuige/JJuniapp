<template>
	<view class="body">
		<form>
			<view class="face-wapper">
				<image src="../../static/icos/default-face.png" class="face"></image>
			</view>
			
			<view class="info-wapper">
				<label class="words-lbl">账号</label>
				<input type="text" v-model="userName" class="input" placeholder="请输入用户名" placeholder-class="graywords"/>
			</view>
			
			<view class="info-wapper" style="margin-top: 40upx;">
				<label class="words-lbl">密码</label>
				<input type="text" v-model="userPassword" @confirm="formLogin" confirm-type="done" password="true" class="input" placeholder="请输入密码" placeholder-class="graywords"/>
			</view>
			
			<button type="primary" style="margin-top: 60upx;width: 90%;" @click="formLogin">注册/登录</button>
		</form>
		
		
		<!-- 第三方登录H5不支持，所以隐藏掉 -->
		<!-- #ifndef H5 -->
			<view class="third-wapper">
				
				<view class="third-line">
					<view class="single-line">
						<view class="line"></view>
					</view>
					
					<view class="third-words">第三方账号登录</view>
					
					<view class="single-line">
						<view class="line"></view>
					</view>
				</view>
				
				<view class="third-icos-wapper">
					<!-- 5+app 用qq/微信/微博 登录 小程序用微信小程序登录 h5不支持 -->
					<!-- #ifdef APP-PLUS -->
						<image src="../../static/icos/weixin.png" @click="appOAuthLogin('weixin')" class="third-ico"></image>
						<image src="../../static/icos/QQ.png" @click="appOAuthLogin('qq')" class="third-ico" style="margin-left: 80upx;"></image>
						<image src="../../static/icos/weibo.png" @click="appOAuthLogin('sinaweibo')" class="third-ico" style="margin-left: 80upx;"></image>
					<!-- #endif -->
					<!-- #ifdef MP-WEIXIN -->
						<button open-type='getUserInfo' @getuserinfo="wxLogin" class="third-btn-ico">
						</button>
					<!-- #endif -->
				</view>
			</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		name: 'registLogin',
		data() {
			return {
				userName : '',
				userPassword: ''
			}
		},
		methods: {
			appOAuthLogin(loginType) {
				uni.login({
					provider: loginType,
					success(res) {
						uni.getUserInfo({
							provider: loginType,
							success(info){
								let userInfo = {
									weiboID: null,
									weixinID: null,
									qqID: null,
									isCertified: 0,
									mpID: null,
									desc: '追哥玩王者荣耀无敌！',
									faceImage : info.userInfo.avatarUrl ? info.userInfo.avatarUrl : "http://122.152.205.72:88/group1/M00/00/05/CpoxxFw_8_qAIlFXAAAcIhVPdSg994.png",
									userName : info.userInfo.nickName,
									birthday: '1900-01-01',
									registTime: '2019-02-28T07:02:30.000+0000',
									sex: null,
									userUniqueToken: 'liangjunjie666',
									nickName: info.userInfo.nickName
								};
								uni.setStorageSync("userInfo", userInfo)
								uni.switchTab({
									url: '../me/me'
								})
							}
						})
					}
				})
			},
			wxLogin(e) {
				let userInfo = {
					weiboID: null,
					weixinID: null,
					qqID: null,
					isCertified: 0,
					mpID: null,
					desc: '追哥玩王者荣耀无敌！',
					faceImage : e.detail.userInfo.avatarUrl ? e.detail.userInfo.avatarUrl : "http://122.152.205.72:88/group1/M00/00/05/CpoxxFw_8_qAIlFXAAAcIhVPdSg994.png",
					userName : e.detail.userInfo.nickName,
					birthday: '1900-01-01',
					registTime: '2019-02-28T07:02:30.000+0000',
					sex: null,
					userUniqueToken: 'liangjunjie666',
					nickName: e.detail.userInfo.nickName
				};
				uni.setStorageSync("userInfo", userInfo)
				uni.switchTab({
					url: '../me/me'
				})
			},
			formLogin() {
				if (this.userName.trim() == '' || this.userPassword.trim() == '') {
					uni.showModal({
						showCancel: false,
						content: '账号或密码不能为空'
					})
				} else {
					let userInfo = {
						weiboID: null,
						weixinID: null,
						qqID: null,
						isCertified: 0,
						mpID: null,
						desc: '追哥玩王者荣耀无敌！',
						faceImage : "http://122.152.205.72:88/group1/M00/00/05/CpoxxFw_8_qAIlFXAAAcIhVPdSg994.png",
						userName : this.userName,
						birthday: '1900-01-01',
						registTime: '2019-02-28T07:02:30.000+0000',
						sex: null,
						userUniqueToken: 'liangjunjie666',
						nickName: this.userName
					};
					uni.setStorageSync("userInfo", userInfo)
					uni.switchTab({
						url: '../me/me'
					})
				}
			}
		}
	}
</script>

<style>
@import url("registLogin");
</style>
