<template>
  <div class="navigation">
    <router-link v-for="page in pages" :key="page" :to="{ name: page }">
      {{ util.translate("common", page) }}
    </router-link>
  </div>
</template>

<script>
  import Utilities from "@/utilities/Utilities.js";

  export default {
    data() {
      return {
        pages: [ "home", "reviews", "wines", "add", "search" ],
        util: Utilities,
      }
    }
  }
</script>

<style scoped>
  .navigation {
    background-color: white;
    padding: 1em 0;
    opacity: 0.70;
  }
  .navigation a {
    padding-left: 0.5em;
    padding-right: 0.5em;
  }
</style>