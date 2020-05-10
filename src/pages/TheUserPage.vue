<template>
  <div>
    <!-- Show user details or login page depending on if user is logged in: -->
    <UserDetails
      v-if="userLoggedIn"
      @get:userLoggedIn="getLoggedIn"
    />

    <LoginAndRegister
      v-else
      @get:userLoggedIn="getLoggedIn"
    />
  </div>
</template>

<script>
  import LoginAndRegister from '@/components/authentication/LoginAndRegister.vue'
  import UserDetails from '@/components/user/UserDetails.vue'

  export default {
    components: { LoginAndRegister, UserDetails },

    data() {
      return {
        userLoggedIn: false,
      }
    },

    mounted() {
      const token = window.localStorage.token || false
      this.userLoggedIn = token && token.includes('Bearer')
    },

    methods: {
      getLoggedIn(isLoggedIn) {
        this.userLoggedIn = isLoggedIn
      }
    },
  }
</script>