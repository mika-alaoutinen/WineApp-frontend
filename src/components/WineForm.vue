<template>
  <div id="wine-form">
    <form @submit.prevent="submitForm">
      <fieldset id="add-wine">
        <legend>Lisää uusi viini</legend>

        <label>Nimi</label>
        <input type="text" required v-model="wine.name"/>

        <label for="wine-types">Viinin tyyppi</label>
        <div class="radiobuttons" id="wine-types">
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
        
        <label>Maa</label>
        <input v-model="wine.country" type="text" />

        <label>Hinta (€)</label>
        <input v-model="wine.price" type="text" />

        <label>Määrä (l)</label>
        <input v-model="wine.quantity" type="text" />

        <label>Kuvaus</label>
        <input v-model="wine.description" type="text" /> <!-- TODO: change to array -->

        <label>Sopii nautittavaksi</label>
        <input v-model="wine.foodPairings" type="text" /> <!-- TODO: change to array -->

        <label>URL</label>
        <input v-model="wine.url" type="text" />
        
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
        return string.split(",").map(word => word.trim());
      }
    }
  };

</script>

<style scoped>
  form { margin-bottom: 2rem }
  input[type=text] {
    display: inline-block;
    width: 50%
  }
  .radiobuttons label {
    display: inline;
    margin-left: 0.5em;
    margin-right: 1em;
  }
</style>