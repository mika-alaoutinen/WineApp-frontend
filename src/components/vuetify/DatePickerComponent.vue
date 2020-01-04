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
      :disabled=!enabled
      :type="type"
      no-title
      scrollable
      v-model="date">
    </v-date-picker>
  </v-menu>
</template>

<script>
  export default {
    data() {
      return {
        date: new Date(),
        type: "month",
      }
    },

    mounted() {
      // Set the calendar type, default option is "month":
      this.type = this.$props.calendarType === undefined
        ? "month"
        : this.$props.calendarType;
      
      // Set date string format based on calendar type:
      this.date = this.type === "month"
        ? this.date.toISOString().substr(0, 7)
        : this.date.toISOString().split('T')[0]
    },

    props: {
      calendarType: { type: String, required: false },
      enabled: { type: Boolean, required: true },
      labelText: { type: String, required: true },
    },

    watch: {
      date() {
        this.$emit("get:date", this.date);
      }
    },
  };
</script>