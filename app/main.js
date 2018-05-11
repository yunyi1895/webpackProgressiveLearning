import Vue from 'vue';

import App from './App.vue';
import router from './router.js';
new Vue({
    el: '#root',
    router,
    //store: Store,
    render: h => h(App)
})