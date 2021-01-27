<template lang="pug">
        form.popup-add-room#popup-add-room.was(
          @submit.prevent="saveRoom($event)"
        )
          button.btn.popup-add-room__btn-close(
            @click="closePopapAddingCalendar(); resetEditRoom();"
          )
            i.fas.fa-times
          .popup-add-room__content
            .popup-add-room__header
              input.popup-add-room__name(type="text" placeholder="Название" v-model="name" required)
              
            .popup-add-room__options
              .row.mb-5
                .col-12
                  .popup-add-room__location
                    //- .popup-add-room__location-title Показать на карте
                    .popup-add-room__location-options
                      .popup-add-room__location-color
                        input.popup-add-room__location-color-input(
                          type="color"
                          v-model="color"
                        )
                      .popup-add-room__location-address(:class="{'popup-add-room__location-address_validate': locationValidate}")
                        input.form-control.popup-add-room__location-address-input(
                          id="room-address" 
                          :value="address"
                        )
                        .popup-add-room__location-address-validate-error.text-center.text-danger {{validateError}}
                      .popup-add-room__location-map
                        button.btn.popup-add-room__location-map-btn(
                          type="button"
                          @click="showMap()"
                        )
                          i.fas.fa-map-marker-alt
                          span показать на карте
                      .popup-add-room__location-timezone
                        v-select(v-model="selectedTimezone" :options="timeZonesForSelect" disabled)
              .row
                .col-8.pr-5
                  .popup-add-room__info-title Сведения о помещении
                  .popup-add-room__option-list
                    .popup-add-room__option
                      .popup-add-room__option-title Внутренний номер помещения
                      input.popup-add-room__option-input(v-model="numberRoom")
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
                      button.btn.popup-add-room__option-file-btn(
                        type="button"
                        @click="deleteFileContract()"
                         v-if="fileContract"
                        )
                        i.fas.fa-times
                    
                    .popup-add-room__option
                      input.popup-add-room__option-input.w-100(
                        placeholder="описание"
                        v-model="desc"
                        )
                    .popup-add-room__option.popup-add-room__option_vertical
                      .popup-add-room__option-title Добавить изображение (не более 20)
                      .popup-add-room__room-images
                        .popup-add-room__pics
                          .popup-add-room__pic(
                            v-for="(roomImage,index) in uploadedImagesRoom"
                            :key="`room-image-${index}`"
                            
                            )
                            img.popup-add-room__img(:src="roomImage.src")
                            button.popup-add-room__btn-delete-img(
                              type="button"
                              @click="deleteUploadedImage(index)"
                            )
                              i.fas.fa-times

                          .popup-add-room__pic(v-for="roomImage in imagesRooms")
                            img.popup-add-room__img(:src="roomImage")
                            button.popup-add-room__btn-delete-img(
                              type="button"
                              @click="deleteImage(index)"
                            )
                              i.fas.fa-times
                        label.popup-add-room__file-img(
                          v-if="imagesRooms.length <= 20"
                        )
                          input.popup-add-room__option-file-hidden(
                            type="file"
                            @change="handleFileImagesUpload()"
                            ref="filesImage"
                          )
                          .popup-add-room__file-img-icon +
                .col-4
                  .popup-add-room__info-title Контактные данные
                  .popup-add-room__options
                    .popup-add-room__option.popup-add-room__option_vertical
                      .popup-add-room__option-title.mb-2 Ответсвенные
                      .v-select-custom.v-select-custom-left-140.w-100.v-select-custom-room
                        vSelect(
                        multiple v-model="selectedResponsiblePersons" :options="responsiblePersons" @search="onSearch"
                        )
                    .popup-add-room__option.popup-add-room__option_vertical
                      .popup-add-room__option-title.mb-2 Телефоны
                      .d-flex.w-100
                        input.popup-add-room__option-input.w-100(type="tel" v-model="phone" v-show="phones.length < 3")
                        button.btn.popup-add-room__btn-phone(
                          type="button"
                          v-show="phone.length"
                          @click="phone = ''"
                          )
                          i.fas.fa-times
                        button.btn.popup-add-room__btn-phone(
                          type="button"
                          v-show="phone.length"
                          @click="phones.push(phone);phone = ''"
                          )
                          i.fas.fa-plus-circle
                      .popup-add-room__phone.w-100(
                        v-for="(phone, index) in phones"
                      ) 
                        .popup-add-room__phone-text {{phone}}
                        button.btn.popup-add-room__btn-phone(
                          type="button"
                          @click="phones.splice(index, 1)"
                        )
                          i.fas.fa-times
                    .popup-add-room__option.popup-add-room__option_vertical
                      .popup-add-room__option-title.mb-2 E-mail
                      input.popup-add-room__option-input.w-100(
                          type="email"
                          v-model="email"
                        )
              
            popup-room-services(@changeServicesList="changeServicesList($event)")
            .text-right.mt-5
              button.btn.btn-danger.mr-3.popup-add-room__btn-save(
                type="button"
                v-show="id"
                @click="deleteCurRoom()"
              ) Удалить
              button.btn.btn-primary.popup-add-room__btn-save(
                type="submit"
              ) Сохранить
</template>

<script>
import vSelect from "../v-select/components/Select.vue";
import popupRoomServices from "./popup-room-services.vue"
import { mapMutations, mapState, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      name: "",
      selectedLocation: {},
      numberRoom: "",
      capacityRoom: "",
      fileContract: "",
      fileContractName: "+ Прикрепить файл",
      fileContractServer: false,
      imagesRooms: [],
      imagesRoomsFiles: [],
      uploadedImagesRoom: [],
      desc: "",
      color: "",
      responsiblePersons: [],
      selectedResponsiblePersons: [],
      email: "",
      phone: "",
      servicesList: [],
      selectedServices: [],
      id: null,
      address: "",
      selectedTimezone: {},
      phones: [],
      coordinates: [],
      locationValidate: false,
      validateError: ""
    };
  },

  methods: {
    ...mapMutations(["closePopapAddingCalendar", "resetEditRoom"]),
    ...mapActions(["sendNewRoom", "showRoomOnMap", "deleteRoom"]),
    showMap() {
      this.geocode(true);
    },
    deleteFileContract() {
      this.fileContract = "";
      this.fileContractName = "+ Прикрепить файл";
    },
    deleteImage(index) {
      this.imagesRooms.splice(index, 1);
    },
    deleteUploadedImage(index) {
      this.uploadedImagesRoom.splice(index, 1);
    },
    saveRoom(event) {
      console.log(event);
      event.preventDefault();
      // if (!this.coordinates || this.address != this.editRoom.address) {
        // this.geocode(false);
      // } else {
        this.sendNewRoom(this.newRoom);
      // }
      this.resetEditRoom();
    },
    deleteCurRoom() {
      const data = {
        ajax: 'Y',
        action: 'delete-calendar',
        id: this.id
      }
      this.deleteRoom(data);
    },
    addService(service) {
      this.selectedServices.forEach(el => {
        if (el.num == service.num) console.log("room");
      });
      this.selectedServices.push(service);
    },
    deleteService(service) {
      this.selectedServices = this.selectedServices.filter(el => {
        return el.title !== service.title;
      });
    },
    handleFileContractUpload() {
      this.fileContract = this.$refs.fileContractRef.files[0];
      this.fileContractName = this.fileContract.name;
      this.fileContractServer = false;
    },
    handleFileImagesUpload() {
      const vm = this;
      const fileImage = this.$refs.filesImage.files[0];
      let reader = new FileReader();
      reader.addEventListener(
        "load",
        function() {
          this.imagesRoomsFiles.push(fileImage);
          vm.imagesRooms.push(reader.result);
        }.bind(this),
        false
      );
      reader.onload = function() {};
      if (fileImage) {
        if (/\.(jpe?g|png|gif)$/i.test(fileImage.name)) {
          reader.readAsDataURL(this.$refs.filesImage.files[0]);
        }
      }
    },
    onSearch(search, loading) {
      loading(true);
      this.search(loading, search, this);
    },
    search: (loading, search, vm) => {
      $.ajax({
        type: "POST",
        url: "./index.php",
        data: {
          ajax: "Y",
          action: "search-users",
          name: `${search}`
        },
        success: function(response) {
          vm.responsiblePersons = response.data;
          loading(false);
        }
      });
    },
    init() {
      const suggestView = new ymaps.SuggestView("room-address");
      const vm = this;
      suggestView.events.add('select',function(event) {
        vm.address = event.get('item').value;
      });
    },
    geocode(showMap) {
      // function geocodeGo() {
      const vm = this;
      var request = $("#room-address").val();
      if (!request) {
        vm.validateError = "Введите адресс";
        vm.locationValidate = true;
        return;
      }
      ymaps.geocode(request).then(
        function(res) {
          var obj = res.geoObjects.get(0),
            error,
            hint;
          if (obj) {
            switch (
              obj.properties.get("metaDataProperty.GeocoderMetaData.precision")
            ) {
              case "exact":
                break;
              case "number":
              case "near":
              case "range":
                error = "Неточный адрес, требуется уточнение";
                hint = "Уточните номер дома";
                break;
              case "street":
                error = "Неполный адрес, требуется уточнение";
                hint = "Уточните номер дома";
                break;
              case "other":
              default:
                error = "Неточный адрес, требуется уточнение";
                hint = "Уточните адрес";
            }
          } else {
            error = "Адрес не найден";
            hint = "Уточните адрес";
          }
          if (error) {
            vm.validateError = hint;
            vm.locationValidate = true;
          } else {
            // vm.address = request;
            vm.locationValidate = false;
            vm.coordinates = obj.geometry.getCoordinates().join(",");
            if (showMap) {
              vm.showRoomOnMap({
                address: vm.address,
                coordinates: vm.coordinates
              });
            } else {
              vm.sendNewRoom(vm.newRoom);
            }
          }
        },
        function(e) {
          console.log(e);
        }
      );
    },
    changeServicesList(data) {
      this.servicesList = data;
    },
    removeFakeIdFromServicesList() {
      return this.servicesList.map((el) => {
        if(el.product_id[0] === 'f') {
          delete el.product_id;
        }
        return el;
      })
    }
  },
  components: {
    vSelect,
    popupRoomServices
  },
  computed: {
    ...mapState({
      timeZones: state => state.calendar.timeZones,
      editRoom: state => state.calendar.editRoom,
      shownPopapAddingCalendar: state => state.calendar.shownPopapAddingCalendar,
      editingRoom: state => state.calendar.editingRoom,
      measuresList: state => state.calendar.measureList,
      currencyList: state => state.calendar.currencyList
    }),
    ...mapGetters([
      "getCurrentTimeZone",
      "getTimeZoneById",
      "timeZonesForSelect"
    ]),
    imagesForSend() {
      return this.uploadedImagesRoom.map(el => el.code);
    },
    serviesForSend() {
      
    },
    newRoom() {
      const formData = new FormData();

      formData.append("ajax", `Y`);
      formData.append("action", `edit-calendar`);
      formData.append("name", this.name);
      formData.append("numberRoom", this.numberRoom);
      formData.append("capacityRoom", this.capacityRoom);
      formData.append("address", this.address);
      formData.append("coordinates", this.coordinates);
      if(this.fileContract) {
        if(this.fileContract === this.editRoom.fileContract) {
          formData.append("fileContract", this.editRoom.fileContract.code);
        } else {
          formData.append("fileContract", this.fileContract);
        }
      } else {
        if (this.fileContractServer) {
          formData.append("fileContract", "");
        }
      }
      formData.append("desc", this.desc);
      formData.append("color", this.color);
      formData.append("email", this.email);
      formData.append("timeZone", this.selectedTimezone.code);
      this.phones.forEach((el, index) => {
        formData.append(`phones[${index}]`, el);
      });
      this.servicesList.forEach((el, index) => {
        for(let key in el) {
          formData.append(`servicesList[${index}][${key}]`, el[key]);
        }
      });
      this.selectedResponsiblePersons.forEach((el, index) => {
        formData.append(`moderators[${index}]`, el.code);
      });
      this.imagesRoomsFiles.forEach((el, index) => {
        formData.append(`imagesRooms[${index}]`, el);
      });
      this.imagesForSend.forEach((el, index) => {
        formData.append(`imagesRoomsExisting[${index}]`, el);
      });
      if (this.id) {
        formData.append("id", this.id);
      }
      return formData;
    }
  },
  mounted() {
    if (this.editRoom.id.length) {
      this.name = this.editRoom.name;
      this.desc = this.editRoom.desc;
      this.numberRoom = this.editRoom.numberRoom;
      this.capacityRoom = this.editRoom.capacityRoom;
      this.fileContract = "";
      this.address = this.editRoom.address;
      this.coordinates = this.editRoom.coordinates;
      this.phones = this.editRoom.phones;
      this.email = this.editRoom.email;
      this.color = this.editRoom.color;
      this.selectedResponsiblePersons = this.editRoom.moderators;
      this.servicesList = this.editRoom.servicesList;
      if(!this.editRoom.timeZone) {
        this.selectedTimezone = {
          code: this.getCurrentTimeZone.id,
          label: this.getCurrentTimeZone.xmlId
        };
      } else {
        this.selectedTimezone = {
          code: this.getTimeZoneById(this.editRoom.timeZone).id,
          label: this.getTimeZoneById(this.editRoom.timeZone).xmlId
        };
      }
      this.id = this.editRoom.id;
      this.uploadedImagesRoom = this.editRoom.imagesRooms;
      if (!$.isEmptyObject(this.editRoom.fileContract)) {
        this.fileContract = this.editRoom.fileContract;
        const fileContractArr = this.editRoom.fileContract.src.split("/");
        this.fileContractName = fileContractArr[fileContractArr.length - 1];
        this.fileContractServer = true;
      }
    } else {
      this.selectedTimezone = {
        code: this.getCurrentTimeZone.id,
        label: this.getCurrentTimeZone.xmlId
      };
      this.color = "#000000";
    }
    ymaps.ready(this.init());
  }
};
</script>

<style >
.v-select-custom-room .vs__actions {
  font-size: 14px;
  top: -34px;
  left: 100px;
}

.v-select-custom-room .vs__dropdown-toggle {
  padding-right: 90px;
}
</style>