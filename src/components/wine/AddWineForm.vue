<template>
  <v-card class="full-page-card">
    <v-card-title class="card-title secondary--text">
      Lisää uusi viini
    </v-card-title>

    <!-- Alerts that inform user if adding new wine was successful or not: -->
    <Alerts
      :show-error-alert="showErrorAlert"
      :show-success-alert="showSuccessAlert"
      :error-text="'Viinin lisääminen epäonnistui!'"
      :success-text="'Uusi viini lisätty!'"
    />

    <!-- Form begins -->
    <ValidationObserver
      ref="form"
      v-slot="{ handleSubmit }"
    >
      <v-form @submit.prevent="handleSubmit(submitForm)">
        <!-- Name text field, required -->
        <validation-provider
          v-slot="{ errors }"
          name="Nimi"
          rules="required"
        >
          <v-text-field
            v-model="wine.name"
            :label="util.translate('wine', 'name')"
            @change="validateName"
          />
          <span class="validationErrorMessage">{{ errors[0] }}</span>
          <span
            v-if="!isNameValid"
            class="validationErrorMessage"
          >
            Samalla nimellä on jo olemassa viini!
          </span>
        </validation-provider>

        <!-- Country text field, required -->
        <validation-provider
          v-slot="{ errors }"
          name="Maa"
          rules="required"
        >
          <v-combobox
            v-model="wine.country"
            :items="allValues.country"
            :search-input.sync="searchInput.country"
            chips
            deletable-chips
            hide-selected
            :label="util.translate('wine', 'country')"
            @change="searchInput.country=''"
          />
          <span class="validationErrorMessage">{{ errors[0] }}</span>
        </validation-provider>

        <!-- Radio buttons for wine types, required: -->
        <validation-provider
          v-slot="{ errors }"
          name="Tyyppi"
          rules="required"
        >
          <v-radio-group
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
          <span class="validationErrorMessage">{{ errors[0] }}</span>
        </validation-provider>

        <!-- Price, required, value >= 0 -->
        <validation-provider
          v-slot="{ errors }"
          rules="price"
        >
          <v-text-field
            v-model="wine.price"
            :label="util.translate('wine', 'price')"
            type="number"
          />
          <span class="validationErrorMessage">{{ errors[0] }}</span>
        </validation-provider>

        <!-- Volume, required, value > 0 -->
        <validation-provider
          v-slot="{ errors }"
          rules="volume"
        >
          <v-row>
            <v-col>
              <v-text-field
                v-model="wine.volume"
                :label="util.translate('wine', 'volume')"
              />
            </v-col>
            <v-col>
              <v-btn-toggle group>
                <v-btn
                  text
                  @click="setVolume(0.75)"
                >
                  {{ util.translate('wine', 'bottle') }}
                </v-btn>
                <v-btn
                  text
                  @click="setVolume(1.5)"
                >
                  {{ util.translate('wine', 'bag') }}
                </v-btn>
                <v-btn
                  text
                  @click="setVolume(3.0)"
                >
                  {{ util.translate('wine', 'box') }}
                </v-btn>
              </v-btn-toggle>
            </v-col>
          </v-row>
          <span class="validationErrorMessage">{{ errors[0] }}</span>
        </validation-provider>

        <!-- Description, optional: -->
        <v-combobox
          v-model="wine.description"
          :items="allValues.description"
          :label="util.translate('wine', 'description')"
          :search-input.sync="searchInput.description"
          chips
          deletable-chips
          hide-selected
          multiple
          @change="searchInput.description=''"
        />

        <!-- Food pairings, optional: -->
        <v-combobox
          v-model="wine.foodPairings"
          :items="allValues.foodPairings"
          :label="util.translate('wine', 'foodPairings')"
          :search-input.sync="searchInput.foodPairings"
          chips
          deletable-chips
          hide-selected
          multiple
          @change="searchInput.foodPairings=''"
        />

        <!-- URL, optional: -->
        <v-text-field
          v-model="wine.url"
          :label="util.translate('wine', 'url')"
        />

        <v-btn
          id="submit-wine-form-button"
          class="button-save secondary--text"
          large
          text
          type="submit"
        >
          <v-icon>{{ addIcon }}</v-icon>
          Lisää viini
        </v-btn>
      </v-form>
    </ValidationObserver>
  </v-card>
</template>

<script>
  import Alerts from '@/components/common/Alerts.vue'
  import Utilities from '@/utilities/Utilities.js'
  import WineService from '@/services/WineService.js'
  import { mdiPlus } from '@mdi/js'
  import { ValidationObserver, ValidationProvider } from 'vee-validate'
  import '@/utilities/Validation.js'

  const wineService = new WineService()

  export default {
    components: { Alerts, ValidationObserver, ValidationProvider },

    data() {
      return {
        addIcon: mdiPlus,

        showErrorAlert: false,
        showSuccessAlert: false,
        util: Utilities,
        wineTypes: [ 'sparkling', 'red', 'rose', 'white', 'other' ],

        // All unique countries, descriptions and food pairings:
        allValues: {
          country: [],
          description: [],
          foodPairings: [],
        },

        isNameValid: true, // Check database if wine name is unique

        // Contains the inputs for combobox:
        searchInput: {
          description: '',
          foodPairings: '',
        },

        wine: {
          name: '',
          type: '',
          country: '',
          price: null,
          volume: '',
          description: [],
          foodPairings: [],
          url: ''
        },
      }
    },

    mounted() {
      wineService.getCountries()
        .then(countries => this.allValues.country = countries)

      wineService.getDescriptions()
        .then(descriptions => this.allValues.description = descriptions)

      wineService.getFoodPairings()
        .then(foodPairings => this.allValues.foodPairings = foodPairings)
    },

    methods: {
      setVolume(volume) { this.wine.volume = volume },

      submitForm() {
        wineService.post(this.wine)
          .then(wasOk => wasOk ? this.successfulPost() : this.showErrorAlert = true)
      },

      successfulPost() {
        this.showSuccessAlert = true
        wineService.resetObject(this.wine)
        this.$refs.form.reset()
      },

      validateName() {
        wineService.validateWineName(this.wine.name)
          .then(isValid => this.isNameValid = isValid)
      },
    },

  }
</script>