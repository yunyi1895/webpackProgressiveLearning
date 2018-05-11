import Vue from 'vue';
import Router from 'vue-router';
import Home from './page/home.vue';
Vue.use(Router);
const routers = [{
    path: '/',
    component: Home,

}]
export default new Router({
    routes: routers
})