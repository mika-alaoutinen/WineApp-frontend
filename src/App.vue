<template>
  <div id="app">
    <h1>Wine App</h1>
    <p>Viininmaistelusovellus</p>
    <div id="navigation">
      <router-link to="wines">Wines</router-link>
      <router-link to="add-wine">New wine</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import WineService from "@/services/WineService.js";

  export default {
    name: "app",
    components: {},
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
  #navigation a {
    padding-left: 0.5em;
    padding-right: 0.5em;
  }
</style>
