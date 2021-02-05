<template lang="pug">
  .bcalendar
    .bcalendar__view-week-days(v-if="displayType === 'week' || displayType === 'workingDays'")
      .bcalendar__days
        full-calendar-day(
          v-for="(date, index) in datesInWeek"
          :date="date"
        )
      vueCustomScrollbar(class="scroll-area")
        .bcalendar__week-grid
          .bcalendar__week-grid-cols
            .bcalendar__week-grid-time
              each time in ['1:00','2:00','3:00','4:00','5:00','6:00','7:00','8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00']
                .bcalendar__week-grid-hour
                  .bcalendar__week-grid-hour-value= time
            full-calendar-week-day(
              v-for="(date, index) in datesInWeek"
              :date="date"
            )
            popup-event-details(
              v-if="shownPopapDetailsEvent"
            )
    .bcalendar__view-schedule(v-if="displayType === 'schedule'")
      full-calendar-schedule()
    .bcalendar__view-schedule(v-if="displayType === 'applications'")
      full-calendar-applications()
</template>

<script>

import fullCalendarDay from "./full-calendar-day.vue";
import fullCalendarSchedule from "./full-calendar-schedule";
import fullCalendarApplications from "./full-calendar-applications";
import fullCalendarWeekDay from "./full-calendar-week-day"
import vueCustomScrollbar from 'vue-custom-scrollbar'
import { mapState } from "vuex";

// const DAYS_WEEK = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];

export default {
  data() {
    return {
      //   datesInWeek: this.getdatesInWeek({ year: 2020, month: 5, day: 14 })
    };
  },
  props: {
    displayType: {
      type: String,
      default: "week"
    }
  },
  components: {
    fullCalendarDay,
    fullCalendarSchedule,
    vueCustomScrollbar,
    fullCalendarApplications,
    fullCalendarWeekDay
  },
  computed: {
    ...mapState({
      day: state => state.calendar.day,
      year: state => state.calendar.year,
      month: state => state.calendar.month,
      todayDate: state => state.calendar.todayDate,
      todayYear: state => state.calendar.todayYear,
      todayMonth: state => state.calendar.todayMonth,
      selectedDate: state => state.calendar.selectedDate,
      shownPopapAddingEvent: state => state.calendar.shownPopapAddingEvent,
      shownPopapAddingCalendar: state => state.calendar.shownPopapAddingCalendar,
      shownPopapEventEdit: state => state.calendar.shownPopapEventEdit,
      shownPopapDetailsEvent: state => state.calendar.shownPopapDetailsEvent
    }),
    // datesInWeek_() {
    //   let year = this.year;
    //   let month = this.month;
    //   let day = this.day;
    //   let dayInWeek = new Date(year, month, day).getDay();
    //   if (dayInWeek === 0) dayInWeek = 7;
    //   const datesInWeek = new Array(7).fill(0);
    //   for (let i = 0; i < 7; i += 1) {
    //     const date = new Date(year, month, day - dayInWeek + 1 + i);
    //     datesInWeek[i] = {
    //       year: date.getFullYear(),
    //       month: date.getMonth(),
    //       day: date.getDate(),
    //       daysWeek: DAYS_WEEK[date.getDay()]
    //     };
    //   }
    //   return datesInWeek;
    // },
    datesInWeek() {
      let countDays = this.displayType === 'week' ? 7 : 5;
      let year = this.year;
      let month = this.month;
      let day = this.day;
      let dayInWeek = new Date(year, month, day).getDay();
      if (dayInWeek === 0) dayInWeek = 7;
      const datesInWeek = new Array(countDays).fill(0);
      for (let i = 0; i < countDays; i += 1) {
        const date = new Date(year, month, day - dayInWeek + 1 + i);
        datesInWeek[i] = {
          year: date.getFullYear(),
          month: date.getMonth(),
          day: date.getDate(),
          // daysWeek: DAYS_WEEK[date.getDay()],
          daysWeek: this.$moment(date).format('dddd')
        };
      }
      return datesInWeek;
    }
  },
  methods: {
  },
  mounted() {
    $('.scroll-area').scrollTop(380);
  }
};
</script>

<style lang="scss" scoped>

// @import './styles/bcalendar.scss';

// .bcalendar {
// 	background-color: #fff;
// 	padding-top: 10px;
// 	padding-bottom: 10px;
// 	box-shadow: 0 0 16px rgba(63,87,193,0.2);

// 	&__days {
// 		display: flex;
// 		padding: 10px 20px 10px 7.6%;
		
// 	}

// 	&__day {
// 		width: calc(100%/7);
// 		display: flex;
// 		flex-direction: column;
// 		align-items: center;
// 		border-right: 1px solid transparent;

// 		&_active {
// 			.bcalendar__day-name {
// 				color: #ffbc3b;
// 			}
// 			.bcalendar__day-num {
// 				background-color: #ffbc3b;
// 				.bcalendar__day-num-btn{
// 					color: white;
// 				}
				
// 			}
// 		}
// 	}
// 	&__day-name {
// 		font-size: 10px;
// 		color: #969696;
// 		text-transform: uppercase;
// 		margin-bottom: 7px;
// 	}
// 	&__day-num {
// 		border-radius: 50%;
// 	}

// 	&__day-num-btn {
// 		background: none;
// 		border: none;
// 		font-size: 24px;
// 		color: #3e3e3e;
// 		width: 50px;
// 		height: 50px;
// 		display: flex;
// 		align-items: center;
// 		justify-content: center;
		
// 	}
	

// 	&__week-grid{
// 		display: flex;
// 		// overflow-y: auto;
// 		padding-right: 20px;
		
// 		height: 560px;
// 	}

	
// 	&__week-grid-cols {
		
// 		height: 1210px;
// 		display: flex;
// 		flex: 1;
// 		position: relative;

// 	}

// 	&__week-grid-time {
// 		width: 7.6%;
// 		border-right: 1px solid #e1e1e1;
// 	}

// 	&__grid-col {
// 		width: calc((100% - 7.6%) / 7);
// 		border-left: 1px solid #e1e1e1;

// 		&:last-of-type {
// 			border-right: 1px solid #e1e1e1;
// 		}
// 	}

// 	// &__grid-time-line{
// 	// 	position: absolute;
// 	// 	height: 1px;
// 	// 	background-color: #e1e1e1;
// 	// 	top: 10px;
// 	// 	right: 0;
// 	// 	width: calc(100% - 6.3%);
// 	// }
// 	// &__grid-time-line-value {
// 	// 	font-size: 10px;
// 	// 	color: #969696;
// 	// 	position: absolute;
// 	// 	top: -5px;
// 	// 	left: -4.5%;
// 	// }

// 	&__week-grid-hour {
// 		text-align: center;
// 		height: 50px;
// 		position: relative;

// 		&:after {
// 			content: '';
// 			display: block;
// 			background-color: #e1e1e1;
// 			height: 1px;
// 			width: 12px;
// 			position: absolute;
// 			bottom: 0;
// 			right: 0;
// 		}
		
// 	}
// 	&__week-grid-hour-value {
// 		font-size: 11px;
// 		color: #969696;
// 		position: absolute;
// 		width: 100%;
// 		text-align: center;
// 		bottom: -6px;

		
// 	}
// 	&__week-grid-day {
// 		width: calc(100%/7);
// 		// flex: 1;
// 		border-right: 1px solid #e1e1e1;
// 	}
// 	&__week-grid-day-hour {
// 		height: 50px;
// 		border-bottom: 1px solid #e1e1e1;
// 	}
// 	&__event {
// 		padding-top: 10px;
// 		margin: 1px;
// 		color: #fff;
// 		overflow: hidden;
// 		padding-left: .5em;
// 		padding-right: .5em;
// 		cursor: pointer;
// 		border-radius: 2px;
// 	}
// 	&__event-title {
// 		margin-bottom: 5px;
// 		font-size: 14px;
// 	}

// 	&__schedule {
// 		min-height: 650px;
// 		padding-right: 20px;
// 		padding-bottom: 20px;
// 		position: relative;
// 	}
// 	&__schedule-event {
// 		display: flex;
// 		align-items: center;
// 		padding: 10px 20px;
// 		font-size: 14px;
// 		color: #969696;
// 		border-bottom: 1px solid #e1e1e1;
// 		border-right: 1px solid #e1e1e1;

// 		&:first-child {
// 			border-top: 1px solid #e1e1e1;
// 		}

// 		&_current {
// 			.bcalendar__schedule-event-day {
// 				background-color: #ffbc3b;
// 				color: white;
// 			}
// 			.bcalendar__schedule-event-day-name {
// 				color: #ffbc3b;
// 			}
// 			.bcalendar__schedule-event-day-current {
// 				font-size: 14px;
// 			}
			
// 		}
// 	}
// 	&__schedule-event-day {
// 		width: 30px;
// 		height: 30px;
// 		display: flex;
// 		align-items: center;
// 		justify-content: center;
// 		font-size: 18px;
// 		color: #3e3e3e;
// 		margin-right: 20px;
// 		border-radius: 50%;
// 	}

// 	&__schedule-event-day-name {
// 		font-size: 10px;
// 		text-transform: uppercase;
// 		margin-right: 15px;
		
// 	}
// 	&__schedule-event-day-current {
// 		margin-right: 25px;
// 		font-size: 0px;
// 		color: #ffbc3b;
// 		width: 55px;
// 	}
// 	&__schedule-event-time {
// 		margin-right: 25px;
// 	}
// 	&__schedule-event-name {
// 		display: flex;
// 		align-items: center;
// 		flex: 1;
// 	}
// 	&__schedule-event-name-circle {
// 		width: 10px;
// 		height: 10px;
// 		margin-right: 20px;
// 		border-radius: 50%;
// 	}
// 	&__schedule-footer {
// 		padding-left: 25px;
// 		font-size: 14px;
// 		color: #969696;
// 		position: absolute;
// 		bottom: 0;
// 		left: 0;
// 	}
// 	&__schedule-footer-text {
// 		display: inline-block;
// 	}
// 	&__schedule-footer-btn-more {
// 		display: inline-block;
// 		background: none;
// 		border: none;
// 		color: #002e6d;
// 		padding: 0;

// 		&:hover {
// 			text-decoration: underline;
// 		}
// 	}

// }


// .bcalendar {
//   position: relative;
// }

// .scroll-area {
//   position: relative;
//   height: 100%;
// }

// .bcalendar__week-grid-cols {
//   position: relative;
// }
</style>
