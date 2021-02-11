<template>
    <div class="events-canban__event" :class="{'d-none':isHidden}">
        <div :class="['card', 'mb-2', 'canban-event']" 
            :draggable="draggability"
            @dragstart="dragStart" 
            @dragend="dragEnd">
            <div class="canban-event__loading" v-show="loading">
                <div class="spinner-grow text-light" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            <div class="card-body canban-event__body">
                <div class="canban-event__status" v-html="statusIcons[event.status.externalId]">
                </div>
                <h5 class="card-title canban-event__header">
                    <div class="canban-event__title">
                        <span class="canban-event__calendar-sign" :style="{background: calendar.color}"></span>
                        <span> {{ event.name }} </span>
                    </div>
                </h5>
                <h6 class="canban-event__text mb-1">{{ event.desc }}</h6>
                <div class="canban-event__footer">
                    <h6 class="canban-event__text mb-1">{{ getFullDateEvent(event) }}</h6>
                    <div class="canban-event__person" v-if="event.person">
                        <person :person="event.person"></person>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';
import person from '../person/person'


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
        // draggability: {
        //     type: Boolean,
        //     default: true
        // }
    },
    components: {
        person
    },
    computed: {
        ...mapState({
            dragEvent: state => state.eventsCanban.dragEvent,
            updatingStatus: state => state.eventsCanban.updatingStatus,
            draggability: state => state.eventsCanban.draggability,
            statusIcons: state => state.calendar.statusIcons
        }),
        ...mapGetters([
            'getTimeZoneById',
            'getCalendar'
        ]),
        timezoneName() {
            return this.getTimeZoneById(this.event.timeZone).name;
        },
        calendar() {
            return this.getCalendar(this.event.calendarId);
        },
        isHidden() {
            return this.event.id === this.dragEvent.id;
        },
        loading() {
            return this.event.id === this.dragEvent.id &&
                this.updatingStatus &&
                (this.event.hasOwnProperty('drag') && this.event.drag);
        },
        isHidden() {
            return this.event.id === this.dragEvent.id &&
                this.updatingStatus &&
                !(this.event.hasOwnProperty('drag') && this.event.drag);
        }
    },
    methods: {
        ...mapMutations([
            'changeDragEvent',
            'changeStateDrag',
        ]),
        getFullDateEvent(event) {
            return moment.unix(event.dateStart).tz(this.timezoneName).format('DD.MM.YYYY') + 
                ' ' + 
                moment.unix(event.dateStart).tz(this.timezoneName).format('HH:mm') + 
                ' - ' + 
                moment.unix(event.dateEnd).tz(this.timezoneName).format('HH:mm');
        },
        dragStart(value) {
            var event = JSON.parse(JSON.stringify(this.event));
            event.drag = true;
            this.changeDragEvent(event);
            this.changeStateDrag(true);
            this.$emit('dragState', true);
        },
        dragEnd(value) {
            this.$emit('dragState', false);
            this.changeStateDrag(false);
        }
    },
    created() {}
}
</script>
