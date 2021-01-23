<template>
  <v-dialog v-model="showImg" max-width="500px">
    <v-img :src="imgUrl" max-width="500px" max-height="500px"></v-img>
  </v-dialog>
</template>

<script>
  export default {
    name: 'imgDialog',
    props: {
      imgUrl: {
        type: String,
        require
      },
      showImg: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        show: false
      }
    },
    watch: {
      showImg(val, oldVal) {
        console.log(val);
        console.log(oldVal);
      }
    },
    methods: {
      
    }
  }
</script>