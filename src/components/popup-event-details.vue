<template lang="pug">
.calendar-popup-event-detail.card(
	:style="style"
	ref="eventDetailCard"
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
			a.btn.calendar-popup-event-detail__btn(:href="event.link")
				i.fas.fa-globe
			button.btn.calendar-popup-event-detail__btn(type='button', data-dismiss='modal' @click="deleteCurrentEvent()")
				i.far.fa-trash-alt
			button.btn.calendar-popup-event-detail__btn(type='button' @click="editEvent()")
				i.fas.fa-pencil-alt
			a.btn.calendar-popup-event-detail__btn(:href="event.detail_url")
				i.fas.fa-link
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex';
import { modalConfirm } from '../functions.js'

export default {
	methods: {
		...mapMutations(["closePopapDetailsEvents", "updateEditEvent", "showPopapEventEdit", "showPopapEventFullScreen"]),
		...mapActions(["getEventForEdit", "deleteEvent"]),
		editEvent(){
			this.getEventForEdit(this.event.id);
			this.closePopapDetailsEvents();
		},
		deleteCurrentEvent() {
			const del = () => {
				this.deleteEvent(this.event.id);
				this.closePopapDetailsEvents();
			};

			modalConfirm({
				onConfirm: del,
				title: 'Удаление события',
				content: 'Вы уверены, что хотите удалить данное событий?',
			});
			// this.deleteEvent(this.event.id);
			// this.closePopapDetailsEvents();
		},
		
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
			return `top: ${this.detailsEvent.topCoordinate}px; left: ${this.detailsEvent.leftCoordinate}px;`;
		},
		// link() {
		// 	// return `${location.origin}${this.event.detail_url}`;
		// 	return this.event.detail_url;
		// }
	},
	mounted() {
		const vm = this;
		$(document).mouseup(function (e){
			if (!$('.calendar-popup-event-detail').is(e.target) && $('.calendar-popup-event-detail').has(e.target).length === 0) {
				vm.closePopapDetailsEvents();
			}
    	});
	}
    // props: {
		// eventDetails: {
		// 	type: Object
		// }
	// }
}
</script>

<style lang="scss" scoped>
@import './styles/calendar-popup-event-detail.scss';
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