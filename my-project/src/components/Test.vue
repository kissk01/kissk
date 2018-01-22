<template>
  <div class="hello" id="Test">
    <h1>Hello</h1>
  </div>
</template>

<script>
import HelloWorld from './HelloWorld.vue'
export default {
  name: 'Test',
  data() {
    return {
      dynamicComponent: 'hello-world'
    }
  },
  components: {HelloWorld}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
