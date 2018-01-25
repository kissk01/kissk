<template>
	<div id="chat">
		<chat-box v-if="loggedIn" :socket="socket"></chat-box>
		<div id="chatLogin" v-else>
			<form action="/" @submit="login">
				<input type="text" v-model="username" placeholder="User name">
				<input type="submit" value="Submit">
			</form>
		</div>
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
		      console.log('socket connected')
		    },
		    customEmit: function(val){
		      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
		    }
		},
	    mounted() {
    		console.log("ready")
        	//this.socket = io();
        },
	    methods: {
	        login(event) {
	            event.preventDefault()
	            this.socket = this.$socket;
	            this.loggedIn = true
	            console.log(" logged in ", this.username)
	            this.$socket.emit('user logged in', this.username)
	        }
	    }
	    /*computed: {
	        isAdmin() {
	            return this.username == 'admin'
	        }
	    }*/
	}
</script>