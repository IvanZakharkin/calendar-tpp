import Vue from "vue";
import Vuex from "vuex";
import vSelect from 'vue-select';

Vue.component('v-select', vSelect);
// import 'vue-search-select/dist/VueSearchSelect.css';
import 'vue-select/dist/vue-select.css';





Vue.use(Vuex);
import calendar from "./modules/calendar.js";


export const store = new Vuex.Store({
	modules: {
		calendar
	}
});

// window.Vuex = Vuex;

// export const store = {
// 	modules: {
// 		calendar
// 	}
// };