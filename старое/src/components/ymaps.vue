<template lang="pug">
//- .modal.ymaps-modal(v-if="showYMaps")
//-   .modal-dialog.modal-dialog-centered
.content(
        @click="closeMap()"
    )
    #map(style='width: 600px; height: 400px')
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
        closeMap(){
            // this.updateYandexMap({
            //     room:"",
            //     show: false
            // })
            console.log(123);
             ymaps.geocode(`г. Тула, ул. Ф. Энгельса, 70, 2 этаж`, {results: 1})
        .then(function (res) {
            var firstGeoObject = res.geoObjects.get(0),
                coords = firstGeoObject.geometry.getCoordinates(),
                bounds = firstGeoObject.properties.get('boundedBy');

            firstGeoObject.options.set('preset', 'islands#darkBlueDotIconWithCaption');
            firstGeoObject.properties.set('iconCaption', firstGeoObject.getAddressLine());
            this.map.geoObjects.add(firstGeoObject);
            // Масштабируем карту на область видимости геообъекта.
            this.map.setBounds(bounds, {
                // Проверяем наличие тайлов на данном масштабе.
                checkZoomRange: true
            });
        })
        }
    },
  created() {
      this.dataMap = this.yandexMap;
      ymaps.ready(() => {
          this.map = new ymaps.Map('map', {
                center: [55.753994, 37.622093],
                zoom: 9
            });

      })
    // ymaps.geocode(`г. Тула, ул. Ф. Энгельса, 70, 2 этаж`, {results: 1})
    //     .then(function (res) {
    //         var firstGeoObject = res.geoObjects.get(0),
    //             coords = firstGeoObject.geometry.getCoordinates(),
    //             bounds = firstGeoObject.properties.get('boundedBy');

    //         firstGeoObject.options.set('preset', 'islands#darkBlueDotIconWithCaption');
    //         firstGeoObject.properties.set('iconCaption', firstGeoObject.getAddressLine());
    //         myMap.geoObjects.add(firstGeoObject);
    //         // Масштабируем карту на область видимости геообъекта.
    //         myMap.setBounds(bounds, {
    //             // Проверяем наличие тайлов на данном масштабе.
    //             checkZoomRange: true
    //         });
    //     })
        // ymaps.geocode('г. Тула, ул. Ф. Энгельса, 70, 2 этаж',{results:1})
        // .then(function(res){
        //     var firstGeoObject=res.geoObjects.get(0);
        //     bounds = firstGeoObject.properties.get('boundedBy');
        //     window.myMap=new ymaps.Map("map",{
        //     center:firstGeoObject.geometry.getCoordinates(),
        //     zoom:14
        // })
        // ymaps.geocode(myMap.getCenter(),{
        //     boundedBy: myMap.getBounds(),
        //     results:1
        // }).then(function(res){
        //     window.myMap.controls.add('zoomControl').add('typeSelector').add('mapTools');
        //     window.myMap.geoObjects.add(res.geoObjects);
        // });
        //     },function(err){alert(err.message);})
        // });
  }
}

</script>

<style lang="scss">
.ymaps-modal {
    background: rgba(000, 000, 000, 0.3);
    display: block;
    opacity: 1;
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