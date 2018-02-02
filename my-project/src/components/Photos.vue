<template>
  <div id="Photos">
    <slider :photos="photoList" :photoWidth="sliderWidth" :photoHeight="sliderHeight"></slider>
  </div>
</template>

<script>
    import Slider from './Slider.vue'
    export default {
      components: {Slider},
      data() {
        return {
            photoList: [
              'https://www.computerhope.com/jargon/j/jpg.jpg',
              'http://lorempixel.com/400/200',
              'http://lorempixel.com/g/400/200/',
              'http://lorempixel.com/400/200/sports/',
              'http://lorempixel.com/400/200/sports/Dummy-Text/',
              'http://lorempixel.com/400/200/sports/1/Dummy-Text/'
            ],
            imageLink0: 'https://www.computerhope.com/jargon/j/jpg.jpg',
            imageLink: '.././assets/logo.png',
            pageCount: 0
        }
      },
      methods: {
        componentChange: function () {
          console.log(this.photoList.length, " length parent val:", this.sliderHeight)
          this.imageLink0 = this.photoList[0]
        },
        componentClick: function (value) {
          console.log('emit settingsClick from photos', value, ' val ')
        }
      },
      props: {
        sliderWidth: {
          type:Number,
          default: 400
        },
        sliderHeight: {
          type: Number,
          default: 200
        }
      }
    }
</script>

<style>
/*
,
      props: {
        slider-width: {
          type: Number,
          default: 600
        },
        slider-height: {
          type: Number,
          default: 600
        }
      }

img {
  display: block;
  width: 200px;
  height: 200px;
}*/
</style>
