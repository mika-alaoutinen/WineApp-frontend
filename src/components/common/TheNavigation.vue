<template>
  <div class="navigation">
    <router-link v-for="page in pages" :key="page" :to="{ name: page }">
      {{ dictionary.translate("common", page) }}
    </router-link>
  </div>
</template>

<script>

  /* TODO:
    - Try out <v-navigation-drawer> for side panel navigation.
  */

  import Dictionary from "@/utilities/Dictionary.js";

  export default {
    data() {
      return {
        dictionary: Dictionary,
        pages: [ "home", "reviews", "wines", "add", "search" ],
      }
    }
  }
</script>

<style scoped>
  .navigation a {
    padding-left: 0.5em;
    padding-right: 0.5em;
  }
</style>