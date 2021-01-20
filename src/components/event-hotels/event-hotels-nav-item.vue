<template lang="pug">
  li.nav-item.calendar-event-hotels__nav-list-item()
    a.nav-link(
      :href="hotelHref"
      data-toggle="tab"
      :class="{active: index==0}"
      ) {{hotel.name}}
      i.fas.fa-times.ml-2(
        @click="deleteHotel()"
      )
</template>

<script>

import { mapMutations, mapState, mapGetters, mapActions } from "vuex";
import vSelect from "../v-select/components/Select.vue";
export default {
  data() {
    return {
    };
  },
  props: {
    hotel: {
      type: Object,
      default: {}
    },
    index: {
      type: Number,
      default: -1
    }
  },
  watch: {
  },
  methods: {
    deleteHotel() {
      this.$emit("deleteHotel", this.hotel)
    }
  },
  computed: {
    ...mapState({}),
    ...mapGetters(["getTimeZoneById"]),
    hotelHref() {
      // return this.hotel.id
      if(this.hotel.id) return `#hotel-id-${this.hotel.id}`
      if(this.hotel.ids) return `#hotel-ids-${this.hotel.ids}`
    }
  },

  components: {
    vSelect
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

      &.active {
        width: auto;
        overflow: none;
        opacity: 1;
        z-index: 10;
      }
    }
  }
}

</style>