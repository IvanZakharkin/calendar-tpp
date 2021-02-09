<template lang="pug">
.calendar-popup-event-modal(
  @click="closePopup($event, false)"
)
  .card.calendar-popup-event
    .card-body.calendar-popup-event__body
      button.calendar-popup-event__close(
        @click="closePopup($event, true)"
      )
        i.fas.fa-times
      .calendar-popup-event__event-content
        .calendar-popup-event__name.mb-3
          input.calendar-popup-event__name-input(
            placeholder='Название'
            v-model="name")
        .calendar-popup-event__parameters
          .calendar-popup-event__parameter
            time-select(
              :timeStart="`${hourStart}:${minutesStart}`"
              :timeEnd="`${hourEnd}:${minutesEnd}`"
              :hours="hours"
              :minutes="minutes"
              @changeTimeStart="changeTimeStart($event)"
              @changeTimeEnd="changeTimeEnd($event)"
            )
          .calendar-popup-event__parameter.flex-column
            .mb-2 Участники
            .v-select-custom.v-select-agenda
              vSelect(
                multiple v-model="selectedParticipants" :options="participants" @search="onSearch"
              )
          .calendar-popup-event__parameter.flex-column.flex-column
            <div class="mb-2">Описание</div>
            textarea.form-control(id="agenda-description" v-model="description")
        .d-flex.justify-content-between
          button.btn.btn-danger(
            @click="deleteAgenda()"
          ) Удалить
          button.btn.calendar-popup-event__btn.calendar-popup-event__btn_save(
            :disabled="!name"
            @click="saveAgenda()"
          ) Сохранить
</template>

<script>
import { mapMutations, mapState, mapGetters } from "vuex";
import vSelect from "../v-select/components/Select.vue";
import dropdownTime from "../dropdown-time.vue";
import timeSelect from "../time-select";
import { HOURS, MINUTES } from "../const.js";
import moment from "moment-timezone";

export default {
  data() {
    return {
      hours: [],
      minutes: [],

      minutesStart: "",
      hourStart: "",
      hourEnd: "",
      minutesEnd: "",
      name: "",
      participants: [],
      selectedParticipants:[]
    };
  },
  watch: {},
  props: {
    agendaData: {
      type: Object,
      default: {
      }
    },
    timeStartCreatedAgendasInUnix: {
      type: Number,
      default: 0
    },
    timeEndCreatedAgendasInUnix: {
      type: Number,
      default: 0
    },
    dateStartEventMoment: {
      type: Object,
      default: {}
    },
    dateEndEventMoment: {
      type: Object,
      default: {}
    },
    currentDate: {
      type: String, 
      default: ""
    },
  },
  computed: {
    ...mapState({
      tinymce: state => state.calendar.tinymce,
    }),
    ...mapGetters(["getDataStartCreatedEvent", "getDataEndCreatedEvent"]),
    timeStartAgendaToMoment() {
      // return this.agendaData.timeStart;
      return moment(this.agendaData.timeStart * 1000);
    },
    timeEndAgendaToMoment() {
      return moment(this.agendaData.timeEnd * 1000);
    },
    test() {
      return moment(`${this.currentDate} ${this.hourStart}:${this.minutesStart}`)
    }
  },
  components: {
    vSelect,
    dropdownTime,
    timeSelect,
  },
  methods: {
    ...mapMutations([]),
    closePopup(event, clickBtnClose) {
      if (
        $(event.target).hasClass("calendar-popup-event-modal") ||
        clickBtnClose
      ) {
        this.$emit("closePopupChange");
      }
    },
    deleteAgenda() {
      this.$emit("deleteAgenda", this.agendaData)
    },
    saveAgenda() {
      const changeAgenda = {
        timeStart: moment(`${this.currentDate} ${this.hourStart}:${this.minutesStart}`).unix(),
        timeEnd: moment(`${this.currentDate} ${this.hourEnd}:${this.minutesEnd}`).unix(),
        name: this.name,
        speakers: this.selectedParticipants,
        description: this.description
      };
      if(this.agendaData.id) {
        changeAgenda.id = this.agendaData.id
      }
      if(this.agendaData.ids) {
        changeAgenda.ids = this.agendaData.ids
      }
      this.$emit("saveChangeAgenda", changeAgenda);
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
          vm.participants = response.data;
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
    getListMinutes() {
      return [].concat(...Array.from(Array(60), (_, minute) => ([
        moment({minute}).format('mm'),
      ])))
    }
  },
  created() {
    this.hours = HOURS.filter(el => {
        return (
          Number(el) >= Number(this.dateStartEventMoment.format("HH")) &&
          Number(el) <= Number(this.dateEndEventMoment.format("HH"))
        );
      });
    this.minutes = this.getListMinutes();

    this.hourStart = this.timeStartAgendaToMoment.format("HH");
    this.minutesStart = this.timeStartAgendaToMoment.format("mm");
    this.hourEnd = this.timeEndAgendaToMoment.format("HH");
    this.minutesEnd = this.timeEndAgendaToMoment.format("mm");

    this.name = this.agendaData.name;
    this.selectedParticipants = this.agendaData.speakers;
    this.description = this.agendaData.description;
  },
  mounted() {
    tinymce.init({
      ...this.tinymce.options, 
      ...{
        selector: '#agenda-description',
        language: 'ru',
        height: 200,
        init_instance_callback: (editor) => {
          editor.on('input', (e) => {
            this.description = editor.getContent();
          });
        }
      }
    })
  },
  destroyed() {
    tinymce.remove();
  }
};
</script>

<style>
.v-select-agenda .vs__actions {
  display: none;
}
</style>