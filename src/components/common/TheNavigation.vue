<template>
  <div class="navigation">
    <v-toolbar
      color="transparent"
      dense
      flat
      floating
    >
      <v-toolbar-items>
        <v-btn
          v-for="page in shownPages"
          :key="page"
          :to="{ name: page }"
          class="primary--text"
          text
        >
          {{ util.translate("common", page) }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
  import Utilities from '@/utilities/Utilities.js'
  import { getToken } from '@/services/AuthenticationService.js'

  export default {
    data() {
      return {
        util: Utilities,
      }
    },

    computed: {
      shownPages() {
        return window.localStorage.token
          ? [ 'home', 'reviews', 'wines', 'add', 'search', 'user' ]
          : [ 'home', 'reviews', 'wines', 'add', 'search', 'login' ]
      }
    },
  }
</script>

<style scoped>
  .navigation { padding-bottom: 1em }
</style>