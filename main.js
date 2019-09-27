import Vue from 'vue'
import App from './App'
Vue.prototype.header = {"Content-Type":"json"};
Vue.prototype.baseUrl = 'https://douban-api.uieee.com';
Vue.config.productionTip = false;
Vue.prototype.getUserInfo = () => {
	let userInfo = uni.getStorageSync("userInfo")
	if (userInfo != null && userInfo != "" && userInfo != undefined) {
		return userInfo;
	}else {
		return null;
	}
}

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
