<template>
  <div id="app">
    <Home/>
    <Wine/> <!-- delete -->
    <router-view/>
  </div>
</template>

<script>
  import Home from "@/components/Home.vue";
  import WineService from "@/services/WineService.js";
  import Wine from "@/components/Wine.vue"; // delete

  export default {
    name: "app",
    components: {
      Home,
      Wine // delete
    },
    mounted() {
      new WineService().getWines();
    },
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
