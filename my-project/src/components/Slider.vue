<template>
  <div id="photos">
    <img v-bind:src="imageLink"/>
    <button v-on:click='prevSelect()' :disabled='!canPrev()'>prev button</button>
    <button v-on:click='nextSelect()' :disabled='!canNext()'>next button</button>
  </div>
</template>
<script>
export default {
    data() {
      return {
        currentPage: 0,
        photoList: [],
        imageLink: this.photos[0]
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
      }
    },
    methods: {
      componentChange() {
        console.log(this.easing, this.photos[1])
        this.imageLink = this.photos[0]
      },
      canPrev() {
        console.log(this.currentPage, 'canPrev')
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
      }
    }
  }
</script>
