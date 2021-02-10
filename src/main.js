import Vue from "vue";
import App from "./App.vue";
import moment from 'moment';
moment.locale('ru');
Vue.prototype.$moment = moment;
// Object.definePrototype(Vue.prototype, '$moment', { value: moment });
import { store } from "./store/index.js";

// new Vue({
//     render: h => h(App),
//     store
// }).$mount("#app");

window.VueCalendar = {
    render: h => h(App),
    store
};
window.Vue = Vue;