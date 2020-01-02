<template>
  <div>
    <v-tabs centered>
      <v-tab>Lisää uusi viini</v-tab>
      <v-tab-item>
        <AddWineForm/>
      </v-tab-item>
      
      <v-tab>Lisää uusi arvostelu</v-tab>
      <v-tab-item>
        <AddReviewForm/>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
  import AddReviewForm from "@/components/review/AddReviewForm.vue";
  import AddWineForm from "@/components/wine/AddWineForm.vue";

  export default {
    components: { AddReviewForm, AddWineForm }
  };
</script>