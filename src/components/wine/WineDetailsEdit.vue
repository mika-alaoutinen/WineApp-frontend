<template>
  <v-card
    class="details-card"
    max-width="60em"
  >
    <v-col>
      <div v-if="attribute === 'description' || attribute === 'foodPairings'">
        <v-text-field
          v-for="i in wine[attribute].length - 1"
          :key="i"
          v-model="wine[attribute][i]"
          class="denseTextField"
          clearable
        />

        <v-btn
          :disabled="isButtonDisabled(attribute)"
          class="secondary--text"
          text
          @click="addTextField(attribute)"
        >
          <v-icon>{{ addIcon }}</v-icon>
          Lisää kenttä
        </v-btn>
      </div>

      <v-radio-group
        v-else-if="attribute === 'type'"
        v-model="wine.type"
        row
      >
        <v-radio
          v-for="type in wineTypes"
          :key="type"
          :label="util.translate('wine', type)"
          :value="type.toUpperCase()"
        />
      </v-radio-group>

      <v-text-field
        v-else
        v-model="wine[attribute]"
        class="ma-0 pa-0"
        @keyup.enter="saveEditedWine(wine)"
      />
    </v-col>
  </v-card>
</template>

<script>
  import { mdiPlus } from '@mdi/js'

  export default {
    data() {
      return {
        addIcon: mdiPlus,
      }
    },

    methods: {
      addTextField(attribute) {
        this.wine[attribute].push('')
      },

      isButtonDisabled(attribute) {
        const emptyTextFields = this.wine[attribute]
          .filter (item => item === '' || item === undefined || item === null)
          .length

        return emptyTextFields > 0
      },
    }
  }
</script>

<style>
  .denseTextField {
    margin: 0;
    padding: 0;
  }
</style>