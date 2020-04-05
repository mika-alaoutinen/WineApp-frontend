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
      selectedDate: {
        type: String,
        required: false,
        default: function() {
          return this.$props.calendarType === 'date'
            ? new Date().toISOString().split('T')[0]
            : new Date().toISOString().substr(0, 7)
        }
      },
    },

    data() {
      return {
        date: this.$props.selectedDate,
      }
    },

    watch: {
      date() {
        this.$emit('get:date', this.date)
      }
    },

    mounted() {
      this.$emit('get:date', this.date)
    },
  }

</script>