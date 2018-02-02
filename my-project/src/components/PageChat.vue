<template>
  <div id="PageChat">
    <button v-for='item in pageList' v-on:click='componentChange(item.id)'
    v-bind:class="[item.id === 'chat' && isBlinking ? 'blink' : '']">
      {{item.text}}</button>
    <keep-alive>
      <component id="comp" :is="dynamicComponent" v-on:settingsClick="componentClick"
      :sliderHeight="photoHeight" :sliderWidth="photoWidth" v-on:message="message" :nick="username"
      v-on:widthChange="widthChange" v-on:heightChange="heightChange" v-on:nameChange="nameChange">
      </component>
    </keep-alive>
  </div>
</template>

<script>
    import Chat from './Chat.vue'
    import Photos from './Photos.vue'
    import Settings from './Settings.vue'
    export default {
      data() {
        return {
            dynamicComponent: 'chat',
            pageList: [
              { id: 'chat', text: 'Chat' },
              { id: 'photos', text: 'Photos' },
              { id: 'settings', text: 'Settings' }
            ],
            isBlinking: false,
            photoWidth: 400,
            photoHeight: 200,
            username: ""
        }
      },
      components: {Chat, Photos, Settings},
      methods: {
        componentChange: function (id) {
          this.dynamicComponent = id
          this.blinkHandler(false)
        },
        componentClick: function (value) {
          console.log('emit settingsClick', value, ' val ')
        },
        widthChange: function (value) {
          this.photoWidth = value
        },
        heightChange: function (value) {
          this.photoHeight = value
        },
        nameChange: function(value) {
          console.log('name change from main', value)
          this.username = value
        },
        message: function() {
          console.log('message received from pageChat')
          this.blinkHandler(true)
        },
        blinkHandler: function (blinkRequest) {
          console.log('blinkhandler: ',this.dynamicComponent, this.dynamicComponent === "chat")
          if(blinkRequest && this.dynamicComponent != "chat" && !this.isBlinking /*&& this.loggedIn*/) {
            this.isBlinking = true
            console.log("start blink")
          } else if(!blinkRequest && this.isBlinking && this.dynamicComponent === "chat") {
            this.isBlinking = false
            console.log("stop blink")
          }
        }
      }
    }
</script>
<style>
  button.blink {
    animation: blinker 1s linear infinite;
  }
  button {
    width: 33%;
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    margin: 1px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
      background-color: #45a049;
  }

  @keyframes blinker {
    50% { opacity: 0; }
  }
</style>
