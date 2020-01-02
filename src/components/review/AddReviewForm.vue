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

      <v-text-field
        :label="dictionary.translate('review', 'author')"
        v-model="review.author">
      </v-text-field>

      <DatePickerComponent
        @get:date="getDate"
        :calendarType="'date'"
        :enabled="true"
        :labelText="'Päivämäärä'">
      </DatePickerComponent>

      <v-textarea
        :label="dictionary.translate('review', 'reviewText')"
        auto-grow
        class="ma-0 pa-0"
        v-model="review.reviewText">
      </v-textarea>

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
          rating: 2.5,
          wine: {},
        },
      }
    },

    methods: {
      getDate(date) { this.review.date = date },

      getWine(wine) { this.review.wine = wine },

      submitForm() {
        reviewService.post(this.review)
                     .then(wasOk => wasOk ? this.successfulPost() : this.failedPost());
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