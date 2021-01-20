<template lang="pug">
.popup-add-room
	.popup-add-room__content
		.popup-add-room__header
			button.btn.popup-add-room__btn-close
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
								select
									option 1
									option 1
									option 1
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
				.col-8
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
									li.popup-add-room__option-service
										.popup-add-room__option-service-num SE-RU-12361
										.popup-add-room__option-service-title Аренда помещения Конгресс-центра   
										.popup-add-room__option-service-value 1 час
										.popup-add-room__option-service-price 20000Р
										button.btn.popup-add-room__option-service-delete
											i.fas.fa-times
									li.popup-add-room__option-service
										.popup-add-room__option-service-num SE-RU-12361
										.popup-add-room__option-service-title Аренда помещения Конгресс-центра   
										.popup-add-room__option-service-value 1 час
										.popup-add-room__option-service-price 20000Р
										button.btn.popup-add-room__option-service-delete
											i.fas.fa-times
								button.btn.popup-add-room__option-services-add + Добавить
						.popup-add-room__option
							.popup-add-room__option-title Услуги
							input.popup-add-room__option-input.w-100(value="20")
						.popup-add-room__option.popup-add-room__option_vertical
							.popup-add-room__option-title Добавить изображение (не более 20)
							.popup-add-room__pic
								img.popup-add-room__img
							label.popup-add-room__file-img
								input.popup-add-room__option-file-hidden(
                                    type="file"
                                     @change="handleFileImagesUpload()"
                                     ref="filesImage"
                                )
								.popup-add-room__file-img-icon
									<i class="fas fa-plus"></i>
				.col-4
					.popup-add-room__info-title Контактные данные
					.popup-add-room__options
						.popup-add-room__option.popup-add-room__option_vertical
							.popup-add-room__option-title Ответсвенный
							input.popup-add-room__option-input(value="100-6")
						.popup-add-room__option.popup-add-room__option_vertical
							.popup-add-room__option-title Телефон
							input.popup-add-room__option-input.w-100(value="20")
						.popup-add-room__option.popup-add-room__option_vertical
							.popup-add-room__option-title E-mail
							input.popup-add-room__option-input.w-100(type="email")
</template>

<script>
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
            imagesRooms:[]
        }
    },
    methods: {
        handleFileContractUpload(){
            this.fileContract = this.$refs.fileContractRef.files[0];
            this.fileContractName = this.fileContract.name;
        },
        handleFileImagesUpload(){
            const fileImage = this.$refs.filesImage.files[0];
            console.log(fileImage);
            let reader  = new FileReader();
            reader.addEventListener("load", function () {
            this.imagesRooms = [... this.imagesRooms, reader.result];
            }.bind(this), false);
            // if( this.file ){
            // if ( /\.(jpe?g|png|gif)$/i.test( this.file.name ) ) {
            //     reader.readAsDataURL( this.file );
            // }
            // }
            // this.fileContractName = this.fileContract.name;
        },
    }
}
</script>