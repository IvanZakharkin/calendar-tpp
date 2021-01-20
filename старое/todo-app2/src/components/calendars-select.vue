<template lang="pug">
	.calendars-select
		.calendars-select__selected-item(
			@click="dropdown= dropdown ? false : true"
		)
			.calendars-select__calendar
				.calendars-select__calendar-circle(:style="{backgroundColor: selectedCalendar.color}")
				.calendars-select__calendar-title {{selectedCalendar.name}}
				button.calendars-select__calendar-location
					i.fas.fa-map-marker-alt
			.calendars-select__icon
				i.fas.fa-sort-down
		.calendars-select__dropdown(v-if="dropdown")
			button.calendars-select__dropdown-item(
				v-for="calendar in calendars"
				@click="changeCalendar(calendar)"
			)
				.calendars-select__calendar
					.calendars-select__calendar-circle(:style="{backgroundColor: calendar.color}")
					.calendars-select__calendar-title {{calendar.name}}
</template>

<script>
import { mapState, mapMutations } from 'vuex'


export default {
    data() {
        return {
            selectedCalendar: {},
            dropdown: false,
        }
    },
    props: {
        selectedCalendar:{
            default: () => {},
            type: Object
        }
    },
    computed: {
        ...mapState({
            calendars: state => state.calendar.calendars
        }),
        // selectedCalendar() {
        //     return this.calendars[0]
        // },
    },
    methods: {
        ...mapMutations(["updateCreatedEvent"]),
        changeCalendar(calendar){
            this.dropdown=false;
            this.selectedCalendar = calendar;
            this.$emit("selectCalendar", calendar);
            //  this.updateCreatedEvent({
            //     state: "calendarID",
            //     value: this.selectedCalendar.id
            //  });
        },

    },
    mounted() {
        if(!this.selectedCalendar) {
            this.selectedCalendar = this.calendars[0];
            // this.updateCreatedEvent({
            //     state: "calendarID",
            //     value: this.selectedCalendar.id
            //  });
        } else {
            this.selectedCalendar = this.selectedCalendar;
        }
        
    },
}
</script>