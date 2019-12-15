<template>
  <v-card class="full-page-card" max-width="60%">
    <v-card-title class="card-title">Hae viinejä</v-card-title>

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
  .card-title {
    font-weight: bold;
    padding-left: 0;
  }
</style>