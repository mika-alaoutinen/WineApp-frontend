<template>
  <div>
    <v-switch
      :label="$props.switchLabel"
      v-model="enabled">
    </v-switch>

    <v-range-slider
      @change="emitValues"
      :disabled="!enabled"
      :min="$props.defaultRange[0]"
      :max="$props.defaultRange[1]"
      v-model="range">

      <template v-slot:prepend>
        <v-text-field
          class="slider-value-field"
          single-line
          type="number"
          v-model="range[0]">
        </v-text-field>
      </template>

      <template v-slot:append>
        <v-text-field
          class="slider-value-field"
          single-line
          type="number"
          v-model="range[1]">
        </v-text-field>
      </template>
        
    </v-range-slider>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        enabled: false,
        range: this.$props.defaultRange,
      }
    },

    methods: {
      emitValues() {
        if (this.enabled) {
          // emit selected range
        } else {
          // emit default range given in props
        }
      },
    },

    props: {
      defaultRange: { type: Array, required: true },
      switchLabel: { type: String, required: true }
    },

};
</script>

<style scoped>
  .slider-value-field { width: 60px }
  .slider-value-field >>> input { text-align: center }
</style>