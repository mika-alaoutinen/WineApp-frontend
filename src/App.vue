<template>
  <v-app
    :style="{'background-image': 'url(' + getImage + ')'}"
    id="vuetify-app">

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

    computed: {
      getImage() {
        return require("@/assets/background.png");
      }
    },

    mounted() {
      new ReviewService().getAll();
      new WineService().getAll();
    },
  }
</script>

<style>
  a { color: #0D47A1 !important }
  .full-page-card {
    margin-left: auto;
    margin-right: auto;
    padding-left: 2em;
    padding-right: 2em;
  }
  .full-page-card > .card-title { padding-left: 0 }
  .tabs-container {
    min-width: 60%;
    max-width: 80%;
    margin: 0 auto 0;
  }
  /* Global styles for the entire application */
  #vuetify-app {
    font-family: "Roboto", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
</style>