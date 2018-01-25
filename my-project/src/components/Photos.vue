<template v-on:child-msg="componentChange()">
  <div id="Photos">
    <button v-on:click='componentChange()'>Button</button>
    <slider :photos="photoList"></slider>
  </div>
</template>

<script>
    import Slider from './Slider.vue'
    export default {
      components: {Slider},
      data() {
        return {
            photoList: [
              'http://netdna.webdesignerdepot.com/uploads/2008/11/sample-graphic.jpg',
              'https://www.computerhope.com/jargon/j/jpg.jpg',
              'http://netdna.webdesignerdepot.com/uploads/2008/11/sample-graphic.jpg',
              'https://www.computerhope.com/jargon/j/jpg.jpg',
              'http://netdna.webdesignerdepot.com/uploads/2008/11/sample-graphic.jpg'
            ],
            imageLink0: 'https://www.computerhope.com/jargon/j/jpg.jpg',
            imageLink: '.././assets/logo.png',
            pageCount: 0
        }
      },
      methods: {
        componentChange: function () {
          console.log(this.photoList.length, " length parent val:", this.sliderWidth)
          this.imageLink0 = this.photoList[0]
        },
        componentClick: function (value) {
          console.log('emit settingsClick from photos', value, ' val ')
        }
      },
      props: {
        sliderWidth: {
          type:Number,
          default: 600
        },
        sliderHeight: {
          type: Number,
          default: 600
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
