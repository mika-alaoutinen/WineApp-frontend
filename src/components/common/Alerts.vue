<template>
  <div>
    <v-alert
      dismissible
      type="success"
      :value="showSuccessAlert"
    >
      {{ successText }}
    </v-alert>
    <v-alert
      dismissible
      type="error"
      :value="showErrorAlert"
    >
      {{ errorText }}
    </v-alert>
  </div>
</template>

<script>
  export default {
    props: {
      showErrorAlert: { required: true, type: Boolean },
      showSuccessAlert: { required: true, type: Boolean },
      errorText: { required: true, type: String },
      successText: { required: true, type: String },
    }
  }
</script>