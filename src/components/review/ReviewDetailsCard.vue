<template>
  <div>
    <div class="subheading">Arvostelut</div>

    <v-expansion-panels accordion multiple>
      <v-expansion-panel v-for="review in $props.reviews" :key="review.id">
        <v-expansion-panel-header>
          {{ review.author + " " + review.rating + "/5" }}
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <v-row v-for="(value, attribute) in review" :key="attribute">

            <!-- Left column for attributes -->
            <v-col v-if="attribute !== 'id' && attribute !== 'wine'" sm="3">
              {{ util.translate("review", attribute) }}
            </v-col>

            <!-- Right column for values -->
            <v-col v-if="attribute !== 'id' && attribute !== 'wine'">
              <div v-if="attribute === 'date'">{{ util.formatDate(value) }}</div>
              <div v-else>{{ value }}</div>
            </v-col>
          </v-row>

          <v-row>
            <v-col sm="3">Linkki</v-col>
            <v-col>
              <router-link :to="{ name: 'review', params: { reviewId: review.id }}">
                Linkki arvosteluun
              </router-link>
            </v-col>
          </v-row>
        </v-expansion-panel-content>

      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
  import Utilities from "@/utilities/Utilities.js";

  export default {
    data() {
      return {
        util: Utilities
      }
    },

    props: {
      reviews: { type: Array, required: true },
    }
  };
</script>

<style scoped>
  .col { text-align: start }
  .subheading {
    font-weight: bold;
    text-align: left;
  }
  .v-expansion-panel:before { box-shadow: none }
</style>