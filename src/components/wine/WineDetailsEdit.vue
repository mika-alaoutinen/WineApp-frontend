<template>
  <v-card
    class="details-card"
    max-width="60em"
  >
    <WineDetailsHeroImage :wine-type="originalWine.type" />

    <v-card-title class="card-title secondary--text">
      Muokkaa viiniä
    </v-card-title>

    <v-alert
      dismissible
      type="error"
      :value="showErrorAlert"
    >
      Kenttä ei voi olla tyhjä!
    </v-alert>

    <div class="card-body">
      <v-row
        v-for="(value, attribute) in wineWithoutId"
        :id="attribute"
        :key="attribute"
      >
        <!-- Left column for attribute names, or "headers" -->
        <v-col sm="3">
          {{ util.translate("wine", attribute) }}
        </v-col>

        <!-- Right column for values -->
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
      </v-row>
    </div>

    <!-- Buttons for confirming and canceling edits -->
    <DetailsConfirmEditButtons @edit:confirm="confirmEdit" />
  </v-card>
</template>

<script>
  import DetailsConfirmEditButtons from '@/components/common/DetailsConfirmEditButtons.vue'
  import WineDetailsHeroImage from '@/components/wine/WineDetailsHeroImage.vue'
  import Utilities, { deepCopy, removeObjectId } from '@/utilities/Utilities.js'
  import WineService from '@/services/WineService.js'
  import { mdiPlus } from '@mdi/js'

  const wineService = new WineService()

  export default {
    components: { DetailsConfirmEditButtons, WineDetailsHeroImage },

    props: {
      originalWine: { required: true, type: Object },
    },

    data() {
      return {
        addIcon: mdiPlus,
        util: Utilities,
        wineTypes: [ 'sparkling', 'red', 'rose', 'white', 'other' ],

        showErrorAlert: false,
        wine: {},
      }
    },

    computed: {
      wineWithoutId() {
        return removeObjectId(this.wine)
      },
    },

    mounted() {
      this.wine = deepCopy(this.$props.originalWine)
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

      confirmEdit(confirm) {
        confirm ? this.saveWine() : this.goBackToWineDetails(this.$props.originalWine.id)
      },

      saveWine() {
        wineService.isValid(this.wine)
          ? wineService.put(this.$props.originalWine.id, this.wine)
            .then(() => this.goBackToWineDetails(this.$props.originalWine.id))
          : this.showErrorAlert = true
      },

      goBackToWineDetails(id) {
        this.$router.push({ name: 'wine', params: { wineId: id } })
      },
    }
  }
</script>

<style scoped>
  .card-body { margin: 0 2em }
  .card-title { padding-left: 1.5em }
  .col {
    padding-bottom: 6px;
    padding-top: 6px;
    text-align: start;
  }
  .details-card { margin: 0 auto 4em }
  .denseTextField {
    margin: 0;
    padding: 0;
  }
</style>