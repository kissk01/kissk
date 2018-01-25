<template>
  <div id="PageChat">
    <button v-for='item in pageList' v-on:click='componentChange(item.id)'>{{item.text}}</button>
    <component id="comp" :is="dynamicComponent" v-on:settingsClick="componentClick" :sliderWidth="900"></component>
  </div>
</template>

<script>
    import HelloWorld from './Chat.vue'
    import Test from './Test.vue'
    import Photos from './Photos.vue'
    import Settings from './Settings.vue'
    export default {
      data() {
        return {
            dynamicComponent: 'hello-world',
            pageList: [
              { id: 'hello-world', text: 'Chat' },
              { id: 'photos', text: 'Photos' },
              { id: 'settings', text: 'Settings' }
            ]
        }
      },
      components: {Test, HelloWorld, Photos, Settings},
      methods: {
        componentChange: function (id) {
          this.dynamicComponent = id
        },
        componentClick: function (value) {
          console.log('emit settingsClick', value, ' val ')
        }
      }
    }
</script>
