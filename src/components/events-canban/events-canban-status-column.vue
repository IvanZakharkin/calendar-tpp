<template>
    <div class="events-canban__column">
        <div :class="'events-canban__column-header' + ' status-' + status.externalId" :style="headerStyle">
            <div class="events-canban__column-title"> {{ status.value }} </div>
        </div>
        <div class="events-canban__column-body">
            <div class="events-canban__column-body-dropzone" 
                v-if="isDrag && !dragInCol"
                @drop="handlerDrop($event)" 
                @dragenter="handlerDragenter($event)" 
                @dragleave="handlerDragleave($event)" 
                @dragover.prevent>
            </div>
            <events-canban-event 
                v-for="event in filteredEventsByDate" 
                :key="event.id" 
                :event="event" 
                :draggability="draggability"
                @dragState="dragState($event)">
            </events-canban-event>
        </div>
    </div>
</template>

<script>
import eventsCanbanEvent from './events-canban-event'
import { mapState, mapMutations } from 'vuex';

export default {
    data: function() {
        return {
            filteredEventsByStatus: [],
            dragInCol: false
        }
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
        // draggability: {
        //     type: Boolean,
        //     default: true
        // },
        draggableEvent: {
            type: Object,
            default: function() {
                return {}
            }
        }
    },
    watch: {
        events: {
            deep: true,
            handler(data) {
                this.filteredEventsByStatus = data.filter((event) => event.status.externalId === this.status.externalId);
            }
        }
    },
    computed: {
        ...mapState({
            dragEvent: state => state.eventsCanban.dragEvent,
            isDrag: state => state.eventsCanban.isDrag,
            draggability: state => state.eventsCanban.draggability,
        }),
        // eventsWidthDraggableEvents() {
        //     var events = this.filteredEventsByStatus.slice();

        //     events.push(this.dragEvent);

        //     return events;
        // },
        filteredEventsByDate() {
            return this.filteredEventsByStatus.sort((a, b) => a.dateStart - b.dateStart);
        },
        headerStyle() {
            return {
                background: this.status.color
            }
        },
        
    },
    methods: {
        ...mapMutations(['updateStatusEvent', 'changeStateDrag', 'changeStateUpdatingStatus', 'changeDraggability']),
        startRequest() {
            this.changeStateUpdatingStatus(true);
            this.changeDraggability(false);
        },
        endRequest() {
            this.changeStateDrag(false);
            this.changeStateUpdatingStatus(false);
            this.changeDraggability(true);
        },
        handlerDrop(event) {
            //success
            this.startRequest();
            const success = () => {
                this.updateStatusEvent({
                    event: this.dragEvent,
                    status: this.status
                });
                this.endRequest();
            };

            const error = () => {
                this.deleteDragEvent();
                this.endRequest();
            }
            setTimeout(() => {
                success();
            }, 3000);
            //  $.ajax({
            //     type: "POST",
            //     url: "./index.php",
            //     data: {
            //         "ajax": "Y",
            //         "action": "update-event-status",
            //     },
            //     success: function(response) {
            //         commit("updateEvents", response.data);
            //     },
            //     errors: {}
            // });
        },
        handlerDragenter(event) {
            this.addDragEvent();
        },
        handlerDragleave(event) {
            this.deleteDragEvent();
        },
        dragState(data) {
            this.dragInCol = data;
        },
        addDragEvent() {
            this.filteredEventsByStatus.push(this.dragEvent);
        },
        deleteDragEvent() {
            var events = this.filteredEventsByStatus.filter((e) => e.id !== this.dragEvent.id);
            this.filteredEventsByStatus = events;
        }
    },
    components: {
        'events-canban-event': eventsCanbanEvent
    },
    created() {
        this.filteredEventsByStatus = this.events.filter((event) => event.status.externalId === this.status.externalId);
        
    }
}
</script>
