<template>
	<view class="page">
		<view class="search-block">
			<view class="search-ico-wapper">
				<image src="../../static/icos/search.png" class="search-ico"></image>
			</view>
			<input placeholder="搜索" maxlength="10" class="search-text" confirm-type="search" @confirm="searchMe" v-model="keywords"/>
		</view>
		<view class="movie-list page-block">
			<view class="movie-wapper" v-for="item in newMovieRankingList" :key="item.id" @click="goDetail(item.id)">
				<image :src="item.images.large" class="poster"></image>
				<trailer-stars :innerScore="item.rating.average"></trailer-stars>
				<view class="movie-name">
					{{item.title}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import trailerStars from '../../components/trailerStars.vue'
	export default {
		name: "search",
		data() {
			return {
				searchList: [],
				newMovieRankingList: [],
				keywords: ''
			};
		},
		components: {
			trailerStars
		},
		onPullDownRefresh() {
			this.getNewMovieRankingList();
		},
		onLoad() {
			this.getNewMovieRankingList();
		},
		methods: {
			getNewMovieRankingList() {
				uni.showLoading({
					mask: false,
					title: ''
				})
				uni.request({
					url: this.baseUrl+'/v2/movie/new_movies',
					method: 'GET',
					header:this.header,
					success: (res) => {
						if (res.statusCode == 200) {
							this.newMovieRankingList = res.data.subjects;
						}
					},
					complete: (e)=> {
						if(e.statusCode != 200) {
							uni.showToast({
								title:'服务器出错',
								icon: 'none'
							})
						}
						uni.hideLoading();
						uni.stopPullDownRefresh();
					}
				});
			},
			goDetail(id) {
				uni.navigateTo({
					url: '/pages/movieDetail/movieDetail?id='+id
				});
			},
			searchMe() {
				if(this.keywords == '叶树媚') {
					uni.showModal({
						content: '老婆好 , 爱你么么哒',
						showCancel: false
					});
					return;
				}else if (this.keywords == '追哥') {
					uni.showModal({
						content: '话不多说 , 追哥牛批',
						showCancel: false
					});
					return;
				}else if (this.keywords == '梁俊杰') {
					uni.showModal({
						content: '话不多说 , 梁俊杰牛批',
						showCancel: false
					});
					return;
				}else {
					uni.showModal({
						content: '搜索接口有问题，暂不做',
						showCancel: false
					});
					return;
				}
			}
		}
	}
</script>

<style>
@import url("search.css");
</style>
