<template lang="pug">
  .modal#calendar-edit-event-popup.popup-fullscreen
    .modal-dialog.popup-fullscreen-dialog
      .modal-content.popup-fullscreen-content
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
                  v-select(v-model="selectedTimezone" :options="timeZonesForSelect")
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
                      //- .dropdown.calendars-select
                      //-   button.calendars-select__selected-item(type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
                      //-       .calendars-select__calendar
                      //-         .calendars-select__calendar-circle(
                      //-           :style="{backgroundColor: selectedCalendar.COLOR}"
                      //-         )
                      //-         .calendars-select__calendar-title {{selectedCalendar.NAME}}
                      //-           button.calendars-select__calendar-location(
                      //-             @click="openMap()"
                      //-             ref="location"
                      //-           )
                      //-             i.fas.fa-map-marker-alt
                      //-         .calendars-select__icon
                      //-           i.fas.fa-sort-down
                      //-   .dropdown-menu(aria-labelledby='dropdownMenuButton')
                      //-     button.calendars-select__dropdown-item(
                      //-       v-for="calendar in calendars"
                      //-       @click="changeCalendar(calendar)"
                      //-     )
                      //-       .calendars-select__calendar
                      //-         .calendars-select__calendar-circle(
                      //-           :style="{ backgroundColor: calendar.COLOR}"
                      //-         )
                      //-         .calendars-select__calendar-title {{calendar.NAME}}
                      
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
import calendarsSelect from "./calendars-select.vue"
import vSelect from "./v-select/components/Select.vue";
import { mapMutations, mapState, mapGetters, mapActions } from 'vuex';
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
  "24",
];
const MINUTES = [
  "00",
  "15",
  "30",
  "45"
];

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
			img:"",
			tagsAreaOfInfluence: [],
			tagsPersons: [],
			tagsSubjects: [],
        },
    selectedCalendar:{},
    selectedTimezone:"",
    showContentEvent: true,
    showContentPreview: false,
    previewEdit: false,
    previewView: false,
    fileName:'Загрузите изображение',
    showImagePreview: false,
    imagePreview: '',
    // tagsAreaOfInfluence: ['2'],
    // tagsPersons: ['1', '2', '3'],
    // tagsSubjects: ['4'],
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
			"showPopapEventFullScreen"
    ]),
    ...mapActions(["sendEventEdit"]),
    changeCalendar(calendar) {
      this.selectedCalendar = calendar;
    },
	  closePopup() {
		//   this.resetStateCreatedEvent();
      // this.closePopapEventFullScreen();
      $("#calendar-edit-event-popup").modal("hide");
	  },
	  saveEvent() {
      (this.eventName = ""),
        this.addCreatedEventToEvents();
      this.resetStateCreatedEvent();
	  this.closePopupCreatedEvent();
    this.closePopapEventFullScreen();
    this.sendEventEdit(this.newDataEvent);
  },
  resetPreviewData() {
    this.preview.name = '';
    this.preview.desc = '';
    this.preview.img = '';
    this.preview.tagsAreaOfInfluence = [];
    this.preview.tagsPersons = [];
    this.preview.tagsSubjects = [];
  },
  	changingDate() {
      this.date = this.$refs.inputDate.value;
    },
  
    // selectCalendar(calendar) {
    //   this.updateCreatedEvent({
    //     state: "calendarID",
    //     value: calendar.id
    //   });
    // }
     handleFileUpload() {
    this.preview.img = this.$refs.file.files[0];
    this.fileName = this.preview.img.name;
    let reader  = new FileReader();
    reader.addEventListener("load", function () {
      this.showImagePreview = true;
      this.imagePreview = reader.result;
    }.bind(this), false);
    if( this.preview.img ){
      if ( /\.(jpe?g|png|gif)$/i.test( this.preview.img.name ) ) {
        reader.readAsDataURL( this.preview.img );
      }
    }
  },
  deleteImagePreview(){
    this.showImagePreview = false;
    this.fileName = "Загрузите изображение";
    this.imagePreview = {};
    this.preview.img = '';
  },
  },
  computed: {
	...mapState({
      editEvent: state => state.calendar.editEvent,
      calendars: state => state.calendar.calendars,
      timeZones: state => state.calendar.timeZones,
      tagsAreaOfInfluence: state => state.calendar.tagsAreaOfInfluence,
      tagsPersons: state => state.calendar.tagsPersons,
      tagsSubjects: state => state.calendar.tagsSubjects,
  }),
  tagsAreaOfInfluenceForSelect() {
    // return this.tagsAreaOfInfluence
    return this.tagsAreaOfInfluence.map(el => {
      return {
        label: el.name,
        code: el.id,
      }
    })
  },
  tagsPersonsForSelect() {
    return this.tagsPersons.map(el => {
      return {
        label: el.name,
        code: el.id,
      }
    })
  },
  tagsSubjectsForSelect() {
    return this.tagsSubjects.map(el => {
      return {
        label: el.name,
        code: el.id,
      }
    })
  },
  hours() {
    return HOURS;
  },
  minutes() {
    return MINUTES;
  },
  allTags() {
    return [...this.preview.tagsAreaOfInfluence, ...this.preview.tagsPersons, ...this.preview.tagsSubjects].map(el => el.label)
  },
	...mapGetters([
      "getDataStartCreatedEvent",
      "getDataEndCreatedEvent",
      "getCalendar",
      "timeZone",
      "getTimeZoneById"
    ]),
    dataForPreview() {
      const month = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
      const arrData = this.date.split(".");
      const numMonth = Number(arrData[1] - 1);
      return `${arrData[0]} ${month[numMonth]} ${arrData[2]}`
    },
    timeZoneEvent(){
      return this.getTimeZoneById(this.editEvent.timeZone);
    },
    dateStartMoment(){
      return moment.tz(this.editEvent.dateStart * 1000, this.timeZoneEvent.name);
    },
    dateEndMoment(){
      return moment.tz(this.editEvent.dateEnd * 1000, this.timeZoneEvent.name);
    },
    timeZonesForSelect() {
      return this.timeZones.map(timezone => {
        return {
          label: timezone.xmlId,
          code: timezone.id
        }
      })
    },
    dateForMoment() {
      return this.date.split('.').reverse().join('-');
    },
    dateStart() {
      return moment(`${this.dateForMoment} ${this.hourStart}:${this.minutesStart}`).unix();
    },
    dateEnd() {
      return moment(`${this.dateForMoment} ${this.hourEnd}:${this.minutesEnd}`).unix();
    },
    newDataEvent() {
      return {
        id: this.editEvent.id,
        dateStart: this.dateStart,
        dateEnd: this.dateEnd,
        name: this.eventName,
        desk: this.eventDesc,
        attendees: ['1', '2', '3'],
        status: "",
        calendarId: 2,
        timeZone: this.selectedTimezone.code,

        preview: {
          name: this.preview.name,
          desc: this.preview.desc,
          img: this.preview.img,
          tagsAreaOfInfluence: this.preview.tagsAreaOfInfluence,
          tagsPersons: this.preview.tagsPersons,
          tagsSubjects: this.preview.tagsSubjects,
        }
      }
    },
  },
  components: {
    calendarsSelect,
    vSelect
  },
  mounted() {
      this.eventName = this.editEvent.name;
      this.eventDesc = this.editEvent.desc;
	    // this.timeStart = this.dateStartMoment.format("HH:mm");
      // this.timeEnd = this.dateEndMoment.format("HH:mm");
      this.hourStart = this.dateStartMoment.format("HH");
      this.minutesStart = this.dateStartMoment.format("mm");
      this.hourEnd = this.dateEndMoment.format("HH");
      this.minutesEnd = this.dateEndMoment.format("mm");
      this.date = this.dateStartMoment.format("DD.MM.YYYY");
      this.preview.name = this.editEvent.preview.name;
      this.preview.desc = this.editEvent.preview.desc;
      this.preview.img = this.editEvent.preview.img;

      this.preview.tagsAreaOfInfluence = this.tagsAreaOfInfluenceForSelect.filter(el => (this.editEvent.preview.tagsAreaOfInfluence.includes(el.code)));
      this.preview.tagsPersons = this.tagsPersonsForSelect.filter(el => (this.editEvent.preview.tagsPersons.includes(el.code)));
      this.preview.tagsSubjects = this.tagsSubjectsForSelect.filter(el => (this.editEvent.preview.tagsSubjects.includes(el.code)));

      this.previewView = true;
      this.selectedTimezone = this.timeZonesForSelect.filter(el => el.code === this.editEvent.timeZone)[0];
      this.selectedCalendar = this.getCalendar(this.editEvent.calendarId);
	// 	this.eventName = this.createdEvent.name
	// 	this.selectedTimezone = this.timezones.filter(timezone => {
	// 		return Number(timezone.code) === this.timeZone;
	// 	})[0]
  }

};
</script>

<style lang="scss">
@import './styles/calendar-popup-event.scss';

.calendar-event-popup-fullscreen__textarea {
  width: 75%;
  height: 300px;
  border: 1px solid #e1e1e1;
}

.dropdown-time {
  .dropdown-menu {
    overflow: auto;
    min-width: 90px;
    max-height: 150px;
  }
  .dropdown-item {
    padding: 5px;
  }
}

.calendar-event-popup-fullscreen__timezone {
	.v-select {
		background: #f0efef;  
    font-size: 14px;
    color: #656875;

	}
	}

		.vs__dropdown-toggle {
			border: none;
		}
.popup-fullscreen {
  background: #fff;
}
.popup-fullscreen-dialog {
  max-width: 100%;
  height: 100%;
}
.popup-fullscreen-content {
  border: none;
}
.calendar-event-popup-fullscreen {
    padding: 30px 135px 30px 85px;
    // position: absolute;
    // top: 0;
    // left: 0;
    // z-index: 100;
    // height: 100vh;
    // width: 100%;
    // background: #fff;

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
        left: 20px;
        top: 20px;
    }

    &__options-title {
        margin-right: 10px;
    }

    &__preview {
      max-width: 500px;
    }
 
}

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
  right:0;
}

.v-select-custom .vs__button__collapse{
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

.v-select-custom .vs__actions .vs__open-indicator{
    display: none;
}
.v-select-custom .vs__actions {
    position: absolute;
    top: -31px;
    left: 85px;
}
.v-select-custom-left-140 .vs__actions {
    left: 140px;
}
.v-select-custom-left-80 .vs__actions {
    left: 80px;
}
.v-select-custom .vs__actions::after{
    content: "+ Добавить";
    color: #4162a9;
    display: block;;
}
.v-select-custom .vs__selected_hidden{
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