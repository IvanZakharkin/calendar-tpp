<template lang="pug">
.tab-pane.calendar-event-hotels__tab(
  role='tabpanel'
  :id="hotelId"
  :class="{'active show': index == 0}"
)
  .w-50
    .d-flex.flex-column.mb-3
      .mb-2.calendar-event-hotels__tab-option-title Ответсвенный
      vSelect.w-100.mb-2(v-model="responsiblePerson" :options="responsiblePersons" @search="onSearch")
      .row.m-0.py-2.border-bottom.text-muted(v-if="Object.keys(responsiblePerson).length && (responsiblePerson.work_position || responsiblePerson.work_company)")
        div( :class="responsiblePerson.avatar ? 'col-8' : 'col-12'")
          p(v-if="responsiblePerson.work_position") Должность: <strong>{{responsiblePerson.work_position}}</strong>
          p(v-if="responsiblePerson.work_company") Организация: <strong>{{responsiblePerson.work_company}}</strong>
        .col-4(v-if="responsiblePerson.avatar")
          image(:src="responsiblePerson.avatar" class="w-100")
    .d-flex.flex-column.mb-3
      .mb-2.calendar-event-hotels__tab-option-title Название
      .d-flex.w-100
        input.form-control.form-control-sm(
          v-model="name"
        )
    .d-flex.flex-column.mb-3
      .mb-2.calendar-event-hotels__tab-option-title Телефон
      .d-flex.w-100
        input.form-control.form-control-sm(
          v-model="tel"
        )
    .d-flex.flex-column.mb-3
      .mb-2.calendar-event-hotels__tab-option-title E-mail
      input.form-control.form-control-sm(
        v-model="email"
        )
    .d-flex.flex-column.mb-3
      .mb-2.calendar-event-hotels__tab-option-title Адрес гостиницы
      input.form-control.form-control-sm(
        v-model="address"
        ref="hotelAddress"
        )
  .mb-2.calendar-event-hotels__tab-option-title Зарегистрировались
  table.table.table-striped.table-sm(
    v-if="hotel.registered && hotel.registered.length"
  )
    thead
      tr
        th(scope='col') 
        th(scope='col') Дата заезда
        th(scope='col') Дата выезда
        th(scope='col') Комментарий
    tbody
      tr(v-for="person in hotel.registered")
        td {{person.name}}
        td {{person.arrivalDate}}
        td {{person.departureDate}}
        td {{person.comment}}


      
</template>

<script>
import { mapMutations, mapState, mapGetters, mapActions } from "vuex";
import vSelect from "../v-select/components/Select.vue";
export default {
  data() {
    return {
      responsiblePerson: {},
      responsiblePersons: [],
      tel: "",
      email: "",
      name: "",
      address: ""
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
    responsiblePerson: function(val) {
      this.$emit("changeHotel", this.newDataHotel);
      this.$emit("changeParticipantFromHotel", this.responsiblePerson);
      if (Object.keys(val).length) {
        if (!this.tel) {
          this.tel = val.work_phone;
        }
        if (!this.email) {
          this.email = val.email;
        }
      }
    },
    tel: function(val) {
      this.$emit("changeHotel", this.newDataHotel);
    },
    email: function(val) {
      this.$emit("changeHotel", this.newDataHotel);
    },
    name: function(val) {
      this.$emit("changeHotel", this.newDataHotel);
    }
  },
  methods: {
    showInput() {
      this.$refs.inputName.focus();
    },
    addNewHotel() {
      this.templateHotel.ids = this.generateId();
      this.newHotels.push(this.templateHotel);
      this.resetTemplateHotel();
      this.focusOnInputName = false;
    },
    generateId() {
      let rand = -0.5 + Math.random() * (10000 + 1);
      return Math.round(rand);
    },
    resetTemplateHotel() {
      const templateHotel = {
        name: "",
        ids: 0
      };
      this.templateHotel = templateHotel;
    },
    onSearch(search, loading) {
      loading(true);
      this.search(loading, search, this);
    },
    search: (loading, search, vm) => {
      $.ajax({
        type: "POST",
        url: "./index.php",
        data: {
          ajax: "Y",
          action: "search-users",
          name: `${search}`
        },
        success: function(response) {
          vm.responsiblePersons = response.data;
          loading(false);
        }
      });
    }
  },
  computed: {
    ...mapState({}),
    ...mapGetters(["getTimeZoneById"]),
    hotelId() {
      if (this.hotel.id) return `hotel-id-${this.hotel.id}`;
      if (this.hotel.ids) return `hotel-ids-${this.hotel.ids}`;
    },
    newDataHotel() {
      const newHotel = {
        name: this.name,
        tel: this.tel,
        email: this.email,
        registered: this.hotel.registered
      };
      if ($.isEmptyObject(this.responsiblePerson)) {
        newHotel.responsiblePerson = [];
      } else {
        newHotel.responsiblePerson = [this.responsiblePerson];
      }
      if (this.hotel.id) newHotel.id = this.hotel.id;
      if (this.hotel.ids) newHotel.ids = this.hotel.ids;

      return newHotel;
    }
  },

  components: {
    vSelect
  },
  mounted() {
    var vm = this;
    // this.responsiblePerson = Object.keys(this.hotel.responsiblePerson).length
    //   ? this.hotel.responsiblePerson[0]
    //   : [];
    this.responsiblePerson = Object.keys(this.hotel.responsiblePerson).length ? this.hotel.responsiblePerson[0] : {};
    this.email = this.hotel.email;
    this.tel = this.hotel.tel;
    this.name = this.hotel.name;
    const suggestView = new ymaps.SuggestView(this.$refs.hotelAddress);
    suggestView.events.add("select", function(e) {
      vm.address = e.get("item").value;
    });
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
.calendar-event-hotels__tab-option-title {
  font-size: 14px;
  color: #a5a9b9;
}
</style>