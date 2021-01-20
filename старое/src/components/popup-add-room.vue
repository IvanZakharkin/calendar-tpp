<template lang="pug">
.popup-add-room
	.popup-add-room__content
		.popup-add-room__header
			button.btn.popup-add-room__btn-close(
				@click="closePopapAddingCalendar()"
			)
				i.fas.fa-times
			input.popup-add-room__name(type="text" placeholder="Название")
			button.btn.popup-add-room__btn-save Сохранить
		.popup-add-room__options
			.row.mb-5
				.col-12
					.popup-add-room__location
						.popup-add-room__location-title Показать на карте
						.popup-add-room__location-options
							.popup-add-room__location-color
								input.popup-add-room__location-color-input(
									type="color"
									v-model="color"
								)
							.popup-add-room__location-address
								v-select(v-model="selectedLocation" :options="locations")
							.popup-add-room__location-map
								button.btn.popup-add-room__location-map-btn
									i.fas.fa-map-marker-alt
									span показать на карте
							.popup-add-room__location-timezone
								input(type="text")
								//- select
								//- 	option 1
								//- 	option 1
								//- 	option 1
			.row
				.col-8.pr-5
					.popup-add-room__info-title Сведения о помещении
					.popup-add-room__option-list
						.popup-add-room__option
							.popup-add-room__option-title Внутренний номер помещения
							input.popup-add-room__option-input(v-model="internalRoomNumber")
						.popup-add-room__option
							.popup-add-room__option-title Максимальная вместимость (чел)
							input.popup-add-room__option-input(v-model="capacityRoom")
						.popup-add-room__option
							.popup-add-room__option-title Договор-оферта
							label.popup-add-room__option-file 
								.popup-add-room__option-file-title {{fileContractName}}
								input.popup-add-room__option-file-hidden(
                                    ref="fileContractRef"
                                    type="file"
                                    @change="handleFileContractUpload()"
                                )
						.popup-add-room__option.popup-add-room__option_vertical
							.popup-add-room__option-title Услуги
							.popup-add-room__option-services
								ul.popup-add-room__option-services-list
									li.popup-add-room__option-service(
										v-for="(selectService, index) in selectedServices"
										:key="`selectService-${index}`"
									)
										.popup-add-room__option-service-num {{selectService.num}}
										.popup-add-room__option-service-title {{selectService.title}}   
										.popup-add-room__option-service-value {{selectService.value}}
										.popup-add-room__option-service-price {{selectService.price}}
										button.btn.popup-add-room__option-service-delete(
											@click="deleteService(selectService)"
										)
											i.fas.fa-times
								//- .dropdown
								//- 	button.btn.popup-add-room__option-services-add(data-toggle='dropdown') + Добавить
								//- 	.dropdown-menu
								//- 		button.dropdown-item(
								//- 			href='#'
								//- 			v-for="(service, index) in services"
								//- 			:key="`service-${index}`"
								//- 			@click="addService(service)"
								//- 		) {{service.title}}

						.popup-add-room__option
							input.popup-add-room__option-input.w-100(
								placeholder="описание"
								v-model="descriptionRoom"
								)
						.popup-add-room__option.popup-add-room__option_vertical
							.popup-add-room__option-title Добавить изображение (не более 20)
							.popup-add-room__room-images
								.popup-add-room__pics
									.popup-add-room__pic(v-for="roomImage in imagesRooms")
										img.popup-add-room__img(:src="roomImage")
								label.popup-add-room__file-img(
									v-if="imagesRooms.length <= 20"
								)
									input.popup-add-room__option-file-hidden(
										type="file"
										@change="handleFileImagesUpload()"
										ref="filesImage"
									)
									.popup-add-room__file-img-icon +
				.col-4.pl-5
					.popup-add-room__info-title Контактные данные
					.popup-add-room__options
						.popup-add-room__option.popup-add-room__option_vertical
							.popup-add-room__option-title.mb-2 Ответсвенные
							.v-select-custom.w-100
								vSelect(
								multiple v-model="selectedResponsiblePersons" :options="responsiblePersons"
								)
						.popup-add-room__option.popup-add-room__option_vertical
							.popup-add-room__option-title.mb-2 Телефон
							input.popup-add-room__option-input.w-100(value="20")
						.popup-add-room__option.popup-add-room__option_vertical
							.popup-add-room__option-title.mb-2 E-mail
							input.popup-add-room__option-input.w-100(
								type="email"
								v-model="email"
								
								)
</template>

<script>
import vSelect from "./v-select/components/Select.vue";
import { mapMutations } from 'vuex';

export default {
    data(){
        return {
            locations: [
                "Иван Иванов", "Федор Петров", "Федор Сидоров",
                "Иван 1", "Федор 1", "Федор С1",
                "Иван 2", "Федор 2", "Федор С2",
                "3", "4", "5",
            ],
            selectedLocation: [],
            internalRoomNumber:"",
            capacityRoom:"",
            fileContract:"",
            fileContractName:"+ Прикрепить файл",
			imagesRooms:[],
			descriptionRoom: "",
			color: "",
			responsiblePersons:[
				"Иван Иванов", "Федор Петров", "Федор Сидоров",
                "Иван 1", "Федор 1", "Федор С1",
                "Иван 2", "Федор 2", "Федор С2",
                "3", "4", "5",
			],
			selectedResponsiblePersons:[],
			email:'',
			services: [
				{
					num: "SE-RU-12361",
					title: "Аренда помещения Конгресс-центра",
					price: "20000 Р",
					value: "1 час"
				},
				{
					num: "SE-RU-12362",
					title: "Питьевая вода бутилированная б/г  0,33 л",
					price: "5000 Р",
					value: "20 шт"
				},
				{
					num: "SE-RU-12363",
					title: "Уборка помещения с чистящ. средствам",
					price: "3 000 Р",
					value: "1 час"
				},
			],
			selectedServices:[]
        }
    },
    methods: {
		...mapMutations([
			"closePopapAddingCalendar"
		]),
		addService(service) {
			this.selectedServices.forEach(el => {
				if(el.num == service.num) console.log('room');
			})
			this.selectedServices.push(service);
		},
		deleteService(service) {
			this.selectedServices = this.selectedServices.filter(el => {
				return el.title !== service.title
			})
		},
        handleFileContractUpload(){
            this.fileContract = this.$refs.fileContractRef.files[0];
            this.fileContractName = this.fileContract.name;
        },
        handleFileImagesUpload(){
			const vm = this;
			const fileImage = this.$refs.filesImage.files[0];
			
			let reader  = new FileReader();
			reader.readAsDataURL(this.$refs.filesImage.files[0]);
			reader.onload = function() {
				vm.imagesRooms.push(reader.result);
			};
            // reader.addEventListener("load", function () {
			// 	console.log(132);
			// 	console.log(reader.result);
            // this.imagesRooms = this.imagesRooms.push(reader.result);
            // }.bind(this), false);
            // if( this.file ){
            // if ( /\.(jpe?g|png|gif)$/i.test( this.file.name ) ) {
            //     reader.readAsDataURL( this.file );
            // }
            // }
            // this.fileContractName = this.fileContract.name;
        },
	},
	components: {
		vSelect
	}
}
</script>

<style>
.vs__hidden {
    max-height: 300px;
    overflow: auto;
    display: flex;
    flex-basis: 100%;
    flex-grow: 1;
    flex-wrap: wrap;
    position: absolute;
    background: #fff;
    z-index: 100;
    padding: 5px;
    border-radius: 3px;
    width: 100%;
    border: 1px solid rgba(60, 60, 60, 0.26);
    border-top: none;
}

.vs__button__collapse {
  position: absolute;
  top: 0;
  right:0;
}

.v-select-custom .vs__button__collapse{
  display: flex;
    align-items: center;
    background-color: #f0f0f0;
    border: 1px solid rgba(60, 60, 60, 0.26);
    border-radius: 4px;
    color: #333;
    line-height: 1.4;
    margin: 4px 2px 0px 2px;
    padding: 0 0.25em;
    z-index: 10;
}

.v-select-custom .vs__actions .vs__open-indicator{
    display: none;
}
.v-select-custom .vs__actions {
    position: absolute;
    top: -31px;
    left: 85px;
}
.v-select-custom-left-140 .vs__actions {
    left: 140px;
}
.v-select-custom-left-80 .vs__actions {
    left: 80px;
}

.v-select-custom .vs__selected_hidden{
    display: none;
}
</style>