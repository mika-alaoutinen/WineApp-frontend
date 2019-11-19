<template>
  <div id="wine-form">
    <form @submit.prevent="submitForm">
      <fieldset id="add-wine">
        <legend>Lisää uusi viini</legend>
        <label>Nimi</label>
        <input v-model="wine.name" type="text" />
        <div class="radiobuttons">
          <input type="radio" name="wine-type" id="kuohu" value="kuohuviini">
          <label for="kuohu">Kuohuviini</label>
          <input type="radio" name="wine-type" id="puna" value="punaviini">
          <label for="puna">Punaviini</label>
          <input type="radio" name="wine-type" id="rose" value="roseviini">
          <label for="rose">Roseviini</label>
          <input type="radio" name="wine-type" id="valko" value="valkoviini">
          <label for="valko">Valkoviini</label>
          <input type="radio" name="wine-type" id="muu" value="muu">
          <label for="muu">Muu viini</label>
        </div>
        <label>Maa</label>
        <input v-model="wine.country" type="text" />
        <label>Hinta (€)</label>
        <input v-model="wine.price" type="text" />
        <label>Määrä</label>
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
export default {
  name: "wine-form",
  data() {
    return {
      wine: {
        name: "",
        type: "",
        country: "",
        price: "",
        quantity: "",
        description: [],
        foodPairings: [],
        url: ""
      }
    }
  },
  methods: {
    submitForm() {
      this.$emit("add:wine", this.wine)
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