<template>
  <div>
    <!-- Wrapper component for two month pickers and a switch that
    activates/deactivates the pickers. -->

    <v-switch
      @change="flipSwitch"
      label="Päivämäärähaku päällä"
      v-model="enabled">
    </v-switch>

    <v-row>
      <v-col>
        <DatePickerComponent
          @get:date="getStartDate"
          :calendarType="'month'"
          :enabled="enabled"
          :labelText="'Aloituspäivämäärä'">
        </DatePickerComponent>
      </v-col>

      <v-col>
        <DatePickerComponent
          @get:date="getEndDate"
          :calendarType="'month'"
          :enabled="enabled"
          :labelText="'Lopetuspäivämäärä'">
        </DatePickerComponent>
      </v-col>
    </v-row>

  </div>
</template>

<script>
import DatePickerComponent from "@/components/vuetify/DatePickerComponent.vue";

  export default {
    components: { DatePickerComponent },

    data() {
      return {
        enabled: false,
        range: [],
      }
    },

    methods: {
      flipSwitch() {
        this.enabled
          ? this.$emit("get:range", this.range)
          : this.$emit("get:range","");
      },

      getStartDate(date) { this.range[0] = date },

      getEndDate(date) { this.range[1] = date },
    },

  };
</script>