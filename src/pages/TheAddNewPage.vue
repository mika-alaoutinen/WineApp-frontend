<template>
  <div>
    <AddWineForm/>
    <AddReviewForm/>
  </div>
</template>

<script>
  import AddReviewForm from "@/components/review/AddReviewForm.vue";
  import AddWineForm from "@/components/wine/AddWineForm.vue";

  export default {
    components: { AddReviewForm, AddWineForm }
  };
</script>