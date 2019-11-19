<template>
  <div id="wine-form">
    <form>
      <fieldset id="add-wine">
        <legend>Add new wine</legend>
        <label>Name</label>
        <input type="text" />
        <label>Type</label>
        <input type="text" />
        <label>Country</label>
        <input type="text" />
        <label>Price</label>
        <input type="text" />
        <label>Quantity</label>
        <input type="text" />
        <label>Description</label>
        <input type="text" /> <!-- TODO: change to array -->
        <label>Food pairings</label>
        <input type="text" /> <!-- TODO: change to array -->
        <label>URL</label>
        <input type="text" />
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