<template>
  <v-card
    class="full-page-card"
    min-width="30%"
    max-width="60%"
  >
    <v-card-title class="card-title secondary--text">
      Kirjaudu sisään
    </v-card-title>

    <UserCredentialsForm />
  </v-card>
</template>

<script>
  import UserCredentialsForm from '@/components/authentication/UserCredentialsForm.vue'
  import { login, register } from '@/services/AuthenticationService.js'

  export default {
    components: { UserCredentialsForm },

    data() {
      return {
        user: {
          username: '',
          password: '',
        },
      }
    },

    methods: {
      doLogin() {
        console.log('login')
        console.log('username', this.user.username)
        console.log('password', this.user.password)
      }
    },

  }
</script>

<style scoped>
</style>