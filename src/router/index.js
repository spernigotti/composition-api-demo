import Vue from 'vue';
import VueRouter from 'vue-router';
import V2 from '../views/V2.vue';
import V3 from '../views/V3.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: V2
	},
	{
		path: '/user-list-v3',
		name: 'userList',
		component: V3
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

export default router;
