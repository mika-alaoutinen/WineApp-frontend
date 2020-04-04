<template>
  <v-card
    class="details-card"
    max-width="60em"
  >
    <v-img
      height="25em"
      :src="getImage"
    />
    <v-card-title class="card-title secondary--text">
      Viinin tiedot
    </v-card-title>

    <div class="card-contents">
      <v-row
        v-for="(value, attribute) in wineWithoutId"
        :key="attribute"
      >
        <!-- Left column for attribute names. -->
        <v-col
          class="attribute-text"
          sm="3"
        >
          {{ util.translate("wine", attribute) }}
        </v-col>

        <!-- Right column for values. -->
        <!-- Editing mode: -->
        <v-col v-if="editing">
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

        <!-- View mode: -->
        <v-col v-else>
          <div v-if="attribute === 'type'">
            {{ util.translate("wine", value) }}
          </div>

          <div v-else-if="attribute === 'description' || attribute === 'foodPairings'">
            <v-chip
              v-for="keyword in value"
              :key="keyword"
            >
              {{ keyword }}
            </v-chip>
          </div>

          <div v-else-if="attribute === 'url'">
            <a :href="value">{{ validateUrl(value) }}</a>
          </div>

          <div v-else>
            {{ value }}
          </div>
        </v-col>
      </v-row>

      <!-- Edit and delete buttons -->
      <DetailsButtons
        :editing="editing"
        :item="wine"
        @delete:item="deleteWine"
        @get:editing="getEditing"
        @save:item="saveEditedWine"
      />

      <!-- Show reviews of the wine: -->
      <ReviewDetailsCard :reviews="reviews" />
    </div>
  </v-card>
</template>

<script>
  import DetailsButtons from '@/components/vuetify/DetailsButtons.vue'
  import ReviewDetailsCard from '@/components/review/ReviewDetailsCard.vue'
  import ReviewService from '@/services/ReviewService.js'
  import Utilities from '@/utilities/Utilities.js'
  import WineService from '@/services/WineService.js'
  import { mdiPlus } from '@mdi/js'

  const reviewService = new ReviewService()
  const wineService = new WineService()

  export default {
    components: { DetailsButtons, ReviewDetailsCard },

    props: {
      wineId: { required: true, type: Number },
    },

    data() {
      return {
        addIcon: mdiPlus,

        editing: false,
        reviews: [],
        util: Utilities,
        wineTypes: [ 'sparkling', 'red', 'rose', 'white', 'other' ],

        wine: {
          name: '',
          type: 'other',
          country: '',
          price: null,
          volume: null,
          description: [],
          foodPairings: [],
          url: '',
        },
      }
    },

    computed: {
      getImage() {
        const invalid = ['', undefined, null]

        return invalid.includes(this.wine.type)
          ? require('@/assets/wine-images/wines.png')
          : require('@/assets/wine-images/' + this.wine.type.toLowerCase() + '.png')
      },

      wineWithoutId() {
        return wineService.removeObjectId(this.wine)
      },
    },

    mounted() {
      wineService.get(this.$props.wineId)
        .then(wine => this.wine = wine)

      reviewService.getByWineId(this.$props.wineId)
        .then(reviews => this.reviews = reviews)
    },

    methods: {
      getEditing(boolean) { this.editing = boolean },

      addTextField(attribute) {
        this.wine[attribute].push('')
      },

      isButtonDisabled(attribute) {
        const emptyTextFields = this.wine[attribute]
          .filter (item => item === '' || item === undefined || item === null)
          .length

        return emptyTextFields > 0
      },

      deleteWine(wine) {
        wineService.delete(wine.id)
        this.$router.push({ name: 'wines' })
      },

      saveEditedWine(wine) {
        wineService.put(wine.id, wine)
        this.editing = false
      },

      validateUrl(url) {
        return url.includes('http') || url.includes('https') ? url : ''
      },
    }
  }

</script>

<style scoped>
  .card-contents { margin: 0 2em }
  .card-title { padding-left: 1.5em }
  .col {
    padding-bottom: 6px;
    padding-top: 6px;
    text-align: start;
  }
  .denseTextField {
    margin: 0;
    padding: 0;
  }
  .details-card { margin: 0 auto 4em }
</style>