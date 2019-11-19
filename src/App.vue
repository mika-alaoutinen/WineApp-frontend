<template>
  <div id="app">
    <h1>Viinit</h1>
    <wine-form/>
    <wine-table :wines="wines"/>
  </div>
</template>

<script>
import WineForm from '@/components/WineForm.vue'
import WineTable from '@/components/WineTable.vue'

export default {
  name: "app",
  components: {
    WineForm,
    WineTable
  },
  data() {
    return {
      wines: [
        {
          id: 1,
          name: "Valkoviini",
          type: "WHITE",
          country: "Espanja",
          price: 10.0,
          quantity: 0.75,
          description: ["vivahteikas & ryhdikäs", "pirskahteleva"],
          foodPairings: ["aperatiivi", "vähärasvainen kala","seurustelujuomaksi."],
          url: "invalid"
        },
        {
          id: 2,
          name: "Punaviini",
          type: "RED",
          country: "Ranska",
          price: 9.0,
          quantity: 0.75,
          description: ["vivahteikas & ryhdikäs", "pirskahteleva"],
          foodPairings: ["aperatiivi", "vähärasvainen kala","seurustelujuomaksi."],
          url: "invalid"
        }
      ]
    }
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
