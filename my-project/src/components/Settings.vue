<template>
	<div class="settings">
		<div class="container vue">
			<a @click.prevent="photoOpen = !photoOpen">Photo settings</a>
			<div v-show="photoOpen">
				<p>Width:{{photoWidth}}</p>
  			<input type="range" min="1" max="1000" v-model="photoWidth" @change="widthChange">
				<p>Height:{{photoHeight}}</p>
  			<input type="range" min="1" max="1000" v-model="photoHeight" @change="heightChange">
			</div>
			<a @click.prevent="chatOpen = !chatOpen">Chat settings</a>
			<form v-show="chatOpen" @submit.prevent="editName">
					<input type="text" v-model="nickName" placeholder="Edit nickname" action="/" method="post">
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
						photoWidth: this.sliderWidth,
						photoHeight: this.sliderHeight,
						nickName: this.nick
        }
      },
      methods: {
        componentChange: function () {
					console.log(" slider width:", this.sliderWidth)
        },
				editName: function(event) {
					this.$emit('nameChange', this.nickName)
				},
				widthChange: function(event) {
					this.$emit('widthChange', event.target.valueAsNumber)
				},
				heightChange: function(event) {
					this.$emit('heightChange', event.target.valueAsNumber)
				}
      },
			props: {
        sliderWidth: {
          type:Number,
          default: 400
        },
        sliderHeight: {
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
					console.log('username change event from settings')
					this.nickname = newVal
				}
			}
    }
</script>
<style>
div.settings {
    /*border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;*/
}
.container {
  max-width: 600px;
  margin: 20px auto;
  line-height: 24px;
}
a {
  display: block;
  cursor: pointer;
  color: #44f;
}
</style>
