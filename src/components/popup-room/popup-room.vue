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
                    popup-room-images(@changeImagesRooms="changeImagesRooms($event)" @changeImagesRoomsFromServer="changeImagesRoomsFromServer($event)")
                .col-4
                  .popup-add-room__info-title Контактные данные
                  .popup-add-room__options
                    .popup-add-room__option.popup-add-room__option_vertical
                      .popup-add-room__option-title.mb-2 Ответсвенные
                      .v-select-custom.v-select-custom-left-140.w-100.v-select-custom-room
                        vSelect(
                        multiple v-model="selectedResponsiblePersons" :options="responsiblePersons" @search="onSearch"
                        )
                    popup-room-contacts-inputs(:contactsType="{name: 'Телефоны', type: 'tel'}" :contactsValues="editRoom.phones" @changeContacts="changeContacts($event, 'phones')")
                    popup-room-contacts-inputs(:contactsType="{name: 'Emails', type: 'email'}" :contactsValues="editRoom.email" @changeContacts="changeContacts($event, 'emails')")
              
            popup-room-services(@changeServicesList="changeServicesList($event)")
            .text-right.mt-5
              button.btn.btn-danger.mr-3.popup-add-room__btn-save(
                type="button"
                v-show="id"
                @click="deleteCurRoom()"
              ) Удалить
              button.btn.btn-primary.popup-add-room__btn-save(
                type="submit"
                :disabled="sendingRoom"
              ) 
                span.spinner-border.spinner-border-sm.mr-2(role="status" aria-hidden="true" v-show="sendingRoom")
                | Сохранить
</template>

<script>
import vSelect from "../v-select/components/Select.vue";
import uniqueid from 'lodash.uniqueid';
import popupRoomServices from "./popup-room-services.vue";
import popupRoomContactsInputs from "./popup-room-contacts-inputs";
import popupRoomImages from "./popup-room-images";
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
      imagesRoomsFromServer: [],
      desc: "",
      color: "",
      responsiblePersons: [],
      selectedResponsiblePersons: [],
      servicesList: [],
      selectedServices: [],
      id: null,
      address: "",
      selectedTimezone: {},
      phones: [],
      emails: [],
      coordinates: [],
      locationValidate: false,
      validateError: "",
    };
  },

  methods: {
    ...mapMutations(["closePopapAddingCalendar", "resetEditRoom"]),
    ...mapActions(["sendNewRoom", "showRoomOnMap", "deleteRoom"]),
    changeImagesRooms(event) {
      console.log(event);
      this.imagesRooms = event;
    },
    changeImagesRoomsFromServer(event) {
      console.log(event);
      this.imagesRoomsFromServer = event;
    },
    changeContacts(data, type) {
      this[type] = data;
    },
    showMap() {
      this.geocode(true);
    },
    deleteFileContract() {
      this.fileContract = "";
      this.fileContractName = "+ Прикрепить файл";
    },
    saveRoom(event) {
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
      
			const del = () => {
				this.deleteRoom(data);
			};

			modalConfirm({
				onConfirm: del,
				title: 'Удаление календаря',
				content: 'Вы уверены, что хотите удалить данный календарь?',
			});
			// this.deleteEvent(this.event.id);
			// this.closePopapDetailsEvents();
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
  },
  components: {
    vSelect,
    popupRoomServices,
    popupRoomContactsInputs,
    popupRoomImages
  },
  computed: {
    ...mapState({
      timeZones: state => state.calendar.timeZones,
      editRoom: state => state.calendar.editRoom,
      shownPopapAddingCalendar: state => state.calendar.shownPopapAddingCalendar,
      editingRoom: state => state.calendar.editingRoom,
      measuresList: state => state.calendar.measureList,
      currencyList: state => state.calendar.currencyList,
      sendingRoom: state => state.calendar.loadings.savingCalendar
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
      return this.servicesList.map((el) => {
        if(el.id[0] === 'f') {
          delete el.id;
        }
        return el;
      })
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
      this.emails.forEach((el, index) => {
        formData.append(`emails[${index}]`, el);
      });
      this.serviesForSend.forEach((el, index) => {
        for(let key in el) {
          formData.append(`servicesList[${index}][${key}]`, el[key]);
        }
      });
      this.selectedResponsiblePersons.forEach((el, index) => {
        formData.append(`moderators[${index}]`, el.code);
      });
      this.imagesRooms.forEach((el, index) => {
        formData.append(`imagesRooms[${index}]`, el);
      });
      this.imagesRoomsFromServer.forEach((el, index) => {
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

    // tinymce.init({
    //   selector: '#event-description',
    //   language: 'ru',
    //   init_instance_callback: (editor) => {
    //     editor.on('input', (e) => {
    //       this.eventDesc = editor.getContent();
    //     });
    //   }
    // });
  },

  // destroyed() {
  //   tinymce.remove();
  // }
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