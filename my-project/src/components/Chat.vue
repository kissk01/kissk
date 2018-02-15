<template>
	<div id="chat">
		<chat-box v-if="loggedIn" :socket="socket" :nickname="nick" v-on:message="message" v-on:name-change="nameChange"></chat-box>
	</div>
</template>

<script>
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
						this.$emit("message")
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
