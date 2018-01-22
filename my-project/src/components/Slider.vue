<template>
  <div id="photos">
    <img v-bind:src="imageLink"/>
    <button v-on:click='componentChange()'>Button</button>
  </div>
</template>
<script>
export default {
    data() {
      return {
        currentPage: 0,
        photoList: [],
        imageLink: 'http://netdna.webdesignerdepot.com/uploads/2008/11/sample-graphic.jpg'
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
        //this.imageLink = photos[1]
      },
      canPrev() {
        return this.currentPage > 0
      },
      canNext() {
        return this.currentPage < this.imageCount
      },
      imageCount() {
        return this.photoList.length
      },
      nextSelect() {
        if(this.canNext){
          this.imageLink = this.photoList[this.currentPage]
          this.currentPage+=1
        }
      },
      prevSelect() {
        if(this.canPrev){
          this.imageLink = this.photoList[this.currentPage]
          this.currentPage-=1
        }
      }
    }
  }
</script>
