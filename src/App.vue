<template>
  <div id="app">
    <h1>Viinit</h1>
    <wine-table/>
  </div>
</template>

<script>
import WineTable from './components/WineTable.vue'

export default {
  name: "app",
  components: {
    WineTable
  }
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
