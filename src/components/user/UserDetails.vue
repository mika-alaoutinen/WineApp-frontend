<template>
  <v-card
    class="full-page-card"
    min-width="30%"
    max-width="60%"
  >
    <v-card-title class="card-title secondary--text">
      Käyttäjä
    </v-card-title>

    <p>Olet kirjautunut sisään käyttäjänimellä <b>{{ username }}</b>.</p>

    <v-btn
      id="logout"
      class="primary--text"
      text
      @click="doLogout"
    >
      Kirjaudu ulos
    </v-btn>
  </v-card>
</template>

<script>
  import { logout } from '@/services/AuthenticationService.js'
  import { getUsername } from '@/services/UserService.js'

  export default {
    data() {
      return {
        username: ''
      }
    },

    async mounted() {
      const name = await getUsername()
      name
        ? this.username = name
        : this.username = ''
    },

    methods: {
      doLogout() {
        logout()
        this.$emit('get:userLoggedIn', false)
      },
    },
  }
</script>

<style scoped>
  p { text-align: left }
</style>