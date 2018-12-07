<template>
  <div class="hello">
    <login />
  </div>
</template>

<script>
// import { mapState, mapGetters } from 'vuex';
import Login from './authentication/Login.vue';

export default {
  name: 'HelloWorld',
  components: {
    Login,
  },
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
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
