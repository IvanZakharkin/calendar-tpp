<template lang="pug">
    events-canban(:statusList="statusList" :events="events")
</template>

<script>
import eventsCanban from '../events-canban/events-canban.vue'
import { mapMutations, mapState, mapGetters } from 'vuex';

export default {
    data() {
        return {};
    },
    computed: {
        ...mapState({
            statusList: state => state.calendar.statusList,
            events: state => state.calendar.events,
        }),
    },
    components: {
        eventsCanban
    },
}
</script>