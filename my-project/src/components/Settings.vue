<template>
	<div class="settings">
		<div class="container vue">
			<a @click.prevent="photoOpen = !photoOpen" class="settings">Photo settings</a>
			<div v-show="photoOpen">
				<p>Width:{{photoWidth}}</p>
  			<input type="range" min="1" max="1000" v-model="photoWidth" @change="widthChange">
				<p>Height:{{photoHeight}}</p>
  			<input type="range" min="1" max="1000" v-model="photoHeight" @change="heightChange">
			</div>
			<a @click.prevent="chatOpen = !chatOpen" class="settings">Chat settings</a>
			<form v-show="chatOpen" @submit.prevent="editName">
					<input type="text" class="nickname" v-model="nickName" placeholder="Edit nickname" action="/" method="post">
					<input type="submit" value="Submit">
			</form>
		</div>
		</div>
	</div>
</template>
<script>
    export default {
      data() {
        return {
            pageCount: 0,
						photoOpen: false,
						chatOpen: false,
						photoWidth: this.swidth,
						photoHeight: this.sheight,
						nickName: this.nick
        }
      },
      methods: {
				//edit nick name @ chat component.
				editName: function(event) {
					this.$emit('name-change', this.nickName)
				},
				//edit size @photo component
				widthChange: function(event) {
					this.$emit('width-change', event.target.valueAsNumber)
				},
				heightChange: function(event) {
					this.$emit('height-change', event.target.valueAsNumber)
				}
      },
			props: {
        swidth: {
          type:Number,
          default: 400
        },
        sheight: {
          type: Number,
          default: 200
        },
				nick: {
					type: String,
					default: ""
				}
      },
			watch: {
				nick: function(newVal, oldVal) {
					this.nickname = newVal
				}
			}
    }
</script>
<style>
.container {
  max-width: 600px;
  margin: 20px auto;
  line-height: 24px;
}
a.settings {
  display: block;
  cursor: pointer;
  color: #44f;
	background-color: #4CAF50;
	color: white;
	padding: 14px 20px;
	margin: 1px 0;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}
</style>
