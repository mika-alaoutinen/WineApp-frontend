<template>
  <v-card class="full-page-card">
    <v-card-title class="card-title secondary--text">
      Kirjaudu sisään
    </v-card-title>

    <Alerts
      :show-error-alert="showErrorAlert"
      :show-success-alert="showSuccessAlert"
      :error-text="'Käyttäjätunnus tai salasana väärin'"
      :success-text="'Kirjautuminen onnistui'"
    />

    <UserCredentialsForm
      :button-text="'Kirjaudu'"
      @post:user="doLogin"
    />
  </v-card>
</template>

<script>
  import Alerts from '@/components/common/Alerts.vue'
  import UserCredentialsForm from '@/components/authentication/UserCredentialsForm.vue'
  import { login } from '@/services/AuthenticationService.js'
  import { getUsername } from '@/services/UserService.js'

  export default {
    components: { Alerts, UserCredentialsForm },

    data() {
      return {
        showErrorAlert: false,
        showSuccessAlert: false,
      }
    },

    methods: {
      async doLogin(user) {
        this.showErrorAlert = false
        login(user)
          .then(token => token ? this.successfulLogin() : this.showErrorAlert = true)
      },

      successfulLogin() {
        this.showSuccessAlert = true
        getUsername()
          .then(username => console.log('username', username))
      },
    },

  }
</script>