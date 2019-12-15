<template>
  <div id="app">
    <TheNavigation/>
    <TheFooter/>
    <router-view/>
  </div>
</template>

<script>
  import TheFooter from "@/components/common/TheFooter.vue";
  import TheNavigation from "@/components/common/TheNavigation.vue";

  export default {
    name: "app",
    components: {
      TheFooter,
      TheNavigation,
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
    margin-top: 30px;
  }
</style>