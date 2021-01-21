<template>
  <div class="checkShop">
    <v-data-table
      :headers="headers"
      :items="shopInfo"
      class="elevation-1"
      no-data-text="没有数据"
      hide-default-footer
      hide-default-header
      item-key="infoName"
    >
      <template v-slot:top>
        <v-toolbar style="height: 20vh" flat>
          <v-toolbar-title class="mr-16">{{shopName}}</v-toolbar-title>
          <v-img
            class="mt-16"
            max-width="100"
            max-height="100"
            :src="BASE_URL + '/' + shopHead"
          ></v-img>
        </v-toolbar>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  import {
    shopIdGetShop
  } from '../../../../network/shop';
  import { BASE_URL, H_config } from '../../../../network/config';

  export default {
    name: 'checkShop',
    data() {
      return {
        BASE_URL: BASE_URL,
        headers: [
          {
            text: '信息名称',
            align: 'start',
            sortable: false,
            value: 'InfoName',
          },
          {
            text: '信息值',
            align: 'start',
            sortable: false,
            value: 'infoValue',
          }
        ],
        shopInfo: [],
        keys: ['campusAddress', 'runStatus', 'contactPhone', 'detailAddress', 'shopCategory',  'shopIntroduce', 'topChecked'],
        shopName: '商家名字',
        shopHead: ''
      }
    },
    mounted() {
      shopIdGetShop({
        shopId: this.$store.state.shopId
      }).then(res => {
        if(res.code == H_config.STATECODE_get_SUCCESS) {
          let shop = res.data
          this.shopName = shop.shopName
          this.shopHead = shop.shopHead
          let keys = Object.keys(shop)
          for(let i in keys) {
            if(this.keys.indexOf(keys[i]) != -1) {
              let shopInfo = {}
              switch(keys[i]) {
                case 'campusAddress': shopInfo.InfoName = '校区'; break;
                case 'runStatus': shopInfo.InfoName = '营业状态'; break;
                case 'contactPhone': shopInfo.InfoName = '联系电话'; break;
                case 'detailAddress': shopInfo.InfoName = '详细地址'; break;
                case 'shopCategory': shopInfo.InfoName = '店铺分类'; break;
                case 'shopIntroduce': shopInfo.InfoName = '商铺简介'; break;
                case 'topChecked': shopInfo.InfoName = '置顶状态'; break;
              }

              if(shopInfo.InfoName == '校区') {
                shopInfo.infoValue = shop[keys[i]].join('，')
              } else if(shopInfo.InfoName == '营业状态') {
                shopInfo.infoValue = shop[keys[i]] == 0 ? '营业中' : shop[keys[i]] == 1 ? '已打烊' : '停业中'
              } else if(shopInfo.InfoName == '置顶状态') {
                shopInfo.infoValue = shop[keys[i]] == 0 ? '未置顶' : '已置顶'
              } else {
                shopInfo.infoValue = shop[keys[i]]
              }
              this.shopInfo.push(shopInfo)
            }
          }
        }
      })
    },
    methods: {

    }
  }
</script>

<style lang="sass" scoped>

</style>
