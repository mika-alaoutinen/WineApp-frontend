<template>
  <v-card
    class="full-page-card"
    min-width="30%"
    max-width="60%"
  >
    <v-card-title class="card-title secondary--text">
      Kirjaudu sisään
    </v-card-title>

    <p>Käyttäjänimi</p>
  </v-card>
</template>

<script>
  import { login, register } from '@/services/AuthenticationService.js'

  export default {
    data() {
      return {
        user: {
          username: '',
          password: '',
        }
      }
    }
  }
</script>

<style scoped>
</style>