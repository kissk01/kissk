<template>
  <div class="Slider-slide">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "slide",
    data() {
      return {
        width: null,
      }
    }
  }
</script>

<style>
  .Slider-slide {
    flex-basis: inherit;
    flex-grow: 0;
    flex-shrink: 0;
    user-select: none;
  }
</style>
