<template>
    <div class="events-canban__column">
        <div class="events-canban__column-header" :style="headerStyle">
            <div class="events-canban__column-title"> {{ status.value }} </div>
        </div>
        <div class="events-canban__column-body" @drop="handlerDrop($event)" @dragenter="handlerDragenter($event)" @dragover.prevent >
            <events-canban-event 
                v-for="event in filteredEventsByStatus" 
                :key="event.id" 
                :event="event" 
                :draggability="draggability"
                @dragEvent="dragEvent($event)">
            </events-canban-event>
        </div>
    </div>
</template>

<script>
import eventsCanbanEvent from './events-canban-event'


export default {
    data: function() {
        return {}
    },
    props: {
        events: {
            type: Array,
            default: function() {
                return []
            }
        },
        status: {
            type: Object,
            default: function() {
                return {
                    value: '',
                    id: '',
                    externalId: ''
                }
            }
        },
        draggability: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        filteredEventsByStatus() {
            return this.events
                .filter((event) => event.status.externalId === this.status.externalId)
                .sort((a, b) => a.dateStart - b.dateStart);
        },
        headerStyle() {
            return {
                background: this.status.color
            }
        }
    },
    methods: {
        dragEvent(event) {
            this.$emit('dragEvent', event);
        },
        handlerDrop(event) {
            // console.log(12);
            this.$emit('dropEvent', this.status);
        },
        handlerDragenter(event) {
            // console.log(event);
        }
    },
    components: {
        'events-canban-event': eventsCanbanEvent
    }
}
</script>
