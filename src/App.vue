<template>
  <div id="App">
    <v-app>
      <router-view></router-view>
    </v-app>
  </div>
</template>

<script>
  export default {
    name: 'App',
    created() {
      // if (sessionStorage.getItem("store") ) {
      //   this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
      //   // sessionStorage.removeItem('store')
      // } 

      // window.addEventListener("beforeunload",()=>{
      //   sessionStorage.setItem("store",JSON.stringify(this.$store.state))
      // })
    }
  }
</script>

<style lang="scss" scoped>
  
</style>
