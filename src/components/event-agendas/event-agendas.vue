<template lang="pug">
.calendar-event-agendas.mb-4
    //- vueCustomScrollbar(class="scroll-area")
    .calendar-event-agendas__container
        .calendar-event-agendas__hours
            .calendar-event-agendas__hour(
                v-for="hour in hours"
            )
                .calendar-event-agendas__hour-text {{hour}}
        .calendar-event-agendas__field-day
            event-agendas-day-hour(
                v-for="index in 24"
                :hourEnd="index"
                :dateStartEventMoment="dateStartEventMoment"
                :dateEndEventMoment="dateEndEventMoment"
                :agendaData="createdAgendaData"
                @changeAgendaData="changeAgendaData($event)"
                @showPopupCreatedAgenda="showPopup=true"
            )
            event-agendas-list(
              v-for="(agenda, index) in filteredAgendasByTime"
              :key="agenda.id ? `${agenda.id}` : `${agenda.ids}`"
              :index="index"
              :agenda="agenda"
              :agendas="filteredAgendasByTime"
              :duration="agenda.timeEnd - agenda.timeStart"
              :dateStartEventMoment="dateStartEventMoment"
              :dateEndEventMoment="dateEndEventMoment"
              :timezone="timezone"
              @showPopupChangeAgenda="changeAgenda($event)"
              @saveChangeAgenda="saveChangeAgenda($event)"
            )
            event-agendas-created-agenda(
                :dateStartEventMoment="dateStartEventMoment"
                :dateEndEventMoment="dateEndEventMoment"
                :agendaData="createdAgendaData"
                v-if="createdAgendaData.creating || showPopup"
                @changeAgendaData="changeAgendaData($event)"
                @showPopupCreatedAgenda="showPopup=true"
                :timeStartInUnix="timeStartInUnix"
                :timeEndInUnix="timeEndInUnix"
            )
    eventAgendasPopup(
      v-if="showPopup"
      :agendaData="createdAgendaData"
      @closePopup="closePopup()"
      @changeAgendaData="changeAgendaData($event)"
      @saveAgenda="saveAgenda()"
      :timeStartCreatedAgendasInUnix="timeStartCreatedAgendas"
      :timeEndCreatedAgendasInUnix="timeEndCreatedAgendas"
      :dateStartEventMoment="dateStartEventMoment"
      :dateEndEventMoment="dateEndEventMoment"
    )
    event-agendas-popup-change(
      v-if="showPopupChange"
      :agendaData="agenda"
      :dateStartEventMoment="dateStartEventMoment"
      :dateEndEventMoment="dateEndEventMoment"
      :currentDate="currnetDate"
      @closePopupChange="closePopupChange()"
      @saveChangeAgenda="saveChangeAgenda($event)"
      @deleteAgenda="deleteAgenda($event)"
    )

            

</template>

<script>
//
const HEIGHT_HOUR = 110;
const ALL_MINUTES = [
  '00',
  '01',
  '02',
  '03',
  '04',
  '05',
];

import { mapMutations, mapState, mapGetters, mapActions } from "vuex";
import { HOURS_FOR_CALENDAR } from "../const.js";
import eventAgendasList from "./event-agendas-list.vue";
import eventAgendasCreatedAgenda from "./event-agendas-created-agenda.vue";
import eventAgendasDayHour from "./event-agendas-day-hour.vue";
import eventAgendasPopup from "./event-agendas-popup.vue";
import eventAgendasPopupChange from "./event-agendas-popup-change.vue";
import moment from "moment-timezone";

import vueCustomScrollbar from 'vue-custom-scrollbar'

export default {
  data() {
    return {
      hours: [],
      minutes: [],
      createdAgendaData: {
        timeStart: "",
        timeEnd: "",
        creating: false,
        name: "",
        description: "",
        participants: []
      },
      agenda:[],
      showPopup: false,
      showPopupChange: false,
      agendas: []
    };
  },
  props: {
    dateStart: {
      type: Number,
      default: 0
    },
    dateEnd: {
      type: Number,
      default: 0
    },
    selectedTimezone: {
      type: Object,
      default: {}
    },
    agendasList: {
      type: Array,
      default: []
    }
  },
  watch: {
    agendas: function(val) {
      this.$emit("changeAgendas", this.agendas);
    }
  },
  methods: {
    changeAgendaData(newAgendaData) {
      this.createdAgendaData = { ...this.createdAgendaData, ...newAgendaData };
    },
    changeAgenda(agenda){
      this.showPopupChange = true;
      this.agenda = agenda;
    },
    resetAgendaData() {
      this.createdAgendaData = {
        timeStart: "",
        timeEnd: "",
        creating: false,
        name: "",
        description: "",
        participants: []
      };
    },
    closePopup() {
      this.resetAgendaData();
      this.showPopup = false;
    },
    deleteAgenda(agenda) {
      const filterAgendas = this.agendas.filter(el => {
        if(agenda.ids) {
          return agenda.ids != el.ids; 
        }
        if(agenda.id) {
          return agenda.id != el.id;
        }
        return true;
      });

      this.agendas = filterAgendas;
      this.closePopupChange();
    },
    saveAgenda() {
      this.agendas.push({
        timeStart: this.timeStartCreatedAgendas,
        timeEnd: this.timeEndCreatedAgendas,
        name: this.createdAgendaData.name,
        speakers: this.createdAgendaData.participants,
        description: this.createdAgendaData.description,
        ids: this.createdAgendaData.ids,

      });
      this.showPopup = false;
    },
    saveChangeAgenda(agenda) {
      const searchAgenda = this.agendas.map(el => {
        if(agenda.ids && agenda.ids === el.ids) {
          return agenda;
        }
        
        if(agenda.id && agenda.id === el.id) {
          return agenda;
        }
        return el;
      });
      this.agendas = searchAgenda;
      this.closePopupChange();
    },
    closePopupChange() {
      this.showPopupChange = false;
    },
  },
  computed: {
    ...mapState({}),
    ...mapGetters(["getTimeZoneById"]),
    dateStartEventMoment() {
      return moment.tz(this.dateStart * 1000, this.timezone.name)
    },
    dateEndEventMoment() {
      return moment.tz(this.dateEnd * 1000, this.timezone.name)
    },
    timezone() {
      return this.getTimeZoneById(this.selectedTimezone.code);
    },
    currnetDate() {
      return this.dateStartEventMoment.format("YYYY-MM-DD");
    },
    timeStartInUnix() {
      return moment(`${this.currnetDate} ${this.createdAgendaData.timeStart}`).unix();
    },
    timeEndInUnix() {
      return moment(`${this.currnetDate} ${this.createdAgendaData.timeEnd}`).unix();
    },
    timeStartCreatedAgendas() {
      return Math.min(this.timeStartInUnix, this.timeEndInUnix);
    },
    timeEndCreatedAgendas() {
      return Math.max(this.timeStartInUnix, this.timeEndInUnix);
    },
    filteredAgendasByTime() {
      return this.agendas.sort((a,b) => {
        return a.timeStart - b.timeStart;
      })
    }
  },

  components: {
    eventAgendasList,
    eventAgendasCreatedAgenda,
    eventAgendasDayHour,
    eventAgendasPopup,
    eventAgendasPopupChange,
    vueCustomScrollbar
  },
  mounted() {
    this.hours = HOURS_FOR_CALENDAR;
    this.agendas = this.agendasList;
    const vm = this;
    document.addEventListener("mouseup", function() {
      
      if(vm.createdAgendaData.creating) {
        vm.createdAgendaData.creating = false;
        vm.showPopup = true;
      }
    })
  }
};
</script>
