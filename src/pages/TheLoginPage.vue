<template>
  <div class="tabs-container">
    <LoginForm />
  </div>
</template>

<script>
  import LoginForm from '@/components/authentication/LoginForm.vue'
  import { login, register } from '@/services/AuthenticationService.js'

  export default {
    components: { LoginForm },

    data() {
      return {}
    },
  }
</script>

<style scoped>
</style>