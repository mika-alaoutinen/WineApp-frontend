<template>
  <div class="navigation">
    <router-link v-for="page in pages" :key="page" :to="{ name: page }">
      {{ dictionary.translate(page) }}
    </router-link>
  </div>
</template>

<script>
  import Dictionary from "@/utilities/Dictionary.js";

  export default {
    data() {
      return {
        dictionary: Dictionary,
        pages: [ "Home", "Reviews", "Wines", "Add-wine", "Search" ],
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