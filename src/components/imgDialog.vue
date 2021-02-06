<template>
  <v-dialog v-model="show" max-width="500px">
    <v-img :src="imgUrl" max-width="500px" max-height="500px"></v-img>
  </v-dialog>
</template>

<script>
  export default {
    data() {
      return {
        imgUrl: '',
        show: false
      }
    },
    methods: {
      scaleImg(url) {
        this.imgUrl = url
        this.show = true
      }
    }
  }
</script>