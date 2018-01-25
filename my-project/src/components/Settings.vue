<template>
	<div>
		<button v-on:click='componentChange()'>Button</button>
	</div>
</template>
<script>
    export default {
      data() {
        return {
            pageCount: 0
        }
      },
      methods: {
        componentChange: function () {
          this.$emit('settingsClick', 'val')
        }
      }
    }
</script>
