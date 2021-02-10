import Vue from "vue";
import Vuex from "vuex";
// import vSelect from 'vue-select';

// Vue.component('v-select', vSelect);
// import 'vue-search-select/dist/VueSearchSelect.css';
import 'vue-select/dist/vue-select.css';

import moment from "moment-timezone";


Vue.use(Vuex);
import calendar from "./modules/calendar.js";
import eventsCanban from "./modules/events-canban";


// export const store = new Vuex.Store({
//     modules: {
//         calendar,
//         eventsCanban
//     }
// });

window.Vuex = Vuex;

export const store = {
    modules: {
        calendar,
            eventsCanban
    }
};