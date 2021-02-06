<template>
  <div class="newShopInfo">
    <toast ref="toast"></toast>
    <img-dialog ref="img"></img-dialog>
    <v-data-table
      :headers="headers"
      :items="shopInfo"
      class="elevation-1"
      hide-default-footer
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

      <template v-slot:[`item.infoValue`]="{ item }">
        <v-img
          v-if="item.InfoName == '店铺头像'"
          class="my-1"
          max-width="100"
          max-height="100"
          @click="$refs.img.scaleImg(BASE_URL + '/' + item.infoValue)"
          :src="BASE_URL + '/' + item.infoValue"
        ></v-img>
        <div v-else>{{item.infoValue}}</div>
      </template>

    </v-data-table>
    <div class="text-center mt-4" v-if="$store.state.shopReviewStatus == 0">
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
    <div class="text-center mt-4 green--text" v-if="$store.state.shopReviewStatus == 1">
      审核已通过
    </div>
    <div class="text-center mt-4 red--text" v-if="$store.state.shopReviewStatus == 2">
      审核未通过
    </div>
  </div>
</template>

<script>
  import toast from '../../../../components/toast';
  import imgDialog from '../../../../components/imgDialog';
  import { BASE_URL, H_config } from '../../../../network/config';
  import { reviewNewShop } from '../../../../network/shop'

  export default {
    name: 'newShopInfo',
    data() {
      return {
        passReview: false,
        headers: [
          {
            text: '店铺属性',
            align: 'start',
            sortable: false,
            value: 'InfoName',
          },
          {
            text: '属性内容',
            align: 'start',
            sortable: false,
            value: 'infoValue',
          },
        ],
        shopInfo: [],
        flag: '',
        BASE_URL: BASE_URL,
        keys: ['campusAddress', 'contactPhone', 'detailAddress', 'shopCategory', 'shopHead', 'shopIntroduce', 'shopName'],
      }
    },
    components: {
      toast,
      imgDialog
    },
    mounted() {
      let shop = this.$store.state.currentShop
      let keys = Object.keys(shop)
      for(let i in keys) {
        if(this.keys.indexOf(keys[i]) != -1) {
          let shopInfo = {}
          switch(keys[i]) {
            case 'campusAddress': shopInfo.InfoName = '校区'; break;
            case 'contactPhone': shopInfo.InfoName = '联系电话'; break;
            case 'detailAddress': shopInfo.InfoName = '详细地址'; break;
            case 'shopCategory': shopInfo.InfoName = '店铺分类'; break;
            case 'shopHead': shopInfo.InfoName = '店铺头像'; break;
            case 'shopIntroduce': shopInfo.InfoName = '商铺简介'; break;
            case 'shopName': shopInfo.InfoName = '商铺名称'; break;
          }
          shopInfo.infoValue = shop[keys[i]]
          this.shopInfo.push(shopInfo)
        }
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
        let flag = this.flag == '' ? 1 : 2;
        reviewNewShop({
          auditStatus: flag,
          shopIds: this.$store.state.currentShop.shopId
        }).then(res => {
          if(res.code == H_config.STATECODE_update_SUCCESS) {
            this.$refs.toast.setAlert(this.flag==''?'审核通过':'审核不通过')
            setTimeout(() => {
              this.$router.go(-1)
            }, 1000);
          } else {
            this.$refs.toast.setAlert('网络异常', 'error')
          }
        })
      },
      cancelReview() {
        this.passReview = false
      }
    }
  }
</script>

<style lang="sass" scoped>

</style>