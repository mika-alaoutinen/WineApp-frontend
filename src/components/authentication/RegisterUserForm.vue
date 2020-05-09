<template>
  <v-card class="full-page-card">
    <v-card-title class="card-title secondary--text">
      Rekisteröi uusi käyttäjä
    </v-card-title>

    <UserCredentialsForm
      :button-text="'Rekisteröidy'"
      password-validation-rule="password"
      @post:user="doRegister"
    />
  </v-card>
</template>

<script>
  import UserCredentialsForm from '@/components/authentication/UserCredentialsForm.vue'
  import { register } from '@/services/AuthenticationService.js'

  export default {
    components: { UserCredentialsForm },

    methods: {
      doRegister(user) {
        register(user)
      }
    },
  }
</script>