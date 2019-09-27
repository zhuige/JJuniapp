<script>
	// #ifdef H5
	const oMeta = document.createElement('meta');
	oMeta.name = "referrer";
	oMeta.content = "no-referrer";
	document.getElementsByTagName('head')[0].appendChild(oMeta);
	// #endif
	export default {
		/* onLaunch: function () {
			console.log('App Launch')
		},
		onShow: function () {
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		} */
	}
</script>

<style>
	/*每个页面公共css */
	.page{
		width: 100%;
		height: 100%;
		background-color: #f7f7f7;
	}
	
	.page-block{
		background-color: #ffffff;
	}
	.line-wapper{
		padding: 0upx 20upx;
	}
	.line{
		height: 1px;
		background-color: #DBDBDA;
	}
</style>
