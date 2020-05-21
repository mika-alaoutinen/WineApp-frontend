<template>
  <v-card class="full-page-card">
    <v-card-title class="card-title secondary--text">
      Lisää uusi arvostelu
    </v-card-title>

    <Alerts
      :show-error-alert="showErrorAlert"
      :show-success-alert="showSuccessAlert"
      :error-text="'Arvostelun lisääminen epäonnistui!'"
      :success-text="'Uusi arvostelu lisätty!'"
    />

    <!-- Form begins -->
    <ValidationObserver
      ref="form"
      v-slot="{ handleSubmit }"
    >
      <v-form @submit.prevent="handleSubmit(submitForm)">
        <!-- Reviewed wine, required -->
        <validation-provider
          v-slot="{ errors }"
          name="Viini"
          rules="required"
        >
          <v-autocomplete
            v-model="wine"
            :items="allWines"
            label="Arvosteltava viini"
          />
          <span class="validationErrorMessage">{{ errors[0] }}</span>
        </validation-provider>

        <!-- Author, required -->
        <validation-provider
          v-slot="{ errors }"
          name="Arvostelija"
          rules="required"
        >
          <v-text-field
            v-model="review.author"
            :label="util.translate('review', 'author')"
          />
          <span class="validationErrorMessage">{{ errors[0] }}</span>
        </validation-provider>

        <!-- Date, required but cannot be entered incorrectly -->
        <DatePicker
          :enabled="true"
          :label-text="'Päivämäärä'"
          @get:date="getDate"
        />

        <!-- Review text, optional -->
        <v-textarea
          v-model="review.reviewText"
          :label="util.translate('review', 'reviewText')"
          auto-grow
          class="ma-0 pa-0"
        />

        <!-- Rating, required but cannot be entered incorrectly -->
        <v-slider
          v-model="review.rating"
          :label="util.translate('review', 'rating')"
          min="0.0"
          max="5.0"
          step="0.25"
          ticks
          thumb-label
        />

        <FormSubmitButton button-text="Lisää arvostelu" />
      </v-form>
    </ValidationObserver>
  </v-card>
</template>

<script>
  import Alerts from '@/components/common/Alerts.vue'
  import DatePicker from '@/components/common/DatePicker.vue'
  import FormSubmitButton from '@/components/buttons/FormSubmitButton.vue'
  import ReviewService from '@/services/ReviewService.js'
  import Utilities, { resetObject } from '@/utilities/Utilities.js'
  import WineService from '@/services/WineService.js'
  import { mdiPlus } from '@mdi/js'
  import { ValidationObserver, ValidationProvider } from 'vee-validate'
  import '@/utilities/Validation.js'

  const reviewService = new ReviewService()
  const wineService = new WineService()

  export default {
    components: { Alerts, DatePicker, FormSubmitButton, ValidationObserver, ValidationProvider },

    data() {
      return {
        addIcon: mdiPlus,

        showErrorAlert: false,
        showSuccessAlert: false,
        wine: null,

        review: {
          author: '',
          date: '',
          reviewText: '',
          rating: 2.5,
        },

        util: Utilities,
      }
    },

    computed: {
      allWines() {
        const wines = wineService.getStore().data.wines
        return wines.map(wine => ({ text: wine.name, value: wine }))
      },
    },

    methods: {
      getDate(date) { this.review.date = date },

      submitForm() {
        this.showErrorAlert = false
        reviewService.post(this.wine.id, this.review)
          .then(wasOk => wasOk ? this.successfulPost() : this.showErrorAlert = true)
      },

      successfulPost() {
        this.showSuccessAlert = true
        resetObject(this.review)
        this.$refs.form.reset()
      },
    },

  }
</script>