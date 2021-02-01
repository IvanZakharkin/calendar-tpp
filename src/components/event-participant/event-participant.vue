<template lang="pug">
    
.calendar-event-participant
        .calendar-event-popup-fullscreen__options
          .calendar-event-popup-fullscreen__options-row.align-items-center
              .calendar-event-popup-fullscreen__options-title Шаблон
              .v-select-template
                  v-select(v-model="selectedTemplates" :options="templatesForSelect")
          .calendar-event-popup-fullscreen__options-row
            .calendar-event-popup-fullscreen__options-title.mb-2 Регистрация
            .calendar-event-popup-fullscreen__options-checkbox-item(
              v-for="item in registrationList"
            )
              label.checkbox
                input.checkbox__input(
                    type='checkbox'
                    @change="changeRegistration($event, item)"
                    :checked="registrationItemChecked(item)"
                )
                .checkbox__title {{item.value}}
          .calendar-event-popup-fullscreen__options-row.justify-content-end
            .calendar-event-popup-fullscreen__add-participant
              button.btn.calendar-event-popup-fullscreen__add-participant-title(
                @click="focusToInput()"
              ) + Добавить участника
              .v-select-participant
                v-select(multiple v-model="selectedAttendees" :options="attendees" @search="onSearch")
            button.btn.calendar-event-popup-fullscreen__to-excel(
              :disabled="!checkForExcel"
              data-toggle="tooltip" 
              data-placement="top" 
              :title="!checkForExcel ? 'Сохарните изменения' : ''"
              @click="toExcel()"
            )
              i.fas.fa-file-excel
              .calendar-event-popup-fullscreen__to-excel-title Отправить в Excel
            .calendar-event-participant__view-btns
                button.btn.calendar-event-participant__view-btn(
                    :class="{'calendar-event-participant__view-btn_active': showViewTable}"
                    type="button"
                    @click="showViewTable=true; showViewCards=false"
                )
                    i.fas.fa-table
                button.btn.calendar-event-participant__view-btn(
                    :class="{'calendar-event-participant__view-btn_active': showViewCards}"
                    type="button"
                    @click="showViewTable=false; showViewCards=true"
                )
                    i.fas.fa-list
        .calendar-event-participant__container
            .calendar-event-participant__view-table(v-if="showViewTable")
                .calendar-event-participant__table
                    event-participant-table-filter(
                      :participants="selectedAttendees"
                      :hotels="hotels"
                      @search="searchСurrent($event)"
                      @changeRoleAllParticipants="changeRoleAllParticipants($event)"
                      @filterPatricipantByCheckedRole="filterPatricipantByCheckedRole($event)"
                      @filterPatricipantByUncheckedRole="filterPatricipantByUncheckedRole($event)"
                    )
                    event-participant-table-person(
                        v-for="(attendant,index) in filteredAttendeesByRoles"
                        :key="`${attendant.code}-${index}`"
                        :hotels="hotels"
                        :participant="attendant"
                        @deleteParticipant="deleteParticipant($event)"
                        @selectRole="selectRole($event, attendant)"
                        @changePersonHotel="changePersonHotel($event)"
                    )
            .calendar-event-participant__view-cards(v-if="showViewCards")
                ul.calendar-event-participant__cards-list
                    li.calendar-event-participant__cards-list-item(
                        v-for="attendant in selectedAttendees"
                    )
                        event-participant-card(
                            :key="`${attendant.code}-${index}`"
                            :participant="attendant"
                            @addRole="addRole($event, attendant)"
                            @deleteRole="deleteRole($event, attendant)"
                            @deleteParticipant="deleteParticipant($event)"
                        )
</template>

<script>
import eventParticipantTablePerson from "./event-participant-table-person.vue";
import eventParticipantTableFilter from "./event-participant-table-filter.vue";
import eventParticipantCard from "./event-participant-card.vue";
import vSelect from "../v-select/components/Select.vue";
import { mapMutations, mapState, mapGetters, mapActions } from "vuex";
function debounce(fn, interval) {
    var timer;
    return function debounced() {
        clearTimeout(timer);
        var args = arguments;
        var that = this;
        timer = setTimeout(function callOriginalFn() {
             fn.apply(that, args);
        }, interval);
    };
}
export default {
  data() {
    return {
      attendees: [],
      selectedAttendees: [ ],
      showViewTable: true,
      showViewCards: false,
      filterValue: "",
      valueFilterCheckedRole: [],
      valueFilterUncheckedRole: [],
      templates: [],
      selectedTemplates: [],
      registrationEvent: [],
      originAttendies: []
    };
  },
  props: {
    selectedParticipant: {
      type: Array,
      default: []
    },
    eventId: {
      type: Number,
      default: 0
    },
    registration: {
      type: Array,
      default: []
    },
    hotels: {
      type: Array,
      default: []
    }
  },
  watch: {
    selectedAttendees: function(val) {
      this.$emit("changeParticipant", this.selectedAttendees);
    },
    selectedTemplates: function(val) {
      this.selectedAttendees = [
        ...this.selectedAttendees,
        ...this.selectedTemplates.attendies
      ];
      this.$emit("changeTemplates", this.selectedAttendees);
    },
    attendeesWithHotel: function(val) {
      console.log(val);
    } 
  },
  methods: {
    toExcel() {
      window.open(
        `?ajax=Y&action=excel-export&id=${this.eventId}`,
        "Экспорт участников",
        "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes"
      );
    },
    registrationItemChecked(item) {
      return this.registrationEvent.includes(item.id);
    },
    changeRegistration(event, item) {
      if (event.target.checked) {
        this.registrationEvent.push(item.id);
      } else {
        this.registrationEvent = this.registrationEvent.filter(
          el => el != item.id
        );
      }
      this.$emit("changeregistration", this.registrationEvent);
    },
    // getSelectedAttendantById() {

    // },
    addRole(event, attendant) {
      attendant.roles.push(event.id);
      this.$emit("changeParticipant", this.selectedAttendees);
    },
    deleteRole(event, attendant) {
      attendant.roles = attendant.roles.filter(el => el != event.id);
      this.$emit("changeParticipant", this.selectedAttendees);
    },
    deleteParticipant(participant) {
      this.selectedAttendees = this.selectedAttendees.filter(
        el => el.code != participant.code
      );
      this.$emit("changeParticipant", this.selectedAttendees);
    },
    selectRole(dataRole, attendant) {
      if (dataRole.check) {
        attendant.roles.push(dataRole.role.id);
      } else {
        attendant.roles = attendant.roles.filter(el => el != dataRole.role.id);
      }
      this.$emit("changeParticipant", this.selectedAttendees);
    },
    searchСurrent(filterValue) {
      this.filterValue = filterValue;
    },
    changeRoleAllParticipants(dataRole) {
      const checkedFilteredAttendeesByRoles = this.filteredAttendeesByRoles.map(
        attendant => {
          if (dataRole.check) {
            if (!attendant.roles.includes(dataRole.role.id))
              attendant.roles.push(dataRole.role.id);
          } else {
            const index = attendant.roles.indexOf(dataRole.role.id);
            if (index > -1) attendant.roles.splice(index, 1);
          }
          return attendant;
        }
      );
    },
    filterPatricipantByUncheckedRole(dataRole) {
      if (dataRole.check) {
        this.valueFilterUncheckedRole.push(dataRole.role.id);
      } else {
        const index = this.valueFilterUncheckedRole.indexOf(dataRole.role.id);
        if (index > -1) this.valueFilterUncheckedRole.splice(index, 1);
      }
    },
    filterPatricipantByCheckedRole(dataRole) {
      if (dataRole.check) {
        this.valueFilterCheckedRole.push(dataRole.role.id);
      } else {
        const index = this.valueFilterCheckedRole.indexOf(dataRole.role.id);
        if (index > -1) this.valueFilterCheckedRole.splice(index, 1);
      }
    },
    focusToInput() {
      $(".v-select-participant")
        .find("input")
        .focus();
    },
    onSearch(search, loading) {
      loading(true);
      this.search(loading, search, this);
    },
    search: debounce((loading, search, vm) => {
      $.ajax({
        type: "POST",
        url: "./index.php",
        data: {
          ajax: "Y",
          action: "search-users",
          name: `${search}`
        },
        success: function(response) {
          vm.attendees = response.data;
          loading(false);
        }
      });
    }, 500),
    getTemplates() {
      const vm = this;
      $.ajax({
        type: "POST",
        url: "./index.php",
        data: {
          ajax: "Y",
          action: "get-templates"
        },
        success: function(response) {
          vm.templates = response.data;
        }
      });
    },
    getAttendantById(id, attendees) {
      return attendees.filter(el => {
        return el.code === id;
      })[0];
    },
    changePersonHotel(data) {
      this.$emit("changePersonHotel", data);
    }
  },
  computed: {
    ...mapState({
      roles: state => state.calendar.roles,
      registrationList: state => state.calendar.registration,
      originEvent: state => state.calendar.event
    }),
    templatesForSelect() {
      return this.templates.map(el => {
        return {
          label: el.name,
          code: el.id,
          attendies: el.attendies
        };
      });
    },
    checkForExcel() {
      const idsOriginAttendies = this.originAttendies.map(el => el.code);
      const idsSelectedAttendees = this.selectedAttendees.map(el => el.code);
      if (idsOriginAttendies.length != idsSelectedAttendees.length)
        return false;
      const noChangeAttendies = idsOriginAttendies.every((el, index) => {
        return idsSelectedAttendees.includes(el);
      });
      if (noChangeAttendies) {
        return this.selectedAttendees.every(el => {
          return (
            JSON.stringify(el.roles) ===
            JSON.stringify(
              this.getAttendantById(el.code, this.originAttendies).roles
            )
          );
        });
      } else {
        return false;
      }
      return true;
    },
    attendeesWithHotel() {
      return this.selectedAttendees.map(person => {
        person.idHotel = [];
        person.idsHotel = [];
        this.hotels.forEach(hotel => {
          if (hotel.responsiblePerson != void 0 && hotel.responsiblePerson.length != 0) {
            if (String(hotel.responsiblePerson[0].code) === String(person.code)) {
              if(hotel.id) {
                person.idHotel.push(hotel.id);
              } else {
                person.idsHotel.push(hotel.ids);
              }
            } 
          };
        });
        return person;
      });
    },
    filteredAttendeesByName() {
      return this.attendeesWithHotel.filter(
        item =>
          item.label.toLowerCase().indexOf(this.filterValue.toLowerCase()) !== -1
      );
    },

    filteredAttendeesByRoles() {
      if (
        !this.valueFilterCheckedRole.length &&
        !this.valueFilterUncheckedRole.length
      ) {
        return this.filteredAttendeesByName;
      } else {
        return this.filteredAttendeesByName.filter(attendant => {
          const a1 = this.valueFilterCheckedRole.every(checkedRole => {
            return attendant.roles.includes(checkedRole);
          });
          const a2 = this.valueFilterUncheckedRole.every(uncheckedRole => {
            return !attendant.roles.includes(uncheckedRole);
          });
          return a1 && a2;
        });
      }
    }
  },

  components: {
    eventParticipantCard,
    eventParticipantTablePerson,
    eventParticipantTableFilter,
    vSelect
  },
  mounted() {
    this.getTemplates();
    this.registrationEvent = this.registration;
    this.originAttendies = this.originEvent.attendees.map(el => {
      return JSON.parse(JSON.stringify(el));
    });
    this.selectedAttendees = this.selectedParticipant;
  }
};
</script>

<style lang="scss">
</style>