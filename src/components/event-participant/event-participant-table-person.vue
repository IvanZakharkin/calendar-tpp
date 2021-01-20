<template lang="pug">
    .calendar-event-participant__table-row
        .calendar-event-participant__table-cell.justify-content-start
            .calendar-event-participant__table-person
                .calendar-event-participant__table-person-avatar
                    img.calendar-event-participant__table-person-avatar-img(
                        :src="participant.avatar"
                        v-if="participant.avatar"
                    )
                    .calendar-event-participant__table-person-initials(
                        v-else
                    ) {{initials}}
                .calendar-event-participant__table-person-name {{participant.label}}
                button.btn.calendar-event-participant__table-person-delete(
                    type="button"
                    @click="deleteParticipant()"
                    :disabled="participant.idHotel.length != 0 || participant.idsHotel.length != 0"
                )
                    i.fas.fa-times
        .calendar-event-participant__table-cell.justify-content-center
            i.fas.fa-check
        
        .calendar-event-participant__table-cell(
            v-for="(role, index) in roles"
            )
            .calendar-event-participant__table-role(
            )
                label.checkbox
                    input.checkbox__input(
                        type='checkbox'
                        @change="selectRole($event, role)"
                        :checked="roleChecked(role)"
                        )
                    .checkbox__title
        .calendar-event-participant__table-cell(
            v-for="(hotel, index) in hotels"
            )
            .calendar-event-participant__table-role(
            )
                label.checkbox
                    input.checkbox__input(
                        :disabled="hotelChecked(hotel)"
                        type='checkbox'
                        :checked="hotelChecked(hotel)"
                        @change="changePersonHotel($event, hotel)"
                        )
                    .checkbox__title
</template>

<script>
import { mapMutations, mapState, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
    };
  },
  props: {
      participant: {
          type: Object,
          default: {}
      },
      hotels: {
          type: Array,
          default: []
      }
  },

  methods: {
    deleteParticipant() {
        this.$emit("deleteParticipant", this.participant)
    },
    selectRole(event, role, participant) {
        this.$emit("selectRole", {
            check: event.target.checked,
            role
        })
    },
    roleChecked(role) {
      return this.participant.roles.includes(role.id);
    },
    hotelChecked(hotel) {
        if (hotel.id) {
            return this.participant.idHotel.includes(hotel.id);
        } else {
            return this.participant.idsHotel.includes(hotel.ids);
        }
    },
    changePersonHotel(event, hotel) {
        this.$emit("changePersonHotel", {
            person: {code: this.participant.code, label: this.participant.label},
            hotel: hotel
        })
    }
  },
  computed: {
      ...mapState({
      roles: state => state.calendar.roles,
    }),
    initials() {
        const nameParticipantinInArray = this.participant.label.split(" ");
        const firstLetter = nameParticipantinInArray[0][0];
        const secondLetter = nameParticipantinInArray[1][0];
        return `${firstLetter}${secondLetter}`;
        // return secondLetter;
    }
  },

  components: {
  },
  mounted() {
  }
};
</script>

<style lang="scss">
</style>