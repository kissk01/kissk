<template>
  <div class="Slider-navigation">
    <a href="#"
      class="Slider-navigation-button Slider-navigation-prev"
      v-on:click.prevent="triggerPageAdvance('backward')"
      v-bind:class="{ 'Slider-navigation--disabled': !canAdvanceBackward }"
      v-bind:style="`padding: ${clickTargetSize}px; margin-right: -${clickTargetSize}px;`"
      v-html="prevLabel"></a>
    <a href="#"
      class="Slider-navigation-button Slider-navigation-next"
      v-on:click.prevent="triggerPageAdvance()"
      v-bind:class="{ 'Slider-navigation--disabled': !canAdvanceForward }"
      v-bind:style="`padding: ${clickTargetSize}px; margin-left: -${clickTargetSize}px;`"
      v-html="nextLabel"></a>
  </div>
</template>

<script>
  export default {
    name: "navigation",
    data() {
      return {
        parentContainer: this.$parent,
      }
    },
    props: {
      /**
       * Amount of padding to apply around the label in pixels
       */
      clickTargetSize: {
        type: Number,
        default: 8
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
    },
    computed: {
      canAdvanceForward() {
        console.log("canAdvanceForward: ", this.parentContainer.canAdvanceForward || false)
        return this.parentContainer.canAdvanceForward || false
      },
      canAdvanceBackward() {
        console.log("canAdvanceBackward:", this.parentContainer.canAdvanceBackward || false)
        return this.parentContainer.canAdvanceBackward || false
      },
    },
    methods: {
      triggerPageAdvance(direction) {
        if (direction) {
          this.$parent.advancePage(direction)
        } else {
          this.$parent.advancePage()
        }
      },
    },
  }
</script>

<style scoped>
  .Slider-navigation-button {
    position: absolute;
    top: 50%;
    box-sizing: border-box;
    color: #000;
    text-decoration: none;
  }
  .Slider-navigation-next {
    right: 0;
    transform: translateY(-50%) translateX(100%)
  }
  .Slider-navigation-prev {
    right: 0;
    transform: translateY(-50%) translateX(-100%)
  }
  .Slider-navigation--disabled {
    opacity: 0.5;
    cursor: default;
  }
</style>
