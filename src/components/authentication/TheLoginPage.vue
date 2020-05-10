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
        <LoginForm />
      </v-tab-item>

      <v-tab>
        <v-icon>{{ registerIcon }}</v-icon>
        Rekisteröi uusi käyttäjä
      </v-tab>
      <v-tab-item>
        <RegisterUserForm />
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
  import LoginForm from '@/components/authentication/LoginForm.vue'
  import RegisterUserForm from '@/components/authentication/RegisterUserForm.vue'
  import { mdiLogin, mdiAccountPlus } from '@mdi/js'

  export default {
    components: { LoginForm, RegisterUserForm },

    data() {
      return {
        loginIcon: mdiLogin,
        registerIcon: mdiAccountPlus,
      }
    },
  }
</script>