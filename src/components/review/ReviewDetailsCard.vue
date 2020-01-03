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
              {{ dictionary.translate("review", attribute) }}
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


    <v-toolbar flat>
      <v-toolbar-title>Arvostelut</v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items>

        <v-dialog v-for="review in $props.reviews" :key="review.id" max-width="500">
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on">{{ review.author + " " + review.rating + "/5" }}</v-btn>
          </template>

          <v-card class="modal-card">
            <v-card-title>{{ review.author + " " + review.date }}</v-card-title>
            <v-card-text v-html="createCardText(review)" />
          </v-card>
        </v-dialog>

      </v-toolbar-items>
    </v-toolbar>


  </div>
</template>

<script>
  import Dictionary from "@/utilities/Dictionary.js";

  export default {
    data() {
      return {
        dialogs: [],
        dictionary: Dictionary,
      }
    },

    methods: {
      createCardText(review) {
        let text =
          review.reviewText + "<br/><br/>" +
          "<b> Arvosana: " + review.rating + "</b>";
        
        return text;
      },
    },

    props: {
      reviews: { type: Array, required: true },
    }
  };
</script>

<style scoped>
  .align-left { text-align: left }
  .align-right { text-align: right }
  .card-title { padding-left: 0 }
  .modal-card { text-align: left }
  .subheading {
    font-weight: bold;
    text-align: left;
  }
  .v-expansion-panel:before { box-shadow: none }
</style>