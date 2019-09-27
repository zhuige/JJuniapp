<template>
	<view class="page page-fill">

		<view class="page-block info-list">
			<!-- 头像 -->

			<view class="item-wapper face-line-upbottom" @click="lookMe">
				<view class="info-words">头像</view>

				<view class="right-wapper">
					<image :src="userInfo.faceImage" class="face"></image>
					<view class="arrow-block">
						<image src="../../static/icos/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>

			<view class="line-top">
				<view class="line"></view>
			</view>

			<!-- 昵称 -->
			<view class="item-wapper" @click="editName">
				<view class="info-words">昵称</view>

				<view class="right-wapper">
					<view class="gray-fields">
						{{userInfo.nickName}}
					</view>
					<view class="arrow-block">
						<image src="../../static/icos/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>

			<view class="line-top">
				<view class="line"></view>
			</view>

			<!-- 生日 -->
			<view class="item-wapper" @click="editBirthday">
				<view class="info-words">生日</view>

				<view class="right-wapper">
					<view class="gray-fields">
						{{userInfo.birthday}}
					</view>
					<view class="arrow-block">
						<image src="../../static/icos/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>

			<view class="line-top">
				<view class="line"></view>
			</view>

			<!-- 性别 -->
			<view class="item-wapper" @click="editSex">
				<view class="info-words">性别</view>

				<view class="right-wapper">
					<view class="gray-fields">

						<view v-if="userInfo.sex == 1">
							男
						</view>
						<view v-else-if="userInfo.sex == 0">
							女
						</view>
						<view v-else>
							未选择
						</view>

					</view>
					<view class="arrow-block">
						<image src="../../static/icos/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>

		</view>

		<view class="footer-wapper">
			<view class="footer-words" @click="switchUser">
				切换账号
			</view>
			<view class="footer-words" style="margin-top: 10upx;" @click="logout">
				退出登录
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		name: 'meInfo',
		data() {
			return {
				userInfo: {}
			}
		},
		onShow() {
			let userInfo = this.getUserInfo();
			this.userInfo = userInfo;
		},
		methods: {
			editSex() {
				uni.navigateTo({
					url: '../editSex/editSex'
				})
			},
			editBirthday() {
				uni.navigateTo({
					url: '../meBirthday/meBirthday'
				})
			},
			editName() {
				uni.navigateTo({
					url: '../meNickName/meNickName'
				})
			},
			lookMe() {
				uni.previewImage({
					urls: [this.userInfo.faceImage],
					current: 0,
					longPressActions: {
						itemList: ['保存到本地'],
						success: () => {
							uni.showLoading({
								title: '图片保存中...'
							});
							uni.downloadFile({
								url: this.userInfo.faceImage,
								success: (result) => {
									let tempFilePath = result.tempFilePath;
									uni.saveImageToPhotosAlbum({
										filePath: tempFilePath,
										success: () => {
											uni.showToast({
												title: "保存成功",
												duration: 2000
											});
										},
										complete: () => {
											uni.hideLoading();
										}
									})
								}
							})
						}
					}
				})
			},
			switchUser() {
				uni.removeStorageSync("userInfo");
				uni.redirectTo({
					url: "../registLogin/registLogin"
				});
			},
			logout() {
				uni.removeStorageSync("userInfo");
				uni.showToast({
					duration: 1000,
					title: '退出成功'
				})
				setTimeout(function() {
					uni.switchTab({
						url: "../me/me"
					});
				}, 1000)
			}
		}
	}
</script>

<style>
	@import url("meInfo");
</style>
