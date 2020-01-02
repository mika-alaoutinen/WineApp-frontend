<template>
  <v-autocomplete
    :items="wineNames"
    :label="getLabel"
    :search-input.sync="search"
    v-model="wine">
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

      wineNames() {
        return this.wines.map(wine => wine.name);
      }
    },

    data() {
      return {
        search: null,
        wine: null,
        wines: wineService.getStore().data.wines,
      }
    },

    props: {
      label: { type: String, required: false },
    },

    watch: {
      wine() {
        this.$emit("search:wineName", this.wine);
      }
    },

  };
</script>