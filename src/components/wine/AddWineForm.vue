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
    <ValidationObserver v-slot="{ handleSubmit }">
      <v-form @submit.prevent="handleSubmit(submitForm)">

        <!-- Name text field, required -->
        <validation-provider name="Nimi" rules="required" v-slot="{ errors }">
          <v-text-field
            :label="dictionary.translate('wine', 'name')"
            v-model="wine.name">
          </v-text-field>
          <span class="validationErrorMessage">{{ errors[0] }}</span>
        </validation-provider>

        <!-- Country text field, required -->
        <validation-provider name="Maa" rules="required" v-slot="{ errors }">
          <v-combobox
            @change="searchInput.country=''"
            :items="allValues.country" 
            :search-input.sync="searchInput.country"
            chips deletable-chips hide-selected
            :label="dictionary.translate('wine', 'country')"
            v-model="wine.country">
          </v-combobox>
          <span class="validationErrorMessage">{{ errors[0] }}</span>
        </validation-provider>

        <!-- Radio buttons for wine types, required: -->
        <validation-provider name="Tyyppi" rules="required" v-slot="{ errors }">
          <v-radio-group row v-model="wine.type">
            <v-radio v-for="type in wineTypes" :key="type"
              :label="dictionary.translate('wine', type)"
              :value="type.toUpperCase()">
            </v-radio>
          </v-radio-group>
          <span class="validationErrorMessage">{{ errors[0] }}</span>
        </validation-provider>

        <!-- Price, required, value >= 0 -->
        <validation-provider rules="price" v-slot="{ errors }">
          <v-text-field
            :label="dictionary.translate('wine', 'price')"
            type="number"
            v-model="wine.price">
          </v-text-field>
          <span class="validationErrorMessage">{{ errors[0] }}</span>
        </validation-provider>

        <!-- Volume, required, value > 0 -->
        <validation-provider rules="volume" v-slot="{ errors }">
          <v-row>
            <v-col>
              <v-text-field
                :label="dictionary.translate('wine', 'volume')"
                v-model="wine.volume">
              </v-text-field>
            </v-col>
            <v-col>
              <v-btn-toggle group>
                <v-btn @click="setVolume(0.75)" text>{{ dictionary.translate('wine', 'bottle') }}</v-btn>
                <v-btn @click="setVolume(1.5)" text>{{ dictionary.translate('wine', 'bag') }}</v-btn>
                <v-btn @click="setVolume(3.0)" text>{{ dictionary.translate('wine', 'box') }}</v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>
          <span class="validationErrorMessage">{{ errors[0] }}</span>
        </validation-provider>

        <!-- Description, optional: -->
        <v-combobox
          @change="searchInput.description=''"
          :items="allValues.description" 
          :label="dictionary.translate('wine', 'description')"
          :search-input.sync="searchInput.description"
          chips deletable-chips
          hide-selected
          multiple
          v-model="wine.description">
        </v-combobox>

        <!-- Food pairings, optional: -->
        <v-combobox
          @change="searchInput.foodPairings=''"
          :items="allValues.foodPairings" 
          :label="dictionary.translate('wine', 'foodPairings')"
          :search-input.sync="searchInput.foodPairings"
          chips deletable-chips
          hide-selected
          multiple
          v-model="wine.foodPairings">
        </v-combobox>

        <!-- URL, optional: -->
        <v-text-field
          :label="dictionary.translate('wine', 'url')"
          v-model="wine.url">
        </v-text-field>

        <v-btn class="button-save" large text type="submit">Lisää viini</v-btn>
      </v-form>
    </ValidationObserver>

  </v-card>
</template>

<script>
  import Dictionary from "@/utilities/Dictionary.js";
  import WineService from "@/services/WineService.js";
  import { ValidationObserver, ValidationProvider } from 'vee-validate';
  import "@/utilities/Validation.js";

  const wineService = new WineService();

  export default {
    components: { ValidationObserver, ValidationProvider },
    
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

        // Contains the inputs for combobox:
        searchInput: {
          description: "",
          foodPairings: "",
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
      setVolume(volume) { this.wine.volume = volume },

      submitForm() {
        wineService.post(this.wine)
                   .then(wasOk => wasOk ? this.successfulPost() : this.showErrorAlert = true);
      },

      successfulPost() {
        wineService.resetObject(this.wine);
        this.showSuccessAlert = true;
      },
    },

    mounted() {
      wineService.getCountries()
                 .then(countries => this.allValues.country = countries);

      wineService.getDescriptions()
                 .then(descriptions => this.allValues.description = descriptions);

      wineService.getFoodPairings()
                 .then(foodPairings => this.allValues.foodPairings = foodPairings);
    },

  };
</script>

<style scoped>
  .button-save {
    color: green;
    font-weight: bold;
  }
  .card-title { padding-left: 0 }
  .validationErrorMessage { color: red }
</style>