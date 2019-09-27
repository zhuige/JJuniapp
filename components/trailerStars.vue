<template>
	<view class="movie-score-wapper">
		<image 
			v-for="item in yelloScore" 
			src="../../static/icos/star-yellow.png" 
			class="star-ico">
		</image>
		<image 
			v-for="item in grayScore" 
			src="../../static/icos/star-gray.png" 
			class="star-ico">
		</image>
		
		<view class="movie-score" v-if="showNum == true">
			{{innerScore}}
		</view>
	</view>
</template>

<script>
	export default {
		name: "trailerStars",
		props: {
			innerScore: 0, //定义外部传入的分数
			showNum: {
				type: Boolean,
				default: () => {
					return true;
				}
			}
		},
		data() {
			return {
				yelloScore: 0,
				grayScore: 5
			};
		},
		created() {
			this.initStar();
		},
		methods: {
			initStar() {
				let tempScore = 0;
				if (this.innerScore != null && this.innerScore != undefined) {
					tempScore = this.innerScore;
				}
				let yelloScore = parseInt(tempScore / 2);
				let grayScore = 5 - yelloScore;
				this.yelloScore = yelloScore;
				this.grayScore = grayScore;
			}
		}
	}
</script>

<style>
	.movie-score-wapper {
		display: flex;
		flex-direction: row;
	}

	.star-ico {
		width: 20upx;
		height: 20upx;
		margin-top: 6upx;
	}

	.movie-score {
		font-size: 12px;
		color: grey;
		margin-left: 8upx;
	}
</style>
