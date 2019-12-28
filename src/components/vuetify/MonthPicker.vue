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
        <MonthPickerComponent
          @get:date="getStartDate"
          :enabled="enabled"
          :labelText="'Aloituspäivämäärä'">
        </MonthPickerComponent>
      </v-col>

      <v-col>
        <MonthPickerComponent
          @get:date="getEndDate"
          :enabled="enabled"
          :labelText="'Lopetuspäivämäärä'">
        </MonthPickerComponent>
      </v-col>
    </v-row>

  </div>
</template>

<script>
import MonthPickerComponent from "@/components/vuetify/MonthPickerComponent.vue";

  export default {
    components: {
      MonthPickerComponent,
    },

    data() {
      return {
        range: [],
        enabled: false,
      }
    },

    methods: {
      flipSwitch() {
        this.enabled
          ? this.$emit("get:range", this.range)
          : this.$emit("get:range", this.defaultRange);
      },

      getStartDate(date) { this.range[0] = date },

      getEndDate(date) { this.range[1] = date },
    },

  };
</script>