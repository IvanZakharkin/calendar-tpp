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
            dropdown-time(
              :times="hours"
              :currentTime="hourStart"
              @changeTime="hourStart = $event"
            )
            .py-1 :
            dropdown-time(
              :times="minutes"
              :currentTime="minutesStart"
              @changeTime="minutesStart = $event"
            )
            .p-1 -
            .calendar-event-popup-fullscreen__field.d-flex
            dropdown-time(
              :times="hours"
              :currentTime="hourEnd"
              @changeTime="hourEnd = $event"
            )
            .py-1 :
            dropdown-time(
              :times="minutes"
              :currentTime="minutesEnd"
              @changeTime="minutesEnd = $event"
            )
          .calendar-popup-event__parameter.flex-column
            .mb-2 Участники
            .v-select-custom.v-select-agenda
              vSelect(
                multiple v-model="selectedParticipants" :options="participants" @search="onSearch"
              )
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
    }
  },
  computed: {
    ...mapState({}),
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
    dropdownTime
  },
  created() {},
  mounted() {
    this.hours = HOURS.filter(el => {
        return (
          Number(el) >= Number(this.dateStartEventMoment.format("HH")) &&
          Number(el) <= Number(this.dateEndEventMoment.format("HH"))
        );
      });;
    this.minutes = MINUTES;

    this.hourStart = this.timeStartAgendaToMoment.format("HH");
    this.minutesStart = this.timeStartAgendaToMoment.format("mm");
    this.hourEnd = this.timeEndAgendaToMoment.format("HH");
    this.minutesEnd = this.timeEndAgendaToMoment.format("mm");

    this.name = this.agendaData.name;
    this.selectedParticipants = this.agendaData.speakers;
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
        speakers: this.selectedParticipants
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
    }
  }
};
</script>

<style>
.v-select-agenda .vs__actions {
  display: none;
}
</style>