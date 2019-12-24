<template>
  <v-card class="full-page-card" max-width="60%">
    <v-card-title class="card-title">Lisää uusi viini</v-card-title>
    
    <v-form @submit.prevent="submitForm" id="add-wine-form">
      <div v-for="(value, attribute) in wine" :key="attribute">

        <!-- Generate text fields for wine attributes: -->
        <div v-if="attribute !== 'type'" :id="'wine-' + attribute">
          <v-text-field
            :label="dictionary.translate(attribute)"
            v-model="wine[attribute]"
          ></v-text-field>
        </div>
        
        <!-- Generate radio buttons for wine types: -->
        <v-radio-group v-else v-model="wine.type" row>
          <v-radio
            v-for="type in wineTypes" :key="type"
            :label="dictionary.translate(type)"
            :value="type.toUpperCase()">
          </v-radio>
        </v-radio-group>

      </div>
      <!-- Form submit button to save the new wine: -->
      <button class="button-save">Lisää viini</button>
    </v-form>
  </v-card>
</template>

<script>
  import Dictionary from "@/utilities/Dictionary.js";
  import WineService from "@/services/WineService.js";

  const wineService = new WineService();

  export default {
    data() {
      return {
        dictionary: Dictionary,
        wine: {
          name: "",
          type: "",
          country: "",
          price: "",
          volume: "",
          description: "",
          foodPairings: "",
          url: ""
        },
        wineTypes: [ "sparkling", "red", "rose", "white", "other" ],
      }
    },

    methods: {
      submitForm() {
        this.wine.description = parseKeywords(this.wine.description);
        this.wine.foodPairings = parseKeywords(this.wine.foodPairings);
        const wineAdded = wineService.postWine(this.wine);

        wineAdded ? this.successfulPost() : this.failedPost();
      },

      successfulPost() {
        Object.keys(this.wine).forEach(key => this.wine[key] = "");
      },

      failedPost() {
        console.log("Failfish");
      },
    }
  };

  // Private functions:
  function parseKeywords(string) {
    return string.split(",")
                 .map(word => word.trim());
  }

  

</script>

<style scoped>
  .button-save {
    color: green;
    font-weight: bold;
    padding: 1em;
  }
  .card-title {
    font-weight: bold;
    padding-left: 0;
  }
</style>