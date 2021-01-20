<template lang="pug">
  .calendar-event-popup-fullscreen__preview
    .calendar-popup-event__preview
      .btn.calendar-page__btn-create(v-if="!previewEdit && !previewView" @click="previewEdit = true; previewName = eventName") + Создать анонс
      .calendar-popup-event__preview-edit(v-if="previewEdit")
        .calendar-popup-event__preview-date.mb-2 {{dataForPreview}}
        .calendar-popup-event__parameter
          input.calendar-popup-event__name-input(
            placeholder='Название'
            v-model="preview.name"
          )
        .calendar-popup-event__parameter
          input.calendar-popup-event__input-desk.mb-2(
            placeholder='Описание'
            v-model="preview.desc"
          )
        .calendar-popup-event__parameter
          .mb-2 Изображение
          label.calendar-popup-event__file
            input.calendar-popup-event__file-input(
              type="file"
              ref="file"
              @change="handleFileUpload()"
              )
            img.calendar-popup-event__file-img(
              :src="imagePreview"
              
            )
            //- v-show="showImagePreview"
            .calendar-popup-event__file-title {{fileName}}
            button.calendar-popup-event__file-btn(
              @click="deleteImagePreview()"
              v-if="imagePreview"
            )
              i.fas.fa-times
        .card.mb-3
          .card-body
            .calendar-popup-event__parameter.flex-column
              .mb-2 Область влияния
              .v-select-custom.v-select-custom-left-140
                vSelect(
                  multiple v-model="preview.tagsAreaOfInfluence" :options="tagsAreaOfInfluenceForSelect"
                )
            .calendar-popup-event__parameter
              .mb-2 Важные персоны
              .v-select-custom.v-select-custom-left-140
                vSelect(
                  multiple v-model="preview.tagsPersons" :options="tagsPersonsForSelect"
                )
            .calendar-popup-event__parameter
              .mb-2 Тематики
              .v-select-custom.v-select-custom-left-80
                vSelect(
                  multiple v-model="preview.tagsSubjects" :options="tagsSubjectsForSelect"
                )
        .calendar-popup-event__btns
          button.btn.calendar-popup-event__btn.calendar-popup-event__btn-outline.mr-3(
            @click="deletePreview();"
          ) Отменить
          button.btn.calendar-popup-event__btn.calendar-popup-event__btn_save(
            @click="savePreview();"
          ) Сохранить
    .calendar-popup-event__preview-view(v-if="previewView")
      .card.mb-4.calendar__event
        .text-right.p-2.calendar__event-btn
          button.btn.calendar-popup-event-detail__btn.mr-2(data-v-3fd6c9ce='', type='button', data-dismiss='modal' @click="deletePreview()")
            i.far.fa-trash-alt
          button.btn.calendar-popup-event-detail__btn(data-v-3fd6c9ce='', type='button' @click="previewView=false; previewEdit=true")
            i.fas.fa-pencil-alt
        .card-body.calendar__event-body
          .calendar__event-date {{dataForPreview}}
          .calendar__event-title {{preview.name}}
          .calendar__event-pic
            //- (v-show="showImagePreview")
            img.calendar__event-img(:src="imagePreview")
          .calendar__event-tags
            ul.tags
              li.tags__item(v-for="tag in allTags")
                a.tags__link(href="#") {{tag}}
</template>

<script>
import calendarsSelect from "./calendars-select.vue";
import vSelect from "./v-select/components/Select.vue";
import { mapMutations, mapState, mapGetters, mapActions } from "vuex";
import { MONTH } from "./const.js";

export default {
  data() {
    return {
      preview: {
        name: "",
        desc: "",
        img: "",
        tagsAreaOfInfluence: [],
        tagsPersons: [],
        tagsSubjects: []
      },
      previewEdit: false,
      previewView: false,
      fileName: "Загрузите изображение",
      showImagePreview: false,
      imagePreview: "",
      imageServer: false
    };
  },
  props: {
    date: {
      type: String,
      default: () => {
        return "";
      }
    },
    eventName: {
      type: String,
      default: () => {
        return "";
      }
    },
    previewData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },

  methods: {
    resetPreviewData() {
      this.preview.name = "";
      this.preview.desc = "";
      this.preview.img = "";
      this.preview.tagsAreaOfInfluence = [];
      this.preview.tagsPersons = [];
      this.preview.tagsSubjects = [];
    },
    deletePreview() {
      this.$emit("savePreview", {});
      this.resetPreviewData(); 
      this.previewView=false;
    },
    savePreview() {
      this.$emit("savePreview", this.dataPreviewForSave);
      this.previewView = true;
      this.previewEdit = false;
    },
    handleFileUpload() {
      this.preview.img = this.$refs.file.files[0];
      this.fileName = this.preview.img.name;
      let reader = new FileReader();
      reader.addEventListener(
        "load",
        function() {
          this.showImagePreview = true;
          this.imagePreview = reader.result;
        }.bind(this),
        false
      );
      if (this.preview.img) {
        if (/\.(jpe?g|png|gif)$/i.test(this.preview.img.name)) {
          reader.readAsDataURL(this.preview.img);
        }
      }
    },
    deleteImagePreview() {
      this.showImagePreview = false;
      this.fileName = "Загрузите изображение";
      this.imagePreview = "";
      this.preview.img = "";
    }
  },
  computed: {
    ...mapGetters([
      "tagsPersonsForSelect",
      "tagsSubjectsForSelect",
      "tagsAreaOfInfluenceForSelect"
    ]),
    allTags() {
      return [
        ...this.preview.tagsAreaOfInfluence,
        ...this.preview.tagsPersons,
        ...this.preview.tagsSubjects
      ].map(el => el.label);
    },
    dataForPreview() {
      const arrData = this.date.split(".");
      const numMonth = Number(arrData[1] - 1);
      return `${arrData[0]} ${MONTH[numMonth]} ${arrData[2]}`;
    },
    dataPreviewForSave() {
      let img = {};
      if(this.preview.img) {
        img = { img: this.preview.img };
      } else {
        if(this.imageServer) {
          img = { img: false };
        }
      }
      return {
        name: this.preview.name,
        desc: this.preview.desc,
        tagsAreaOfInfluence: this.preview.tagsAreaOfInfluence.map(
          el => el.code
        ),
        tagsPersons: this.preview.tagsPersons.map(el => el.code),
        tagsSubjects: this.preview.tagsSubjects.map(el => el.code),
        ...img
      };
    }
  },

  components: {
    calendarsSelect,
    vSelect
  },
  mounted() {
    console.log(this.previewData);
    if (!$.isEmptyObject(this.previewData)) {
      this.preview.name = this.previewData.name;
      this.preview.desc = this.previewData.desc;
      // this.preview.tagsAreaOfInfluence = this.previewData.tagsAreaOfInfluence;
      // this.preview.tagsPersons = this.previewData.tagsPersons;
      // this.preview.tagsSubjects = this.previewData.tagsSubjects;
      this.preview.tagsAreaOfInfluence = this.tagsAreaOfInfluenceForSelect.filter(
        el => this.previewData.tagsAreaOfInfluence.includes(el.code)
      );
      this.preview.tagsPersons = this.tagsPersonsForSelect.filter(el =>
        this.previewData.tagsPersons.includes(el.code)
      );
      this.preview.tagsSubjects = this.tagsSubjectsForSelect.filter(el =>
        this.previewData.tagsSubjects.includes(el.code)
      );

      if(this.previewData.img) {
        const srcInArr = this.previewData.img.split('/');
        this.imagePreview = this.previewData.img;
        this.fileName = srcInArr[srcInArr.length - 1];
        this.imageServer = true;
      }
      // this.preview.img = this.editEvent.preview.img;
      this.previewView = true;
    }
  }
};
</script>

<style lang="scss">
</style>