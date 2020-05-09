<template>
  <div class="tabs-container">
    <LoginForm />
    <RegisterUserForm />
  </div>
</template>

<script>
  import LoginForm from '@/components/authentication/LoginForm.vue'
  import RegisterUserForm from '@/components/authentication/RegisterUserForm.vue'

  export default {
    components: { LoginForm, RegisterUserForm },

    data() {
      return {}
    },
  }
</script>

<style scoped>
</style>