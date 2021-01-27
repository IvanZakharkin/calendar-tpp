<template lang="pug">
  table.popup-add-room__option-services.border-top.mb-3.py-3.border-bottom
      colgroup
        col(width="5%")
        col(width="40%")
        col(width="15%")
        col(width="15%")
        col(width="15%")
        col(width="10%")

      tr
          td
          td
              input(type="text" class="form-control form-control-sm" placeholder="Название" v-model="service.name")
          td
              .input-group.input-group-sm
                  input.form-control(type='text' v-model="service.product_price" placeholder="Стоимость")
                  .input-group-append
                    button.dropdown-toggle.btn.btn-outline-secondary(href='#' role='button' data-toggle='dropdown') {{nameCurrency}}
                    .dropdown-menu
                        button.dropdown-item(v-for="currency in currencyList" type="button" @click="changeCurrency(currency.id)") {{currency.name}}
          td
            .input-group.input-group-sm
                  input.form-control(type='text' v-model="service.ratio" placeholder="Колличество")
                  .input-group-append
                    button.dropdown-toggle.btn.btn-outline-secondary(href='#' role='button' data-toggle='dropdown') {{nameMeasure}}
                    .dropdown-menu
                        button.dropdown-item(v-for="measure in measuresList" type="button" @click="changeMeasure(measure.id)") {{measure.name}}
          td
            .dropdown
              button.btn.btn-sm.btn-outline-secondary.dropdown-toggle(type='button' data-toggle='dropdown')
                | {{ nameType }}
              .dropdown-menu
                button.dropdown-item(type="button" v-for="type in typesList" @click="changeType(type.externalId)") {{ type.value }}
          td 
              button.px-1.btn.popup-add-room__option-service-btn(
                  type="button"
                  @click="saveService"
              )
                  i.far.fa-check-circle
              button.px-1.btn.popup-add-room__option-service-btn(
                  type="button"
                  @click="cancelService"
              )
                  i.far.fa-times-circle
</template>
<script>
import { mapMutations, mapState, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      service: {
        name: '',
        product_price: '',
        ratio: '',
        currency: '',
        measure: '',
        type: ''
      }
    };
  },

  methods: {
    // ...mapMutations(["closePopapAddingCalendar", "resetEditRoom"]),
    // ...mapActions(["sendNewRoom", "showRoomOnMap", "deleteRoom"]),
    changeCurrency(id) {
      this.service.currency = id;
    },
    changeMeasure(id) {
      this.service.measure = id;
    },
    changeType(type) {
      this.service.type = type;
    },
    saveService() {
      this.$emit('saveService', this.service);
    },
    cancelService() {
      this.$emit('cancelService');
    },
  },
  props: {
    changingService: {
      type: Object,
      default() {
        return {}
      }
    },
    index: {
      type: Number,
      default: 0
    }
  },
  watch: {
    changingService(data) {
      this.service = JSON.parse(JSON.stringify(data));
    }
  },
  components: {},
  computed: {
    ...mapState({
      measuresList: state => state.calendar.measureList,
      currencyList: state => state.calendar.currencyList,
      typesList: state => state.calendar.services
    }),
    nameCurrency() {
      if(!this.service.currency) return '';
      return this.currencyList.filter(el => el.id === this.service.currency)[0].name;
    },
    nameMeasure() {
      if(!this.service.measure) return '';
      return this.measuresList.filter(el => el.id === this.service.measure)[0].name;
    },
    nameType() {
      if(!this.service.type) return 'Другое';
      return this.typesList.filter(el => el.externalId === this.service.type)[0].value;
    }
  },
  created() {

  },
  mounted() {
    this.service = JSON.parse(JSON.stringify(this.changingService));
  }
};
</script>