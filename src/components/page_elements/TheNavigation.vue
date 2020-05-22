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
          v-for="page in pages"
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

  export default {
    data() {
      return {
        pages: [ 'home', 'reviews', 'wines', 'add', 'search', 'user' ],
        util: Utilities,
      }
    },
  }
</script>

<style scoped>
  .navigation { padding-bottom: 1em }
</style>