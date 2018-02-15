<template>
  <div id="PageChat">
    <button v-for='item in pageList' v-on:click='componentChange(item.id)'
    v-bind:class="[item.id === 'chat' && isBlinking ? 'blink' : '']">
      {{item.text}}</button>
    <keep-alive>
      <component id="comp" :is="dynamicComponent"
      :sheight="photoHeight" :swidth="photoWidth" v-on:message="message" :nick="username"
      v-on:width-change="widthChange" v-on:height-change="heightChange" v-on:name-change="nameChange">
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
            //list of components used in main.
            pageList: [
              { id: 'chat', text: 'Chat' },
              { id: 'photos', text: 'Photos' },
              { id: 'settings', text: 'Settings' }
            ],
            //chat button is blinking - chat message arrived.
            isBlinking: false,
            //size for photo copoment slider
            photoWidth: 400,
            photoHeight: 200,
            //editable name for chat component
            username: ""
        }
      },
      components: {Chat, Photos, Settings},
      methods: {
        componentChange: function (id) {
          this.dynamicComponent = id
          this.blinkHandler(false)
        },
        widthChange: function (value) {
          this.photoWidth = value
        },
        heightChange: function (value) {
          this.photoHeight = value
        },
        nameChange: function(value) {
          this.username = value
        },
        message: function() {
          //message received
          this.blinkHandler(true)
        },
        blinkHandler: function (blinkRequest) {
          //start blink on new message if the component is not selected.
          if(blinkRequest && this.dynamicComponent != "chat" && !this.isBlinking) {
            this.isBlinking = true
          //stop blink on chat component selection.
          } else if(!blinkRequest && this.isBlinking && this.dynamicComponent === "chat") {
            this.isBlinking = false
          }
        }
      }
    }
</script>
<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
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
