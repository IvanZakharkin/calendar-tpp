<template lang="pug">
.mb-4
    .calendar-event-popup-fullscreen__options-title.mb-2 Услуги
    table.popup-add-room__option-services
        colgroup
            col(width="40%")
            col(width="15%")
            col(width="15%")
            col(width="15%")
            col(width="10%")
        tr(v-for="service in servicesList" :key="`service-${service.id}`")
            td
                label.checkbox.checkbox_event-service
                    input.checkbox__input(type="checkbox" :checked="isServiceChecked(service)" @change="checkService(service)")
                    .checkbox__title {{service.name}} 
            td {{service.price}} {{getCurrencyNameById(service.currency)}}
            td {{service.ratio}} {{getMeasureNameById(service.measure)}}
            td {{getTypeNameByExternalId(service.type)}}
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      services: []
    }
  },
  watch: {},
  props: {
      servicesList: {
          type: Array,
          default() {
              return [];
          }
      },
      eventServices: {
          type: Array,
          default() {
              return [];
          }
      }
  },

  methods: {
    // ...mapMutations(["closePopapAddingCalendar", "resetEditRoom"]),
    // ...mapActions(["sendNewRoom", "showRoomOnMap", "deleteRoom"]),
    getCurrencyNameById(id) {
      const result = this.currencyList.filter(el => String(el.id) === String(id))[0];
      if(!result) return '';
      return result.name;
    }, 
    getMeasureNameById(id) {
      const result = this.measuresList.filter(el => String(el.id) === String(id))[0];
      if(!result) return '';
      return result.name;
    },
    getTypeNameByExternalId(eid) {
      const result = this.typesList.filter(el => el.externalId === eid)[0];
      if(!result) return '';
      return result.value;
    },
    checkService(service) {
        let services = [...this.eventServices];
        if (event.target.checked) {
            services.push(service.id);
        } else {
            services = services.filter(el => el != service.id);
        }
        this.$emit('changeServices', services)
    },
    isServiceChecked(service) {
        if(!service) return;
        console.log(service, this.eventServices);
      return this.eventServices.includes(Number(service.id));
    },
  },
  components: {},
  computed: {
    ...mapState({
      editRoom: state => state.calendar.editRoom,
      measuresList: state => state.calendar.measureList,
      currencyList: state => state.calendar.currencyList,
      typesList: state => state.calendar.services
    })
  },
  mounted() {
  }
};
</script>

<style>
</style>