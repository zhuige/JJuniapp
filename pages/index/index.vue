<template>
	<view class="page">
		<!-- 轮播图 -->
       <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="carousel">
       	<swiper-item v-for="(item, index) in carouselList" :key="index">
       		<image :src="item.image" class="carousel"></image>
       	</swiper-item>
       </swiper>
	   <!-- 即将上映 -->
	   <view class="page-block super-hot" v-if="movieComingList.length > 0">
			<view class="hot-titile-wapper">
				<image src="../../static/icos/hot.png" class="hot-ico"></image>
				<view class="hot-title">
					即将上映
				</view>
			</view>
	   </view>
	   
	   <scroll-view scroll-x="true" class="page-block hot" v-if="movieComingList.length > 0">
		   <view class="single-poster" v-for="item in movieComingList" :key="item.id">
				<view class="poster-wapper" @click="goDetail(item.id)">
					<image :src="item.images.small" class="poster"></image>
					<view class="movie-name">
						{{item.title}}
					</view>
					<trailer-stars :innerScore="item.rating.average"></trailer-stars>
				</view>
		   </view>
	   </scroll-view>
	   
	   <view class="page-block super-hot" v-if="movieHotList.length > 0">
	   			<view class="hot-titile-wapper">
	   				<image src="../../static/icos/interest.png" class="hot-ico"></image>
	   				<view class="hot-title">
	   					正在热映
	   				</view>
	   			</view>
	   </view>
	   
		<scroll-view scroll-x="true" class="page-block hot" v-if="movieHotList.length > 0">
				   <view class="single-poster" v-for="item in movieHotList" :key="item.id">
						<view class="poster-wapper" @click="goDetail(item.id)">
							<image :src="item.images.small" class="poster"></image>
							<view class="movie-name">
								{{item.title}}
							</view>
							<trailer-stars :innerScore="item.rating.average"></trailer-stars>
						</view>
				   </view>
		</scroll-view>
		
		 <view class="page-block super-hot" v-if="movieRankingList.length > 0">
		 	<view class="hot-titile-wapper">
		 		<image src="../../static/icos/guess-u-like.png" class="hot-ico"></image>
		 		<view class="hot-title">
		 			口碑榜
		 		</view>
		 	</view>
		 </view>
		 
		 <view class="page-block guss-u-like" v-if="movieRankingList.length > 0">
		 	<view class="single-like-movie" v-for="item in movieRankingList" :key="item.subject.id" @click="goDetail(item.subject.id)">
		 		<image :src="item.subject.images.small" class="like-movie"></image>
				<view class="movie-desc">
					<view class="movie-title">
						{{item.subject.title}}
					</view>
					<trailer-stars :innerScore="item.subject.rating.average"></trailer-stars>
					<view class="movie-info">
						{{item.subject.year + getGenres(item.subject.genres)}}
					</view>
					<view class="movie-info">
						上映时间 : {{item.subject.pubdates[1] == undefined ? item.subject.pubdates[0] : item.subject.pubdates[1]}}
					</view>
					<view class="movie-info">
						时常 : {{item.subject.durations[0]}}
					</view>
				</view>
				<view class="movie-oper" @click.stop="praiseMe(item)">
					<image src="../../static/icos/praise.png" class="praise-ico"></image>
						<view class="praise-me">
							点赞
						</view>
						<view class="praise-me animation-opacity" :class="{ animation_go : item.animation}">
							+1
						</view>
				</view>
		 	</view>
		 </view>
		 
		 <view class="page-block super-hot" v-if="movieTop205List.length > 0">
		 			<view class="hot-titile-wapper">
		 				<image src="../../static/icos/interest.png" class="hot-ico"></image>
		 				<view class="hot-title">
		 					Top250
		 				</view>
		 			</view>
		 </view>
		 <view class="page-block guss-u-like" v-if="movieTop205List.length > 0">
		 	<view class="single-like-movie" v-for="item in movieTop205List" :key="item.id" @click="goDetail(item.id)">
		 		<image :src="item.images.small" class="like-movie"></image>
		 				<view class="movie-desc">
		 					<view class="movie-title">
		 						{{item.title}}
		 					</view>
		 					<trailer-stars :innerScore="item.rating.average"></trailer-stars>
		 					<view class="movie-info">
		 						{{item.year + getGenres(item.genres)}}
		 					</view>
		 					<view class="movie-info">
		 						上映时间 : {{item.pubdates[1] == undefined ? item.pubdates[0] : item.pubdates[1]}}
		 					</view>
		 					<view class="movie-info">
		 						时常 : {{item.durations[0]}}
		 					</view>
		 				</view>
		 				<view class="movie-oper" @click.stop="praiseMe(item)">
		 					<image src="../../static/icos/praise.png" class="praise-ico"></image>
		 						<view class="praise-me">
		 							点赞
		 						</view>
		 						<view class="praise-me animation-opacity" :class="{ animation_go : item.animation}">
		 							+1
		 						</view>
		 				</view>
		 	</view>
		 </view>
	</view>
</template>

<script>
	import trailerStars from '../../components/trailerStars.vue';
	export default {
		data() {
			return {
				carouselList: [
					{image: 'http://122.152.205.72:88/group1/M00/00/03/CpoxxFw1ZHiASu_7AAfGb_KNy8Y861.png'},
					{image: 'http://122.152.205.72:88/group1/M00/00/03/CpoxxFw1ZSiAaDteAAdT5PsVWXs099.png'},
					{image: 'http://122.152.205.72:88/group1/M00/00/03/CpoxxFw1ZW6AHqLOAAe4KaofyAU209.png'},
					{image: 'http://122.152.205.72:88/group1/M00/00/03/CpoxxFw1ZauAKb7sAAe1cnsz_BQ313.png'},
					{image: 'http://122.152.205.72:88/group1/M00/00/03/CpoxxFw1ZgSAdG-rAAfcNtoF_n8219.png'},
					{image: 'http://122.152.205.72:88/group1/M00/00/03/CpoxxFw1Z_aASu2VAAf-RnvbnhY123.png'}
				],
				movieComingList: [],
				movieHotList: [],
				movieRankingList: [],
				movieTop205List: [],
				start: 0,
				count: 10,
				clicking: true,
				Top205Total: ''
			}
		},
		components: {
			trailerStars
		},
		onPullDownRefresh() {
			this.getMovieComingList();
			this.getMovieHotList();
			this.getMovieRankingList();
		},
		onShareAppMessage() {
			return {
				title: '追哥电影',
				path: '/pages/index/index'
			}
		},
		onReachBottom() {
			if (this.movieTop205List.length >= this.Top205Total) {
				return;
			}else {
				this.start += 10;
				this.geiMovieTop205List();
			}
		},
		onLoad() {
			this.getMovieComingList();
			this.getMovieHotList();
			this.getMovieRankingList();
			this.geiMovieTop205List();
		},
		methods: {
			//处理数值 动作 / 可爱 / 科幻
			getGenres(arr) {
				let res = '';
				arr.map((value) => {
					res = res + " / " + value;
				});
				return res;
			},
			//即将上映
			getMovieComingList() {
				uni.request({
					url: this.baseUrl+'/v2/movie/coming_soon',
					method: 'GET',
					header: this.header,
					success: (res)=> {
						if(res.statusCode == 200) {
							this.movieComingList = res.data.subjects;
						}
					}
				})
			},
			//正在热映
			getMovieHotList(){
				uni.request({
					url: this.baseUrl+'/v2/movie/in_theaters',
					method: 'GET',
					data: {
						city: "广州"
					},
					header: this.header,
					success: (res) => {
						if (res.statusCode == 200) {
							this.movieHotList = res.data.subjects;
						}
					}
				})
			},
			//口碑排行榜
			getMovieRankingList() {
				uni.request({
					url: this.baseUrl+'/v2/movie/weekly',
					method: 'GET',
					header: this.header,
					success: (res) => {
						if (res.statusCode == 200) {
							this.movieRankingList = res.data.subjects;
						}
					},
					complete: (e)=> {
						if(e.statusCode != 200) {
							uni.showToast({
								title:'服务器出错',
								icon: 'none'
							})
						}
						uni.stopPullDownRefresh();
					}
				})
			},
			geiMovieTop205List() {
				uni.request({
					url: this.baseUrl+'/v2/movie/top250',
					method: 'GET',
					header: this.header,
					data: {
						count: this.count,
						start: this.start
					},
					success: (res) => {
						if (res.statusCode == 200) {
							this.movieTop205List =this.movieTop205List.concat(res.data.subjects);
							this.Top205Total = res.data.total;
						}
					}
				});
			},
			// 跳转详情
			goDetail(id) {
				uni.navigateTo({
					url: '/pages/movieDetail/movieDetail?id='+id
				});
			},
			praiseMe(item) {
				//clicking 处理很快速度的时候出现bug
				if(this.clicking){
					this.clicking = false
					item.animation = true;
					this.$forceUpdate();
					setTimeout(function() {
						item.animation = false;
						this.$forceUpdate();
						this.clicking = true
					}.bind(this),600);
				}
			}
		}
	}
</script>

<style>
	@import url("index.css");
</style>
