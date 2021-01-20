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
            :value='refDate',  
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
            @click="savePreview(); previewView=true; previewEdit=false"
          ) Сохранить
      .calendar-popup-event__preview-view(v-if="previewView")
        .card.mb-4.calendar__event
          .text-right.p-2.calendar__event-btn(data-v-3fd6c9ce='')
            button.btn.calendar-popup-event-detail__btn.mr-2(data-v-3fd6c9ce='', type='button', data-dismiss='modal' @click="deletePreview(); previewView=false")
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
import { mapMutations, mapState, mapGetters } from "vuex";
import vSelect from "./v-select/components/Select.vue";
import calendarsSelect from "./calendars-select.vue";
import moment from "moment-timezone";

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
      preview: {
          name: "",
          desc: "",
          img: "",
          tagsAreaOfInfluence: [],
          tagsPersons: [],
          tagsSubjects: [],
        },
      tagsAreaOfInfluence: ["Тег1", "Тег2", "Тег3"],
      tagsPersons: ["Персона1", "Персона2", "Персона3"],
      tagsSubjects: ["Тематика1", "ТЕматика2", "ТЕматика3"],
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
    dateForMoment() {
      return this.refDate.split('.').reverse().join('-');
    },

    newTimeStart() {
      return moment(`${this.dateForMoment} ${this.timeStart}`).valueOf();
    },
    newTimeEnd() {
      return moment(`${this.dateForMoment} ${this.timeEnd}`).valueOf();
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
    this.timeStart = moment(this.getDataStartCreatedEvent).format("HH:mm"),
      this.timeEnd = moment(this.getDataEndCreatedEvent).format("HH:mm"),
      this.refDate = moment(this.getDataStartCreatedEvent).format("DD.MM.YYYY")
      this.preview.name = this.eventName
    //  this.updateCreatedEvent({
    //     state: "calendarID",
    //     value: this.calendars[0].id
    //   });
  },
  methods: {
    ...mapMutations([
      "resetStateCreatedEvent",
      "closePopupCreatedEvent",
      "updateCreatedEvent",
      "addCreatedEventToEvents",
      "showPopapEventFullScreen"
    ]),
    savePreview() {
      this.updateCreatedEvent({
        state: "preview",
        value: this.preview
      })
    },
    deletePreview() {
      this.resetPreviewData();
      this.updateCreatedEvent({
        state: "preview",
        value: {}
      })
    },
    handleFileUpload(){
    this.preview.img= this.$refs.file.files[0];
    this.fileName = this.preview.img.name;
    let reader  = new FileReader();
    reader.addEventListener("load", function () {
      this.showImagePreview = true;
      this.imagePreview = reader.result;
    }.bind(this), false);
    if( this.preview.img){
      if ( /\.(jpe?g|png|gif)$/i.test( this.preview.img.name ) ) {
        reader.readAsDataURL( this.preview.img);
      }
    }
  },
  deleteImagePreview(){
    this.showImagePreview = false;
    this.fileName = "Загрузить изображение";
    this.imagePreview = {};
  },
    showDetailPopupEvent() {
      // this.resetPreviewData();
      this.closePopupCreatedEvent();
      this.showPopapEventFullScreen();
    },
    resetPreviewData() {
      this.preview.name = "",
      this.preview.img = "",
      this.preview.desc = "",
      this.preview.tagsAreaOfInfluence = [],
      this.preview.tagsPersons = [],
      this.preview.tagsSubjects = []
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

<style lang="scss" scoped>

@import './styles/calendar-popup-event.scss';
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