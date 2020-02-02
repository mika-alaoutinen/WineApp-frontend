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
        <DatePicker
          @get:date="getStartDate"
          :calendarType="'month'"
          :enabled="enabled"
          :labelText="'Aloituspäivämäärä'">
        </DatePicker>
      </v-col>

      <v-col>
        <DatePicker
          @get:date="getEndDate"
          :calendarType="'month'"
          :enabled="enabled"
          :labelText="'Lopetuspäivämäärä'">
        </DatePicker>
      </v-col>
    </v-row>

  </div>
</template>

<script>
import DatePicker from "@/components/vuetify/DatePicker.vue";

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
          ? this.$emit("get:range", this.range)
          : this.$emit("get:range","");
      },

      getStartDate(date) { this.range[0] = date },

      getEndDate(date) { this.range[1] = date },
    },

  };
</script>