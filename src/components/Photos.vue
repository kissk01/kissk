<template>
  <div id="Photos">
    <slider :photos="photoList" :pwidth="swidth" :pheight="sheight"></slider>
  </div>
</template>

<script>
    import Slider from './Slider.vue'
    export default {
      components: {Slider},
      data() {
        return {
            photoList: [
              'http://lorempixel.com/400/200',
              'http://lorempixel.com/g/400/200/',
              'http://lorempixel.com/400/200/sports/',
              'http://lorempixel.com/400/200/sports/Dummy-Text/',
              'http://lorempixel.com/400/200/sports/1/Dummy-Text/'
            ]
        }
      },
      props: {
        swidth: {
          type:Number,
          default: 400
        },
        sheight: {
          type: Number,
          default: 200
        }
      }
    }
</script>
