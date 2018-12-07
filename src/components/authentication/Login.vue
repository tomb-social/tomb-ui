<template>
  <form class="login" @keyup.enter="handleSubmit">
    <div class="login__field">
      <label for="username">
        Username
      </label>
      <at-input
        name="username"
        type="text"
        v-model="username"
        :status="($v.username.$error) ? 'error' : null"
        :icon="($v.username.$error) ? 'x-circle' : null"
      />
    </div>
    <div class="login__field">
      <label for="password">Password</label>
      <at-input
        name="password"
        type="password"
        v-model="password"
        :status="($v.password.$error) ? 'error' : null"
        :icon="($v.password.$error) ? 'x-circle' : null"
      />
    </div>
    <div class="login__field">
      <at-button @click="handleSubmit" class="login__submit" type="primary">Login</at-button>
    </div>
  </form>
</template>

<script>
import { debounce } from 'lodash';
import { mapActions } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

export default {
  mixins: [validationMixin],
  data: () => ({
    username: '',
    password: '',
  }),
  validations: {
    username: {
      required,
    },
    password: {
      required,
    },
  },
  methods: {
    ...mapActions('auth', ['authenticate']),
    failedLogin() {
      const message = 'Invalid username or password...';

      this.$Message.closeAll();
      this.$Message.error(message);
    },
    handleSubmit() {
      // Oh god, debounce an async method!
      (debounce(async () => {
        this.$v.$touch();
        if (this.$v.$invalid) return;

        try {
          await this.authenticate({
            strategy: 'local',
            username: this.username,
            password: this.password,
          });
          this.errors = {};
        } catch ({ code }) {
          if (code >= 400) {
            this.failedLogin();
          }
        }
      }, 100))();
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  max-width: 450px;
  padding: 1em;

  &__field {
    display: block;

    label {
      display: block;
      font-weight: bold;
      margin-bottom: 0.5em;
      padding-left: 1em;
    }

    button {
      margin: 0 0.5rem 1rem;
    }

    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__submit {
    font-size: 1rem;
  }
}
</style>
