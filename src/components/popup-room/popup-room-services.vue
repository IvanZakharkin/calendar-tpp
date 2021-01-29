<template lang="pug">
div
  .popup-add-room__info-title Услуги
  .popup-add-room__option.popup-add-room__option_vertical
    .d-flex.align-items-center
      //- .popup-add-room__option-title.mb-0 Услуги
      button.btn.popup-add-room__option-services-add(@click="showServiceForm" type="button" v-show="!serviceFormShown") + Добавить
    transition(name="fade")
        popup-room-services-form(
          :changingService="service"  
          v-if="serviceFormShown" 
          @saveService="changeService($event)"
          @cancelService="hideServiceForm")
    .popup-add-room__option-services
      table.popup-add-room__option-services
        colgroup
          col(width="5%")
          col(width="40%")
          col(width="15%")
          col(width="15%")
          col(width="15%")
          col(width="10%")
        tr(
          v-for="(service, index) in servicesList"
          :key="`service-${service.id}`"
          :class="[isEditServices(service.id) ? 'border border-warning' : '']"
        )
          td {{index + 1}}
          td {{service.name}} 
          td {{service.price}} {{getCurrencyNameById(service.currency)}}
          td {{service.ratio}} {{getMeasureNameById(service.measure)}}
          td {{getTypeNameByExternalId(service.type)}}
          td 
            button.px-1.btn.popup-add-room__option-service-btn(
              type="button"
              @click="editService(service)"
            )
              i.far.fa-edit
            button.px-1.btn.popup-add-room__option-service-btn(
              type="button"
              @click="deleteService(service.id)"
            )
              i.far.fa-times-circle
              
      
        //- ul.popup-add-room__option-services-list
        //-   li.popup-add-room__option-service(
        //-     v-for="service in servicesList"
        //-     :key="`service-${service.id}`"
        //-   )
        //-     .popup-add-room__option-service-num {{service.id}}
        //-     .popup-add-room__option-service-title {{service.name}}   
        //-     .popup-add-room__option-service-value {{}}
        //-     .popup-add-room__option-service-price {{service.price}}
        //-     button.btn.popup-add-room__option-service-delete(
        //-       type="button"
        //-       @click="deleteService(selectService)"
        //-     )
        //-       i.fas.fa-times
</template>
<script>
import popupRoomServicesForm from "./popup-room-services-form";
import { getRandomInt } from '../../functions.js';
import { mapMutations, mapState, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      servicesList: [],
      service: {
        name: '',
        price: '',
        ratio: '',
        currency: '',
        measure: '',
        type: ''
      },
      serviceFormShown: false
    }
  },
  watch: {
    servicesList(data) {
      this.$emit('changeServicesList', data)
    }
  },
  methods: {
    // ...mapMutations(["closePopapAddingCalendar", "resetEditRoom"]),
    // ...mapActions(["sendNewRoom", "showRoomOnMap", "deleteRoom"]),
    resetService() {
      this.service.name='';
      this.service.price = '';
      this.service.ratio = '';
      this.service.currency = this.currencyList[0].id;
      this.service.measure = this.measuresList[0].id;
      this.service.type = '';
      this.service.id = 'f' + getRandomInt();;
      
    },
    showServiceForm() {
      this.serviceFormShown = true;
    },
    hideServiceForm() {
      this.resetService();
      this.serviceFormShown = false;
    },
    changeService(service) {
      const index = this.servicesList.findIndex((el) => String(el.id) === String(service.id));
      if(index === -1) {
        this.servicesList.push(service);
      } else {
        this.servicesList[index] = service;
      }
      this.resetService();
      this.hideServiceForm();
    },
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
      if(!result) return 'Другое';
      return result.value;
    },
    deleteService(id) {
      this.servicesList = this.servicesList.filter(el => el.id !== id);
    },
    editService(service) {
      this.service = service;
      this.showServiceForm();
    },
    isEditServices(id) {
      console.log(id, this.service);
      return id === this.service.id;
    }
  },
  props: {},
  components: {
    popupRoomServicesForm
  },
  computed: {
    ...mapState({
      editRoom: state => state.calendar.editRoom,
      measuresList: state => state.calendar.measureList,
      currencyList: state => state.calendar.currencyList,
      typesList: state => state.calendar.services
    })
  },
  mounted() {
    
    this.servicesList = this.editRoom.servicesList;
    this.resetService();
    console.log(this.servicesList);
  }
};
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>