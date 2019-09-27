<template>
	<view class="page">
		<block v-if="movieDetail.title != undefined">
		<!-- 视频播放 -->
		<!-- #ifdef MP-WEIXIN -->
		<view class="player" v-if="movieDetail.trailers[0].medium">
			<image :src="movieDetail.trailers[0].medium" class="movie"></image>
		</view>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
		<view class="player">
			<video :src="movieDetail.trailer_urls[0]" :poster="movieDetail.trailers[0].medium" controls class="movie" id="myTrailer"></video>
		</view>
		<!-- #endif -->
		<view class="movie-info">
			<navigator :url="'../cover/cover?cover='+movieDetail.images.large">
				<image :src="movieDetail.images.large" class="cover"></image>
			</navigator>
			<view class="movie-desc">
				<view class="title">
					{{movieDetail.title}}
				</view>
				<view class="basic-info">
					{{movieDetail.year + getGenres(movieDetail.genres)}}
				</view>
				<view class="basic-info">
					原名 : {{movieDetail.original_title}}
				</view>
				<view class="basic-info">
					影片时长 : {{movieDetail.durations[0]}}
				</view>
				<view class="basic-info">
					上映时间 : {{movieDetail.pubdates[1] == undefined ? movieDetail.pubdates[0] : movieDetail.pubdates[1]}}
				</view>
				<view class="score-block">
					<view class="big-score">
						<view class="score-words">
							综合评分 :
						</view>
						<view class="movie-score">
							{{movieDetail.rating.average}}
						</view>
					</view>
					<view class="score-stars">
						<block v-if="movieDetail.rating.average >= 0">
							<trailer-stars :innerScore="movieDetail.rating.average" :showNum="false"></trailer-stars>
						</block>
						<view class="parise-counts">
							{{movieDetail.wish_count}} 人想看
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 线 -->
		<view class="line-wapper">
			<view class="line"></view>
		</view>

		<!-- 剧情 -->
		<view class="plots-block">
			<view class="plots-title">
				电影简介
			</view>
			<view class="plots-desc">
				{{movieDetail.summary}}
			</view>
		</view>
		<!-- 演员 -->
		<view class="scroll-block">
			<view class="plots-title">
				导演/演员
			</view>
			<scroll-view scroll-x class="scroll-list">
				<view class="actor-wapper" :key="actor.staffId" v-for="(actor, index) in actorArr">
					<image :src="actor.avatars.large" class="single-actor" mode="aspectFill" @click="lookMe(index, 'actor')"></image>
					<view class="actor-name">
						{{actor.name}}
					</view>
				</view>
			</scroll-view>
		</view>
		</block>
		<!-- end -->
		<!-- 剧照 -->
		<view class="scroll-block" v-if="plotPicsArr.length > 0 && movieDetail.title != undefined">
			<view class="plots-title">
				剧照
			</view>
			<scroll-view scroll-x class="scroll-list">
				<image :src="img.cover" :key="img.image" v-for="(img, index) in plotPicsArr" class="plot-image" mode="aspectFill" @click="lookMe(index, 'plotPics')"></image>
			</scroll-view>
		</view>
		<!-- end -->
		
	</view>
</template>

<script>
	import trailerStars from '../../components/trailerStars.vue'
	export default {
		name: "movieDetail",
		data() {
			return {
				id: '',
				movieDetail: {},
				plotPicsArr: [],
				actorArr: []
			}
		},
		onReady() {
			this.videoContext = uni.createVideoContext('myTrailer');
		},
		onHide() {
			this.videoContext.pause();
		},
		onLoad(query) {
			uni.setNavigationBarColor({
				frontColor: "#ffffff",
				backgroundColor: "#999999"
			});
			this.id = query.id;
			this.getMovieDetailList();
			this.getMoviePhotos();
		},
		//监听导航栏按钮
		onNavigationBarButtonTap(e) {
			let type = '';
			if (e.index == 0) {
				uni.showActionSheet({
					itemList: ["收藏到微信", "分享到微信好友", "分享到微信朋友圈"],
					success: (obj) => {
						if (obj.tapIndex == 0) {
							type = 'WXSceneFavorite';
						} else if (obj.tapIndex == 1) {
							type = 'WXSceneSession';
						} else if (obj.tapIndex == 2) {
							type = 'WXSenceTimeline';
						}
						//仅在5+app编译的代码
						// #ifdef APP-PLUS
							this.shareWX(type);
						// #endif
						//仅在除5+app外编译的代码
					    // #ifndef APP-PLUS
					        uni.showToast({
					        	title: type == 'WXSceneFavorite' ? '收藏成功' : '分享成功',
					        	duration: 1000
					        });
					    // #endif
					}
				})
			}
		},
		// 仅支持小程序  分享到微信群或者好友
		onShareAppMessage() {
			return {
				title: this.movieDetail.title,
				path: this.movieDetail.share_url
			}
		},
		components: {
			trailerStars
		},
		methods: {
			getMoviePhotos() {
				uni.request({
					url: this.baseUrl + '/v2/movie/subject/' + this.id,
					method: 'GET',
					header:{
					    "Content-Type":"json"
					},
					success: (res) => {
						if (res.statusCode == 200) {
							this.plotPicsArr = res.data.photos;
						}
					},
				});
			},
			//处理数值 动作 / 可爱 / 科幻
			getGenres(arr) {
				let res = '';
				arr.map((value) => {
					res = res + " / " + value;
				});
				return res;
			},
			shareWX(typeName) {
				uni.share({
					provider: "weixin",
					scene: typeName,
					type: 0,
					href: this.movieDetail.share_url,
					title: "追哥电影: <" + this.movieDetail.title + ">",
					summary: this.movieDetail.summary,
					imageUrl: this.movieDetail.images.large,
					success: (res) => {
						uni.showToast({
							title: typeName == 'WXSceneFavorite' ? '收藏成功' : '分享成功',
							duration: 2000
						})
					}
				});
			},
			getMovieDetailList() {
				uni.showLoading({
					mask: false,
					title: ''
				})
				uni.request({
					url: this.baseUrl + '/v2/movie/subject/' + this.id,
					method: 'GET',
					header:{
					    "Content-Type":"json"
					},
					success: (res) => {
						if (res.statusCode == 200) {
							this.movieDetail = res.data;
							this.actorArr = res.data.directors;
							res.data.casts.map((val) => {
								this.actorArr.push(val);
							});
						}
					},
					complete() {
						uni.hideLoading();
					}
				});
			},
			lookMe(index, type) {
				let arr = [];
				if (type == 'actor') {
					this.actorArr.map((value) => {
						arr.push(value.avatars.large);
					})
				} else if (type == 'plotPics') {
					this.plotPicsArr.map((value) => {
						arr.push(value.image);
					})
				}
				uni.previewImage({
					urls: arr,
					current: index ? index : '',
					indicator: 'number',
					longPressActions: {
						itemList: ['保存到本地'],
						success: () => {
							uni.showLoading({
								title: '图片保存中...'
							});
							uni.downloadFile({
								url: arr[index],
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
			}
		}
	}
</script>

<style>
	@import url("movieDetail.css");
</style>
