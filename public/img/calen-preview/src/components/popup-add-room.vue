<template lang="pug">

        form.popup-add-room#popup-add-room.was(
          @submit="saveRoom($event)"
        )
          .popup-add-room__content
            .popup-add-room__header
              button.btn.popup-add-room__btn-close(
                
                @click="closePopapAddingCalendar(); resetEditRoom();"
              )
                i.fas.fa-times
              input.popup-add-room__name(type="text" placeholder="Название" v-model="name" required)
              button.btn.popup-add-room__btn-save(
                type="submit"
                
              ) Сохранить
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
                      button.btn(
                        @click="deleteFileContract()"
                         v-if="fileContract"
                        )
                        i.fas.fa-times
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
                        .dropdown
                          button.btn.popup-add-room__option-services-add(data-toggle='dropdown') + Добавить
                          .dropdown-menu
                            button.dropdown-item(
                              href='#'
                              v-for="(service, index) in services"
                              :key="`service-${index}`"
                              @click="addService(service)"
                            ) {{service.title}}

                    .popup-add-room__option
                      input.popup-add-room__option-input.w-100(
                        placeholder="описание"
                        v-model="desc"
                        )
                    .popup-add-room__option.popup-add-room__option_vertical
                      .popup-add-room__option-title Добавить изображение (не более 20)
                      .popup-add-room__room-images
                        .popup-add-room__pics
                          .popup-add-room__pic(v-for="(roomImage,index) in uploadedImagesRoom")
                            img.popup-add-room__img(:src="roomImage.src")
                            button.popup-add-room__btn-delete-img(
                              @click="deleteUploadedImage(index)"
                            )
                              i.fas.fa-times

                          .popup-add-room__pic(v-for="roomImage in imagesRooms")
                            img.popup-add-room__img(:src="roomImage")
                            button.popup-add-room__btn-delete-img(
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
                .col-4.pl-5
                  .popup-add-room__info-title Контактные данные
                  .popup-add-room__options
                    .popup-add-room__option.popup-add-room__option_vertical
                      .popup-add-room__option-title.mb-2 Ответсвенные
                      .v-select-custom.v-select-custom-left-140.w-100
                        vSelect(
                        multiple v-model="selectedResponsiblePersons" :options="responsiblePersons" @search="onSearch"
                        )
                    .popup-add-room__option.popup-add-room__option_vertical
                      .popup-add-room__option-title.mb-2 Телефоны
                      .d-flex.w-100
                        input.popup-add-room__option-input.w-100(type="tel" v-model="phone" v-show="phones.length < 3")
                        button.btn.popup-add-room__btn-phone(
                          v-show="phone.length"
                          @click="phone = ''"
                          )
                          i.fas.fa-times
                        button.btn.popup-add-room__btn-phone(
                          v-show="phone.length"
                          @click="phones.push(phone);phone = ''"
                          )
                          i.fas.fa-plus-circle
                      .popup-add-room__phone.w-100(
                        v-for="(phone, index) in phones"
                      ) 
                        .popup-add-room__phone-text {{phone}}
                        button.btn.popup-add-room__btn-phone(
                            @click="phones.splice(index, 1)"
                        )
                          i.fas.fa-times
                    .popup-add-room__option.popup-add-room__option_vertical
                      .popup-add-room__option-title.mb-2 E-mail
                      input.popup-add-room__option-input.w-100(
                          type="email"
                          v-model="email"
                        )
</template>

<script>
import vSelect from "./v-select/components/Select.vue";
import { mapMutations, mapState, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      name: "",
      locations: [
        {
          code: 1,
          label: "ул. Тула, ул. Пузакова, д. 5"
        },
        {
          code: 2,
          label: "ул. Тула, ул. Пузакова, д. 25"
        }
      ],
      selectedLocation: {},
      numberRoom: "",
      capacityRoom: "",
      fileContract: "",
      fileContractName: "+ Прикрепить файл",
      fileContractServer: false,
      imagesRooms: [],
      imagesRoomsFiles: [],
      uploadedImagesRoom: [
        // {
        //   code: "22574265",
        //   src: "/img/img2.jpg"
        // },
        // {
        //   code: "22574265",
        //   src: "/img/img3.jpg"
        // }
      ],
      desc: "",
      color: "",
      responsiblePersons: [
        // {
        //   code: 1,
        //   label: "Федор Петров"
        // },
        // {
        //   code: 2,
        //   label: "Иван Иванов"
        // }
      ],
      selectedResponsiblePersons: [],
      email: "",
      phone: "",
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
        }
      ],
      selectedServices: [],
      id: '',
      address: "",
	  selectedTimezone: {},
    phones: [],
    coords: [],
    locationValidate: false,
    validateError: ""
    };
  },

  methods: {
    ...mapMutations(["closePopapAddingCalendar", "resetEditRoom"]),
    ...mapActions(["sendNewRoom", "showRoomOnMap"]),
    showMap() {
      this.geocode(
          this.showRoomOnMap({
          address: this.address,
          coordinates: this.coords.join(',')
        })
      );
      
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
    saveRoom() {
      event.preventDefault();
      this.sendNewRoom(this.newRoom);
      this.closePopapAddingCalendar();
      this.resetEditRoom();
      // console.log(this.newRoom.entries());
      // console.log(test.entries());
      
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
    },
    handleFileImagesUpload() {
      const vm = this;
      const fileImage = this.$refs.filesImage.files[0];
      this.imagesRoomsFiles.push(fileImage);
      let reader = new FileReader();
      reader.readAsDataURL(this.$refs.filesImage.files[0]);
      reader.onload = function() {
        vm.imagesRooms.push(reader.result);
      };
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
      var suggestView1 = new ymaps.SuggestView('room-address');
      // this.geocode;
    },
    geocode(func) {
      // function geocodeGo() {
        const vm = this;
        var request = $('#room-address').val();
        ymaps.geocode(request).then(function (res) {
            var obj = res.geoObjects.get(0),
                error, hint;
            if (obj) {
                switch (obj.properties.get('metaDataProperty.GeocoderMetaData.precision')) {
                    case 'exact':               
                        break;
                    case 'number':
                    case 'near':
                    case 'range':
                        error = 'Неточный адрес, требуется уточнение';
                        hint = 'Уточните номер дома';
                        break;
                    case 'street':
                        error = 'Неполный адрес, требуется уточнение';
                        hint = 'Уточните номер дома';
                        break;
                    case 'other':
                    default:
                        error = 'Неточный адрес, требуется уточнение';
                        hint = 'Уточните адрес';
                }
            } else {
                error = 'Адрес не найден';
                hint = 'Уточните адрес';
            }
            if (error) {
                vm.validateError = hint;
                vm.locationValidate = true;
            } else {
              vm.address = request; 
              vm.locationValidate = false;
              vm.coords = obj.geometry.getCoordinates();
              func();
            }
        }, function (e) {
            console.log(e)
        })
    }
  },
  components: {
    vSelect
  },
  computed: {
    ...mapState({
      timeZones: state => state.calendar.timeZones,
      editRoom: state => state.calendar.editRoom,
      shownPopapAddingCalendar: state => state.calendar.shownPopapAddingCalendar,
    }),
    ...mapGetters(["getCurrentTimeZone", "getTimeZoneById", "timeZonesForSelect"]),
    imagesForSend() {
      return this.uploadedImagesRoom.map(el => el.code);
    },
    newRoom() {
      const formData = new FormData();
      
      formData.append("ajax", `Y`);
      formData.append("action", `edit-calendar`);
      formData.append("name", this.name);
      formData.append("numberRoom", this.numberRoom);
      formData.append("capacityRoom", this.capacityRoom);

      if (!this.fileContract) {
        formData.append("fileContract", this.fileContract);
      } else {
        if(this.fileContract) {
          formData.append("fileContract", false);
        }
      }
      
      formData.append("desc", this.desc);
      formData.append("color", this.color);
      formData.append("email", this.email);
      formData.append("timeZone", this.selectedTimezone.code);
      this.phones.forEach((el, index) => {
        formData.append(`phones[${index}]`, el);
      });
      this.selectedServices.forEach((el, index) => {
        formData.append(`services[${index}]`, el);
      });
      this.selectedResponsiblePersons.forEach((el, index) => {
        formData.append(`responsiblePersons[${index}]`, el.code);
      });
      formData.append("location", this.selectedLocation.code);
      this.imagesRooms.forEach((el, index) => {
        formData.append(`imagesRooms[${index}]`, el);
      });
      this.imagesForSend.forEach((el, index) => {
        formData.append(`imagesRoomsExisting[${index}]`, el);
      });
      if(this.id) {
        formData.append("id", this.id);
      }
      return formData;
    }
  },
  mounted() {
    if(!$.isEmptyObject(this.editRoom)) {
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
      this.selectedTimezone = {
        code: this.getTimeZoneById(this.editRoom.timeZone).id,
        label: this.getTimeZoneById(this.editRoom.timeZone).xmlId
      };
      this.id = this.editRoom.id;
      this.uploadedImagesRoom = this.editRoom.imagesRooms;
      if(this.editRoom.fileContract) {
        this.fileContractServer = true;
        this.fileContract = this.editRoom.fileContract;
        const fileContractArr = this.editRoom.fileContract.split("/");
        this.fileContractName = fileContractArr[fileContractArr.length - 1];
      }
    } else {
      this.selectedTimezone = {
        code: this.getCurrentTimeZone.id,
        label: this.getCurrentTimeZone.xmlId
      };
      this.color="#000000";
    };
    ymaps.ready(this.init());
    // this.name = this.editRoom.name;
    // this.description = this.editRoom.description;
    // this.numberRoom = this.editRoom.numberRoom;
    // this.capacityRoom = this.editRoom.capacityRoom;
    // this.fileContract = "";
    // this.address = this.editRoom.address;
    // this.coordinates = this.editRoom.coordinates;
    
    // this.phones = this.editRoom.phones;
    // this.email = this.editRoom.email;
    // if(!this.editRoom.id) {
    //   this.selectedTimezone = {
    //     code: this.getCurrentTimeZone.id,
    //     label: this.getCurrentTimeZone.xmlId
    //   };
    //   this.color="#000000";
    // } 
    // else {
    //   this.color = this.editRoom.color;
    //   this.selectedTimezone = {
    //     code: this.getTimeZoneById(this.editRoom.timeZone).id,
    //     label: this.getTimeZoneById(this.editRoom.timeZone).xmlId
    //   };
    // }
    
  }
};
</script>

<style>
.v-select-custom-left-140 .vs__actions {
  left: 140px;
}

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
  right: 0;
}

.v-select-custom .vs__button__collapse {
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

.v-select-custom .vs__actions .vs__open-indicator {
  display: none;
}
/* .v-select-custom .vs__actions {
  position: absolute;
  top: -31px;
  left: 85px;
} */
.v-select-custom-left-140 .vs__actions {
  left: 140px;
}
.v-select-custom-left-80 .vs__actions {
  left: 80px;
}

.v-select-custom .vs__selected_hidden {
  display: none;
}
</style>