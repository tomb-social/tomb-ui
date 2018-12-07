<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> -->
      <!-- <router-link v-if="!user" to="/login">Login</router-link>
      <router-link v-if="user" to="/account">Account</router-link>
      <a v-if="user" @click.prevent="handleLogout" href="#">Logout</a> -->

      <at-menu mode="horizontal" active-name="1">
        <at-menu-item name="1">
          <i class="icon icon-home"></i>
          Home
        </at-menu-item>
        <at-menu-item name="2" v-if="user">
          <i class="icon icon-eye-off"></i>
          Logout
        </at-menu-item>
      </at-menu>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    ...mapActions('auth', ['logout']),

    async handleLogout() {
      await this.logout();
      this.$router.push('/');
    },
  },
};
</script>
