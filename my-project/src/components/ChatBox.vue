<template>
    <div id="ChatBox" v-if="loggedIn">
        <div class="col-md-9 ChatBox__Left">
            <div class="ChatBox__List">
              <div v-for="data in messages">
                  <p v-bind:class="[data.currentUser ? 'Message__Author' : 'Message__Authory']">
                    {{data.message}}</p>
              </div>
            </div>
            <div class="ChatBox__Input">
                <form @submit.prevent="sendMessage" action="/" method="post">
                    <input type="text" v-model="newMessage"  placeholder="Enter your message here">
                    <input type="submit" value="Submit">
                </form>
            </div>
        </div>
    </div>
    <div id="Chat__Login" v-else>
        <form action="/" @submit.prevent="login">
            <input type="text" v-model="username" placeholder="Enter your username...">
        </form>
    </div>
</template>
<script>
    import ChatMessage from './ChatMessage.vue'
    export default {
        components: { ChatMessage },
        data() {
            return {
                newMessage: '',
                messages: [],
                onlineUsers: [],
                username: this.nickname,
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
                console.log(' message rec ', 'all:', chatBox.messages)
                chatBox.$emit('message')
              }
            })
        },
        methods: {
            sendMessage(event) {
                this.socket.emit('message', {message: this.newMessage, user: this.username})
                console.log('new mess send: ', this.newMessage, this.username)
                this.newMessage = ''
            },
            handleMessage(data) {
              let current = data.message.substring(0,8) === this.myTextString
              data.currentUser = current
              current ? "" : data.message += (", user: " + data.user)
              this.messages.push(data)
            },
            login(event) {
                this.loggedIn = true
                this.socket.emit('userLoggedIn', this.username)
                this.$emit('nameChange', this.username)
            },
            componentChange() {
              console.log(this.nickname, this.sliderWidth, 'username from chatbox')
              this.username = this.nickname
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
    #Chat__ChatBox ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .ChatBox__Left {
        padding-right: 0;
    }
    .ChatBox__Right {
        height: 100vh;
        border-left: 1px solid #eee;
        background: #F7F7F7;
        box-shadow: -10px 0 40px #F1F1F1;
    }
    .ChatBox__List {
        height: 80vh;
        overflow: scroll;
    }

    .ChatBox__Input input {

    }

    ul.ChatBox__OnlineUsers {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    h3 {
        margin-top: 20px;
        text-transform: uppercase;
        margin-bottom: 5px;
        font-size: 16px;
        font-weight: bold;
        color: #999;
    }
    p.Message__Author {
        text-align: right;
        font-style: italic;
        color: #999;
        margin-bottom: 5px;
    }
    p.Message__Authory {
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
