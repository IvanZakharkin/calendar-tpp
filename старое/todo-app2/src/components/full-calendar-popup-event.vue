<template lang="pug">
.card.calendar-popup-event
  .card-body.calendar-popup-event__body
    button.calendar-popup-event__close(
      @click="closePopup()"
    )
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
    .calendar-popup-event__event-content(v-if="showContentEvent")
      .calendar-popup-event__name.mb-3
        input.calendar-popup-event__name-input(
          placeholder='Название'
          v-model="eventName")
      .calendar-popup-event__parameters
        .calendar-popup-event__parameter.d-flex
          input.calendar-popup-event__input.calendar-popup-event__input-date(
            ref="inputDate" 
            type='text',
            :value='startValueInputDate',  
            onclick='BX.calendar({node: this, field: this, bTime: false});'
            @change="changingDate()"
            )
          input.calendar-popup-event__input(
            v-model="timeStart"
            type="time"
            @change="changeTimeStart()"
            )
          .p-2 -
          input.calendar-popup-event__input(
            v-model="timeEnd"
            type="time"
            @change="changeTimeEnd()"
            )
        .calendar-popup-event__parameter.flex-column
          .mb-2 Участники
          .v-select-custom
            vSelect(
              multiple v-model="selectedGuest" :options="optionsGuest"
            )
        .calendar-popup-event__parameter
          .mb-2 Шаблон
          .v-select-custom
            v-select(v-model="selectedGroups" :options="optionsGroups")
        .calendar-popup-event__parameter.d-flex
          .mr-2 Статус:
          .text-primary Заявка
        .calendar-popup-event__parameter.d-flex
          .mr-2 Календарь
          calendars-select(
            @selectCalendar="selectCalendar"
          )
      .calendar-popup-event__btns
        button.btn.calendar-popup-event__btn.calendar-popup-event__btn_parameters(@click="showDetailPopupEvent()") Другие параметры
        button.btn.calendar-popup-event__btn.calendar-popup-event__btn_save(
          @click="saveEvent()"
        ) Сохранить
    .calendar-popup-event__preview(v-if="showContentPreview")
      .btn.calendar-page__btn-create(v-if="!previewEdit && !previewView" @click="previewEdit = true; previewName = eventName") + Создать анонс
      .calendar-popup-event__preview-edit(v-if="previewEdit")
        .calendar-popup-event__preview-date.mb-2 {{dataForPreview}}
        .calendar-popup-event__parameter
          input.calendar-popup-event__name-input(
            placeholder='Название'
            v-model="previewName"
          )
        .calendar-popup-event__parameter
          input.calendar-popup-event__input-desk.mb-2(
            placeholder='Описание'
            v-model="previewDesk"
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
                  multiple v-model="selectedTagsAreaOfInfluence" :options="tagsAreaOfInfluence"
                )
            .calendar-popup-event__parameter
              .mb-2 Важные персоны
              .v-select-custom.v-select-custom-left-140
                vSelect(
                  multiple v-model="selectedTagsPersons" :options="tagsPersons"
                )
            .calendar-popup-event__parameter
              .mb-2 Тематики
              .v-select-custom.v-select-custom-left-80
                vSelect(
                  multiple v-model="selectedЕagsSubjects" :options="tagsSubjects"
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
            .calendar__event-title {{previewName}}
            .calendar__event-pic(v-show="showImagePreview")
              img.calendar__event-img(:src="imagePreview")
            .calendar__event-tags
              ul.tags
                li.tags__item(v-for="tag in allTags")
                  a.tags__link(href="#") {{tag}}
</template>

<script>
import { mapMutations, mapState, mapGetters } from "vuex";
import vSelect from "./v-select/components/Select.vue";
import calendarsSelect from "./calendars-select.vue"

export default {
  data() {
    return {
      /* событие */
      eventName: "",
      optionsGuest: [
        "Иван Иванов", "Федор Петров", "Федор Сидоров",
        "Иван 1", "Федор 1", "Федор С1",
        "Иван 2", "Федор 2", "Федор С2",
        "3", "4", "5",
      ],
      selectedGuest: [],
      optionsGroups: ["Группа1", "Группа2", "Группа3"],
      selectedGroups: [],

      /* анонс */
      previewName:"",
      previewDesk: "",
      previewFile: "",
      tagsAreaOfInfluence: ["Тег1", "Тег2", "Тег3"],
      selectedTagsAreaOfInfluence:[],
      tagsPersons: ["Персона1", "Персона2", "Персона3"],
      selectedTagsPersons:[],
      tagsSubjects: ["Тематика1", "ТЕматика2", "ТЕматика3"],
      selectedЕagsSubjects:[],
      file: '',
      fileName:'Загрузите файл',
      showImagePreview: false,
      imagePreview: '',

      timeStart: "",
      timeEnd: "",
      refDate: "",
      showContentEvent: true,
      showContentPreview: false,
      previewEdit: false,
      previewView: false
      // date: `${this.dayStartCreatedEvent}.${this.monthCreatedEvent}.${this.yearCreatedEvent}` 
    }
  },
  watch: {
    eventName: function(val) {
      this.updateCreatedEvent({
        state: "name",
        value: val
      });
    },
    selectedGuest: function(val) {
      this.updateCreatedEvent({
        state: "selectedGuest",
        value: val
      });
    },
    selectedGroups: function(val) {
      this.updateCreatedEvent({
        state: "selectedGroups",
        value: val
      });
    },
  },
  computed: {
    ...mapState({
      createdEvent: state => state.calendar.createdEvent,
      calendars: state => state.calendar.calendars
    }),
    ...mapGetters([
      "getDataStartCreatedEvent",
      "getDataEndCreatedEvent"
    ]),
    // refDate () {
    //   return this.$refs.inputDate.value
    // },
    newYear() {
      return Number(this.refDate.split('.')[2]);
    },
    newMonth() {
      return Number(this.refDate.split('.')[1]) - 1;
    },
    newDay() {
      return Number(this.refDate.split('.')[0]);
    },
    newHourStart() {
      return Number(this.timeStart.split(":")[0]);
    },
    newMinutesStart() {
      return Number(this.timeStart.split(":")[1]);
    },
    newHourEnd() {
      return Number(this.timeEnd.split(":")[0]);
    },
    newMinutesEnd() {
      return Number(this.timeEnd.split(":")[1]);
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
    dataForPreview() {
      const month = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
      const arrData = this.refDate.split(".");
      const numMonth = Number(arrData[1] - 1);
      return `${arrData[0]} ${month[numMonth]} ${arrData[2]}`
    },
    allTags (){
      return [...this.selectedTagsAreaOfInfluence, ...this.selectedTagsPersons, ...this.selectedЕagsSubjects]
    }
  },
  components: {
    vSelect,
    calendarsSelect
  },
  created() {
    this.timeStart = this.timeStartCreatedEvent,
      this.timeEnd = this.timeEndCreatedEvent,
      this.refDate = this.startValueInputDate
      this.previewName = this.eventName,
     this.updateCreatedEvent({
        state: "calendarID",
        value: this.calendars[0].id
      });
  },
  methods: {
    ...mapMutations([
      "resetStateCreatedEvent",
      "closePopupCreatedEvent",
      "updateCreatedEvent",
      "addCreatedEventToEvents",
      "showPopapEventFullScreen"
    ]),
    handleFileUpload(){
 
    this.file = this.$refs.file.files[0];
    this.fileName = this.file.name;
    let reader  = new FileReader();
    reader.addEventListener("load", function () {
      this.showImagePreview = true;
      this.imagePreview = reader.result;
    }.bind(this), false);
    if( this.file ){
      if ( /\.(jpe?g|png|gif)$/i.test( this.file.name ) ) {
        reader.readAsDataURL( this.file );
      }
    }
  },
  deleteImagePreview(){
    this.showImagePreview = false;
    this.fileName = "Загрузить изображение";
    this.imagePreview = {};
  },
    showDetailPopupEvent() {
      this.resetPreviewData();
      this.closePopupCreatedEvent();
      this.showPopapEventFullScreen();
    },
    resetPreviewData() {
      this.previewName = "",
      this.previewDesk = "",
      this.selectedTagsAreaOfInfluence = [],
      this.selectedTagsPersons = [],
      this.selectedЕagsSubjects = []
    },
    closePopup() {
      this.resetStateCreatedEvent();
      this.closePopupCreatedEvent();
    },
    saveEvent() {
      (this.eventName = ""),
        (this.selectedGuest = []),
        (this.selectedGroups = []),
        this.addCreatedEventToEvents();
      this.resetStateCreatedEvent();
      this.closePopupCreatedEvent();
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
  }
};
</script>

<style>
/* .calendar-popup-event {
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  position:absolute;
  z-index: 10;
}
.calendar-popup-event__parameter {
  display: block;
} */
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
/* 
.calendar-popup-event__input {
  border: none;
  background: #f0efef;
  color: #656875;
  margin: 0;
  height: 35px;
}
.calendar-popup-event__input-date {
  width: 100px;
  margin-right: 10px
}

.calendar-popup-event__btn-outline {
  border-color: #2164b1;
  color: #2164b1;
}

.calendar-popup-event__name-input {
  padding-left: 0;
} */

.calendar__event-btn {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>