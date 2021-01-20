<template lang="pug">
.calendar-event-agenda(
      :style="styleAgenda"
      :class="{'calendar-event-agenda_transfer':transfer}"
      @mousedown="transferStart($event)"
      @mouseup="transferEnd($event)"
      @click="changeAgenda()"
      @dragstart.prevent
      ref="agenda"
  )
      .calendar-event-agenda__info
          .calendar-event-agenda__time {{timeStartMoment.format("HH:mm")}} - {{timeEndMoment.format("HH:mm")}}
          .calendar-event-agenda__title {{agenda.name}}
      ul.calendar-event-agenda__persons
          li.calendar-event-agenda__person(
            v-for="(participant, index) in agenda.speakers"
          )
              .calendar-event-agenda__person-avatar(
                ref="person"
                @click="showPersonPopup(index)"
              )
                img.calendar-event-agenda__person-avatar-img(
                    :src="participant.avatar"
                )
                .calendar-event-agenda__person-popup
                  .card.participant-card
                    .card-body.participant-card__body
                        //- button.btn.participant-card__btn-delete(
                        //-     type="button"
                        //- )
                        //-     i.fas.fa-times
                        .participant-card__left
                            .participant-card__name {{participant.label}}
                            .participant-card__desc(v-if="participant.work_position") {{participant.work_position}}
                            .participant-card__contact(v-if="participant.work_company")
                                a.participant-card__contact-link(href="") {{participant.work_company}}
                                a.participant-card__contact-title(href="") ТПП
                            .participant-card__contact(v-if="participant.work_phone")
                                a.participant-card__contact-link(href="") {{participant.work_phone}}
                                a.participant-card__contact-title(href="") Телефон
                            .participant-card__contact(v-if="participant.email")
                                a.participant-card__contact-link(href="") {{participant.email}}
                                a.participant-card__contact-title(href="") Email
                        .participant-card__right
                          .participant-card__avatar
                              img.img.participant-card__avatar-img(
                                  :src="participant.avatar"
                                  v-if="participant.avatar"
                              )
</template>

<script>
const HEIGHT_HOUR = 110;
import { mapMutations, mapState, mapGetters, mapActions } from "vuex";
import { HOURS_FOR_CALENDAR } from "../const.js";
import moment from "moment-timezone";
// const HEIGHT_HOUR = 110;
export default {
  data() {
    return {
      hours: [],
      transfer: false,
      agendaData: {
        name: 0,
        timeStart: 0,
        timeEnd: 0,
        speakers: []
      },
      timeStart: 0,
      timeEnd: 0,
      count: 0,
      wasTransfer: false
    };
  },
  props: {
    agenda: {
      type: Object,
      default: {}
    },
    dateStartEventMoment: {
      type: Object,
      default: {}
    },
    dateEndEventMoment: {
      type: Object,
      default: {}
    },
    timezone: {
      type: Object,
      default: {}
    },
    agendas: {
      type: Array,
      default: []
    },
    duration: {
      type: Number,
      default: 0
    },
    index: {
      type: Number,
      default: 0
    }
  },
  watch: {
    // timeStart: function(val) {
    //   const changeAgenda = {
    //     timeStart: this.timeStart,
    //     timeEnd: thistimeEnd,
    //     name: this.agenda.name,
    //     speakers: this.agenda.speakers
    //   };
    //   if (this.agenda.id) {
    //     changeAgenda.id = this.agenda.id;
    //   }
    //   this.$emit("saveChangeAgenda", changeAgenda);
    // }
  },
  methods: {
    transferStart(event) {
      if (event.target != this.$refs.agenda) return;
      this.transfer = true;
      this.agendaData.test = 1;
    },
    showPersonPopup(index) {
      $(this.$refs.person[index])
        .find(".calendar-event-agenda__person-popup")
        .toggleClass("calendar-event-agenda__person-popup_active");
    },
    transferEnd(event) {
      if (event.target != this.$refs.agenda) return;
      this.transfer = false;
      // if (!this.wasTransfer) {
      //   this.$emit("showPopupChangeAgenda", this.agenda);
      // }
      // this.wasTransfer = false;
    },
    changeAgenda() {
      if (!this.wasTransfer) {
        this.$emit("showPopupChangeAgenda", this.agenda);
      }
      this.wasTransfer = false;
    },
    roundingTimeAtTransfer(time) {
      const timeToHundredthsArr = time.toFixed(2).split(".");
      let hours = Number(timeToHundredthsArr[0]);
      let minutes = Number(timeToHundredthsArr[1]);
      switch (true) {
        case minutes < 15:
          minutes = 0;
          break;
        case minutes >= 15 && minutes < 35:
          minutes = 25;
          break;
        case minutes >= 35 && minutes < 65:
          minutes = 50;
          break;
        case minutes >= 65 && minutes < 85:
          minutes = 75;
          break;
        case minutes >= 85:
          minutes = 0;
          hours += 1;
          break;
        default:
          minutes = minutes;
          hours = hours;
      }
      return Number(`${hours}.${minutes}`);
    }
  },
  computed: {
    ...mapState({
      roles: state => state.calendar.roles
    }),
    dateStartEventUnix() {
      return this.dateStartEventMoment.unix();
    },
    dateEndEventUnix() {
      return this.dateEndEventMoment.unix();
    },
    timeStartMoment() {
      return moment.tz(this.agenda.timeStart * 1000, this.timezone.name);
    },
    timeEndMoment() {
      return moment.tz(this.agenda.timeEnd * 1000, this.timezone.name);
    },
    dateStartInUnix() {
      return moment
        .tz(this.agenda.timeEnd * 1000, this.timezone.name)
        .hour("00")
        .minutes("00")
        .unix();
    },
    hourStart() {
      return Number(this.timeStartMoment.format("HH"));
    },
    hourEnd() {
      return Number(this.timeEndMoment.format("HH"));
    },
    minutesStart() {
      return Number(this.timeStartMoment.format("mm"));
    },
    minutesEnd() {
      return Number(this.timeEndMoment.format("mm"));
    },
    topCoordinate() {
      const hourInCoord = this.hourStart * HEIGHT_HOUR;
      const minutesInCoord = (this.minutesStart * HEIGHT_HOUR) / 60;
      return hourInCoord + minutesInCoord;
    },
    height() {
      const hourInCoord = this.hourEnd * HEIGHT_HOUR;
      const minutesInCoord = (this.minutesEnd * HEIGHT_HOUR) / 60;
      return hourInCoord + minutesInCoord - this.topCoordinate;
    },
    offset() {
      let count = 0;
      if (this.index === 0) return count;
      for (let i = this.index; i >= 0; i -= 1) {
        if (i === this.index) continue;
        const agenda = this.agendas[i];
        if (
          this.agenda.timeStart >= agenda.timeStart &&
          this.agenda.timeStart < agenda.timeEnd
        ) {
          count += 1;
        }
      }
      return count;
    },
    styleAgenda() {
      return {
        top: `${this.topCoordinate}px`,
        height: `${this.height}px`,
        zIndex: `${10 * this.index}`,
        width: `${99 - 10 * this.offset}%`,
        left: `${10 * this.offset}%`
      }
      // `top: ${this.topCoordinate}px; 
      // height: ${this.height}px; 
      // z-index: ${10 * this.index};
      // width: ${100 - 5 * this.offset}%;
      // left: ${5 * this.offset}%`;
    }
  },

  components: {},
  mounted() {
    this.hours = HOURS_FOR_CALENDAR;
    this.agendaData = this.agenda;
    this.duration = this.agendaData.timeEnd - this.agendaData.timeStart;
    const vm = this;

    document.addEventListener("mousemove", function(event) {
      if (!vm.transfer) return;
      vm.wasTransfer = true;
      const startTime = (vm.hourStart * 60 + vm.minutesStart) * 60;
      const coordTopContainer = $(".calendar-event-agendas__container").offset()
        .top;
      const scrollTopContainer = $(
        ".calendar-event-agendas__container"
      ).scrollTop();
      const eventPageY = event.pageY;
      const eventLayerY = event.layerY;
      const fifteenMinutesInSec = 15 * 60;
      let result =
        eventPageY - coordTopContainer + scrollTopContainer - vm.height / 2;
      // const timeToSec = vm.roundingTimeAtTransfer(result / 110) * 3600;
      const timeToSec = result / 110 * 3600;
      let timeStart = vm.dateStartInUnix + timeToSec;
      let timeEnd = vm.dateStartInUnix + timeToSec + vm.duration;

      // vm.agendaData.timeStart = timeStart;
      // vm.agendaData.timeEnd = timeEnd;
      // if (vm.dateStartEventUnix > timeStart) {
      //   vm.agendaData.timeStart = vm.dateStartEventUnix;
      //   vm.agendaData.timeEnd = vm.dateStartEventUnix + vm.duration;
      // }
      // if (vm.dateEndEventUnix < timeEnd) {
      //   vm.agendaData.timeEnd = vm.dateEndEventUnix;
      //   vm.agendaData.timeStart = vm.agendaData.timeEnd - vm.duration;
      // }

      if (vm.dateStartEventUnix > timeStart) {
        timeStart = vm.dateStartEventUnix;
        timeEnd = vm.dateStartEventUnix + vm.duration;
      }
      if (vm.dateEndEventUnix < timeEnd) {
        timeEnd = vm.dateEndEventUnix;
        timeStart = timeEnd - vm.duration;
      }

      const changeAgenda = {
        timeStart: timeStart,
        timeEnd: timeEnd,
        name: vm.agenda.name,
        speakers: vm.agenda.speakers
      };
      if (vm.agenda.id) {
        changeAgenda.id = vm.agenda.id;
      }
      if (vm.agenda.ids) {
        changeAgenda.ids = vm.agenda.ids;
      }
      vm.$emit("saveChangeAgenda", changeAgenda);
    });
    document.addEventListener("mouseup", function(event) {
      if (vm.transfer) vm.transfer = false;
    });
  }
};
</script>

<style lang="scss">
</style>