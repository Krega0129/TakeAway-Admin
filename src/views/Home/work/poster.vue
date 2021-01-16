<template>
  <div class="poster">
    <v-carousel
      class="mx-auto mt-8"
      cycle
      height="400"
      style="width: 800px"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item
        v-for="url in imgUrl"
        :key="url"
      >
        <v-img
          :aspect-ratio="16/9"
          style="height: 100%"
          :src="url"
        ></v-img>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
  export default {
    name: 'poster',
    data () {
      return {
        imgUrl: [
          'http://p1.meituan.net/codeman/826a5ed09dab49af658c34624d75491861404.jpg',
          'https://p1.meituan.net/travelcube/01d2ab1efac6e2b7adcfcdf57b8cb5481085686.png',
          'http://p0.meituan.net/codeman/a97baf515235f4c5a2b1323a741e577185048.jpg'
        ]
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>