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
      <div v-for="(value, attribute) in review" :key="attribute">

        <!-- :label="dictionary.translate('review', attribute)" -->
        <v-text-field v-if="attribute === 'date'"
          :label="dictionary.translate('review', attribute)"
          v-model="review[attribute]">
        </v-text-field>

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

  /* TODO:
    - Choose date with calendar.
  */

  import Dictionary from "@/utilities/Dictionary.js";
  import ReviewService from "@/services/ReviewService.js";
  
  const reviewService = new ReviewService();

  export default {
    data() {
      return {
        dictionary: Dictionary,
        showErrorAlert: false,
        showSuccessAlert: false,

        review: {
          author: "",
          date: this.getToday(),
          reviewText: "",
          rating: 0,
          wine: this.getWine(),
        }
      }
    },

    methods: {
      getToday() {
        const today = new Date();
        return today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      },

      getWine() {
        return "TODO: implement";
      },

      submitForm() {
        reviewService.post()
      },

      successfulPost() {
        reviewService.resetObject(this.wine);
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