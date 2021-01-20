<template lang="pug">
        //- .modal#calendar-edit-event-popup.popup-fullscreen
        //-   .modal-dialog.popup-fullscreen-dialog
        //-     .modal-content.popup-fullscreen-content
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
          .calendar-event-popup-fullscreen__event-content(v-if="showContentEvent")
            .row.calendar-event-popup-fullscreen__header
              .col-8
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
                  :value='date',  
                  onclick='BX.calendar({node: this, field: this, bTime: false});'
                  @change="changingDate()"
                )
              .calendar-event-popup-fullscreen__row-item.d-flex
                .dropdown.dropdown-time
                  button.btn.calendar-event-popup-fullscreen__field(type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
                    | {{hourStart}}
                  .dropdown-menu(aria-labelledby='dropdownMenuButton')
                    button.dropdown-item(
                      v-for="time in hours"
                      @click="hourStart = time"
                    ) {{time}}
                .calendar-event-popup-fullscreen__field.px-0 :
                .dropdown.dropdown-time
                  button.btn.calendar-event-popup-fullscreen__field(type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
                    | {{minutesStart}}
                  .dropdown-menu(aria-labelledby='dropdownMenuButton')
                    button.dropdown-item(
                      v-for="time in minutes"
                      @click="minutesStart = time"
                    ) {{time}}
              .calendar-event-popup-fullscreen__row-item -
              .calendar-event-popup-fullscreen__row-item.d-flex
                .dropdown.dropdown-time
                  button.btn.calendar-event-popup-fullscreen__field(type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
                    | {{hourEnd}}
                  .dropdown-menu(aria-labelledby='dropdownMenuButton')
                    button.dropdown-item(
                      v-for="time in hours"
                      @click="hourEnd = time"
                    ) {{time}}
                .calendar-event-popup-fullscreen__field.px-0 :
                .dropdown.dropdown-time
                  button.btn.calendar-event-popup-fullscreen__field(type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
                    | {{minutesEnd}}
                  .dropdown-menu(aria-labelledby='dropdownMenuButton')
                    button.dropdown-item(
                      v-for="time in minutes"
                      @click="minutesEnd = time"
                    ) {{time}}
              .calendar-event-popup-fullscreen__row-item
                .calendar-event-popup-fullscreen__timezone
                  v-select(v-model="selectedTimezone" :options="timeZonesForSelect" disabled)
            .row
              .col-8
                .calendar-event-popup-fullscreen__nav
                  .calendar-event-popup-fullscreen__nav-item Опции
                .calendar-event-popup-fullscreen__options
                  .calendar-event-popup-fullscreen__options-row
                    .calendar-event-popup-fullscreen__options-checkbox-item(v-for="service in services")
                      label.checkbox
                        input.checkbox__input(type="checkbox" :checked="isServiceChecked(service)" @change="checkService(service)")
                        .checkbox__title {{service.value}}
                  .calendar-event-popup-fullscreen__options-row.flex-column
                      .mb-2 Ответсвенный
                      .text-primary {{selectedResponsiblePerson.label}}
                      //- .v-select-custom
                      //-   vSelect(
                      //-     v-model="selectedResponsiblePerson" :options="responsiblePerson"
                      //-   )
                  .calendar-event-popup-fullscreen__options-row.flex-column
                    .mb-2 Участники
                    .v-select-custom
                      vSelect(
                        multiple v-model="selectedGuest" :options="optionsGuest" @search="onSearch"
                      )
                  .calendar-event-popup-fullscreen__options-row.flex-column
                    .calendar-popup-event__parameter
                      .mb-2 Шаблон
                      .v-select-custom
                        v-select(v-model="selectedGroups" :options="templatesForSelect")
                  .calendar-event-popup-fullscreen__options-row
                      .mr-2 Статус:
                      .text-primary {{editEvent.status.value}}
                  .calendar-event-popup-fullscreen__options-row
                    .calendar-event-popup-fullscreen__options-title Календарь
                    .calendar-event-popup-fullscreen__options-item
                      .dropdown.calendars-select
                        button.calendars-select__selected-item(type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
                            .calendars-select__calendar
                              .calendars-select__calendar-circle(
                                :style="{backgroundColor: selectedCalendar.color}"
                              )
                              .calendars-select__calendar-title {{selectedCalendar.name}}
                                button.calendars-select__calendar-location(
                                  @click="openMap()"
                                  ref="location"
                                )
                                  i.fas.fa-map-marker-alt
                              .calendars-select__icon
                                i.fas.fa-sort-down
                        .dropdown-menu(aria-labelledby='dropdownMenuButton')
                          button.calendars-select__dropdown-item(
                            v-for="calendar in calendars"
                            @click="changeCalendar(calendar)"
                          )
                            .calendars-select__calendar
                              .calendars-select__calendar-circle(
                                :style="{ backgroundColor: calendar.color}"
                              )
                              .calendars-select__calendar-title {{calendar.name}}
                      
                  .calendar-event-popup-fullscreen__options-row
                    textarea.calendar-event-popup-fullscreen__textarea(
                      placeholder="Описание"
                      v-model="eventDesc"
                    )
          .calendar-event-popup-fullscreen__preview(v-if="showContentPreview")
            .calendar-popup-event__preview(v-if="showContentPreview")
              .btn.calendar-page__btn-create(v-if="!previewEdit && !previewView" @click="previewEdit = true; previewName = eventName") + Создать анонс
              .calendar-popup-event__preview-edit(v-if="previewEdit")
                .calendar-popup-event__preview-date.mb-2 {{dataForPreview}}
                .calendar-popup-event__parameter
                  input.calendar-popup-event__name-input(
                    placeholder='Название'
                    v-model="preview.name"
                  )
                .calendar-popup-event__parameter
                  input.calendar-popup-event__input-desk.mb-2(
                    placeholder='Описание'
                    v-model="preview.desc"
                  )
                .calendar-popup-event__parameter
                  .mb-2 Изображение
                  label.calendar-popup-event__file
                    input.calendar-popup-event__file-input(
                      type="file"
                      ref="file"
                      @change="handleFileUpload()"
                      )
                    img.calendar-popup-event__file-img(
                      :src="imagePreview"
                      v-show="showImagePreview"
                    )
                    .calendar-popup-event__file-title {{fileName}}
                    button.calendar-popup-event__file-btn(
                      @click="deleteImagePreview()"
                      v-if="preview.img"
                    )
                      i.fas.fa-times
                .card.mb-3
                  .card-body
                    .calendar-popup-event__parameter.flex-column
                      .mb-2 Область влияния
                      .v-select-custom.v-select-custom-left-140
                        vSelect(
                          multiple v-model="preview.tagsAreaOfInfluence" :options="tagsAreaOfInfluenceForSelect"
                        )
                    .calendar-popup-event__parameter
                      .mb-2 Важные персоны
                      .v-select-custom.v-select-custom-left-140
                        vSelect(
                          multiple v-model="preview.tagsPersons" :options="tagsPersonsForSelect"
                        )
                    .calendar-popup-event__parameter
                      .mb-2 Тематики
                      .v-select-custom.v-select-custom-left-80
                        vSelect(
                          multiple v-model="preview.tagsSubjects" :options="tagsSubjectsForSelect"
                        )
                .calendar-popup-event__btns
                  button.btn.calendar-popup-event__btn.calendar-popup-event__btn-outline.mr-3(
                    @click="resetPreviewData(); previewEdit=false"
                  ) Отменить
                  button.btn.calendar-popup-event__btn.calendar-popup-event__btn_save(
                    @click="previewView=true; previewEdit=false"
                  ) Сохранить
            .calendar-popup-event__preview-view(v-if="previewView")
              .card.mb-4.calendar__event
                .text-right.p-2.calendar__event-btn
                  button.btn.calendar-popup-event-detail__btn.mr-2(data-v-3fd6c9ce='', type='button', data-dismiss='modal' @click="resetPreviewData(); previewView=false")
                    i.far.fa-trash-alt
                  button.btn.calendar-popup-event-detail__btn(data-v-3fd6c9ce='', type='button' @click="previewView=false; previewEdit=true")
                    i.fas.fa-pencil-alt
                .card-body.calendar__event-body
                  .calendar__event-date {{dataForPreview}}
                  .calendar__event-title {{preview.name}}
                  .calendar__event-pic(v-show="showImagePreview")
                    img.calendar__event-img(:src="imagePreview")
                  .calendar__event-tags
                    ul.tags
                      li.tags__item(v-for="tag in allTags")
                        a.tags__link(href="#") {{tag}}
</template>

<script>
import calendarsSelect from "./calendars-select.vue";
import vSelect from "./v-select/components/Select.vue";
import { mapMutations, mapState, mapGetters, mapActions } from "vuex";
import moment from "moment-timezone";
const HOURS = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24"
];
const MINUTES = ["00", "15", "30", "45"];

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

      date: "",
      preview: {
        name: "",
        desc: "",
        img: "",
        tagsAreaOfInfluence: [],
        tagsPersons: [],
        tagsSubjects: []
      },
      selectedCalendar: {},
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
      imagePreview: ""
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
      "closePopapEventEdit"
    ]),
    ...mapActions(["sendEventEdit"]),
    changeCalendar(calendar) {
      this.selectedCalendar = calendar;
    },
    closePopup() {
      //   this.resetStateCreatedEvent();
      // this.closePopapEventFullScreen();
      $("#calendar-edit-event-popup").modal("hide");
      this.closePopapEventEdit();
    },
    saveEvent() {
      const event = this.newDataEvent;
      // this.sendEventEdit(JSON.stringify(event));
      this.sendEventEdit(event);
      $("#calendar-edit-event-popup").modal("hide");
      this.closePopapEventEdit();
    },
    resetPreviewData() {
      this.preview.name = "";
      this.preview.desc = "";
      this.preview.img = "";
      this.preview.tagsAreaOfInfluence = [];
      this.preview.tagsPersons = [];
      this.preview.tagsSubjects = [];
    },
    changingDate() {
      this.date = this.$refs.inputDate.value;
    },
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
      this.fileName = "Загрузите изображение";
      this.imagePreview = {};
      this.preview.img = "";
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
    }
  },
  computed: {
    ...mapState({
      editEvent: state => state.calendar.editEvent,
      calendars: state => state.calendar.calendars,
      timeZones: state => state.calendar.timeZones,
      tagsAreaOfInfluence: state => state.calendar.tagsAreaOfInfluence,
      tagsPersons: state => state.calendar.tagsPersons,
      tagsSubjects: state => state.calendar.tagsSubjects,
      services: state => state.calendar.services
    }),
    ...mapGetters([
      "tagsPersonsForSelect",
      "tagsSubjectsForSelect",
      "tagsAreaOfInfluenceForSelect"
    ]),
    templatesForSelect() {
      return this.templates.map(el => {
        return {
          label: el.name,
          label: el.id
        };
      });
    },
    hours() {
      return HOURS;
    },
    minutes() {
      return MINUTES;
    },
    allTags() {
      return [
        ...this.preview.tagsAreaOfInfluence,
        ...this.preview.tagsPersons,
        ...this.preview.tagsSubjects
      ].map(el => el.label);
    },
    ...mapGetters([
      "getDataStartCreatedEvent",
      "getDataEndCreatedEvent",
      "getCalendar",
      "timeZone",
      "getTimeZoneById"
    ]),
    dataForPreview() {
      const month = [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря"
      ];
      const arrData = this.date.split(".");
      const numMonth = Number(arrData[1] - 1);
      return `${arrData[0]} ${month[numMonth]} ${arrData[2]}`;
    },
    timeZoneEvent() {
      return this.getTimeZoneById(this.editEvent.timeZone);
    },
    dateStartMoment() {
      return moment.tz(
        this.editEvent.dateStart * 1000,
        this.timeZoneEvent.name
      );
    },
    dateEndMoment() {
      return moment.tz(this.editEvent.dateEnd * 1000, this.timeZoneEvent.name);
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
    newDataEvent() {
      const formData = new FormData();
      const tagsAreaOfInfluence = this.preview.tagsAreaOfInfluence.map(
        el => el.code
      );
      const tagsPerson = this.preview.tagsPersons.map(el => el.code);
      const tagsSubjects = this.preview.tagsSubjects.map(el => el.code);
      const attendees = this.selectedGuest.map(el => el.code);
      formData.append("ajax", `Y`);
      formData.append("action", `edit-event`);
      formData.append("id", `${this.editEvent.id}`);
      formData.append("dateStart", `${this.dateStart}`);
      formData.append("dateEnd", `${this.dateEnd}`);
      formData.append("name", `${this.eventName}`);
      formData.append("desc", `${this.eventDesc}`);
      formData.append("status", `${this.editEvent.status.id}`);
      formData.append("calendarId", `${this.selectedCalendar.ID}`);
      formData.append("timeZone", `${this.selectedTimezone.code}`);
      formData.append("template", `${this.selectedGroups}`);
      formData.append(
        "responsiblePerson",
        `${this.selectedResponsiblePerson.code}`
      );
      formData.append("preview[name]", `${this.preview.name}`);
      formData.append("preview[desc]", `${this.preview.desc}`);
      formData.append("previewImage", this.preview.img);
      this.selectedServices.forEach((el, index) => {
        formData.append(`services[${index}]`, el);
      });
      attendees.forEach((el, index) => {
        formData.append(`attendees[${index}]`, el);
      });

      tagsAreaOfInfluence.forEach((el, index) => {
        formData.append(`preview[tagsAreaOfInfluence][${index}]`, el);
      });
      tagsPerson.forEach((el, index) => {
        formData.append(`preview[tagsPersons][${index}]`, el);
      });
      tagsSubjects.forEach((el, index) => {
        formData.append(`preview[tagsSubjects][${index}]`, el);
      });

      return formData;
    }
  },

  components: {
    calendarsSelect,
    vSelect
  },
  mounted() {
    this.eventName = this.editEvent.name;
    this.eventDesc = this.editEvent.desc;
    this.hourStart = this.dateStartMoment.format("HH");
    this.minutesStart = this.dateStartMoment.format("mm");
    this.hourEnd = this.dateEndMoment.format("HH");
    this.minutesEnd = this.dateEndMoment.format("mm");
    this.date = this.dateStartMoment.format("DD.MM.YYYY");
    if(this.editEvent.responsiblePerson.length) {
      this.selectedResponsiblePerson = this.editEvent.responsiblePerson[0];
    }
    if(!$.isEmptyObject(this.editEvent.preview)) {
      this.preview.name = this.editEvent.preview.name;
      this.preview.desc = this.editEvent.preview.desc;
      this.preview.tagsAreaOfInfluence = this.tagsAreaOfInfluenceForSelect.filter(
        el => this.editEvent.preview.tagsAreaOfInfluence.includes(el.code)
      );
      this.preview.tagsPersons = this.tagsPersonsForSelect.filter(el =>
        this.editEvent.preview.tagsPersons.includes(el.code)
      );
      this.preview.tagsSubjects = this.tagsSubjectsForSelect.filter(el =>
        this.editEvent.preview.tagsSubjects.includes(el.code)
      );
      // this.preview.img = this.editEvent.preview.img;
      this.previewView = true;
    }

    this.selectedGuest = this.editEvent.attendees;
    this.selectedServices = this.editEvent.services;
    
    this.selectedTimezone = this.timeZonesForSelect.filter(
      el => el.code === this.editEvent.timeZone
    )[0];
    this.selectedCalendar = this.getCalendar(this.editEvent.calendarId);
    this.getTemplates();
  }
};
</script>

<style lang="scss">
// @import './styles/calendar-popup-event.scss';
// @import "./styles/calendar-event-popup-fullscreen";

// .calendar-event-popup-fullscreen__textarea {
//   width: 75%;
//   height: 200px;
//   border: 1px solid #e1e1e1;
// }

// .dropdown-time {
//   .dropdown-menu {
//     overflow: auto;
//     min-width: 90px;
//     max-height: 150px;
//   }
//   .dropdown-item {
//     padding: 5px;
//   }
// }

// .calendar-event-popup-fullscreen__timezone {
//   .v-select {
//     background: #f0efef;
//     font-size: 14px;
//     color: #656875;
//   }
// }

// // .vs__dropdown-toggle {
// //   border: none;
// // }


// .vs__hidden {
//   max-height: 300px;
//   overflow: auto;
//   display: flex;
//   flex-basis: 100%;
//   flex-grow: 1;
//   flex-wrap: wrap;
//   position: absolute;
//   background: #fff;
//   z-index: 100;
//   padding: 5px;
//   border-radius: 3px;
//   width: 100%;
//   border: 1px solid rgba(60, 60, 60, 0.26);
//   border-top: none;
// }

// .vs__button__collapse {
//   position: absolute;
//   top: 0;
//   right: 0;
// }

// .v-select-custom .vs__button__collapse {
//   display: flex;
//   align-items: center;
//   background-color: #f0f0f0;
//   border: 1px solid rgba(60, 60, 60, 0.26);
//   border-radius: 4px;
//   color: #333;
//   line-height: 1.4;
//   margin: 4px 2px 0px 2px;
//   padding: 0 0.25em;
//   z-index: 10;
// }

// .v-select-custom .vs__actions .vs__open-indicator {
//   display: none;
// }
// .v-select-custom .vs__actions {
//   position: absolute;
//   top: -31px;
//   left: 85px;
// }
// .v-select-custom-left-140 .vs__actions {
//   left: 140px;
// }
// .v-select-custom-left-80 .vs__actions {
//   left: 80px;
// }
// .v-select-custom .vs__actions::after {
//   content: "+ Добавить";
//   color: #4162a9;
//   display: block;
// }
// .v-select-custom .vs__selected_hidden {
//   display: none;
// }

// .calendar-popup-event__file {
//   display: flex;
//   position: relative;
//   align-items: center;
// }
// .calendar-popup-event__file-input {
//   opacity: 0;
//   z-index: -10;
//   height: 0;
//   width: 0;
// }
// .calendar-popup-event__file-img {
//   max-height: 40px;
//   width: auto;
// }
// .calendar-popup-event__file-title {
//   color: #4162a9;
//   margin-left: 10px;
// }
// .calendar-popup-event__file-btn {
//   background: none;
//   border: none;
//   position: absolute;
//   top: 50%;
//   right: 0;
//   transform: translateY(-50%);
//   color: #656875;
//   font-size: 12px;
//   &:focus {
//     outline: none;
//   }
// }
</style>