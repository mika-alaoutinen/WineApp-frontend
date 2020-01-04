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

      <!-- Reviewed wine -->
      <v-autocomplete
        :items="allWines"
        label="Arvosteltava viini"
        v-model="wine">
      </v-autocomplete>

      <!-- Author -->
      <v-text-field
        :label="dictionary.translate('review', 'author')"
        v-model="review.author">
      </v-text-field>

      <!-- Date -->
      <DatePickerComponent
        @get:date="getDate"
        :calendarType="'date'"
        :enabled="true"
        :labelText="'Päivämäärä'">
      </DatePickerComponent>

      <!-- Review text -->
      <v-textarea
        :label="dictionary.translate('review', 'reviewText')"
        auto-grow
        class="ma-0 pa-0"
        v-model="review.reviewText">
      </v-textarea>

      <!-- Rating -->
      <v-slider
        :label="dictionary.translate('review', 'rating')"
        max="5.0"
        min="0.0"
        step="0.25"
        ticks
        thumb-label
        v-model="review.rating">
      </v-slider>

      <!-- Form submit button to save the new review: -->
      <button class="button-save">Lisää arvostelu</button>
    </v-form>

  </v-card>
</template>

<script>
  import DatePickerComponent from "@/components/vuetify/DatePickerComponent.vue";
  import Dictionary from "@/utilities/Dictionary.js";
  import ReviewService from "@/services/ReviewService.js";
  import WineService from "@/services/WineService.js";
  
  const reviewService = new ReviewService();
  const wineService = new WineService();

  export default {
    components: { DatePickerComponent },

    computed: {
      allWines() {
        const wines = wineService.getStore().data.wines;
        return wines.map(wine => ({ text: wine.name, value: wine }));
      },
    },

    data() {
      return {
        dictionary: Dictionary,
        showErrorAlert: false,
        showSuccessAlert: false,
        wine: {},

        review: {
          author: "",
          date: "",
          reviewText: "",
          rating: 2.5,
        },
      }
    },

    methods: {
      getDate(date) { this.review.date = date },

      submitForm() {
        reviewService.post(this.wine.id, this.review)
                     .then(wasOk => wasOk ? this.successfulPost() : this.failedPost());
      },

      successfulPost() {
        reviewService.resetObject(this.review);
        this.showSuccessAlert = true;
      },

      failedPost() {
        this.showErrorAlert = true;
      },
    },

  };
</script>

<style scoped>
  .button-save {
    color: green;
    font-weight: bold;
    padding: 1em;
  }
  .card-title { padding-left: 0 }
</style>