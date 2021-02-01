import Vue from "vue";
import Vuex from "vuex";
// import vSelect from 'vue-select';

// Vue.component('v-select', vSelect);
// import 'vue-search-select/dist/VueSearchSelect.css';
import 'vue-select/dist/vue-select.css';



Vue.use(Vuex);
import calendar from "./modules/calendar.js";
import event from "./modules/event.js";


export const store = new Vuex.Store({
    modules: {
        calendar,
        event
    }
});

// window.Vuex = Vuex;

// export const store = {
//     modules: {
//         calendar,
//         event
//     }
// };