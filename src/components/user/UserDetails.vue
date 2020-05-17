<template>
  <v-card
    class="full-page-card"
    min-width="30%"
    max-width="60%"
  >
    <v-card-title class="card-title secondary--text">
      Käyttäjä
    </v-card-title>

    <div v-if="invalidLogin">
      <p>Kirjautumisesi on vanhentunut. Ole hyvä kirjaudu uudelleen.</p>

      <v-btn
        id="go-to-login"
        class="primary--text"
        text
        @click="goToLogin"
      >
        Kirjaudu sisään
      </v-btn>
    </div>

    <div v-else>
      <p>Olet kirjautunut sisään käyttäjänimellä <b>{{ username }}</b>.</p>

      <v-btn
        id="logout"
        class="primary--text"
        text
        @click="doLogout"
      >
        Kirjaudu ulos
      </v-btn>
    </div>
  </v-card>
</template>

<script>
  import { logout } from '@/services/AuthenticationService.js'
  import { getUsername } from '@/services/UserService.js'

  export default {
    data() {
      return {
        invalidLogin: false,
        username: '',
      }
    },

    async mounted() {
      const name = await getUsername()
      name
        ? this.username = name
        : this.invalidLogin = true
    },

    methods: {
      doLogout() {
        logout()
        this.$emit('get:userLoggedIn', false)
      },
      goToLogin() {
        this.$emit('get:userLoggedIn', false)
        this.$router.push({ name: 'user' })
          .catch(error => console.info('Caught a NavigationDuplicated error'))
      },
    },
  }
</script>

<style scoped>
  p { text-align: left }
</style>