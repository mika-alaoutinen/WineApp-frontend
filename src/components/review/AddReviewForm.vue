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
    <ValidationObserver ref="form" v-slot="{ handleSubmit }">
      <v-form @submit.prevent="handleSubmit(submitForm)">

        <!-- Reviewed wine, required -->
        <validation-provider name="Viini" rules="required" v-slot="{ errors }">
          <v-autocomplete
            :items="allWines"
            label="Arvosteltava viini"
            v-model="wine">
          </v-autocomplete>
          <span class="validationErrorMessage">{{ errors[0] }}</span>
        </validation-provider>

        <!-- Author, required -->
        <validation-provider name="Arvostelija" rules="required" v-slot="{ errors }">
          <v-text-field
            :label="dictionary.translate('review', 'author')"
            v-model="review.author">
          </v-text-field>
          <span class="validationErrorMessage">{{ errors[0] }}</span>
        </validation-provider>

        <!-- Date, required but cannot be entered incorrectly -->
        <DatePickerComponent
          @get:date="getDate"
          :calendarType="'date'"
          :enabled="true"
          :labelText="'Päivämäärä'">
        </DatePickerComponent>

        <!-- Review text, optional -->
        <v-textarea
          :label="dictionary.translate('review', 'reviewText')"
          auto-grow
          class="ma-0 pa-0"
          v-model="review.reviewText">
        </v-textarea>

        <!-- Rating, required but cannot be entered incorrectly -->
        <v-slider
          :label="dictionary.translate('review', 'rating')"
          min="0.0"
          max="5.0"
          step="0.25"
          ticks
          thumb-label
          v-model="review.rating">
        </v-slider>

        <!-- Form submit button to save the new review: -->
        <v-btn class="button-save" large text type="submit">Lisää arvostelu</v-btn>
      </v-form>
    </ValidationObserver>

  </v-card>
</template>

<script>
  import DatePickerComponent from "@/components/vuetify/DatePickerComponent.vue";
  import Dictionary from "@/utilities/Dictionary.js";
  import ReviewService from "@/services/ReviewService.js";
  import WineService from "@/services/WineService.js";
  import { ValidationObserver, ValidationProvider } from 'vee-validate';
  import "@/utilities/Validation.js";
  
  const reviewService = new ReviewService();
  const wineService = new WineService();

  export default {
    components: { DatePickerComponent, ValidationObserver, ValidationProvider },

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
        wine: null,

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
                     .then(wasOk => wasOk ? this.successfulPost() : this.showErrorAlert = true);
      },

      successfulPost() {
        this.showSuccessAlert = true;
        reviewService.resetObject(this.review);
        this.$refs.form.reset();
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
  .validationErrorMessage { color: red }
</style>