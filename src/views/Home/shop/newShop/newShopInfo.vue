<template>
  <div class="newShopInfo">
    <v-data-table
      :headers="headers"
      :items="shopInfo"
      class="elevation-1"
      hide-default-footer
      hide-default-header
      no-data-text="没有数据"
    >
      <template v-slot:top>
        <v-dialog v-model="passReview" max-width="500px">
          <v-card>
            <v-card-title class="headline">确定通过审核?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="cancelReview">取消</v-btn>
              <v-btn color="blue darken-1" text @click="confirmReview">确定</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
    </v-data-table>
    <div class="text-center mt-4">
      <v-btn
        large
        color="error"
        class="mx-2"
      >
        审核不通过
      </v-btn>
      <v-btn
        large
        color="success"
        class="mx-2"
      >
        审核通过
      </v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'newShopInfo',
    data() {
      return {
        passReview: false,
        headers: [],
        shopInfo: []
      }
    },
    methods: {
      confirmReview() {
        console.log('审核通过');
      },
      cancelReview() {
        console.log('审核不通过');
      }
    }
  }
</script>

<style lang="sass" scoped>

</style>