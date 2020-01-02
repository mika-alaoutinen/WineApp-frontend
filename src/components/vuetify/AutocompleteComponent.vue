<template>
  <v-autocomplete
    :items="getWines"
    :label="getLabel"
    v-model="selectedWine">
  </v-autocomplete>
</template>

<script>
  import WineService from "@/services/WineService.js";
  const wineService = new WineService();

  export default {
    computed: {
      getLabel() {
        return this.$props.label === undefined ? "Haettava" : this.$props.label;
      },

      getWines() {
        const wines = wineService.getStore().data.wines;
        return wines.map(wine => ({ text: wine.name, value: wine }));
      },
    },

    data() {
      return {
        selectedWine: null,
      }
    },

    props: {
      label: { type: String, required: false },
    },

    watch: {
      selectedWine() {
        this.$emit("search:wine", this.selectedWine);
      }
    },

  };
</script>