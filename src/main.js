import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue';
import router from './router';

Vue.use(VueCompositionApi);
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
	router,
	render: h => h(App)
}).$mount('#app');
