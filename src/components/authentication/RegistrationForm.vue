<template>
  <v-card class="full-page-card">
    <v-card-title class="card-title secondary--text">
      Rekisteröi uusi käyttäjä
    </v-card-title>

    <Alerts
      :show-error-alert="showErrorAlert"
      :show-success-alert="showSuccessAlert"
      :error-text="'Käyttäjän luominen epäonnistui'"
      :success-text="'Käyttäjän luominen onnistui'"
    />

    <UserCredentialsForm
      :button-icon="buttonIcon"
      :button-text="'Rekisteröidy'"
      password-validation-rule="password"
      @post:user="doRegister"
    />
  </v-card>
</template>

<script>
  import Alerts from '@/components/common/Alerts.vue'
  import UserCredentialsForm from '@/components/authentication/UserCredentialsForm.vue'
  import { register } from '@/services/AuthenticationService.js'
  import { mdiContentSave } from '@mdi/js'

  export default {
    components: { Alerts, UserCredentialsForm },

    data() {
      return {
        buttonIcon: mdiContentSave,
        showErrorAlert: false,
        showSuccessAlert: false,
      }
    },

    methods: {
      async doRegister(user) {
        const newUser = await register(user)
        newUser
          ? this.showSuccessAlert = true
          : this.showErrorAlert = true
      },
    },
  }
</script>