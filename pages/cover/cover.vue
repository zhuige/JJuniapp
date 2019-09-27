<template>
	<view class="black" @click="back">
		<image :src="cover" mode="widthFix" class="cover" @longpress="operator"></image>
	</view>
</template>

<script>
	export default {
		name: 'cover',
		data() {
			return {
				cover: ''
			}
		},
		onLoad(query) {
			this.cover = query.cover;
			uni.setNavigationBarColor({
				frontColor: "#ffffff",
				backgroundColor: "#000000"
			})
		},
		methods: {
			back() {
				uni.navigateBack();
			},
			operator() {
				uni.showActionSheet({
					itemList: ['保存到本地'],
					success: (obj) => {
						
						 // #ifdef H5 || MP-WEIXIN 
						uni.showToast({
							title: "保存成功",
							duration: 2000
						});
						 // #endif 
						// #ifndef H5 || MP-WEIXIN
						if (obj.tapIndex == 0) {
							uni.showLoading({
								title: '图片保存中...'
							});
							uni.downloadFile({
								url: this.cover,
								success: (result) => {
									let tempFilePath = result.tempFilePath;
									uni.saveImageToPhotosAlbum({
										filePath: tempFilePath,
										success: () => {
											uni.showToast({
												title: "保存成功",
												duration: 2000
											})
										},
										complete: () => {
											uni.hideLoading();
										}
									})
								}
							})
						}
						// #endif
					}
				})
			}
			
		}
	}
</script>

<style>
	@import url("cover.css");
</style>
