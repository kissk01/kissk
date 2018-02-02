 /* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/PageChat'
//import socketio from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'
//Vue.use(VueSocketIO, "http://localhost:8000")
Vue.use(VueSocketIO, "http://frontend-test-server.prmrgt.com/")
//Vue.use(VueSocketio, socketio('http://frontend-test-server.prmrgt.com/'));
//import VueSocketIO from 'vue-socket.io'
//import socketio from 'socket.io';
//Vue.use(VueSocketIO, "http://socketserver.com:1923");
/*import socketio from 'socket.io';
import VueSocketIO from 'vue-socket.io'

Vue.use(VueSocketio, socketio('http://socketserver.com:1923'));*/
//Vue.use(VueSocketIO, SocketInstance)

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
