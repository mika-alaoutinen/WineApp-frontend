<template>
  <div class="tabs-container">
    <v-tabs
      centered
      grow
      hide-slider
    >
      <v-tab>
        <v-icon>{{ loginIcon }}</v-icon>
        Kirjaudu sisään
      </v-tab>
      <v-tab-item>
        <LoginForm @get:userLoggedIn="getLoggedIn" />
      </v-tab-item>

      <v-tab>
        <v-icon>{{ registerIcon }}</v-icon>
        Rekisteröi uusi käyttäjä
      </v-tab>
      <v-tab-item>
        <RegistrationForm />
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
  import LoginForm from '@/components/authentication/LoginForm.vue'
  import RegistrationForm from '@/components/authentication/RegistrationForm.vue'
  import { mdiLogin, mdiAccountPlus } from '@mdi/js'

  export default {
    components: { LoginForm, RegistrationForm },

    data() {
      return {
        loginIcon: mdiLogin,
        registerIcon: mdiAccountPlus,
      }
    },

    methods: {
      getLoggedIn(isLoggedIn) {
        this.$emit('get:userLoggedIn', isLoggedIn)
      }
    },
  }
</script>