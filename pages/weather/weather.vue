<template>
	<view class="page">
		<view class="search-block">
			<view class="search-ico-wapper">
				<image src="../../static/icos/search.png" class="search-ico"></image>
			</view>
			<input placeholder="江门" maxlength="10" class="search-text" confirm-type="search" @confirm="searchMe" v-model="keywords" />
		</view>
		<view class="suggest" v-if="weatherList.length > 0">
			{{oldWords}}{{suggest}}
		</view>
		<view class="weather-block" v-for="(item, index) in weatherList" :key="index">
			<view class="weather-icon-wapper">
				<view class="weather-icon" :class="{
                     littleRainy:item.type=='小雨'||item.type=='阵雨',
                     thunder:item.type=='雷阵雨',
                     bigRainy:item.type=='大雨'||item.type=='中到大雨'||item.type=='小到大雨'||item.type=='暴雨'||item.type=='大到暴雨',
                     muchCloud:item.type=='多云',
                     centerRainy:item.type=='中雨'||item.type=='小到中雨',
                      sun:item.type=='晴',
                      overcast:item.type=='阴'
                     }"></view>
			</view>
			<view class="weather-info-wapper">
				<view class="weather-info">
					{{month}}月{{item.date}}
				</view>
				<view class="weather-info">
					{{item.fengxiang}}{{item.fengli}}
				</view>
				<view class="weather-info">
					{{item.low}}~{{item.high}}  {{item.type}}
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				keywords: '',
				city: '江门',
				weatherList: [],
				month: '',
				suggest: '',
				oldWords: '江门'
			}
		},
		onLoad() {
			this.getWeather();
		},
		onShareAppMessage() {
			return {
				title: '追哥天气预告',
				path: '/pages/weather/weather'
			}
		},
		methods: {
			searchMe() {
				if(this.keywords.trim() == '') {
					this.city = "江门"
				}else {
					this.city = this.keywords;
				}
				this.getWeather();
			},
			getWeather() {
				uni.showLoading({
					title: '',
					mark: false
				});
				let myDate = new Date();
				this.month = myDate.getMonth()
				uni.request({
					url: 'https://www.apiopen.top/weatherApi?city='+this.city,
					method: 'POST',
					header: this.header,
					success: (res) => {
						if(res.data.code == 200) {
							this.weatherList = res.data.data.forecast;
							this.suggest = res.data.data.ganmao;
							this.weatherList.map((val) => {
								val.fengli = val.fengli.slice(9,val.fengli.length-3);
								val.low = val.low.slice(2);
								val.high = val.high.slice(2);
								this.oldWords = this.city;
							})
						}
					},
					complete: (e)=> {
						if(e.data.code != 200) {
							uni.showToast({
								title: e.data.msg,
								duration: 1500,
								icon: 'none'
							});
						}
						uni.hideLoading();
					}
				})
			},
		}
	}
</script>

<style>
	.page {
		background-color: #2C2A36;
	}

	.search-ico {
		width: 40upx;
		height: 40upx;
	}

	.search-text {
		color: #CCCCCC;
		font-size: 14px;
		height: 60upx;
		width: 650upx;
		border-bottom: 1px solid #cccccc;
	}

	/deep/.uni-input-form {
		padding-left: 2px;
		height: 100%;
		background-color: #2C2A36;
	}

	/deep/.uni-input-placeholder {
		z-index: 2;
		margin-left: 8upx;
		background-color: #2C2A36;
	}

	.search-block {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		padding-bottom: 20upx;
		z-index: 1;
		background-color: #2C2A36;
	}

	.search-ico-wapper {
		background-color: #2C2A36;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0upx 10upx;
	}

	.suggest {
		margin: 0upx 20upx;
		margin-bottom: 20upx;
		color: #999999;
		font-size: 14px;
	}

	.weather-block {
		margin: 0upx 20upx;
		display: flex;
		flex-direction: row;
	}

	.weather-info-wapper {
		background-color: #2C2A36;
		width: 440upx;
	}

	.weather-info {
		padding-top: 20upx;
		padding-left: 40upx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		color: #F1F1F1;
	}

	.weather-icon-wapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.weather-icon {
		width: 270upx;
		height: 270upx;
		background: url(https://i1.fuimg.com/700222/0fc960c519bf7154.gif) no-repeat 0 0;
	}

	.sun {
		background: url(https://i1.fuimg.com/700222/0fc960c519bf7154.gif) no-repeat 0 0;
	}

	.thunder {
	
		background: url(https://i1.fuimg.com/700222/0fc960c519bf7154.gif) no-repeat -300px 0;
		
	}

	.littleRainy {
		
		background: url(https://i1.fuimg.com/700222/0fc960c519bf7154.gif) no-repeat -155px 0;
	
	}

	.bigRainy {
		
		background: url(https://i1.fuimg.com/700222/0fc960c519bf7154.gif) no-repeat -300px -183px;
		
	}

	.muchCloud {
		background: url(https://i1.fuimg.com/700222/0fc960c519bf7154.gif) no-repeat -155px -183px;
	}

	.centerRainy {
	
		background: url(https://i1.fuimg.com/700222/0fc960c519bf7154.gif) no-repeat -465px -183;
	}

	.overcast {
		
		background: url(https://i1.fuimg.com/700222/0fc960c519bf7154.gif) no-repeat 0 -183px;
		
	}
</style>
