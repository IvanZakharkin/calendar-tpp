<template lang="pug">
	.calendar-event-popup-fullscreen
		.row.calendar-event-popup-fullscreen__header
			.col-8
				.calendar-event-popup-fullscreen__close
					button.calendar-event-popup-fullscreen__close-btn(@click="closePopup")
						i.fas.fa-times
				.calendar-event-popup-fullscreen__name
					input.calendar-event-popup-fullscreen__input-name(
						v-model="eventName"
						placeholder="Добавьте название"
						)
			.col-4
				button.btn.calendar-event-popup-fullscreen__btn-save(
					@click="saveEvent()"
				) Сохранить
		.calendar-event-popup-fullscreen__row
			.calendar-event-popup-fullscreen__row-item
				input.calendar-event-popup-fullscreen__field(
					ref="inputDate" 
					type='text',
					:value='startValueInputDate',  
					onclick='BX.calendar({node: this, field: this, bTime: false});'
					@change="changingDate()"
				)
			.calendar-event-popup-fullscreen__row-item
				input.calendar-event-popup-fullscreen__field(
					v-model="timeStart"
						type="time"
						@change="changeTimeStart()"
					)
			.calendar-event-popup-fullscreen__row-item -
			.calendar-event-popup-fullscreen__row-item
				input.calendar-event-popup-fullscreen__field(
					v-model="timeEnd"
					type="time"
					@change="changeTimeEnd()"
					)
			.calendar-event-popup-fullscreen__row-item
				.calendar-event-popup-fullscreen__timezone
					v-select(v-model="selectedTimezone" :options="timezones")
		.row
			.col-8
				.calendar-event-popup-fullscreen__nav
					.calendar-event-popup-fullscreen__nav-item Опции
				.calendar-event-popup-fullscreen__options
					.calendar-event-popup-fullscreen__options-row
						.calendar-event-popup-fullscreen__options-checkbox-item
							label.checkbox
								input.checkbox__input(type="checkbox")
								.checkbox__title Видеоконференция
						.calendar-event-popup-fullscreen__options-checkbox-item
							label.checkbox
								input.checkbox__input(type="checkbox")
								.checkbox__title Видеотрансляция
						.calendar-event-popup-fullscreen__options-checkbox-item
							label.checkbox
								input.checkbox__input(type="checkbox")
								.checkbox__title Аудизопись
						.calendar-event-popup-fullscreen__options-checkbox-item
							label.checkbox
								input.checkbox__input(type="checkbox")
								.checkbox__title Голосование
						.calendar-event-popup-fullscreen__options-checkbox-item
							label.checkbox
								input.checkbox__input(type="checkbox")
								.checkbox__title Пометка для материала
						.calendar-event-popup-fullscreen__options-checkbox-item
							label.checkbox
								input.checkbox__input(type="checkbox")
								.checkbox__title Пометка для материала
					.calendar-event-popup-fullscreen__options-row
						.calendar-event-popup-fullscreen__options-title Календарь
						.calendar-event-popup-fullscreen__options-item
							calendars-select(
								@selectCalendar="selectCalendar"
								:selectedCalendar="selectedCalendar"
							)
							
					.calendar-event-popup-editor
						vue-editor(v-model='eventDeskription' :editor-toolbar="customToolbar")  
</template>

<script>
import calendarsSelect from "./calendars-select.vue"
import { VueEditor } from "vue2-editor";
import { mapMutations, mapState, mapGetters } from 'vuex';


export default {
  data() {
    return {
		eventDeskription: "",
		customToolbar: [
			["bold", "italic", "underline"],
			[{ list: "ordered" }, { list: "bullet" }],
			["image", "code-block"]
		],
		eventName: "",
		timeStart: "",
		timeEnd: "",
		refDate: "",
		timezones: [
        {label: 'МСК−1 (UTC+2)', code: '-120'},
        {label: 'МСК (UTC+3)', code: '-180'},
        {label: 'МСК+1 (UTC+4)', code: '-240'},
        {label: 'МСК+2 (UTC+5)', code: '-300'},
        {label: 'МСК+3 (UTC+6)', code: '-360'},
        {label: 'МСК+4 (UTC+7)', code: '-420'},
        {label: 'МСК+5 (UTC+8)', code: '-480'},
        {label: 'МСК+6 (UTC+9)', code: '-540'},
        {label: 'МСК+7 (UTC+10)', code: '-600'},
        {label: 'МСК+8 (UTC+11)', code: '-660'},
        {label: 'МСК+9 (UTC+12)', code: '-720'},
			],
		selectedTimezone:""
		};
  },
   watch: {
    eventName: function(val) {
      this.updateCreatedEvent({
        state: "name",
        value: val
      });
	},
    selectedTimezone: function(val) {
      this.updateCreatedEvent({
        state: "dataEnd",
        value: this.newTimeEnd
      });
      this.updateCreatedEvent({
        state: "dataStart",
        value: this.newTimeStart
      });
      this.updateCreatedEvent({
        state: "dataInterim",
        value: 0
      });
	},
   },
  methods: {
	  ...mapMutations([
			"closePopapEventFullScreen",
			"resetStateCreatedEvent",
			"updateCreatedEvent",
			"resetStateCreatedEvent",
			"closePopupCreatedEvent",
			"updateCreatedEvent",
			"addCreatedEventToEvents",
			"showPopapEventFullScreen"
	  ]),
	  closePopup() {
		  this.resetStateCreatedEvent();
		  this.closePopapEventFullScreen();
	  },
	  saveEvent() {
      (this.eventName = ""),
        this.addCreatedEventToEvents();
      this.resetStateCreatedEvent();
	  this.closePopupCreatedEvent();
	  this.closePopapEventFullScreen()
	},
	changingDate() {
      this.refDate = this.$refs.inputDate.value;
      this.updateCreatedEvent({
        state: "dataEnd",
        value: this.newTimeEnd
      });
      this.updateCreatedEvent({
        state: "dataStart",
        value: this.newTimeStart
      });
      this.updateCreatedEvent({
        state: "dataInterim",
        value: 0
      });
    },
    changeTimeStart() {
     this.updateCreatedEvent({
        state: "dataEnd",
        value: this.newTimeEnd
      });
      this.updateCreatedEvent({
        state: "dataStart",
        value: this.newTimeStart
      });
      this.updateCreatedEvent({
        state: "dataInterim",
        value: 0
      });
    },
    changeTimeEnd() {
      this.updateCreatedEvent({
        state: "dataEnd",
        value: this.newTimeEnd
      });
      this.updateCreatedEvent({
        state: "dataStart",
        value: this.newTimeStart
      });
      this.updateCreatedEvent({
        state: "dataInterim",
        value: 0
      });
    },
    selectCalendar(calendar) {
      this.updateCreatedEvent({
        state: "calendarID",
        value: calendar.id
      });
    }
  },
  computed: {
	...mapState({
      createdEvent: state => state.calendar.createdEvent,
      calendars: state => state.calendar.calendars
	}),
	...mapGetters([
      "getDataStartCreatedEvent",
			"getDataEndCreatedEvent",
			"getCalendar",
			"timeZone",
		]),
		selectedCalendar(){
			// console.log(createdEvent.calendarID);
			return this.getCalendar(this.createdEvent.calendarID);
		},
	newYear() {
      return Number(this.refDate.split('.')[2]);
    },
    newMonth() {
      return Number(this.refDate.split('.')[1] - 1);
    },
    newDay() {
      return Number(this.refDate.split('.')[0]);
    },
    newHourStart() {
      return Number(this.timeStart.split(":")[0]);
		},
		asd(){
			return Number(this.selectedTimezone.code);
		},
    newMinutesStart() {
			let minutes = Number(this.timeStart.split(":")[1]);
			if(this.timeZone === Number(this.selectedTimezone.code)) return minutes;
			return minutes + this.timeZone - Number(this.selectedTimezone.code);
    },
    newHourEnd() {
      return Number(this.timeEnd.split(":")[0]);
    },
    newMinutesEnd() {
			let minutes = Number(this.timeEnd.split(":")[1]);
			if(this.timeZone === Number(this.selectedTimezone.code)) return minutes;
			return minutes + this.timeZone - Number(this.selectedTimezone.code);
    },
    newTimeStart() {
      return new Date(this.newYear, this.newMonth, this.newDay, this.newHourStart, this.newMinutesStart).getTime();
    },
    newTimeEnd() {
      return new Date(this.newYear, this.newMonth, this.newDay, this.newHourEnd, this.newMinutesEnd).getTime();
    },
    monthCreatedEvent() {
      return new Date(this.getDataStartCreatedEvent).getMonth() + 1;
    },
    yearCreatedEvent() {
      return new Date(this.getDataStartCreatedEvent).getFullYear();
    },
    dayStartCreatedEvent() {
      return new Date(this.getDataStartCreatedEvent).getDate();
    },
    startValueInputDate () {
      const day = this.dayStartCreatedEvent < 10 ? `0${this.dayStartCreatedEvent}` : `${this.dayStartCreatedEvent}`;
      const month = this.monthCreatedEvent < 10 ? `0${this.monthCreatedEvent}` : `${this.monthCreatedEvent}`;
      return `${day}.${month}.${this.yearCreatedEvent}`
    },
    timeStartCreatedEvent() {
      let hour = new Date(this.getDataStartCreatedEvent).getHours();
      hour = hour < 10 ? `0${hour}` : `${hour}`
      let minutes = new Date(this.getDataStartCreatedEvent).getMinutes();
      minutes = minutes < 10 ? `0${minutes}` : `${minutes}`
      return `${hour}:${minutes}`
    },
    timeEndCreatedEvent() {
      let hour = new Date(this.getDataEndCreatedEvent).getHours();
      hour = hour < 10 ? `0${hour}` : `${hour}`;
      let minutes = new Date(this.getDataEndCreatedEvent).getMinutes();
      minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      return `${hour}:${minutes}`
    },
  },
  components: {
	calendarsSelect,
	VueEditor
  },
  created() {
	  this.timeStart = this.timeStartCreatedEvent,
      this.timeEnd = this.timeEndCreatedEvent,
	  this.refDate = this.startValueInputDate
		this.eventName = this.createdEvent.name
		this.selectedTimezone = this.timezones.filter(timezone => {
			return Number(timezone.code) === this.timeZone;
		})[0]
  }

};
</script>

<style lang="scss" scoped>
.calendar-event-popup-fullscreen__timezone {
	.v-select {
		background: #f0efef;  
    font-size: 14px;
    color: #656875;
		height: 35px;
	}
	}

		.vs__dropdown-toggle {
			border: none;
		}
.calendar-event-popup-fullscreen {
    padding: 30px 135px 30px 85px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    height: 100vh;
    background: #fff;

    &__header  {
        position: relative;
        padding-bottom: 15px;
        border-bottom: 1px solid #e1e1e1;
        margin-bottom: 15px;

    }

    &__close-btn {
        background-color: #fff;
        border: none;

        &:focus {
            outline: none;
        }

    }
    &__close-btn-icon {
        fill: #656875;
        width: 13px;
        height: 13px;
    }

    &__name {
        height: 100%;
    }

    &__input-name {
        border: none;
        background-color: #fff;
        padding: 5px 0;
        font-size: 17px;
        color: #656875;
        width: 100%;
        height: 100%;

        &:focus {
            outline: none;
        }
    }

    &__nav {
        display: flex;
        border-bottom: 1px solid #e1e1e1;
        padding: 15px 0;
        margin-bottom: 20px;
    }

    &__nav-item {
        margin-right: 20px;
        color: #2164b1;
        font-size: 17px;
        &:last-child {
            margin-right: 0px;
        }
    }



    &__row {
        display: flex;
        margin-bottom: 10px;
        position: relative;
        align-items: center;
    }
    &__options-row {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 10px;
        position: relative;
        align-items: center;
    }

    &__row_location {
        width: 100%;
    }

    &__row-item {
        margin-right: 15px;

        &:last-child {
            margin-right: 0px;
        }
    }


    &__field {
        padding: 10px;
        background: #f0efef;
        border: none;
        font-size: 14px;
        color: #656875;
        height: 35px;
    }
    &__conf {
        display: inline-block;
        margin-bottom: 10px;
    }

    &__row {
        display: flex;
        margin-bottom: 10px;
        position: relative;
        align-items: center;
    }

    &__row_location {
        width: 100%;
    }

    &__row-item {
        margin-right: 15px;

        &:last-child {
            margin-right: 0px;
        }
    }
    &__options-checkbox-item {
        margin-bottom: 15px;
        margin-right: 25px;
        .checkbox__title {
            font-size: 14px;
            color: #656875;
        }

    }

    &__options-title {
        font-size: 14px;
        color: #a5a9b9;
    }

    &__input {
        width: 100%;
    }

    &__guest-title {
        font-size: 14px;
        color: #656875;
        margin-bottom: 10px;
    }

    &__btn-save {
        background-color: #2164b1;
        color: #fff;

        &:hover {
            background-color: #195191;
            color: #fff; 
        }
    }

    &__icon {
        position: absolute;
        left: -25px;
        top: 13px;
    }

    &__close{
        position: absolute;
        left: -40px;
        top: 5px;
    }

    &__desk {
        background: #f0efef;

        .ck-toolbar {
            background: #f0efef;
        }
    }

    &__input {
        width: 100%;
    }

    &__guest-title {
        font-size: 14px;
        color: #656875;
        margin-bottom: 10px;
    }

    &__btn-save {
        background-color: #2164b1;
        color: #fff;

        &:hover {
            background-color: #195191;
            color: #fff; 
        }
    }

    &__icon {
        position: absolute;
        left: -25px;
        top: 13px;
    }

    &__close{
        position: absolute;
        left: -40px;
        top: 5px;
    }

    &__options-title {
        margin-right: 10px;
    }
}
</style>