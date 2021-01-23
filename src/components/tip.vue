<template>
  <v-alert
    dense
    style="max-width: 200px; position: absolute; bottom: 10%; left: 50%; transform: translateX(-50%)"
    class="mx-auto"
    :type="alertType"
    v-model="show"
  >{{alertText}}</v-alert>
</template>

<script>
export default {
  name: 'tip',
  data() {
    return {
      show: this.showTip
    }
  },
  props: {
    alertType: {
      type: String,
      default: 'success'
    },
    alertText: String,
    showTip: {
      type: Boolean,
      default: true
    },
  },
  watch: {
    showTip(val) {
      if(val) {
        this.showAlert()
      }
    }
  },
  methods: {
    showAlert() {
      this.show = true
      setTimeout(() => {
        this.show = false
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>