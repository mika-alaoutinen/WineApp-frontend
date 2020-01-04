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

        <!-- Description and food pairings: -->
        <v-combobox v-if="attribute === 'description' || attribute === 'foodPairings'"
          :items="allValues[attribute]"
          :label="dictionary.translate('wine', attribute)"
          deletable-chips
          chips
          hide-selected
          multiple
          v-model="wine[attribute]">
        </v-combobox>

        <!-- Volume -->
        <div v-else-if="attribute === 'volume'" class="align-left">
          {{ dictionary.translate('wine', attribute) }}
          <v-row>
            <v-col>
              <v-btn-toggle group>
                <v-btn text>Pullo</v-btn>
                <v-btn text>Tonkka</v-btn>
              </v-btn-toggle>
            </v-col>
            <v-col>
              <v-text-field
                :label="dictionary.translate('wine', attribute)"
                v-model="wine[attribute]">
              </v-text-field>
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

        // All unique descriptions and food pairings:
        allValues: {
          description: [],
          foodPairings: [],
        },
        
        wine: {
          name: "",
          type: "",
          country: "",
          price: "",
          volume: "",
          description: [],
          foodPairings: [],
          url: ""
        },
      }
    },  

    methods: {
      deleteKeyword(attribute, keyword) {
        this.wine[attribute] = this.wine[attribute].filter(item => item !== keyword);
      },

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
      this.allValues.description = wineService.getWineDescriptions();
      this.allValues.foodPairings = wineService.getFoodPairings();
    },

  };
</script>

<style scoped>
  .align-left { text-align: left }
  .button-save {
    color: green;
    font-weight: bold;
    padding: 1em;
  }
  .card-title { padding-left: 0 }
</style>