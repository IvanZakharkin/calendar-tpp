<template lang="pug">
.modal.ymaps-modal
  .modal-dialog.modal-dialog-centered
    .modal-content
        .content(
                @click="closeMap()"
            )
            #yandex-map-rooms(style='width: 100%; height: 100%')
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    data(){
        return {
            map:{}
        }
    },
    components: {
    },
    computed: {
        ...mapState({
            yandexMap: state => state.calendar.yandexMap
        }),
        show(){
            return this.yandexMap.show
        }
    },
    methods: {
        ...mapMutations(["updateYandexMap"]),
        // closeMap(){
        //     const vm = this;
        // ymaps.ready(() => {
        //     ymaps.geocode(`г. Тула, ул. Ф. Энгельса, 70, 2 этаж`, {results: 1})
        //     .then(function (res) {
        //         var firstGeoObject = res.geoObjects.get(0),
        //             coords = firstGeoObject.geometry.getCoordinates(),
        //             bounds = firstGeoObject.properties.get('boundedBy');

        //         firstGeoObject.options.set('preset', 'islands#darkBlueDotIconWithCaption');
        //         firstGeoObject.properties.set('iconCaption', firstGeoObject.getAddressLine());
        //         vm.map.geoObjects.add(firstGeoObject);
        //         vm.map.setBounds(bounds, {
        //             checkZoomRange: true
        //         });
        //     })
        // });
        // }
    },
  created() {
      this.dataMap = this.yandexMap;
      ymaps.ready(() => {
          window.yandexMapRoom = new ymaps.Map('yandex-map-rooms', {
                center: [55.753994, 37.622093],
                zoom: 9
            });
      })
  }
}

</script>

<style lang="scss">
.ymaps-modal {
    // background: rgba(000, 000, 000, 0.3);
    // display: block;
    // opacity: 1;
}

.content {
    width: 100%;
    height: 500px;
    // position: absolute;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -50%);
    // width: 100%;
    // height: 100vh;
}

.ymaps-modal {
    .modal-dialog {
        max-width: 1000px;
    }
    .modal-content {
        width: 100%;
    }
}
</style>