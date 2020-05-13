<template>
  <v-card class="full-page-card">
    <v-card-title class="card-title secondary--text">
      Kirjaudu sisään
    </v-card-title>

    <v-alert
      dismissible
      type="error"
      :value="showErrorAlert"
    >
      Käyttäjätunnus tai salasana väärin!
    </v-alert>

    <UserCredentialsForm
      :button-icon="buttonIcon"
      :button-text="'Kirjaudu'"
      @post:user="doLogin"
    />

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <span
          class="info-text"
          v-on="on"
        >
          Kirjautuminen?
        </span>
      </template>
      <p>
        Sovellukseen tallennettujen tietojen muuttaminen vaatii kirjautumista.<br>
        Käyttäjät voivat muokata ainoastaan omia viinejään ja arvostelujaan.
      </p>
    </v-tooltip>
  </v-card>
</template>

<script>
  import UserCredentialsForm from '@/components/authentication/UserCredentialsForm.vue'
  import { login } from '@/services/AuthenticationService.js'
  import { mdiLockOpen } from '@mdi/js'

  export default {
    components: { UserCredentialsForm },

    data() {
      return {
        buttonIcon: mdiLockOpen,
        showErrorAlert: false,
      }
    },

    methods: {
      async doLogin(user) {
        this.showErrorAlert = false

        const token = await login(user)
        token
          ? this.$emit('get:userLoggedIn', true)
          : this.showErrorAlert = true
      },
    },
  }
</script>

<style scoped>
  .info-text {
    color: grey;
    font-size: 85%;
  }
</style>