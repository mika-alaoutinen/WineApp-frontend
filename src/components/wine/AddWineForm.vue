<template>
  <v-card class="full-page-card" max-width="60%">
    <v-card-title class="card-title">Lisää uusi viini</v-card-title>
    
    <!-- Alerts that inform user if adding new wine was successful or not: -->
    <v-alert dismissible type="success" :value=showSuccessAlert>
      Uusi viini lisätty!
    </v-alert>
    <v-alert dismissible type="error" :value=showErrorAlert>
      Viinin lisääminen epäonnistui!
    </v-alert>
    
    <!-- Form begins -->
    <v-form @submit.prevent="submitForm">
      <div v-for="(value, attribute) in wine" :key="attribute">

        <!-- Country: -->
        <v-combobox v-if="attribute === 'country'"
          :items="allValues[attribute]"
          :label="dictionary.translate('wine', attribute)"
          chips
          v-model="wine[attribute]">
        </v-combobox>

        <!-- Description and food pairings: -->
        <v-combobox v-else-if="attribute === 'description' || attribute === 'foodPairings'"
          :items="allValues[attribute]"
          :label="dictionary.translate('wine', attribute)"
          chips
          deletable-chips
          hide-selected
          multiple
          v-model="wine[attribute]">
        </v-combobox>

        <!-- Volume -->
        <div v-else-if="attribute === 'volume'">
          <v-row>
            <v-col>
              <v-text-field
                :label="dictionary.translate('wine', attribute)"
                v-model="wine[attribute]">
              </v-text-field>
            </v-col>
            <v-col>
              <v-btn-toggle group>
                <v-btn @click="setVolume(0.75)" text>{{ dictionary.translate("wine", "bottle") }}</v-btn>
                <v-btn @click="setVolume(1.5)" text>{{ dictionary.translate("wine", "bag") }}</v-btn>
                <v-btn @click="setVolume(3.0)" text>{{ dictionary.translate("wine", "box") }}</v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>
        </div>

        <!-- Radio buttons for wine types: -->
        <v-radio-group v-else-if="attribute === 'type'"
          row
          v-model="wine.type">
          <v-radio v-for="type in wineTypes" :key="type"
            :label="dictionary.translate('wine', type)"
            :value="type.toUpperCase()">
          </v-radio>
        </v-radio-group>

        <!-- Name, country, price and URL: -->
        <v-text-field v-else
          :label="dictionary.translate('wine', attribute)"
          :type="getTextFieldType(attribute)"
          v-model="wine[attribute]">
        </v-text-field>
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
        showErrorAlert: false,
        showSuccessAlert: false,
        wineTypes: [ "sparkling", "red", "rose", "white", "other" ],

        // All unique countries, descriptions and food pairings:
        allValues: {
          country: [],
          description: [],
          foodPairings: [],
        },
        
        wine: {
          name: "",
          type: "",
          country: "",
          price: null,
          volume: "",
          description: [],
          foodPairings: [],
          url: ""
        },
      }
    },

    methods: {
      getTextFieldType(attribute) {
        return attribute === "price" ? "number" : "string";
      },

      setVolume(volume) { this.wine.volume = volume },

      submitForm() {
        wineService.post(this.wine)
                   .then(wasOk => wasOk ? this.successfulPost() : this.failedPost());
      },

      successfulPost() {
        wineService.resetObject(this.wine);
        this.showSuccessAlert = true;
      },

      failedPost() {
        this.showErrorAlert = true;
      },
    },

    mounted() {
      this.allValues.country = wineService.getCountries();
      this.allValues.description = wineService.getDescriptions();
      this.allValues.foodPairings = wineService.getFoodPairings();
    },

  };
</script>

<style scoped>
  .button-save {
    color: green;
    font-weight: bold;
    padding: 1em;
  }
  .card-title { padding-left: 0 }
</style>