<template>
  <div id="wine-form">
    <form @submit.prevent="submitForm">
      <fieldset id="add-wine">
        <legend>Lisää uusi viini</legend>
        <label>Nimi</label>
        <input
          ref="first"
          type="text"
          :class="{ 'has-error': submitting && formHasErrors }"
          v-model="wine.name"
          @focus="clearStatus"
          @keypress="clearStatus"/>
          
        <div class="radiobuttons">
          <input v-model="wine.type" type="radio" name="wine-type" id="kuohu" value="SPARKLING">
          <label for="kuohu">Kuohuviini</label>
          <input v-model="wine.type" type="radio" name="wine-type" id="puna" value="RED">
          <label for="puna">Punaviini</label>
          <input v-model="wine.type" type="radio" name="wine-type" id="rose" value="ROSE">
          <label for="rose">Roseviini</label>
          <input v-model="wine.type" type="radio" name="wine-type" id="valko" value="WHITE">
          <label for="valko">Valkoviini</label>
          <input v-model="wine.type" type="radio" name="wine-type" id="muu" value="OTHER">
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

        <p v-if="error && submitting" class="error-message">Täytä viinin nimi!</p>
        <p v-if="success" class="success-message">Uusi viini lisätty.</p>
        
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
      submitting: false,
      error: false,
      success: false,
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
  computed: {
    /* Is true if any text input in form is empty.
       Otherwise is false, indicating that form is valid. */
    formHasErrors() {
      return Array
          .from(document.querySelectorAll("#wine-form input[type=text]"))
          .some(input => input.value == "");
    }
  },
  methods: {
    submitForm() {
      this.submitting = true;
      this.clearStatus();

      if (this.formHasErrors) {
        this.error = true;
        return;
      }

      this.$emit("add:wine", this.wine)
      // TODO: make into function
      this.wine = {
        name: "",
        type: "",
        country: "",
        price: "",
        quantity: "",
        description: [],
        foodPairings: [],
        url: ""
      }
      this.error = false;
      this.success = true;
      this.success = false;
    },
    clearStatus() {
      this.success = false;
      this.error = false;
    },
    validateForm() {
      // validate that 1) text fields are not empty and 2) one radio buttons is selected.
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
  [class*="-message"] { font-weight: 500 }
  .error-message { color: #d33c40 }
  .success-message { color: #32a95d }
  .radiobuttons label {
    display: inline;
    margin-left: 0.5em;
    margin-right: 1em;
  }
</style>