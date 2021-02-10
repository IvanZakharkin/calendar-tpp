const eventsCanban = {
    state: {
        dragEvent: {},
        isDrag: false,
        updatingStatus: false,
        draggability: true
    },
    mutations: {
        changeDragEvent(state, event) {
            state.dragEvent = event;
        },
        changeStateDrag(state, value) {
            state.isDrag = value;
        },
        changeStateUpdatingStatus(state, value) {
            state.updatingStatus = value;
        },
        changeDraggability(state, value) {
            state.draggability = value;
        }
    },
};
export default eventsCanban;