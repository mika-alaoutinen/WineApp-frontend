<template>
  <div id="wine-form">
    <form @submit.prevent="submitForm">
      <fieldset id="add-wine">
        <legend>Add new wine</legend>
        <label>Name</label>
        <input v-model="wine.name" type="text" />
        <label>Type</label>
        <input v-model="wine.type" type="text" />
        <label>Country</label>
        <input v-model="wine.country" type="text" />
        <label>Price</label>
        <input v-model="wine.price" type="text" />
        <label>Quantity</label>
        <input v-model="wine.quantity" type="text" />
        <label>Description</label>
        <input v-model="wine.description" type="text" /> <!-- TODO: change to array -->
        <label>Food pairings</label>
        <input v-model="wine.foodPairings" type="text" /> <!-- TODO: change to array -->
        <label>URL</label>
        <input v-model="wine.url" type="text" />
        <p><button>Add Wine</button></p>
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
  input {
    display: inline-block;
    width: 50%
    }
</style>