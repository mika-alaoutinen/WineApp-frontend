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
  import { login, register } from '@/services/AuthenticationService.js'

  export default {
    components: { UserCredentialsForm },

    data() {
      return {}
    },

    methods: {
      doLogin(user) {
        console.log('login')
        console.log('username', user.username)
        console.log('password', user.password)
      }
    },

  }
</script>