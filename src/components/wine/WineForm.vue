<template>
  <div id="wine-form">
    <form @submit.prevent="submitForm">
      <fieldset id="add-wine">
        <legend>Lisää uusi viini</legend>

        <!-- Create form fields, except for wine type -->
        <div v-for="(value, attribute) in wine" :key="attribute">
          <div v-if="attribute !== 'type'" :id="'wine-' + attribute">
            <label> {{ dictionary.translate(attribute) }} </label>
            <input type="text" v-model="wine[attribute]">
          </div>
        </div>

        <!-- Radio buttons for selecting wine type -->
        <div id="wine-type-radio-buttons">
          <label for="wine-types">Viinin tyyppi</label>
          <div class="radio-buttons" v-for="wineType in wineTypes" :key="wineType">
            <input type="radio" name="wine-type"
                   :id="wineType" :value="wineType.toUpperCase()" v-model="wine.type">
            <label class="wine-type-label" :for="wineType">
              {{ dictionary.translate(wineType) }}
            </label>
          </div>
        </div>

        <p><button>Lisää viini</button></p>
      </fieldset>
    </form>
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

    mounted() {
      // Move wine type radio buttons under the name field:
      const buttons = document.getElementById("wine-type-radio-buttons");
      document.getElementById("wine-name")
              .appendChild(buttons);
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

<style scoped>
  form { margin-bottom: 2rem }
  input[type=text] {
    display: inline-block;
    width: 50%
  }
  .radio-buttons {
    display: inline;
  }
  .wine-type-label {
    display: inline;
    margin-left: 0.5em;
    margin-right: 1em;
  }
</style>