<template lang="pug">
.calendar-event-hotels
    ul.nav.nav-tabs.calendar-event-hotels__nav-list
      event-hotels-nav-item(
        v-for="(hotel, index) in hotels"
        :hotel="hotel"
        :index="index"
        :key="hotel.id ? `hotel-nav-id-${hotel.id}` : `hotel-nav-ids-${hotel.ids}`"
        @deleteHotel="deleteHotel($event)"
      )
      li.nav-item.calendar-event-hotels__list-item_input(:class="{ 'active': focusOnInputName }")
        input.nav-link.active(
          ref="inputName"
          v-model="templateHotel.name"
          @focus="focusOnInputName=true" 
          @keyup.enter="addNewHotel()"
        )
        .btn-group.btn-group-sm(role='group', aria-label='First group')
          button.btn(type='button' @click="addNewHotel()")
            i.fas.fa-check.text-success
          button.btn(type='button' @click="focusOnInputName=false;resetTemplateHotel()")
            i.fas.fa-times.text-muted
      li.nav-item(
        v-show="!focusOnInputName"
      )
        a.nav-link(
          href='#'
          @click="showInput()"
        ) 
          i.fas.fa-plus-circle
    .tab-content.calendar-event-hotels__tabs.py-3
      event-hotels-item(
        v-for="(hotel, index) in hotels"
        :key="hotel.id ? `hotel-id-${hotel.id}` : `hotel-ids-${hotel.ids}`"
        :hotel="hotel"
        :index="index"
        @changeHotel="changeHotel($event)"
        @changeParticipantFromHotel="changeParticipantFromHotel($event)"
      )
</template>

<script>

import { mapMutations, mapState, mapGetters, mapActions } from "vuex";
import eventHotelsItem from "./event-hotels-item.vue";
import eventHotelsNavItem from "./event-hotels-nav-item.vue";

export default {
  data() {
    return {
      // hotels: [],
      focusOnInputName: false,
      templateHotel: {
        name: "",
        ids: 0,
        tel: "",
        email: "",
        responsiblePerson: [],
        registered: [],
      }

    };
  },
  props: {
    hotels: {
      type: Array,
      default: []
    }
  },
  watch: {
  },
  methods: {
    showInput() {
      this.$refs.inputName.focus();
    },
    addNewHotel() {
      if(!this.templateHotel.name) {
        this.templateHotel.name = '';
        this.focusOnInputName = false;
        return;
      }
      this.templateHotel.ids = this.generateId();

      this.templateHotel.test = [];
      this.hotels.push(this.templateHotel);
      this.resetTemplateHotel();
      this.focusOnInputName = false;
    },
    generateId() {
      let rand = - 0.5 + Math.random() * (10000 + 1);
      return Math.round(rand);
    },
    resetTemplateHotel(){
      const templateHotel = {
        name: "",
        ids: 0,
        tel: "",
        email: "",
        responsiblePerson: [],
        registered: [],
      };
      this.templateHotel = templateHotel;
    },
    changeHotel(hotel) {
      const hotels = this.hotels.map(el => {
        if(hotel.id && el.id && hotel.id === el.id) {
          return hotel;
        }
        if(hotel.ids && el.ids && hotel.ids === el.ids) {
          return hotel;
        }
        return el;
      })
      this.$emit("changeHotels", hotels);
    },
    changeParticipantFromHotel(data) {
      this.$emit("changeParticipantFromHotel", data);
    },
    deleteHotel(hotel) {
      const hotels = this.hotels.filter(el => {
        if(hotel.id && el.id) {
          return hotel.id != el.id;
        }
        if(hotel.ids && el.ids ) {
          return hotel.ids != el.ids;
        }
        return true;
      })
      this.$emit("changeHotels", hotels);
    }
  },
  computed: {
    ...mapState({}),
    ...mapGetters(["getTimeZoneById"]),
  },

  components: {
    eventHotelsItem,
    eventHotelsNavItem
  },
  mounted() {
    
  }
};
</script>

<style lang="scss">

.calendar-event-hotels {
  &__list-item {
    &_input {
      width: 0;
      overflow: hidden;
      opacity: 0;
      z-index: -1;
      position: relative;

      &.active {
        width: auto;
        overflow: none;
        opacity: 1;
        z-index: 10;
      }

      .btn-group {
        position: absolute;
        top: 5px;
        right: 0px;
      }
    }
  }
}

</style>