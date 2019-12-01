<template>
  <div id="app">
    <TheHeader/>
    <TheNavigation/>
    <TheFooter/>
    <router-view/>
  </div>
</template>

<script>
  import TheFooter from "@/components/common/TheFooter.vue";
  import TheHeader from "@/components/common/TheHeader.vue";
  import TheNavigation from "@/components/common/TheNavigation.vue";
  import WineService from "@/services/WineService.js";

  export default {
    name: "app",
    components: {
      TheFooter,
      TheHeader,
      TheNavigation,
    },
    
    mounted() {
      new WineService().getWines();
    },
  }
</script>

<style>
  html, body {
    height: 100%;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;

    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
</style>
