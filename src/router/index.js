/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import PageChat from '@/components/PageChat.vue'
import VueSocketIO from 'vue-socket.io'

Vue.use(VueSocketIO, "http://frontend-test-server.prmrgt.com/")
Vue.use(Router)

export default new Router({
 routes: [
   {
     path: '/',
     name: 'PageChat',
     component: PageChat
   }
 ]
})
