<template lang="pug">
  .calendar-page__calendars
    .calendar-page__calendars-title Календари
    .calendar-page__calendars-list
      calendars-list-item(
        v-for="calendar in calendars"
          :calendar="calendar"
      )
    button.btn.calendar-page__btn-gray(
      @click="showPopapAddingCalendar"
    ) + Добавить календарь
</template>

<script>
import { mapMutations, mapState } from "vuex";

import calendarsListItem from './calendar-list-item.vue'

export default {
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["showPopapAddingCalendar"]),

  },
   computed: {
      ...mapState({
        calendars: state => state.calendar.calendars
      })
  },
  components: {
    calendarsListItem
  },
  created() {
  }
};
</script>

<style lang="scss" scoped>

// .calendar-page {
// 	// height: 100vh;

// 	&__container {
// 		position: relative;
// 	}
// 	&__row {
// 		display: flex;
// 	}

// 	&__col-left {
// 		width: 220px;
// 		margin-right: 35px;
// 	}
// 	&__col-right {
// 		flex: 1;
// 	}

// 	&__choise-date {
// 		display: flex;
// 		align-items: center;
// 	}
// 	&__date {
// 		font-size: 17px;
// 	}
// 	&__choise-date-item {
// 		margin-right: 5px;
// 		font-size: 14px;
		

// 		&:last-child {
// 			margin-right: 0;
// 		}
// 	}

// 	&__btn-gray {
// 		border: 1px solid #656875;
// 		color: #656875;
// 		padding: 6px 20px;
// 		font-size: 14px;
// 		background: transparent;

// 		&:hover {
// 			background-color: #ffffff;
// 		}
// 	}
// 	&__btn-icon {
// 		color: #656875;
// 	}

// 	&__btn-create {
// 		border: 1px solid #e89d06;
// 		background-color: #fff;
// 		color: #e89d06;
// 		font-weight: bold;
// 		font-size: 14px;
// 		text-transform: uppercase;
// 		padding: 8px 25px;
// 		margin-right: 10px;

// 		&:hover {
// 			background-color: #e89d06;
// 			color:#fff;
// 		}
// 	}

// 	&__current-date {
// 		font-size: 14px;
// 		color: #656875;

// 		span {
// 			font-size: 17px;
// 		}
// 	}
// 	&__view-current {
// 		border: 1px solid #656875;
// 		color: #656875;
// 		padding: 6px 20px;

// 		&:after {
// 			height: .4375rem;
// 			width: .4375rem;
// 			transform: rotate(45deg);
// 			border: .125rem solid #656875;
// 			border-top: none;
// 			border-left: none;
// 			margin-left: .9375rem;
// 		}
// 	}

// 	&__calendars {
// 		margin-top: 20px;
// 	}
// 	&__calendars-title {
// 		font-size: 16px;
// 		text-transform: uppercase;
// 		padding: 10px 0;
// 		border-bottom: 1px solid #a1acce;
// 		margin-bottom: 15px;
// 	}
// 	&__calendars-list {
// 		margin-bottom: 20px;
// 	}
// }


</style>
