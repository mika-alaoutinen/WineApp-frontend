<template>
  <v-menu
    max-width="290px"
    min-width="290px"
    offset-y
    transition="scale-transition">

    <template v-slot:activator="{ on }">
      <v-text-field
        :label="$props.labelText"
        readonly
        v-on="on"
        v-model="date">
      </v-text-field>
    </template>

    <v-date-picker
      @change="emitDate"
      :disabled=!enabled
      :type="getCalendarType"
      no-title
      scrollable
      v-model="date">
    </v-date-picker>
  </v-menu>
</template>

<script>
  export default {
    computed: {
      getCalendarType() {
        return this.$props.calendarType === undefined ? "month" : this.$props.calendarType;
      }
    },

    data() {
      return {
        date: new Date().toISOString().substr(0, 7),
      }
    },

    methods: {
      emitDate() {
        this.$emit("get:date", this.date);
      }
    },

    props: {
      calendarType: { type: String, required: false },
      enabled: { type: Boolean, required: true },
      labelText: { type: String, required: true },
    }
  };
</script>