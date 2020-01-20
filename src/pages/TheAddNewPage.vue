<template>
  <div class="tabs-container">
    <v-tabs centered grow hide-slider>

      <v-tab>
        <v-icon>{{ wineIcon }}</v-icon>
        Lisää uusi viini
      </v-tab>
      <v-tab-item>
        <AddWineForm/>
      </v-tab-item>
      
      <v-tab>
        <v-icon>{{ reviewIcon }}</v-icon>
        Lisää uusi arvostelu</v-tab>
      <v-tab-item>
        <AddReviewForm/>
      </v-tab-item>

    </v-tabs>
  </div>
</template>

<script>
  import AddReviewForm from "@/components/review/AddReviewForm.vue";
  import AddWineForm from "@/components/wine/AddWineForm.vue";
  import { mdiFileDocumentEditOutline, mdiGlassWine } from '@mdi/js';

  export default {
    components: { AddReviewForm, AddWineForm },

    data() {
      return {
        reviewIcon: mdiFileDocumentEditOutline,
        wineIcon: mdiGlassWine,
      }
    }
  };
</script>