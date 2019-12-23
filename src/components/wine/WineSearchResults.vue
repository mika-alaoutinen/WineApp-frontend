<template>
  <v-card class="full-page-card" max-width="60%" v-show="showResults">
    <v-card-title class="card-title">Haun tulokset</v-card-title>

    <v-data-table
      @click:row="openWineInfo"
      class="align-left"
      hide-default-footer
      loading loading-text="Haetaan viinejä..."
      :headers="translateHeaders"
      :items="searchResults">

      <template v-slot:item.type="{ item }">
        {{ dictionary.translate(item.type) }}
      </template>

    </v-data-table>

  </v-card>
</template>

<script>
  import Dictionary from "@/utilities/Dictionary.js";

  export default {
    data() {
      return {
        dictionary: Dictionary,
      }
    },

    computed: {
      translateHeaders() {
        const headers = [ "name", "type", "country", "price", "volume" ];
        return headers.map(header => ({ text: this.dictionary.translate(header), value: header }));
      }
    },

    methods: {
      openWineInfo(wine) {
        this.$router.push("/wines/" + wine.id);
      }
    },

    props: {
      searchResults: { type: Array, required: true },
      showResults: { type: Boolean, required: true },
    }    
  };
</script>