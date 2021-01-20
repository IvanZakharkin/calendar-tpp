<template lang="pug">
  .calendar-event-popup-fullscreen
    .calendar-event-popup-fullscreen__close
      button.calendar-event-popup-fullscreen__close-btn(@click="closePopup")
        i.fas.fa-times
    .calendar-popup-event__choice-type
      button.btn.calendar-popup-event__choice-type-btn(
        :class="{'calendar-popup-event__choice-type-btn_active': showContentEvent}"
        @click="showContentEvent = true; showContentPreview = false"
      ) Событие
      button.btn.calendar-popup-event__choice-type-btn(
        :class="{'calendar-popup-event__choice-type-btn_active': showContentPreview}"
        @click="showContentEvent = false; showContentPreview = true"
      ) Анонс
      button.btn.calendar-popup-event__choice-type-btn(
      ) Участники
    .calendar-event-popup-fullscreen__event-content(v-if="showContentEvent")
      .row.calendar-event-popup-fullscreen__header
        .col-12
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
        .calendar-event-popup-fullscreen__row-item.d-flex
          .calendar-event-popup-fullscreen__field.d-flex
            dropdown-time(
              :times="hours"
              :currentTime="hourStart"
              @changeTime="hourStart = $event"
            )
            .py-2 :
            dropdown-time(
              :times="minutes"
              :currentTime="minutesStart"
              @changeTime="minutesStart = $event"
            )
          .p-2 -
          .calendar-event-popup-fullscreen__field.d-flex
            dropdown-time(
              :times="hours"
              :currentTime="hourEnd"
              @changeTime="hourEnd = $event"
            )
            .py-2 :
            dropdown-time(
              :times="minutes"
              :currentTime="minutesEnd"
              @changeTime="minutesEnd = $event"
            )
        .calendar-event-popup-fullscreen__row-item
          .calendar-event-popup-fullscreen__field.calendar-event-popup-fullscreen__field_timezone
            .dropdown
              button.btn.w-100.text-left.d-flex.justify-content-between.align-items-center.calendar-event-popup-fullscreen__field(type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
                | {{selectedTimezone.label}}
                i.fas.fa-chevron-down
              .dropdown-menu(aria-labelledby='dropdownMenuButton')
                button.dropdown-item(
                  v-for="timeZone in timeZonesForSelect"
                  @click="selectedTimezone = timeZone"
                  ) {{timeZone.label}}
            //- v-select(v-model="selectedTimezone" :options="timeZonesForSelect" disabled)
      //- .row
      //-   .col-8
      .calendar-event-popup-fullscreen__nav
        .calendar-event-popup-fullscreen__nav-item Опции
      .calendar-event-popup-fullscreen__options
        .calendar-event-popup-fullscreen__options-row
          .calendar-event-popup-fullscreen__options-checkbox-item(v-for="service in services")
            label.checkbox
              input.checkbox__input(type="checkbox" :checked="isServiceChecked(service)" @change="checkService(service)")
              .checkbox__title {{service.value}}
        

        .calendar-event-popup-fullscreen__options-row.flex-column
            .calendar-event-popup-fullscreen__options-title.mb-2 Ответсвенный
            .v-select-custom.v-select-custom-left-105
              vSelect(
                v-model="selectedResponsiblePerson" :options="responsiblePerson"
              )
        .calendar-event-popup-fullscreen__options-row.flex-column
          .calendar-event-popup-fullscreen__options-title.mb-2 Участники
          .v-select-custom.v-select-custom-left-80
            vSelect(multiple v-model="selectedGuest" :options="optionsGuest" @search="onSearch")
        .calendar-event-popup-fullscreen__options-row.flex-column
            .calendar-event-popup-fullscreen__options-title.mb-2 Шаблон
            .v-select-custom.v-select-custom-left-65
              v-select(v-model="selectedGroups" :options="templatesForSelect")
        
        .calendar-event-popup-fullscreen__options-row
          .calendar-event-popup-fullscreen__options-title.mr-2 Статус:
          .text-black {{status.value}}

        .calendar-event-popup-fullscreen__options-row.align-items-center
          .calendar-event-popup-fullscreen__options-title Календарь
          .calendar-event-popup-fullscreen__options-item
            calendars-select(
              @changeCalendar="calendar = $event"
              :selectedCalendar="calendar"
              
            )

        .calendar-event-popup-fullscreen__options-row
          textarea.form-control.calendar-event-popup-fullscreen__textarea(
            placeholder="Описание"
            v-model="eventDesc"
          )
      .text-right
        button.btn.calendar-event-popup-fullscreen__btn-save(
          @click="saveEvent()"
        ) Сохранить
    event-preview(
      v-if="showContentPreview"
      @savePreview="savePreview($event)"
      :previewData="preview"
      :date="date"
    )
</template>

<script>
import calendarsSelect from "./calendars-select.vue";
import vSelect from "./v-select/components/Select.vue";
import { mapMutations, mapState, mapGetters, mapActions } from "vuex";
import moment from "moment-timezone";
import dropdownTime from "./dropdown-time.vue";
import eventPreview from "./event-preview.vue";
import { HOURS, MINUTES } from "./const.js";
import _ from "lodash";

export default {
  data() {
    return {
      eventDesc: "",
      eventName: "",
      timeStart: "",
      timeEnd: "",
      hourStart: "",
      hourEnd: "",
      minutesStart: "",
      minutesEnd: "",
      status: {},
      date: "",
      preview: {
        // name: "",
        // desc: "",
        // img: "",
        // tagsAreaOfInfluence: [],
        // tagsPersons: [],
        // tagsSubjects: []
      },
      calendar: {},
      selectedTimezone: {},
      attendees: [],
      selectedGroups: [],
      templates: [],
      selectedServices: [],
      optionsGuest: [],
      selectedGuest: [],
      selectedResponsiblePerson: {
        lable: "",
        code: ""
      },

      showContentEvent: true,
      showContentPreview: false,
      previewEdit: false,
      previewView: false,
      fileName: "Загрузите изображение",
      showImagePreview: false,
      imagePreview: "",
    };
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
      "updateEvent"
    ]),
    ...mapActions(["sendEvent"]),
    savePreview(previewData) {
      this.preview = previewData;
    },
    checkService(service) {
      if (event.target.checked) {
        this.selectedServices.push(service.id);
      } else {
        this.selectedServices = this.selectedServices.filter(
          el => el != service.id
        );
      }
    },
    isServiceChecked(service) {
      return this.selectedServices.includes(Number(service.id));
    },
    closePopup() {
      this.resetStateCreatedEvent();
      this.closePopapEventFullScreen();
    },
    saveEvent() {
      this.updateEvent({
        dateStart: this.dateStart,
        dateEnd: this.dateEnd,
        name: this.eventName,
        desc: this.eventDesc,
        attendees: this.selectedGuest.map(el => el.code),
        template: this.selectedGroups,
        calendarId: this.calendar.id,
        timeZone: this.getCurrentTimeZone.id,
        preview: this.preview,
        status: this.status,
        services: this.selectedServices
      });
      this.sendEvent();
      this.resetStateCreatedEvent();
      // this.closePopupCreatedEvent();
      this.closePopapEventFullScreen();
    },
    // selectCalendar(calendar) {
    //   this.updateCreatedEvent({
    //     state: "calendarID",
    //     value: calendar.id
    //   });
    // },
    handleFileUpload() {
      this.preview.img = this.$refs.file.files[0];
      this.fileName = this.preview.img.name;
      let reader = new FileReader();
      reader.addEventListener(
        "load",
        function() {
          this.showImagePreview = true;
          this.imagePreview = reader.result;
        }.bind(this),
        false
      );
      if (this.preview.img) {
        if (/\.(jpe?g|png|gif)$/i.test(this.preview.img.name)) {
          reader.readAsDataURL(this.preview.img);
        }
      }
    },
    deleteImagePreview() {
      this.showImagePreview = false;
      this.fileName = "Загрузить изображение";
      this.imagePreview = {};
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
    getTemplates() {
      const vm = this;
      $.ajax({
        type: "POST",
        url: "./index.php",
        data: {
          ajax: "Y",
          action: "get-templates"
        },
        success: function(response) {
          vm.templates = response.data;
        }
      });
    },
  },

  computed: {
    ...mapState({
      createdEvent: state => state.calendar.createdEvent,
      calendars: state => state.calendar.calendars,
      timeZones: state => state.calendar.timeZones,
      services: state => state.calendar.services,
      event: state => state.calendar.event,
      userInfo: state => state.calendar.userInfo
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
    templatesForSelect() {
      return this.templates.map(el => {
        return {
          label: el.name,
          label: el.id
        };
      });
    },
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
    templatesForSelect() {
      return this.templates.map(el => {
        return {
          label: el.name,
          label: el.id
        };
      });
    },
    dataForPreview() {
      const arrData = this.date.split(".");
      const numMonth = Number(arrData[1] - 1);
      return `${arrData[0]} ${MONTH[numMonth]} ${arrData[2]}`;
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
    allTags() {
      return [
        ...this.preview.tagsAreaOfInfluence,
        ...this.preview.tagsPersons,
        ...this.preview.tagsSubjects
      ];
    }
  },
  components: {
    calendarsSelect,
    vSelect,
    dropdownTime,
    eventPreview
  },
  created() {
    this.hours = HOURS;
    this.minutes = MINUTES;

    // если событие создается 
    if(!this.event.id) {
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
      this.status = this.event.status;

      this.selectedGuest = this.event.attendees;
      this.selectedServices = this.event.services;
      this.selectedResponsiblePerson = this.event.responsiblePerson;
      
      if(!$.isEmptyObject(this.event.preview)) {
        this.preview.name = this.event.preview.name;
        this.preview.desc = this.event.preview.desc;
        if(this.event.preview.tagsAreaOfInfluence) {
          this.preview.tagsAreaOfInfluence = this.event.preview.tagsAreaOfInfluence;
        } else {
          this.preview.tagsAreaOfInfluence = [];
        }
        if(this.event.preview.tagsPersons) {
          this.preview.tagsPersons = this.event.preview.tagsPersons;
        } else {
          this.preview.tagsPersons = [];
        }
        if(this.event.preview.tagsPersons) {
          this.preview.tagsSubjects = this.event.preview.tagsSubjects;
        } else {
          this.preview.tagsSubjects = [];
        };
        this.preview.img = this.event.preview.img;
        
      }
    };


    
    this.hourStart = this.dateStartMoment.format("HH");
    this.minutesStart = this.dateStartMoment.format("mm");
    this.hourEnd = this.dateEndMoment.format("HH");
    this.minutesEnd = this.dateEndMoment.format("mm");
    this.date = this.dateStartMoment.format("DD.MM.YYYY");
    this.eventName = this.event.name;
    this.eventDesc = this.event.desc;
    // this.preview = this.event.preview;

    this.getTemplates();
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
  top: -28px;
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
}
.calendar-popup-event__file-title {
  color: #4162a9;
  margin-left: 10px;
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