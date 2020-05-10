<template>
  <v-card
    class="full-page-card"
    min-width="30%"
    max-width="60%"
  >
    <v-card-title class="card-title secondary--text">
      Kirjaudu sisään
    </v-card-title>

    <v-alert
      dismissible
      type="error"
      :value="showErrorAlert"
    >
      Käyttäjätunnus tai salasana väärin!
    </v-alert>

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

    data() {
      return {
        showErrorAlert: false,
      }
    },

    methods: {
      async doLogin(user) {
        this.showErrorAlert = false

        login(user).then(token => token
          ? this.$emit('get:userLoggedIn', true)
          : this.showErrorAlert = true)
      },
    },
  }
</script>