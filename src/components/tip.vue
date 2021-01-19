<template>
  <v-alert
    dense
    style="max-width: 200px; position: absolute; bottom: 10%; left: 50%; translateX(-50%)"
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
  created() {
    // this.showAlert()
  },
  watch: {
    showTip(val) {
      if(val) {
        console.log(111);
        this.showAlert()
      }else {
        console.log(222);
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