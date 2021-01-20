<template lang="pug">
  .dropdown.dropdown-time
    button.btn.calendar-event-popup-fullscreen__field(type='button', data-toggle='dropdown', aria-haspopup='true', aria-expanded='false')
      | {{currentTime}}
    .dropdown-menu(aria-labelledby='dropdownMenuButton')
      button.dropdown-item(
        v-for="time in times"
        @click="changeTime(time)"
        ) {{time}}
</template>

<script>

export default {
  data() {
    return {
      // selectTime: ''
    };
  },
  props: {
    times: {
      type: Array,
      default: () => []
    },
    currentTime: {
      type: String,
      default: () => ''
    }
  },  
  methods: {
    changeTime(option) {
      // this.selectTime = option;
      this.$emit("changeTime", option);
    }
  },
  // created() {
  //   this.selectTime = this.currentTime;
  // }

}

</script>