<template lang="pug">
.calendar-popup-event-detail.card(
	:style="style"
)
	.card-body
		h5.calendar-popup-event-detail__title {{event.name}}
		button.close.calendar-popup-event-detail__btn-close(
			type='button', 
			data-dismiss='modal', 
			aria-label='Close'
			@click="closePopapDetailsEvents()")
			span(aria-hidden='true') ×
		.calendar-popup-event-detail__desk
			p {{event.desk}}
		.text-right.p-2
			button.btn.calendar-popup-event-detail__btn(type='button', data-dismiss='modal')
				i.far.fa-trash-alt
			button.btn.calendar-popup-event-detail__btn(
				type='button'
				@click="editEvent()"
				
				)
				i.fas.fa-pencil-alt
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
export default {
	methods: {
		...mapMutations(["closePopapDetailsEvents", "updateEditEvent", "showPopapEventEdit"]),
		editEvent(){
			this.updateEditEvent({id: this.detailsEvent.id});
			this.closePopapDetailsEvents();
			this.showPopapEventEdit();
		}
	},
	computed: {
		...mapGetters(["getEvent"]),
		...mapState({
			detailsEvent: state=>state.calendar.detailsEvent
		}),
		event() {
			return this.getEvent(this.detailsEvent.id)[0];
		},
		style() {
			// const calendarContainer = document.querySelector(".bcalendar");
			// const calendarContainerLeft = document.querySelector(".bcalendar").offsetLeft();
			// const calendarContainerWidth = document.querySelector(".bcalendar").offsetWidth();
			// if ()
			return `top: ${this.detailsEvent.topCoordinate}px; left: ${this.detailsEvent.leftCoordinate}px;`;
		}
	},
    // props: {
		// eventDetails: {
		// 	type: Object
		// }
	// }
}
</script>

<style lang="scss" scoped>
.calendar-popup-event-detail {
	width: 365px;
	position: absolute;
	z-index: 100;

	&__title {
		font-size: 17px;
		color: #656875;
		padding: 10px;
		border-bottom: 1px solid #e1e1e1;
	}

	&__desk {
		padding: 10px;
		font-size: 14px;
		color: #656875;
	}

	&__btn-close {
		position: absolute;
		top: 10px;
		right: 15px;
	}

	&__footer {
		padding: 10px;
		text-align: right;
	}
	&__btn {
		background-color: #f0f5f8;
		border-radius: 50%;
		color: #656875;
	}
}
</style>