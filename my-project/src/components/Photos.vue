<template>
  <div id="Photos">
    <button v-on:click='componentChange()'>Button</button>
    <slider photos="photoList"></slider>
  </div>
</template>

<script>
    /*import SimpleCarousel from './SimpleCarousel.vue'
    import Slide from './Slide.vue'*/
    import Slider from './Slider.vue'
    export default {
      components: {Slider},
      data() {
        return {
            photoList: [
              'http://netdna.webdesignerdepot.com/uploads/2008/11/sample-graphic.jpg',
              'https://www.computerhope.com/jargon/j/jpg.jpg'
            ],
            imageLink0: 'https://www.computerhope.com/jargon/j/jpg.jpg',
            imageLink: '.././assets/logo.png',
            pageCount: 0
        }
      },
      methods: {
        componentChange: function () {
          console.log(this.photoList.length, " length")
          this.imageLink0 = this.photoList[0]
        }
      }
    }
</script>

<style>
/*img {
  display: block;
  width: 200px;
  height: 200px;
}*/
</style>
