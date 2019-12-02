<template>
  <div id="wine-form">
    <form @submit.prevent="submitForm">
      <fieldset id="add-wine">
        <legend>Lisää uusi viini</legend>

        <!-- Create form fields, except for wine type -->
        <div v-for="(value, attribute) in wine" :key="attribute">
          <div v-if="attribute !== 'type'">
            <label> {{ attribute }} </label>
            <input type="text" v-model="wine[attribute]">
          </div>
          <!-- Radio buttons for wine type -->
          <div id="radio-buttons" v-else></div>
        </div>

        <!-- Radio buttons for selecting wine type -->
        <!-- TODO: replace with winetypes[] for loop -->
        <!-- <div id="wine-type-radio-buttons">
          <label for="wine-types">Viinin tyyppi</label>
          <div class="radio-buttons" id="wine-types">
            <input type="radio" name="wine-type" id="kuohu" value="SPARKLING" required v-model="wine.type">
            <label for="kuohu">Kuohuviini</label>
            <input type="radio" name="wine-type" id="puna" value="RED" v-model="wine.type">
            <label for="puna">Punaviini</label>
            <input type="radio" name="wine-type" id="rose" value="ROSE" v-model="wine.type">
            <label for="rose">Roseviini</label>
            <input type="radio" name="wine-type" id="valko" value="WHITE" v-model="wine.type">
            <label for="valko">Valkoviini</label>
            <input type="radio" name="wine-type" id="muu" value="OTHER" v-model="wine.type">
            <label for="muu">Muu viini</label>
          </div>
        </div> -->

        <div id="wine-type-radio-buttons">
          <label for="wine-types">Viinin tyyppi</label>
          <div class="radio-buttons" v-for="wineType in wineTypes" :key="wineType">
            <input type="radio" name="wine-type" value=wineType v-model="wine.type" :id="wineType">
            <label class="wine-type-label" :for="wineType">{{ wineType }}</label>
          </div>
        </div>

        <p><button>Lisää viini</button></p>
      </fieldset>
    </form>
  </div>
</template>

<script>
  import WineService from "@/services/WineService.js";
  const wineService = new WineService();

  export default {
    data() {
      return {
        wine: {
          name: "",
          type: "",
          country: "",
          price: "",
          quantity: "",
          description: "",
          foodPairings: "",
          url: ""
        },
        wineTypes: [ "sparkling", "red", "rose", "white", "other" ]
      }
    },

    mounted() {
      this.createRadioButtons();
    },

    methods: {
      createRadioButtons() {
        const buttons = document.getElementById("wine-type-radio-buttons");
        document.getElementById("radio-buttons").appendChild(buttons);
      },
      submitForm() {
        // TODO: add feedback on submit. Did submit succeed or fail?
        // If submit is OK, clear form.
        this.wine.description = this.parseKeywords(this.wine.description);
        this.wine.foodPairings = this.parseKeywords(this.wine.foodPairings);
        wineService.postWine(this.wine);
      },
      parseKeywords(string) {
        return string.split(",").map(word => word.trim());
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