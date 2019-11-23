<template>
  <div id="app">
    <h1>Viinit</h1>
    <wine-form/>
    <wine-table/></div>
</template>

<script>
  import WineForm from "@/components/WineForm.vue"
  import WineTable from "@/components/WineTable.vue"
  import WineService from "@/services/WineService.js";

  const wineService = new WineService();

  export default {
    name: "app",
    components: {
      WineForm,
      WineTable
    },

    mounted() {
      wineService.getWines();
    },

    methods: {
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
