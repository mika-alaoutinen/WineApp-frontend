<template>
  <div>
    <v-row v-for="(value, attribute) in reviewWithoutId" :key="attribute">

      <!-- Left column for attribute names. -->
      <v-col v-if="attribute === 'wine'" align="start" sm="3">
        <div v-if="$props.showWine">{{ dictionary.translate("review", attribute) }}</div>
      </v-col>

      <v-col v-else align="start" sm="3">
        {{ dictionary.translate("review", attribute) }}
      </v-col>

      <!-- Right column for values. -->
      <v-col v-if="attribute === 'wine'" align="start">
        <div v-if="$props.showWine">{{ value.name }}</div>
      </v-col>

      <v-col v-else align="start">{{ value }}</v-col>

    </v-row>
  </div>
</template>

<script>
  import Dictionary from "@/utilities/Dictionary.js";
  
  export default {
    computed: {
      reviewWithoutId() {
        const reviewCopy = Object.assign({}, this.$props.review);
        delete reviewCopy.id;
        return reviewCopy;
      },
    },

    data() {
      return {
        dictionary: Dictionary,
      }
    },

    props: {
      review: { type: Object, required: true },
      showWine: { type: Boolean, required: false }, // default is false!
    }
  };
</script>

<style scoped>
</style>