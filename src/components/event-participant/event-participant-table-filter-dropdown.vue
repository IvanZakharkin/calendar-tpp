<template lang="pug">
    .dropdown.calendar-event-participant__table-filter-dropdown(
        v-show="filterHover || checkedRole || uncheckedRole"
        ref="filterDropdown"
    )
        button.calendar-event-participant__table-filter-btn.btn(
            type='button', 
            data-toggle='dropdown'
            :class="{'calendar-event-participant__table-filter-btn_active': checkedRole || uncheckedRole}"
            
            )
            i.fas.fa-filter
        .dropdown-menu
            .dropdown-item
                label.checkbox.checkbox_square
                    input.checkbox__input(
                        type='checkbox'
                        v-model="checkedRole"
                    )
                    .checkbox__title да
            .dropdown-item
                label.checkbox.checkbox_square
                    input.checkbox__input(
                        type='checkbox'
                        v-model="uncheckedRole"
                        )
                    .checkbox__title нет

</template>

<script>
import { mapMutations, mapState, mapGetters, mapActions } from "vuex";


export default {
  data() {
    return {
        checkedRole: false,
        uncheckedRole: false,
        filterHover: false
    };
  },
  watch: {
    checkedRole: function(val) {
        if(this.uncheckedRole && val) {
            this.uncheckedRole = false
        }
        this.$emit("filterPatricipantByCheckedRole", {
            check: val,
            role: this.role
        })
    },
    uncheckedRole: function(val) {
        if(this.checkedRole && val) {
            this.checkedRole = false
        }
        this.$emit("filterPatricipantByUncheckedRole", {
            check: val,
            role: this.role
        })
    },
  },
  props: {
      role: {
          type: Object,
          default: {}
      },
    //   filterHover: {
    //       type: Boolean,
    //       default: false
    //   }
  },

  methods: {

  },
  computed: {
    ...mapState({
      roles: state => state.calendar.roles
    }),
    scroll() {
        // return $(".calendar-event-participant__table").scrollLeft();
    },
    leftCoord() {
        // if($(this.$refs.filterDropdown).length) return 0;
        return $(this.$refs.filterDropdown).parent().offset().left;
    },
    rightCoord() {
        // if($(this.$refs.filterDropdown).length) return 0;
        return $(this.$refs.filterDropdown).parent().outerWidth() + this.leftCoord;
    }
  },

  components: {
    
  },
  mounted() {
    const vm = this;

    //появление и исчезание фильтра при наведении на колонку
    $(".calendar-event-participant__table").on("mousemove", e => {
        const scroll = $(".calendar-event-participant__table").scrollLeft();
        if(e.pageX + scroll >= vm.leftCoord && e.pageX + scroll <= vm.rightCoord) {
            vm.filterHover = true
        } else {
            $(vm.$refs.filterDropdown).find(".dropdown-menu").removeClass("show");
            vm.filterHover = false;
        //   
        }
    })
    $(".calendar-event-participant__table").on("mouseout", e => {
        vm.filterHover = false;
    })
    //end появление и исчезание фильтра при наведении на колонку
  }
};
</script>

<style lang="scss">
</style>