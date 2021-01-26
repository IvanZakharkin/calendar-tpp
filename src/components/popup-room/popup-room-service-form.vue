<template lang="pug">
    .popup-add-room__option-services
        table.table.table-striped.popup-add-room__option-service
            colgroup
                col(width="5%")
                col(width="50%")
                col(width="48%")

            tr
                td
                td
                    input(type="text" class="form-control form-control-sm" v-model="name")
                td
                    .input-group.mb-3
                        input.form-control.form-control-sm(type='text' v-model="product_price")
                        .input-group-append
                            .dropdown
                                button.input-group-text.btn(href='#' role='button' data-toggle='dropdown')
                                    | Dropdown link
                                .dropdown-menu
                                    button.dropdown-item(v-for="currency in currencyList") {{currency}}
                td
                    input(type="text" class="form-control form-control-sm")
                td
                    input(type="text" class="form-control form-control-sm")
                td 
                    button.btn.popup-add-room__option-service-delete(
                        type="button"
                        @click="deleteService(selectService)"
                    )
                        i.fas.fa-plus
</template>
<script>
import { mapMutations, mapState, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },

  methods: {
    // ...mapMutations(["closePopapAddingCalendar", "resetEditRoom"]),
    // ...mapActions(["sendNewRoom", "showRoomOnMap", "deleteRoom"]),
  },
  components: {},
  computed: {
    ...mapState({
      timeZones: state => state.calendar.timeZones,
      editRoom: state => state.calendar.editRoom,
      shownPopapAddingCalendar: state => state.calendar.shownPopapAddingCalendar,
      editingRoom: state => state.calendar.editingRoom,
      measuresList: state => state.calendar.measuresList,
      currencyList: state => state.calendar.currencyList
    }),
    ...mapGetters([
      "getCurrentTimeZone",
      "getTimeZoneById",
      "timeZonesForSelect"
    ]),
  },
  mounted() {}
};
</script>