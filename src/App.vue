<template>
  <v-app id="vuetify-app">
    <TheHeader/>
    <TheNavigation/>
    <TheFooter/>
    <router-view/>
  </v-app>
</template>

<script>
  import TheFooter from "@/components/common/TheFooter.vue";
  import TheHeader from "@/components/common/TheHeader.vue";
  import TheNavigation from "@/components/common/TheNavigation.vue";
  import ReviewService from "@/services/ReviewService.js";
  import WineService from "@/services/WineService.js";
  
  export default {
    name: "app",
    components: {
      TheFooter,
      TheHeader,
      TheNavigation,
    },

    mounted() {
      new ReviewService().getAll();
      new WineService().getAll();
    },
  }
</script>

<style>
  .full-page-card {
    margin: 0 auto 4em;
    padding-left: 2em;
    padding-right: 2em;
  }
  
  /* Global styles for the entire application */
  #vuetify-app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
</style>