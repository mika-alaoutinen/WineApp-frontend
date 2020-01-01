<template>
  <v-card class="details-card" max-width="60em">
    <v-card-title class="card-title">Viinin tiedot</v-card-title>

    <v-row v-for="(value, attribute) in displayReview" :key="attribute">

      <!-- Left column for attribute names. -->
      <v-col align="start" class="attribute-text" sm="3">
        {{ dictionary.translate("review", attribute) }}
      </v-col>

      <!-- Right column for values. -->
      <!-- Editing mode: -->
      <v-text-field v-if="editing === review.id"
        @keyup.enter="saveEdit(review)"
        align="start"
        class="text-field"
        v-model="review[attribute]">
      </v-text-field>

      <!-- View mode: -->
      <!-- Don't allow editing wine here -->
      <v-col v-else align="start">
        <div v-if="attribute === 'wine'">{{ value.name }}</div>
        <div v-else>{{ value }}</div>
      </v-col>
    </v-row>

    <!-- Edit and delete buttons -->
    <div v-if="editing === this.review.id">
      <button @click="saveEdit(review)" class="button-save">Tallenna</button>
      <button @click="cancelEdit(review)" class="button-delete">Peruuta</button>
    </div>
    <div v-else>
      <button @click="editMode(review)" class="button-edit">Muokkaa</button>
      <button @click="deleteWine(review.id)" class="button-delete">Poista</button>
    </div>
    
  </v-card>
</template>

<script>

  /* TODO:
    - Add option to click on wine name to go to wine details page.
    - Explore nicer options for displaying the data.
  */

  import ReviewService from "@/services/ReviewService.js";
  import Dictionary from "@/utilities/Dictionary.js";

  const reviewService = new ReviewService();

  export default {
    computed: {
      displayReview() {
        const reviewCopy = Object.assign({}, this.review);
        delete reviewCopy.id;
        return reviewCopy;
      },
    },

    data() {
      return {
        dictionary: Dictionary,
        editing: null,
        review: "",
      }
    },

    methods: {
      cancelEdit(review) {
        Object.assign(review, this.cachedReview);
        this.editing = null;
      },

      deleteWine(id) {
        reviewService.delete(id);
        this.$router.push({ name: "reviews" });
      },

      editMode(review) {
        this.cachedReview = Object.assign({}, review);
        this.editing = review.id;
      },

      saveEdit(review) {
        if (inputIsInvalid(review)) {
          return;
        }
        reviewService.put(review.id, review);
        this.editing = null;
      },
    },

    mounted() {
      reviewService.get(this.$props.reviewId)
                   .then(review => this.review = review);
    },

    props: {
      reviewId: { type: String, required: true }
    },

  };
  
  // Utility functions:
  function inputIsInvalid(review) {
    return Array.from(Object.values(review))
                .some(value => value === "" || value === []);
  }

</script>

<style scoped>
  button {
    font-weight: bold;
    padding: 1em;
  }
  .attribute-text { font-weight: bold }
  .button-delete { color: red }
  .button-edit { color: mediumblue }
  .button-save { color: green }
  .card-title { padding-left: 0 }
  .text-field { padding-top: 0 }
</style>