<template lang="pug">
    .calendars-select
        .calendars-select__selected-item(
            @click="dropdownShow()"
        )
            .calendars-select__calendar
                .calendars-select__calendar-circle(
                    :style="{backgroundColor: selectedCalendar.COLOR}"
                )
                .calendars-select__calendar-title {{selectedCalendar.NAME}}
                button.calendars-select__calendar-location(
                @click="openMap()"
                    ref="location"
                )
                    i.fas.fa-map-marker-alt
            .calendars-select__icon
                i.fas.fa-sort-down
        .calendars-select__dropdown(v-if="dropdown")
            button.calendars-select__dropdown-item(
                v-for="calendar in calendars"
                @click="changeCalendar(calendar)"
            )
                .calendars-select__calendar
                    .calendars-select__calendar-circle(
                        :style="{backgroundColor: calendar.COLOR}"
                    )
                    .calendars-select__calendar-title {{calendar.NAME}}
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'


export default {
    data() {
        return {
            selectedCalendar: {},
            dropdown: false,
        }
    },
    props: {
        // selectedCalendar:{
        //     default: () => {},
        //     type: Object
        // }
    },
    computed: {
        ...mapState({
            calendars: state => state.calendar.calendars,
            createdEvent: state => state.calendar.createdEvent,
        }),
        ...mapGetters(["getCalendar"])
        // selectedCalendar() {
        //     return this.calendars[0]
        // },
    },
    methods: {
        ...mapMutations(["updateCreatedEvent", "updateYandexMap"]),
        dropdownShow(){
            if(event.target != this.$refs.location.firstElementChild) {
                this.dropdown= this.dropdown ? false : true
            }
           
        },
        changeCalendar(calendar){
            this.dropdown=false;
            this.selectedCalendar = calendar;
            // this.$emit("selectCalendar", calendar);
             this.updateCreatedEvent({
                state: "calendarId",
                value: this.selectedCalendar.ID
             });
        },
        openMap(){
            // console.log(123);
            this.updateYandexMap({
                room: this.selectedCalendar.location,
                show: true
            })
        }

    },
    mounted() {
        if(!this.createdEvent.calendarId) {
            this.selectedCalendar = this.calendars[0];
            console.log("календарь не выбран");
            this.updateCreatedEvent({
                state: "calendarId",
                value: this.calendars[0].ID
             });
        } else {
            console.log("календарь выбран");
            this.selectedCalendar = this.getCalendar(this.createdEvent.calendarId);
        }
        
    },
}
</script>

<style lang="scss" scoped>

@import './styles/calendars-select.scss';

</style>