<template>
  <div>
    <h2>Lisää uusi viini</h2>

    <v-form @submit.prevent="submitForm" ref="add-wine">
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
            v-for="wineType in wineTypes" :key="wineType"
            :label="dictionary.translate(wineType)"
            :value="wineType.toUpperCase()"
          ></v-radio>
        </v-radio-group>

      </div>
      <!-- Form submit button to save the new wine: -->
      <p><button>Lisää viini</button></p>
    </v-form>

  </div>
</template>

<script>
  import WineService from "@/services/WineService.js";
  import Dictionary from "@/utilities/Dictionary.js";

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
        // TODO: add feedback on submit. Did submit succeed or fail?
        // If submit is OK, clear form.
        this.wine.description = this.parseKeywords(this.wine.description);
        this.wine.foodPairings = this.parseKeywords(this.wine.foodPairings);
        wineService.postWine(this.wine);
      },
      parseKeywords(string) {
        return string.split(",")
                     .map(word => word.trim());
      },
    }
  };

</script>

<style scoped></style>