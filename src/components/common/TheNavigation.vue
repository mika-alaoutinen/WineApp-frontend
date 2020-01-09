<template>
  <div class="navigation">
    <router-link v-for="page in pages" :key="page" :to="{ name: page }">
      {{ translate("common", page) }}
    </router-link>
  </div>
</template>

<script>
  import translate from "@/utilities/Dictionary.js";

  export default {
    data() {
      return {
        pages: [ "home", "reviews", "wines", "add", "search" ],
        translate: translate,
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