<template>
  <v-card class="full-page-card" max-width="60%">
    <v-card-title class="card-title">Lisää uusi viini</v-card-title>
    <v-card-subtitle id="post-message">{{ postResultMessage }}</v-card-subtitle>
    
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
        postResultMessage: "",

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
        wineService.postWine(this.wine).then(
          isWineAdded => isWineAdded ? this.successfulPost() : this.failedPost()
        );
      },

      successfulPost() {
        Object.keys(this.wine).forEach(key => this.wine[key] = "");
        this.postResultMessage = "Uusi viini lisätty!";
        changePostMessageColor("#008000");
      },

      failedPost() {
        this.postResultMessage = "Viinin lisääminen epäonnistui!";
        changePostMessageColor("ff0000");
      },
    }
  };

  // Private functions:
  function parseKeywords(string) {
    return string.split(",")
                 .map(word => word.trim());
  }

  function changePostMessageColor(colorCode) {
    document.getElementById("post-message").style.backgroundColor = colorCode;
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
  #post-message {
    background-color: transparent;
    font-weight: bold;
    color: whitesmoke;
    opacity: 70%;
    padding: 6px;
  }
</style>