<template>
  <v-alert
    dense
    style="max-width: 300px; position: absolute; bottom: 10%; left: 50%; transform: translateX(-50%); z-index: 1000"
    class="mx-auto"
    :type="alertType"
    v-model="show"
  >{{alertText}}</v-alert>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
        alertType: 'success',
        alertText: ''
      }
    },
    methods: {
      setAlert(alertText, alertType='success', time=2000) {
        this.alertText = alertText
        this.alertType = alertType
        this.show = true
        setTimeout(() => {
          this.show = false
        }, time);
      }
    }
  }
</script>