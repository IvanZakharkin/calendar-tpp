<template>
    <div class="card mb-2 canban-event" :draggable="draggability" @dragstart="dragEvent(true)" @dragend="dragEvent(false)">
        <div class="card-body canban-event__body">
            <h5 class="card-title canban-event__header">
                <span class="canban-event__calendar-sign" :style="{background: calendar.color}"></span>
                <span> {{ event.name }} </span>
            </h5>
            <h6 class="canban-event__text mb-1">{{ event.desc }}</h6>
            <h6 class="canban-event__text mb-1">{{ getFullDateEvent(event) }}</h6>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data: function() {
        return {
            hidden: false,
        }
    },
    props: {
        event: {
            type: Object,
            default: function() {
                return {}
            }
        },
        draggability: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        ...mapGetters([
            'getTimeZoneById',
            'getCalendar'
        ]),
        timezoneName() {
            return this.getTimeZoneById(this.event.timeZone).name;
        },
        calendar() {
            return this.getCalendar(this.event.calendarId);
        }
    },
    methods: {
        getFullDateEvent(event) {
            return moment.unix(event.dateStart).tz(this.timezoneName).format('DD.MM.YYYY') + 
                ' ' + 
                moment.unix(event.dateStart).tz(this.timezoneName).format('HH:mm') + 
                ' - ' + 
                moment.unix(event.dateEnd).tz(this.timezoneName).format('HH:mm');
        },
        dragEvent(value) {
            if (value) {
                this.$emit('dragEvent', this.event);
            } 
            // else {
                // this.$emit('dragEvent', {});
            // }
        }
    },
    created() {}
}
</script>
