<template>
  <v-card class="full-page-card">
    <v-card-title class="card-title secondary--text">
      Rekisteröi uusi käyttäjä
    </v-card-title>

    <UserCredentialsForm
      password-validation-rule="password"
    />
  </v-card>
</template>

<script>
  import UserCredentialsForm from '@/components/authentication/UserCredentialsForm.vue'

  export default {
    components: { UserCredentialsForm },

    data() {
      return {

      }
    }
  }
</script>

<style scoped>
</style>