<template>
  <v-menu
    max-width="290px"
    min-width="290px"
    offset-y
    transition="scale-transition"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="date"
        :label="$props.labelText"
        readonly
        v-on="on"
      />
    </template>

    <v-date-picker
      v-model="date"
      :disabled="!enabled"
      :type="$props.calendarType"
      no-title
      scrollable
    />
  </v-menu>
</template>

<script>
  export default {

    props: {
      enabled: { type: Boolean, required: true },
      labelText: { type: String, required: true },
      calendarType: { type: String, required: false, default: 'date' },
      selectedDate: { type: String, required: false },
    },
    data() {
      return {
        date: new Date(),
      }
    },

    watch: {
      date() {
        this.$emit('get:date', this.date)
      }
    },

    mounted() {
      // If date is given in props, use it as is:
      if (this.$props.selectedDate !== undefined) {
        this.date = this.$props.selectedDate
        return
      }

      // Format date string based on calendar type: 1) regular calendar 2) month calendar
      this.date = this.$props.calendarType === 'date'
        ? this.date.toISOString().split('T')[0]
        : this.date.toISOString().substr(0, 7)

    },
  }
</script>