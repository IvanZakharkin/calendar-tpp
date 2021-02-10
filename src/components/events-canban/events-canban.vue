<template>
    <div class="events-canban">
        <div class="events-canban__container">
            <div class="events-canban__columns">
                <events-canban-status-column 
                    v-for="statusItem in statusList" 
                    :status="statusItem"
                    :events="events"
                    :key="statusItem.externalId"
                    :draggableEvent="draggableEvent"
                    @dragEvent="dragEvent($event)"
                    @dropEvent="dropEvent($event)"
                    :draggability="draggability">
                </events-canban-status-column>
            </div>
        </div>
    </div>
</template>

<script>

import eventsCanbanStatusColumn from './events-canban-status-column'
import { mapState } from 'vuex'
export default {
    data: function() {
        return {
            draggableEvent: {}
        }
    },
    computed: {
        ...mapState({
            draggability: state => state.eventsCanban.draggability,
        }),
    },
    props: {
        events: {
            type: Array,
            default: function() {
                return []
            }
        },
        statusList: {
            type: Array,
            default: function() {
                return []
            }
        },
        requestOptions: {
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
    methods: {
        dragEvent(event) {
            this.draggableEvent = event;
        },
        dropEvent(status) {
            console.log(status, this.draggableEvent);
        },
    },
    components: {
        'events-canban-status-column': eventsCanbanStatusColumn
    },
    mounted() {},
}
</script>
