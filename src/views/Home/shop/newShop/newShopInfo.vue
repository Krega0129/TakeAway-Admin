<template>
  <div class="newShopInfo">
    <component
      :is="tip"
      :alertText="alertText"
      :alertType="alertType"
      :showTip="show"
    ></component>
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
            <v-card-title class="headline">确定{{flag}}通过审核?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" @click="cancelReview" text>取消</v-btn>
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
        @click="failReview"
      >
        审核不通过
      </v-btn>
      <v-btn
        large
        color="success"
        class="mx-2"
        @click="review"
      >
        审核通过
      </v-btn>
    </div>
  </div>
</template>

<script>
  import tip from '../../../../components/tip';
  import { showTip } from '../../../../utils';

  export default {
    name: 'newShopInfo',
    data() {
      return {
        passReview: false,
        headers: [],
        shopInfo: [],
        alertText: '',
        alertType: 'success',
        show: false,
        flag: ''
      }
    },
    components: {
      tip
    },
    computed: {
      tip() {
        return 'tip'
      }
    },
    methods: {
      review() {
        this.flag = ''
        this.passReview = true
      },
      failReview() {
        this.flag = '不'
        this.passReview = true
      },
      confirmReview() {
        this.passReview = false
        showTip.call(this, this.flag==''?'审核通过':'审核不通过')
      },
      cancelReview() {
        this.passReview = false
      }
    }
  }
</script>

<style lang="sass" scoped>

</style>