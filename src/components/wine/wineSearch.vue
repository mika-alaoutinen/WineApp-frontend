<template>
  <v-card class="card-search-wines" max-width="85%">
    <v-card-title class="title">Hae viinejä</v-card-title>

    <v-form @submit.prevent="submitForm" ref="search-wines">
      <v-text-field label="Nimi" v-model="searchParams.name"/>

    </v-form>

  </v-card>
</template>

<script>
  import WineService from "@/services/WineService.js";
  const wineService = new WineService();

  export default {
    data() {
      return {
        searchParams: {
          name: "",
          type: "",
          country: "",
          minPrice: 0,
          maxPrice: 0,
          minVolume: 0,
          maxVolume: 0,
        },
      }
    },

    mounted() {
      wineService.getWineCount(); // TODO: delete
    }
  };
</script>

<style scoped>
  .card-search-wines {
    margin: auto;
    padding-bottom: 1em;
    padding-top: 1em;
    padding-left: 2em;
    padding-right: 2em;
  }
  .title {
    font-weight: bold;
    padding-left: 0;
  }
</style>