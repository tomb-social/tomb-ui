<template>
  <form class="login" @submit.prevent="handleSubmit">
    <div class="login__field">
      <div v-if="errors.username">{{ errors.username }}</div>
      <label for="username">Username</label>
      <at-input name="username" type="text" v-model="username"/>
    </div>
    <div class="login__field">
      <div v-if="errors.password">{{ errors.password }}</div>
      <label for="password">Password</label>
      <at-input name="password" type="password" v-model="password"/>
    </div>
    <div class="login__field">
      <div v-if="errors.passwordConfirm">{{ errors.passwordConfirm }}</div>
      <label for="password-confirm">Confirm Password</label>
      <at-input name="password-confirm" type="password" v-model="passwordConfirm"/>
    </div>
    <div class="login__field">
      <at-button type="primary">Login</at-button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data: () => ({
    username: '',
    password: '',
    passwordConfirm: '',
    errors: {},
  }),
  methods: {
    ...mapActions('auth', ['authenticate']),
    async handleSubmit() {
      console.log('AHHH');
      try {
        await this.authenticate({
          strategy: 'local',
          username: this.username, 
          password: this.password,
        });
        this.errors = {};
      } catch (errors) {
        console.log(errors);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  max-width: 450px;

  &__field {
    label {
      font-weight: bold;
      // text-transform: uppercase;
    }
    margin-bottom: 1rem;
  }
}
</style>
