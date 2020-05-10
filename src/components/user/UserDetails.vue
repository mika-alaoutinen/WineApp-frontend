<template>
  <v-card
    class="full-page-card"
    min-width="30%"
    max-width="60%"
  >
    <v-card-title class="card-title secondary--text">
      Käyttäjä
    </v-card-title>

    <p v-if="userLoggedIn">
      Olet kirjautunut sisään käyttäjällä {{ username }}.
    </p>
    <p v-else>
      Kirjaudu sisään.
    </p>

    <v-btn
      v-show="userLoggedIn"
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
    props: {
      userLoggedIn: { required: true, type: Boolean }
    },

    data() {
      return {
        username: ''
      }
    },

    mounted() {
      getUsername().then(name => name
        ? this.username = name
        : this.username = '')
    },

    methods: {
      doLogout() {
        logout()
        this.$emit('get:userLoggedIn', false)
      },
    },
  }
</script>