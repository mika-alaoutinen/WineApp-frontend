<template>
  <v-card class="full-page-card" max-width="60%">
    <v-card-title class="card-title">Lisää uusi arvostelu</v-card-title>

    <!-- Alerts that inform user if adding new wine was successful or not: -->
    <v-alert dismissible type="success" :value=showSuccessAlert>
      Uusi arvostelu lisätty!
    </v-alert>
    <v-alert dismissible type="error" :value=showErrorAlert>
      Arvostelun lisääminen epäonnistui!
    </v-alert>

    <!-- Form begins -->
    <v-form @submit.prevent="submitForm">

      <AutocompleteComponent @search:wine="getWine" :label="'Arvosteltava viini'" />

      <div v-for="(value, attribute) in review" :key="attribute">
        <DatePickerComponent v-if="attribute === 'date'"
          @get:date="getDate"
          :calendarType="'date'"
          :enabled="true"
          :labelText="'Päivämäärä'">
        </DatePickerComponent>

        <v-textarea v-else-if="attribute === 'reviewText'"
          :label="dictionary.translate('review', attribute)"
          auto-grow
          class="ma-0 pa-0"
          v-model="review[attribute]">
        </v-textarea>

        <v-slider v-else-if="attribute === 'rating'"
          :label="dictionary.translate('review', 'rating')"
          max="5.0"
          min="0.0"
          step="0.25"
          ticks
          thumb-label
          v-model="review.rating">

        </v-slider>

        <span v-else-if="attribute === 'wine'"></span>

        <v-text-field v-else
          :label="dictionary.translate('review', attribute)"
          v-model="review[attribute]">
        </v-text-field>
      </div>

      <!-- Form submit button to save the new review: -->
      <button class="button-save">Lisää arvostelu</button>
    </v-form>

  </v-card>
</template>

<script>
  import AutocompleteComponent from "@/components/vuetify/AutocompleteComponent.vue";
  import DatePickerComponent from "@/components/vuetify/DatePickerComponent.vue";
  import Dictionary from "@/utilities/Dictionary.js";
  import ReviewService from "@/services/ReviewService.js";
  
  const reviewService = new ReviewService();

  export default {
    components: { AutocompleteComponent, DatePickerComponent },

    data() {
      return {
        dictionary: Dictionary,
        showErrorAlert: false,
        showSuccessAlert: false,

        review: {
          author: "",
          date: "",
          reviewText: "",
          rating: 0,
          wine: {},
        },
      }
    },

    methods: {
      getDate(date) { this.review.date = date },

      getWine(wine) { this.review.wine = wine },

      submitForm() {
        // reviewService.post();
        console.log(this.review);
      },

      successfulPost() {
        reviewService.resetObject(this.review);
        this.showSuccessAlert = true;
      },

      failedPost() {
        this.showErrorAlert = true;
      },
    }

  };
</script>

<style scoped>
  .align-left { text-align: left }
  .button-save {
    color: green;
    font-weight: bold;
    padding: 1em;
  }
  .card-title { padding-left: 0 }
</style>