<template>
  <v-img
    height="25em"
    :src="imageSrc"
  />
</template>

<script>
  export default {
    props: {
      wineType: { required: false, type: String, default: undefined },
    },

    computed: {
      imageSrc() {
        const type = this.wineType.toLowerCase()
        return type
          ? require('@/../public/assets/wine-images/' + type + '.png')
          : require('@/../public/assets/wine-images/wines.png')
      },
    },
  }
</script>