<template>
  <div>
    <!-- Show user details or login page depending on if user is logged in: -->
    <UserDetails
      v-if="userLoggedIn"
      :user-logged-in="userLoggedIn"
      @get:userLoggedIn="getLoggedIn"
    />

    <Login
      v-else
      @get:userLoggedIn="getLoggedIn"
    />
  </div>
</template>

<script>
  import Login from '@/components/authentication/Login.vue'
  import UserDetails from '@/components/user/UserDetails.vue'

  export default {
    components: { Login, UserDetails },

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