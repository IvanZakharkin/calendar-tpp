<template lang="pug">
  .calendar-popup-add-calendar.card
    .card-body
      h5.calendar-popup-add-calendar__title Новый календарь
      button.close.calendar-popup-add-calendar__btn-close(
        type='button'
        data-dismiss='modal'
        aria-label='Close'
        @click="closePopup()"
        
        )
        span(aria-hidden='true') ×
      .calendar-popup-add-calendar__body
        input.calendar-popup-add-calendar__input(
          placeholder="Название"
          v-model="name"
          )
        .calendar-popup-add-calendar__row
          .calendar-popup-add-calendar__icon
            i.fas.fa-map-marker-alt.mr-2
          input.calendar-popup-add-calendar__select(
            placeholder="Местоположение"
            v-model="location"
            )
        .calendar-popup-add-calendar__row
          .calendar-popup-add-calendar__icon
            i.fas.fa-check
          input.calendar-popup-add-calendar__select(
            placeholder="Ответсвенный"
            v-model="responsiblePerson"
            )
      .calendar-popup-add-calendar__footer
        button.btn.btn-primary(
          @click="createCalendar()"
        ) Создать
</template>

<script>
import { mapMutations } from "vuex";


export default {
  data() {
    return {
      name: "",
      location: "",
      responsiblePerson: "",
    };
  },
  methods: {
    ...mapMutations(["closePopapAddingCalendar", "addCalendar"]),
    getRandomColor() {
      return '#' + (Math.random().toString(16) + '000000').substring(2,8).toUpperCase();
    },
    resetData() {
      this.name = "";
      this.location = "";
      this.responsiblePerson = "";
      this.color = "";
    },
    closePopup() {
      this.resetData()
      this.closePopapAddingCalendar();
    },
    createCalendar(){
      const calendar = {
        name: this.name,
        location: this.location,
        responsiblePerson: this.responsiblePerson,
        color: this.getRandomColor()
      }
      this.addCalendar(calendar);
      this.closePopapAddingCalendar();
      this.resetData();
    }
  }
};
</script>

<style lang="scss" scoped>
@import './styles/calendar-popup-add-calendar.scss';

.calendar-popup-add-calendar {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 22.8125rem;
}
</style>
