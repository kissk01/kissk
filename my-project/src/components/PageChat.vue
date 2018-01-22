<template>
  <div id="PageChat">
    <button v-for='item in pageList' v-on:click='componentChange(item.id)'>{{item.text}}</button>
    <component :is="dynamicComponent"></component>
  </div>
</template>

<script>
    import HelloWorld from './HelloWorld.vue'
    import Test from './Test.vue'
    import Photos from './Photos.vue'
    export default {
      data() {
        return {
            dynamicComponent: 'hello-world',
            pageList: [
              { id: 'hello-world', text: 'Chat' },
              { id: 'photos', text: 'Photos' },
              { id: 'test', text: 'Settings' }
            ]
        }
      },
      components: {Test, HelloWorld, Photos},
      methods: {
        componentChange: function (id) {
          this.dynamicComponent = id
        }
      }
    }
</script>
