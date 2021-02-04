<template lang="pug">
	.popup-add-room__option.popup-add-room__option_vertical
		.popup-add-room__option-title Изображения
		.popup-add-room__pics
			.popup-add-room__pic(v-for="image in imagesRoomFromServer" :key="`room-image-${image.code}`")
				img.popup-add-room__img(:src="image.src")
				button.popup-add-room__btn-delete-img(type="button" @click="deleteImagesRoomFromServer(image.code)")
					i.fas.fa-times
			.popup-add-room__pic(v-for="image in imagesRooms" :key="`room-image-${image.code}`")
				img.popup-add-room__img(:src="image.src")
				button.popup-add-room__btn-delete-img(type="button" @click="deleteImage(image.code)")
					i.fas.fa-times
		label.popup-add-room__images-upload(
			:class="{'is-dragover': dragState}"
			@drag.prevent
			@dragstart.prevent
			@dragend.prevent="dragEndAddFile()"
			@dragover.prevent="dragStartAddFile()"
			@dragenter.prevent="dragStartAddFile()"
			@dragleave.prevent="dragEndAddFile()"
			@drop.prevent="dragAddFile($event)")
			
			input.popup-add-room__option-file-hidden(type="file" @change="uploadImage" ref="filesImage" multiple accept="image/*")
			.popup-add-room__images-upload-text 
				.text-blue Загрузить (не более {{maxCount}})
				.text-gray Перетащить с помощью Drag'n'drop
				.text-danger
					div(v-for="error in errors") {{ errorsList[error] }}
</template>

<script>
import uniqueid from 'lodash.uniqueid';
import popupRoomServices from "./popup-room-services.vue"
import popupRoomContactsInputs from "./popup-room-contacts-inputs"
import { mapMutations, mapState, mapActions, mapGetters } from "vuex";

export default {
	data() {
		return {
			imagesRooms: [],
			imagesRoomFromServer: [],
			dragState: false,
			maxCount: 20,
			errorsList: {
				fileFormat: 'Один или несколько файлов имеют неверный формат',
				maxCount: 'Превышен лимит загружаемых изображений'
			},
			errors: []
		};
	},
	watch: {
		imagesRooms() {
			this.$emit('changeImagesRooms', this.getImagesRoomsForSend());
		},
		imagesRoomFromServer() {
			this.$emit('changeImagesRoomsFromServer', this.getImagesRoomFromServerForSend());
		}
	},
	methods: {
		deleteImage(code) {
			this.imagesRooms = this.imagesRooms.filter((el) => el.code !== code);
		},
		deleteImagesRoomFromServer(code) {
			this.imagesRoomFromServer = this.imagesRoomFromServer.filter((el) => el.code !== code);
		},
		handleImagesUpload(filesImages) {
			const vm = this;

			vm.resetErrors();

			for (const image of filesImages) {
				if (/\.(jpe?g|png|gif)$/i.test(image.name)) {
					let reader = new FileReader();
					reader.addEventListener("load", function(e) {
						if (vm.countImages === vm.maxCount) {
							vm.addError('maxCount');
							return;
						};

						vm.imagesRooms.push({
							code: uniqueid('f'),
							src: this.result,
							file: image
						});

					},false);

					reader.readAsDataURL(image);
				} else {
					vm.addError('fileFormat');
					return;
				}
			}
		},
		uploadImage() {
			this.handleImagesUpload(event.target.files);
		},
		dragStartAddFile() {
			this.dragState = true;
		},
		dragEndAddFile() {
			this.dragState = false;
		},
		dragAddFile(event) {
			this.dragEndAddFile();
			this.handleImagesUpload(event.dataTransfer.files);
		},
		addError(error) {
			if (this.errors.includes(error)) return;

			this.errors.push(error);
		},
		resetErrors() {
			this.errors = [];
		},
		getImagesRoomsForSend() {
			return this.imagesRooms.map((el) => el.file);
		},
		getImagesRoomFromServerForSend() {
			return this.imagesRoomFromServer.map((el) => el.code);
		}
	},
	components: {},
	computed: {
		...mapState({
			editRoom: state => state.calendar.editRoom,
		}),
		imagesForSend() {
			return this.uploadedImagesRoom.map(el => el.code);
		},
		countImages() {
			return this.imagesRoomFromServer.length + this.imagesRooms.length;
		},
	},
	mounted() {
		this.imagesRoomFromServer = this.editRoom.imagesRooms;
	}
};
</script>
