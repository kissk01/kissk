<template>
	<div id="chat">
		<chat-box v-if="loggedIn" :socket="socket" :nickname="nick" v-on:message="message" v-on:nameChange="nameChange"></chat-box>
	</div>
</template>

<script>
//http://frontend-test-server.prmrgt.com/
	import ChatBox from './ChatBox.vue'
	export default {
	    data() {
	        return {
	            socket: null,
	            loggedIn: false,
	            username: ''
	        }
	    },
	    components: { ChatBox },
	    sockets:{
		    connect: function(){
					this.socket = this.$socket;
					this.loggedIn = true
		      console.log('socket connected')
		    }
			},
	    methods: {
					message() {
						console.log('from chat message event')
						this.$emit("message")
					},
					componentChange () {
						console.log('from chat name is: ', this.nick)
					},
					nameChange(value) {
						this.$emit('nameChange', value)
					}
	    },
			props: {
				nick: {
					type:String,
					default: ""
				}
      }
	}
</script>
