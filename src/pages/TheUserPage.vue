<template>
  <v-card
    class="full-page-card"
    min-width="30%"
    max-width="60%"
  >
    <v-card-title class="card-title secondary--text">
      Käyttäjä
    </v-card-title>
    <p>Olet kirjautunut sisään käyttäjällä {{ username }}</p>

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

    mounted() {
      getUsername().then(name => this.username = name)
    },

    methods: {
      doLogout() {
        logout()
      },
    },
  }
</script>