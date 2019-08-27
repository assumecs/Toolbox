import Vue from 'vue'
import Tips from '@/utils/tip'
import App from './search'
Vue.prototype.$tips = Tips

const app = new Vue(App)
app.$mount()
