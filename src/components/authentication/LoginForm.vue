<template>
  <v-card class="full-page-card">
    <v-card-title class="card-title secondary--text">
      Kirjaudu sisään
    </v-card-title>

    <UserCredentialsForm
      :button-text="'Kirjaudu'"
      @post:user="doLogin"
    />
  </v-card>
</template>

<script>
  import UserCredentialsForm from '@/components/authentication/UserCredentialsForm.vue'
  import { login } from '@/services/AuthenticationService.js'

  export default {
    components: { UserCredentialsForm },

    methods: {
      async doLogin(user) {
        login(user)
          .then(token => token ? this.successfulLogin() : this.failedLogin())
      },

      successfulLogin() {
        console.log('ok')
        // GET username from user service
      },

      failedLogin() {
        console.log('fail')
      }
    },

  }
</script>