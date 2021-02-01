<template lang="pug">
.calendar-event-popup-fullscreen__event-content
	.calendar-event-popup-fullscreen__header
		.calendar-event-popup-fullscreen__name
		input.calendar-event-popup-fullscreen__input-name(
			v-model="eventName"
			placeholder="Добавьте название"
			)
	.calendar-event-popup-fullscreen__row
		.calendar-event-popup-fullscreen__row-item
			input.btn.text-left.calendar-event-popup-fullscreen__field(
				ref="inputDate" 
				type='text',
				:value='date',  
				onclick='BX.calendar({node: this, field: this, bTime: false});'
				@change="changingDate()"
			)
		.calendar-event-popup-fullscreen__row-item
			time-select(
				:timeStart="`${hourStart}:${minutesStart}`"
				:timeEnd="`${hourEnd}:${minutesEnd}`"
				@changeTimeStart="changeTimeStart($event)"
				@changeTimeEnd="changeTimeEnd($event)"
			)
		.calendar-event-popup-fullscreen__row-item
			.calendar-event-popup-fullscreen__field.calendar-event-popup-fullscreen__field_timezone
				.dropdown
				button.btn.w-100.text-left.d-flex.justify-content-between.align-items-center.calendar-event-popup-fullscreen__field(disabled type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
					| {{selectedTimezone.label}}
					i.fas.fa-chevron-down
				.dropdown-menu(aria-labelledby='dropdownMenuButton')
					button.dropdown-item(
					v-for="timeZone in timeZonesForSelect"
					@click="selectedTimezone = timeZone"
					) {{timeZone.label}}
		.calendar-event-popup-fullscreen__row-item.ml-4
			label.checkbox.text-muted
				input.checkbox__input(type='checkbox' v-model="public")
				.checkbox__title Показывать всем
	
	.calendar-event-popup-fullscreen__nav
		.calendar-event-popup-fullscreen__nav-item Опции
		.calendar-event-popup-fullscreen__options
			event-options-services(:servicesList="services" :eventServices="selectedServices" @changeServices="changeServices($event)")
			.calendar-event-popup-fullscreen__options-row.flex-column
				.calendar-event-popup-fullscreen__options-title.mb-2 Ответственный
				.v-select-custom.v-select-custom-left-105
					vSelect(
						v-model="selectedResponsiblePerson" :options="responsiblePerson")
			.calendar-event-popup-fullscreen__options-row
			.calendar-event-popup-fullscreen__options-title.mr-2 Статус:
			.text-black {{status.value}}
			.calendar-event-popup-fullscreen__options-row.align-items-center
				.calendar-event-popup-fullscreen__options-title Календарь
				.calendar-event-popup-fullscreen__options-item
					calendars-select(
						@changeCalendar="changeCalendar($event)"
						:selectedCalendar="calendar")
			.calendar-event-popup-fullscreen__options-row.align-items-center
				.calendar-event-popup-fullscreen__options-title Ссылка на страницу мероприятий
				.calendar-event-popup-fullscreen__options-item
					input.form-control.form-control-sm(type="text" v-model="link")
			.calendar-event-popup-fullscreen__options-row
				textarea.form-control.calendar-event-popup-fullscreen__textarea(
					placeholder="Описание"
					v-model="eventDesc")
</template>

<script>
import calendarsSelect from "../calendars-select.vue";
import vSelect from "../v-select/components/Select.vue";
import { mapMutations, mapState, mapGetters, mapActions } from "vuex";
import moment from "moment-timezone";
import timeSelect from "../time-select.vue";
import eventOptionsServices from "../event-popup/event-options-services.vue"
import { HOURS, MINUTES } from "../const.js";


export default {
	data() {
		return {
			info: {
				name: '',
				desc: '',
				status: '',
				dateStart: '',
				dateEnd: '',
				calendar: {},
				services: [],
				responsiblePerson: [],
				timezone: {},
				link: {},
				public: false,
			},
			dateByStrings: {
				hourStart: "",
				hourEnd: "",
				minutesStart: "",
				minutesEnd: "",
				date: ""
			},
			tabs: {
				event: {
					name: 'Событие',
					show: true
				},
				preview: {
					name: 'Анонс',
					show: false
				},
				participants: {
					name: 'Участники',
					show: false
				},
				agendas: {
					name: 'Повестка',
					show: false
				},
				hotels: {
					name: 'Гостиницы',
					show: false
				},
				reports: {
					name: 'Отчетность',
					show: false
				}
			},
			lists: {
				services: [],
				timezones: [],
				persons: [],
				hours: [],
				minutes: []
			}
		};
	},
  methods: {
    ...mapMutations([
      "closePopapEventFullScreen",
      "resetStateCreatedEvent",
      "closePopupCreatedEvent",
      "updateEvent"
    ]),
    ...mapActions(["sendEvent"]),
    changingDate() {
      this.date = this.$refs.inputDate.value;
    },
    changeTab(selectTab) {
      for(const tab in this.tabs) {
        if (tab === selectTab) {
          this.tabs[tab].show = true;
        } else {
          this.tabs[tab].show = false;
        }
      }
    },
    saveEvent() {
      if(!this.eventName) {
        return;
      }
      this.updateEvent({
        dateStart: this.dateStart,
        dateEnd: this.dateEnd,
        name: this.eventName,
        desc: this.eventDesc,
        attendees: this.selectedParticipant.map(el => {
          return { code: el.code, roles: el.roles };
        }),
        template: this.selectedTemplates,
        calendarId: this.calendar.id,
        timeZone: this.getCurrentTimeZone.id,
        preview: this.preview,
        status: this.status,
        services: this.selectedServices,
        agendas: this.agendas,
        registration: this.registration,
        hotels: this.hotels,
        link: this.link,
        public: this.public ? 1 : 0
      });
      this.sendEvent();
    },
    onSearch(search, loading) {
      loading(true);
      this.search(loading, search, this);
    },
    search: (loading, search, vm) => {
      $.ajax({
        type: "POST",
        url: "./index.php",
        data: {
          ajax: "Y",
          action: "search-users",
          name: `${search}`
        },
        success: function(response) {
          vm.optionsGuest = response.data;
          loading(false);
        }
      });
    },

    changeTimeStart(data) {
      this.hourStart = data.split(':')[0];
      this.minutesStart = data.split(':')[1];
    },
    changeTimeEnd(data) {
      this.hourEnd = data.split(':')[0];
      this.minutesEnd = data.split(':')[1];
    },
    requestCalendarServices() {
      var vm = this;
      $.ajax({
          type: "POST",
          url: "./index.php",
          data: {
              "ajax": "Y",
              "action": "get-services",
              "id": this.calendar.id
          },
          success: function(response) {
              if(response.success && response.data) {
                vm.services = response.data
              } else {
                vm.services = [];
              }
              
          }
      });
    },
    changeCalendar(calendar) {
      this.calendar = calendar;
      this.requestCalendarServices();
    },
    changeServices(services) {
        this.selectedServices = services;
    },
  },

  computed: {
    ...mapState({
      createdEvent: state => state.calendar.createdEvent,
      calendars: state => state.calendar.calendars,
      timeZones: state => state.calendar.timeZones,
      event: state => state.event.data,
      userInfo: state => state.calendar.userInfo,
      savingEvent: state => state.calendar.loadings.savingEvent
    }),
    ...mapGetters([
      "tagsPersonsForSelect",
      "tagsSubjectsForSelect",
      "tagsAreaOfInfluenceForSelect",
      "getCalendar",
      "timeZone",
      "getTimeZoneById",
      "getCurrentTimeZone",
      "getStatusByExternalId"
    ]),

    dateStartMoment() {
      return moment.tz(
        this.event.dateStart * 1000,
        this.getCurrentTimeZone.name
      );
    },
    dateEndMoment() {
      return moment.tz(this.event.dateEnd * 1000, this.getCurrentTimeZone.name);
    },
    timeZonesForSelect() {
      return this.timeZones.map(timezone => {
        return {
          label: timezone.xmlId,
          code: timezone.id
        };
      });
    },
    dateForMoment() {
      return this.date
        .split(".")
        .reverse()
        .join("-");
    },
    selectedTimezoneForMoment() {
      return this.timeZones.filter(el => {
        return el.id === this.selectedTimezone.code;
      })[0].name;
    },
    dateStart() {
      return moment
        .tz(
          `${this.dateForMoment} ${this.hourStart}:${this.minutesStart}:00`,
          `${this.selectedTimezoneForMoment}`
        )
        .unix();
    },
    dateEnd() {
      return moment
        .tz(
          `${this.dateForMoment} ${this.hourEnd}:${this.minutesEnd}:00`,
          `${this.selectedTimezoneForMoment}`
        )
        .unix();
    },
  },
  components: {
    calendarsSelect,
    vSelect,
    dropdownTime,
    timeSelect,
    eventOptionsServices
  },
  created() {
    this.lists.hours = HOURS;
		this.lists.minutes = MINUTES;
		
		this.dateByStrings.hourStart = this.dateStartMoment.format("HH");
    this.dateByStrings.minutesStart = this.dateStartMoment.format("mm");
    this.dateByStrings.hourEnd = this.dateEndMoment.format("HH");
    this.dateByStrings.minutesEnd = this.dateEndMoment.format("mm");
		this.dateByStrings.date = this.dateStartMoment.format("DD.MM.YYYY");
		
    this.info.name = this.event.name;
    this.info.desc = this.event.desc;
    this.info.link = !this.event.link ? '' : this.event.link;
    this.info.public = !!this.event.public;

    
    if (!this.event.id) {
      this.selectedTimezone = {
        code: this.getCurrentTimeZone.id,
        label: this.getCurrentTimeZone.xmlId
      };
      this.calendar = this.calendars[0];
      this.status = this.getStatusByExternalId("application");
      this.selectedResponsiblePerson = this.userInfo[0];

    } else {
      this.selectedTimezone = this.timeZonesForSelect.filter(
        el => el.code === this.event.timeZone
      )[0];
      this.calendar = this.getCalendar(this.event.calendarId);
      this.status = !this.event.status ? this.getStatusByExternalId("application") : this.event.status;


      

      this.selectedServices = [...this.event.products];
      this.selectedResponsiblePerson = this.event.responsiblePerson;
      this.agendas = this.event.agendas;

    this.selectedTimezone = {
        code: this.getCurrentTimeZone.id,
        label: this.getCurrentTimeZone.xmlId
      };
  },
  mounted() {
    this.requestCalendarServices();
  }
};
</script>

<style lang="scss">
.calendar-event-popup-fullscreen__timezone {
  .vs__dropdown-toggle {
    border: none;
    background-color: #f0efef;
  }

  .v-select {
    // background: #f0efef;
    font-size: 14px;
    color: #656875;
    height: 35px;
  }
}

// .vs__dropdown-toggle {
//   border: none;
// }

.vs__hidden {
  max-height: 300px;
  overflow: auto;
  display: flex;
  flex-basis: 100%;
  flex-grow: 1;
  flex-wrap: wrap;
  position: absolute;
  background: #fff;
  z-index: 100;
  padding: 5px;
  border-radius: 3px;
  width: 100%;
  border: 1px solid rgba(60, 60, 60, 0.26);
  border-top: none;
}

.vs__button__collapse {
  position: absolute;
  top: 0;
  right: 0;
}

.v-select-custom .vs__button__collapse {
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  border: 1px solid rgba(60, 60, 60, 0.26);
  border-radius: 4px;
  color: #333;
  line-height: 1.4;
  margin: 4px 2px 0px 2px;
  padding: 0 0.25em;
  z-index: 10;
}

.v-select-custom .vs__actions .vs__open-indicator {
  display: none;
}
.v-select-custom .vs__actions {
  position: absolute;
  top: -32px;
  left: 85px;
  cursor: pointer;
}

.v-select-custom-left-105 .vs__actions {
  left: 105px;
}
.v-select-custom-left-65 .vs__actions {
  left: 65px;
}
.v-select-custom-left-80 .vs__actions {
  left: 80px;
}
.v-select-custom .vs__actions::after {
  content: "+ Добавить";
  color: #4162a9;
  display: block;
}
.v-select-custom .vs__selected_hidden {
  display: none;
}

.calendar-popup-event__file {
  display: flex;
  position: relative;
  align-items: center;
}
.calendar-popup-event__file-input {
  opacity: 0;
  z-index: -10;
  height: 0;
  width: 0;
}
.calendar-popup-event__file-img {
  max-height: 40px;
  width: auto;
  margin-right: 10px;
}
.calendar-popup-event__file-title {
  color: #4162a9;
}
.calendar-popup-event__file-btn {
  background: none;
  border: none;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  color: #656875;
  font-size: 12px;
  &:focus {
    outline: none;
  }
}
</style>