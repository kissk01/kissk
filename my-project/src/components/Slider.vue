<template>
  <div id="photos">
    <div class="">
      <a href="#"
        class="Slider-navigation-button Slider-navigation-prev"
        v-on:click.prevent="prevSelect()"
        v-bind:class="{ 'Slider-navigation--disabled': !canPrev() }"
        v-html="prevLabel"></a>
      <img :style="{width:sliderWidth+'px', height:sliderHeight+'px'}" v-bind:src="imageLink"/>
      <a href="#"
        class="Slider-navigation-button Slider-navigation-next"
        v-on:click.prevent="nextSelect()"
        v-bind:class="{ 'Slider-navigation--disabled': !canNext() }"
        v-html="nextLabel"></a>
    </div>
  </div>
</template>
<script>
export default {
    data() {
      return {
        currentPage: 0,
        photoList: [],
        imageLink: this.photos[0],
        sliderWidth: this.photoWidth,
        sliderHeight: this.photoHeight,
        dragOffset: 0,
        dragStartX: 0,
        mousedown: false,
        minSwipeDistance: 8
      }
    },
    props: {
      photos: {
        type:Array,
        default: []
      },
      easing: {
        type: String,
        default: "str"
      },
      /**
       * Text content of the navigation next button
       */
      nextLabel: {
        type: String,
        default: "▶"
      },
      /**
       * Text content of the navigation prev button
       */
      prevLabel: {
        type: String,
        default: "◀"
      },
      photoWidth: {
        type:Number,
        default: 400
      },
      photoHeight: {
        type: Number,
        default: 200
      }
    },
    watch: {
      photoWidth: {
        immediate:true,
        handler(newVal, oldVal) {
          console.log('slider with watch', newVal)
          this.sliderWidth = newVal
        }
      },
      photoHeight: {
        immediate:true,
        handler(newVal, oldVal) {
          console.log('slider height watch', newVal)
          this.sliderHeight = newVal
        }
      }
    },
    methods: {
      componentChange() {
        console.log(this.photoWidth, "from slider")
      },
      canPrev() {
        console.log(this.currentPage, 'canPrev w:', this.photoWidth)
        return this.currentPage > 0
      },
      canNext() {
        return this.currentPage < (this.imageCount()-1)
      },
      imageCount() {
        return this.photos.length
      },
      nextSelect() {
        console.log(this.canNext(), this.currentPage, this.imageCount())
        if(this.canNext()){
          this.currentPage+=1
          this.imageLink = this.photos[this.currentPage]
        }
      },
      prevSelect() {
        if(this.canPrev()){
          this.currentPage-=1
          this.imageLink = this.photos[this.currentPage]
        }
      },
      handleMousedown(event) {
        if (!event.touches) { event.preventDefault() }
        this.mousedown = true
        this.dragStartX = ("ontouchstart" in window) ? event.touches[0].clientX : event.clientX
      },
      handleMouseup() {
        this.mousedown = false
        this.dragOffset = 0
      },
      handleMousemove(event) {
        if (!this.mousedown) {
          return
        }
        const eventPosX = ("ontouchstart" in window) ? event.touches[0].clientX : event.clientX
        const deltaX = (this.dragStartX - eventPosX)
        this.dragOffset = deltaX
        if (this.dragOffset > this.minSwipeDistance) {
          this.handleMouseup()
          this.prevSelect()
        } else if (this.dragOffset < -this.minSwipeDistance) {
          this.handleMouseup()
          this.nextSelect()
        }
      }
    },
    mounted() {
      if ("ontouchstart" in window) {
        this.$el.addEventListener("touchstart", this.handleMousedown)
        this.$el.addEventListener("touchend", this.handleMouseup)
        this.$el.addEventListener("touchmove", this.handleMousemove)
      } else {
        this.$el.addEventListener("mousedown", this.handleMousedown)
        this.$el.addEventListener("mouseup", this.handleMouseup)
        this.$el.addEventListener("mousemove", this.handleMousemove)
      }
    }
  }
</script>
<style>
  .Slider-navigation-button {
    position: absolute;
    top: 50%;
    box-sizing: border-box;
    color: #000;
    text-decoration: none;
  }
  .Slider-navigation-next {
    transform: translateY(-50%) translateX(100%);
    right: 20px;
  }
  .Slider-navigation-prev {
    transform: translateY(-50%) translateX(-100%);
    left: 20px;
  }
  .Slider-navigation--disabled {
    opacity: 0.3;
    cursor: default;
  }
  .Slider-navigation {
    width: 200px;
    height:100px;
  }
</style>
