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
    
    <v-form @submit.prevent="submitForm" id="add-wine-form">
      <div v-for="(value, attribute) in wine" :key="attribute">

        <!-- Add chips to distinguish keywords: -->
        <v-text-field
          @keyup.space="checkForKeyword(attribute)"
          v-if="attribute === 'description' || attribute === 'foodPairings'"
          v-model=" placeholder[attribute]"
          :label="dictionary.translate(attribute)">
        </v-text-field>

        <!-- Generate radio buttons for wine types: -->
        <v-radio-group
          v-else-if="attribute === 'type'"
          v-model="wine.type"
          row>
          <v-radio
            v-for="type in wineTypes" :key="type"
            :label="dictionary.translate(type)"
            :value="type.toUpperCase()">
          </v-radio>
        </v-radio-group>

        <!-- Generate text fields for other attributes: -->
        <v-text-field
          v-else
          v-model="wine[attribute]"
          :label="dictionary.translate(attribute)">
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

        // Placeholders for inputs that are being entered:
        placeholder: {
          description: "",
          foodPairings: "",
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
        wineTypes: [ "sparkling", "red", "rose", "white", "other" ],
      }
    },  

    methods: {
      checkForKeyword(attribute) {
        let keyword = this.placeholder[attribute];

        if (keyword.includes(",") || keyword.includes(";")) {
          this.wine[attribute].push(keyword.trim().replace(",", ""));
          this.placeholder[attribute] = "";
        }
      },

      submitForm() {
        wineService.postWine(this.wine).then(
          isWineAdded => isWineAdded ? this.successfulPost() : this.failedPost()
        );
      },

      successfulPost() {
        Object.keys(this.wine).forEach(key => this.wine[key] = "");
        this.showSuccessAlert = true;
      },

      failedPost() {
        this.showErrorAlert = true;
      },
    }
  };
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