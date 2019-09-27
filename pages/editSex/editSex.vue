<template>
	<view class="page page-fill">
			<view class="page-block" style="margin-top: 20upx;">
				<radio-group class="radio-sex" @change="sexChange">
					<label class="radio-single">
						<radio value="1" :checked="userInfo.sex == 1"/>男
					</label>
					<label class="radio-single">
						<radio value="0" :checked="userInfo.sex == 0"/>女
					</label>
				</radio-group>
			</view>
			<button type="primary" class="submitBtn" @click="editSex">提交</button>
	</view>
</template>

<script>
	export default {
		name: 'editSex',
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
			sexChange(e) {
				this.userInfo.sex = e.detail.value;
			},
			editSex() {
				uni.setStorageSync("userInfo", this.userInfo);
				uni.navigateBack({
					url: '../meInfo/meInfo'
				});
			}
		}
	}
</script>

<style>
/* 页面铺满屏幕 */
.page-fill {
	width:100%;
	height: 100%;
	position: absolute;
}

.radio-sex {
	display: flex;
	flex-direction: column;
}

.radio-single {
	padding: 20upx 20upx;
}

.submitBtn {
	width: 95%;
	margin-top: 40upx;
}
</style>
