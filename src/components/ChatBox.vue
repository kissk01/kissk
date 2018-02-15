<template>
    <div id="ChatBox" v-if="loggedIn">
        <div>
            <div class="ChatBox-List">
              <div v-for="data in messages">
                  <p v-bind:class="[data.currentUser ? 'Message-User' : 'Message-Guest']">
                    {{data.message}}</p>
              </div>
            </div>
            <div>
                <form @submit.prevent="sendMessage" action="/" method="post">
                    <input type="text" v-model="newMessage"  placeholder="Enter your message here">
                    <input type="submit" value="Submit">
                </form>
            </div>
        </div>
    </div>
    <div v-else>
        <form action="/" @submit.prevent="login">
            <input class="chatname" type="text" v-model="username" placeholder="Enter your username...">
        </form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                newMessage: '',
                messages: [],
                username: this.nickname,
                //for message parse to know if it was sent by myself.
                myTextString: 'You said',
                loggedIn: false
            }
        },
        props: {
          socket: {},
          nickname: {
            type:String,
            default: ""
          }
        },
        watch: {
        	nickname: function(newVal, oldVal) {
            this.username = newVal
          }
        },
        created: function() {
            let chatBox = this
            this.socket.on('message', function(message) {
              if(chatBox.loggedIn) {
                chatBox.handleMessage(message)
                chatBox.$emit('message')
              }
            })
        },
        methods: {
            sendMessage() {
                this.socket.emit('message', {message: this.newMessage, user: this.username})
                //empty on send the input
                this.newMessage = ''
            },
            handleMessage(data) {
              //current user sent the data.
              let current = data.message.substring(0,8) === this.myTextString
              data.currentUser = current
              //update with username only reply message, no username on sending by myself.
              current ? "" : data.message += (", user: " + data.user)
              this.messages.push(data)
            },
            login() {
                this.loggedIn = true
                this.socket.emit('userLoggedIn', this.username)
                this.$emit('name-change', this.username)
            }
        }
    }
</script>

<style>
    #ChatBox {
        width: 100%;
        height: 100%;
        margin-right: 0;
    }

    .ChatBox-List {
        height: 70vh;
        overflow: scroll;
    }

    p.Message-User {
        text-align: right;
        font-style: italic;
        color: #999;
        margin-bottom: 5px;
    }
    p.Message-Guest {
        text-align: left;
        font-style: bold;
        color: #000;
        margin-bottom: 5px;
    }
    input[type=text], select {
        width: 80%;
        padding: 12px 20px;
        margin: 1px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }
    input[type=submit] {
        width: 15%;
        background-color: #4CAF50;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    input[type=submit]:hover {
        background-color: #45a049;
    }
</style>
