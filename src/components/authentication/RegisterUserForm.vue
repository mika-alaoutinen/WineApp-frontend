<template>
  <v-card class="full-page-card">
    <v-card-title class="card-title secondary--text">
      Rekisteröi uusi käyttäjä
    </v-card-title>

    <UserCredentialsForm
      :button-text="'Rekisteröidy'"
      :emit-identifier="'post:register'"
      password-validation-rule="password"
      @post:register="doRegister"
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
        console.log('new user', user)
        // const newUser = register(user)
      }
    },
  }
</script>