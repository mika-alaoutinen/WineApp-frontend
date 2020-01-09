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

            <v-col v-if="attribute !== 'id' && attribute !== 'wine'" align="start" sm="3">
              {{ util.translate("review", attribute) }}
            </v-col>

            <v-col v-if="attribute !== 'id' && attribute !== 'wine'" align="start">
              {{ value }}
            </v-col>
          </v-row>

          <v-row>
            <v-col align="start" sm="3">Linkki</v-col>
            <v-col align="start">
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
  .subheading {
    font-weight: bold;
    text-align: left;
  }
  .v-expansion-panel:before { box-shadow: none }
</style>