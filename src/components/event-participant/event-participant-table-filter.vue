<template lang="pug">
    .calendar-event-participant__table-row.calendar-event-participant__table-row_head
        .calendar-event-participant__table-cell
            input.calendar-event-participant__table-filter(
                placeholder="Поиск + фильтр"
                type="text"
                v-model="search"
                autocomplete="off"
                @focus="focusOnInput=true"
                :readonly="!focusOnInput"
            )
            button.btn.calendar-event-participant__table-filter-btn
                i.fas.fa-search
            button.btn.calendar-event-participant__table-filter-btn(
                @click="clearSearch"
            )
                i.fas.fa-times
        .calendar-event-participant__table-cell.justify-content-center
            i.far.fa-envelope
        .calendar-event-participant__table-cell(
            v-for="role in roles"
            :data-title="role.name"
        )
            event-participant-table-filter-dropdown(
                :role="role"
                @filterPatricipantByCheckedRole="filterPatricipantByCheckedRole($event)"
                @filterPatricipantByUncheckedRole="filterPatricipantByUncheckedRole($event)"
            )           
            .calendar-event-participant__table-role(
                :class="{'calendar-event-participant__table-role_few': fewRoles, 'calendar-event-participant__table-role_all': allRoles}"
            )
                label.checkbox
                    input.checkbox__input(
                        type='checkbox'
                        @change="changeRoleAllParticipants($event, role)"
                        )
                    .checkbox__title
        .calendar-event-participant__table-cell(
            v-for="hotel in hotels"
            :data-title="`Ответсвенный - ${hotel.name}`"
        )
          //-  event-participant-table-filter-dropdown(
          //-       :role="role"
          //-   )           
</template>

<script>
import { mapMutations, mapState, mapGetters, mapActions } from "vuex";
import eventParticipantTableFilterDropdown from "./event-participant-table-filter-dropdown.vue";

export default {
  data() {
    return {
      search: "",
      fewRoles: false,
      allRoles: false,
      filterActive: false,
      focusOnInput: false
    };
  },
  watch: {
    search: function(val) {
      this.$emit("search", val);
    }
  },
  props: {
    participants: {
        type: Array,
        default: []
    },
    hotels: {
        type: Array,
        default: []
    },

  },

  methods: {
    clearSearch() {
      this.search = "";
    },
    changeRoleAllParticipants(event,role) {
        this.$emit("changeRoleAllParticipants", {
            check: event.target.checked,
            role
        })
    },
    filterPatricipantByCheckedRole(event) {
        this.$emit("filterPatricipantByCheckedRole", event)
    },
    filterPatricipantByUncheckedRole(event) {
        this.$emit("filterPatricipantByUncheckedRole", event)
    }
  },
  computed: {
    ...mapState({
      roles: state => state.calendar.roles
    })
  },

  components: {
      eventParticipantTableFilterDropdown
  },
  mounted() {
  }
};
</script>

<style lang="scss">
</style>