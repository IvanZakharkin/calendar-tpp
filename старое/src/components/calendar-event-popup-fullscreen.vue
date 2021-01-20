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
            :value='refDate',  
            onclick='BX.calendar({node: this, field: this, bTime: false});'
            @change="changingDate()"
          )
        .calendar-event-popup-fullscreen__row-item.d-flex
          //- input.calendar-event-popup-fullscreen__field(
          //-   v-model="timeStart"
          //-     type="time"
          //-     @change="changeTimeStart()"
          //-   )
          input.calendar-event-popup-fullscreen__field.p-0.text-center(
            type="number"
            min="01"
            max="24"
            step="01"
            )
          .calendar-event-popup-fullscreen__field.py-2.px-0 :
          input.calendar-event-popup-fullscreen__field.p-0.text-center(
            type="number"
            min="0"
            max="60"
            step="15"
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
              textarea(placeholder="Описание")
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
              )
                i.fas.fa-times
          .card.mb-3
            .card-body
              .calendar-popup-event__parameter.flex-column
                .mb-2 Область влияния
                .v-select-custom.v-select-custom-left-140
                  vSelect(
                    multiple v-model="preview.tagsAreaOfInfluence" :options="tagsAreaOfInfluence"
                  )
              .calendar-popup-event__parameter
                .mb-2 Важные персоны
                .v-select-custom.v-select-custom-left-140
                  vSelect(
                    multiple v-model="preview.tagsPersons" :options="tagsPersons"
                  )
              .calendar-popup-event__parameter
                .mb-2 Тематики
                .v-select-custom.v-select-custom-left-80
                  vSelect(
                    multiple v-model="preview.tagsSubjects" :options="tagsSubjects"
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
          .text-right.p-2.calendar__event-btn(data-v-3fd6c9ce='')
            button.btn.calendar-popup-event-detail__btn(data-v-3fd6c9ce='', type='button', data-dismiss='modal' @click="resetPreviewData(); previewView=false")
              i.far.fa-trash-alt(data-v-3fd6c9ce='')
            button.btn.calendar-popup-event-detail__btn(data-v-3fd6c9ce='', type='button' @click="previewView=false; previewEdit=true")
              i.fas.fa-pencil-alt(data-v-3fd6c9ce='')
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
import { VueEditor } from "vue2-editor";
import { mapMutations, mapState, mapGetters } from 'vuex';
import moment from "moment-timezone";

export default {
  data() {
    return {
		eventDeskription: "",
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
    selectedTimezone:"",
    showContentEvent: true,
    showContentPreview: false,
    previewEdit: false,
    previewView: false,
    preview: {
          name: "",
          desc: "",
          img: "",
          tagsAreaOfInfluence: [],
          tagsPersons: [],
          tagsSubjects: [],
        },

     /* анонс */
      tagsAreaOfInfluence: ["Тег1", "Тег2", "Тег3"],
      tagsPersons: ["Персона1", "Персона2", "Персона3"],
      tagsSubjects: ["Тематика1", "ТЕматика2", "ТЕматика3"],
      fileName:'Загрузите файл',
      showImagePreview: false,
      imagePreview: '',
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
  handleFileUpload(){
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
    this.fileName = "Загрузить изображение";
    this.imagePreview = {};
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
    dataForPreview() {
      const month = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
      const arrData = this.refDate.split(".");
      const numMonth = Number(arrData[1] - 1);
      return `${arrData[0]} ${month[numMonth]} ${arrData[2]}`
    },
		selectedCalendar(){
			// console.log(createdEvent.calendarID);
			return this.getCalendar(this.createdEvent.calendarID);
    },
    dateForMoment() {
      return this.refDate.split('.').reverse().join('-');
    },

    newTimeStart() {
      return moment(`${this.dateForMoment} ${this.timeStart}`).valueOf();
    },
    newTimeEnd() {
      return moment(`${this.dateForMoment} ${this.timeEnd}`).valueOf();
    },
     allTags() {
    return [...this.preview.tagsAreaOfInfluence, ...this.preview.tagsPersons, ...this.preview.tagsSubjects]
  },
  },
  components: {
    calendarsSelect,
    VueEditor,
    vSelect
  },
  created() {
	  this.timeStart = moment(this.getDataStartCreatedEvent).format("HH:mm");
      this.timeEnd = moment(this.getDataEndCreatedEvent).format("HH:mm");
      this.refDate = moment(this.getDataStartCreatedEvent).format("DD.MM.YYYY");
		this.eventName = this.createdEvent.name;
		this.selectedTimezone = this.timezones.filter(timezone => {
			return Number(timezone.code) === this.timeZone;
    })[0];
    if(this.createdEvent.preview) {
      this.previewView = true;
      this.preview = this.createdEvent.preview;
    }
  }

};
</script>

<style lang="scss" scoped>
@import './styles/calendar-popup-event.scss';
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
    width: 100%;
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