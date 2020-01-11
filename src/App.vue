<template>
  <v-app
    class="background"
    id="vuetify-app"
    :style="{'background-image': 'url(' + getImage + ')'}">

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
        return require("@/assets/wine-images/background.jpg");
      }
    },

    mounted() {
      new ReviewService().getAll();
      new WineService().getAll();
    },
  }
</script>

<style>
  .background {
    /*opacity: 0.5;*/
  }

  /*.image-box {*/
  /*  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)) , var(--image-url) center center;*/
  /*  background-size: cover;*/

  /*  !* Here's the same styles we applied to our content-div earlier *!*/
  /*  color: white;*/
  /*  min-height: 50vh;*/
  /*  display: flex;*/
  /*  align-items: center;*/
  /*  justify-content: center;*/
  /*}*/

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