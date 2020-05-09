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

  export default {
    components: { UserCredentialsForm },

    data() {
      return {}
    },

    methods: {
      doRegister(user) {
        console.log('register')
        console.log('username', user.username)
        console.log('password', user.password)
      }
    },
  }
</script>