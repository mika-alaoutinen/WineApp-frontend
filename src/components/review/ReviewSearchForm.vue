<template>
  <v-card class="full-page-card" max-width="60%">
    <v-card-title class="card-title">Hae arvosteluja</v-card-title>

    <v-form @submit.prevent="submitForm">

      <!-- Review quick search: -->  
      <v-subheader class="subheader">Pikahaut</v-subheader>
      <v-btn-toggle class="quick-search" group>
        <v-btn @click="doQuickSearch('best')" small>Parhaat</v-btn>
        <v-btn @click="doQuickSearch('worst')" small>Huonoimmat</v-btn>
        <v-btn @click="doQuickSearch('newest')" small>Uusimmat</v-btn>

      </v-btn-toggle>

      <!-- TODO: Maybe change to a select-component..? -->
      <!-- Search by author: -->
      <v-subheader class="subheader">Hae arvostelijan nimen perusteella</v-subheader>
      <v-text-field label="Arvostelijan nimi" v-model="searchParams.author"/>

      <!-- Search by date range: -->
      <v-subheader class="subheader">Hae arvostelun päivämäärän perusteella</v-subheader>

      <!-- Date range -->
      <v-switch
        @change="resetDateRange"
        label="Päivämäärähaku päällä"
        v-model="date.enabled">
      </v-switch>

      <v-row>
        <v-col>
          <MonthPicker
            @get:date="getStartDate"
            :enabled="date.enabled"
            :labelText="'Aloituspäivämäärä'">
          </MonthPicker>
        </v-col>

        <v-col>
          <MonthPicker
            @get:date="getEndDate"
            :enabled="date.enabled"
            :labelText="'Lopetuspäivämäärä'">
          </MonthPicker>
        </v-col>
      </v-row>

      <!-- Search by rating: -->
      <v-subheader class="subheader">Hae arvosanan perusteella</v-subheader>
      <RangeSlider
        @get:range="getRange"
        @get:switch="getSwitchState"
        :defaultRange="rating.defaultRange"
        :step="0.25"
        :switchLabel="'Arvosanahaku päällä'">
      </RangeSlider>

    </v-form>
  </v-card>
</template>

<script>
  import MonthPicker from "@/components/vuetify/MonthPicker.vue";
  import RangeSlider from "@/components/vuetify/RangeSlider.vue";
  import ReviewService from "@/services/ReviewService.js";

  const reviewService = new ReviewService();

  export default {
    components: {
      MonthPicker,
      RangeSlider,
    },

    data() {
      return {
        // Placeholders for date search:
        date: {
          enabled: false,
          startMenu: false,
          endMenu: false,
          range: [],
        },
        
        // Placeholders for rating search:
        rating: {
          enabled: false,
          defaultRange: [ 0.0, 5.0 ],
          range: [],
        },

        // Search parameters that get sent to backend:
        searchParams: {
          author: "",
          dateRange: [],
          ratingRange: [],
          wineId: "",
        }
      }
    },

    methods: {
      doQuickSearch(searchType) {
        reviewService.quickSearch(searchType, 10)
                     .then(reviews => this.$emit("get:reviews", reviews));
      },

      getStartDate(date) {
        this.date.range[0] = date;
      },

      getEndDate(date) {
        this.date.range[1] = date;
      },

      getRange(range) {
        this.rating.range = range;
      },

      getSwitchState(state) {
        this.rating.enabled = state;
      },

      // TODO: move to a generic utility module:
      resetSearchParams() {
        Object.keys(this.searchParams)
              .map(key => Array.isArray(this.searchParams[key])
                ? this.searchParams[key] = []
                : this.searchParams[key] = "");
      },

      resetDateRange() {
        this.searchParams.ratingRange = this.rating.range;
      },

      setSearchParams() {
        if (this.date.enabled) {
          this.searchParams.dateRange = this.date.range;
        }
        if (this.rating.enabled) {
          this.searchParams.ratingRange = this.rating.range;
        }
      },

      submitForm() {
        this.setSearchParams();

        reviewService.search(this.searchParams)
                     .then(reviews => this.$emit("get:reviews", reviews));

        this.resetSearchParams();
      },
      
    }
  };
</script>

<style scoped>
  .subheader { padding-left: 0 }
  .card-title {
    font-weight: bold;
    padding-left: 0;
  }
  .slider-value-field { width: 60px }
  .slider-value-field >>> input { text-align: center }
</style>