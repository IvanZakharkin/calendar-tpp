<template lang="pug">
	.calendar-event-popup-fullscreen
		.row.calendar-event-popup-fullscreen__header
			.col-8
				.calendar-event-popup-fullscreen__close
					button.calendar-event-popup-fullscreen__close-btn(@click="closePopapEventEdit()")
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
			"showPopapEventFullScreen",
			"closePopapEventEdit",
	  ]),
	//   closePopup() {
	// 	  this.closePopapEventFullScreen();
	//   },
	//   saveEvent() {
  //     (this.eventName = ""),
  //       this.addCreatedEventToEvents();
  //     this.resetStateCreatedEvent();
	//   this.closePopupCreatedEvent();
	//   this.closePopapEventFullScreen()
	// },
	changingDate() {
      this.refDate = this.$refs.inputDate.value;
    },
    changeTimeStart() {

    },
    changeTimeEnd() {
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
      editEvent: state => state.calendar.editEvent,
      calendars: state => state.calendar.calendars
	}),
	...mapGetters([
      "getDataStartCreatedEvent",
			"getDataEndCreatedEvent",
			"getCalendar",
			"timeZone",
			"getEvent"
		]),
		event() {
			return this.getEvent(this.editEvent.id);
		},
		dateStartEventSec() {
			return this.event.dateStart;
		},
		dateEndEventSec() {
			return this.event.dateEnd;
		},
		nameEvent() {
			return this.event.name;
		},
		deskEvent() {
			return this.event.desk;
		},
		calendarEvent() {
			return this.event.calendarID;
		}
  },
  components: {
	calendarsSelect,
	VueEditor
  },
  created() {
	  // this.timeStart = this.timeStartCreatedEvent,
    //   this.timeEnd = this.timeEndCreatedEvent,
	  // this.refDate = this.startValueInputDate
		// this.eventName = this.createdEvent.name
		// this.selectedTimezone = this.timezones.filter(timezone => {
		// 	return Number(timezone.code) === this.timeZone;
		// })[0]
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
</style>