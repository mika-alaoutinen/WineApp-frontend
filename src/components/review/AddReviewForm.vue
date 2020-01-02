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
  import WineService from "@/services/WineService.js";
  
  const reviewService = new ReviewService();
  const wineService = new WineService();

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

      getWine(wine) {
        wineService.getStore();
        console.log("wine name: " + JSON.stringify(wine));
      },

      submitForm() {
        reviewService.post()
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