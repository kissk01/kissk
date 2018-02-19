import Vue from 'vue';
import app from './components/PageChat.vue';
import VueSocketIO from 'vue-socket.io'

Vue.use(VueSocketIO, "http://frontend-test-server.prmrgt.com/")

new Vue({
  el: '#app',
  components: { app }
});
