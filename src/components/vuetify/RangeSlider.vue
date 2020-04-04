<template>
  <div>
    <v-switch
      id="ratingSwitch"
      v-model="enabled"
      :label="setSwitchLabel"
      @change="flipSwitch"
    />

    <v-range-slider
      v-model="range"
      :disabled="!enabled"
      :min="$props.defaultRange[0]"
      :max="$props.defaultRange[1]"
      :step="setStep"
      @change="emitRange"
    >
      <template v-slot:prepend>
        <v-text-field
          v-model="range[0]"
          class="slider-value-field"
          single-line
          type="number"
        />
      </template>

      <template v-slot:append>
        <v-text-field
          v-model="range[1]"
          class="slider-value-field"
          single-line
          type="number"
        />
      </template>
    </v-range-slider>
  </div>
</template>

<script>
  export default {

    props: {
      defaultRange: { type: Array, required: true },
      step: { type: Number, required: false },
      switchLabel: { type: String, required: false }
    },

    data() {
      return {
        enabled: false,
        range: this.$props.defaultRange,
      }
    },
    computed: {
      setStep() {
        return this.$props.step === undefined ? 1 : this.$props.step
      },

      setSwitchLabel() {
        return this.$props.switchLabel === undefined ? 'Haku päällä' : this.$props.switchLabel
      },
    },

    methods: {
      emitRange() {
        if (this.enabled) {
          this.$emit('get:range', this.range)
        }
      },

      flipSwitch() {
        this.enabled
          ? this.$emit('get:range', this.range)
          : this.$emit('get:range', '')
      }
    },

  }
</script>

<style scoped>
  .slider-value-field { width: 60px }
  .slider-value-field >>> input { text-align: center }
</style>