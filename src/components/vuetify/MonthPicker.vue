<template>
  <div>
    <!-- Wrapper component for two month pickers and a switch that
    activates/deactivates the pickers. -->

    <v-switch
      id="calendarSwitch"
      v-model="enabled"
      label="Päivämäärähaku päällä"
      @change="flipSwitch"
    />

    <v-row>
      <v-col>
        <DatePicker
          :calendar-type="'month'"
          :enabled="enabled"
          :label-text="'Aloituspäivämäärä'"
          @get:date="getStartDate"
        />
      </v-col>

      <v-col>
        <DatePicker
          :calendar-type="'month'"
          :enabled="enabled"
          :label-text="'Lopetuspäivämäärä'"
          @get:date="getEndDate"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import DatePicker from '@/components/vuetify/DatePicker.vue'

  export default {
    components: { DatePicker },

    data() {
      return {
        enabled: false,
        range: [],
      }
    },

    methods: {
      flipSwitch() {
        this.enabled
          ? this.$emit('get:range', this.range)
          : this.$emit('get:range', [])
      },

      getStartDate(date) { this.range[0] = date },

      getEndDate(date) { this.range[1] = date },
    },

  }
</script>