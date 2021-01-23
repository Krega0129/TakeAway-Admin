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
            @click="scaleImg(BASE_URL + '/' + shopHead)"
            :src="BASE_URL + '/' + shopHead"
          ></v-img>
          <v-dialog v-model="showImg" max-width="500px">
            <v-img :src="imgUrl" max-width="500px" max-height="500px"></v-img>
          </v-dialog>
          <v-spacer></v-spacer>
          <v-btn
            dark
            class="mr-5"
            @click="_shopIdGetCommodity"
          >
            店铺商品
          </v-btn>
          <v-dialog v-model="showCommodity" max-width="1000px">
            <v-card>
              <v-data-table
                :headers="commodityHeaders"
                :items="shopCommodity"
                class="elevation-1"
                no-data-text="没有数据"
                hide-default-footer
                item-key="commodityName"
              >
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-toolbar-title class="mr-16">店铺商品</v-toolbar-title>
                    <v-dialog v-model="showSpecs" max-width="500px">
                      <v-card>
                        <v-data-table
                          :headers="specsHeaders"
                          :items="specs"
                          class="elevation-1"
                          no-data-text="没有数据"
                          hide-default-footer
                          item-key="commodityName"
                        ></v-data-table>
                      </v-card>
                    </v-dialog>
                  </v-toolbar>
                </template>

                <template v-slot:[`item.commodityPhoto`]="{ item }">
                  <v-img
                    class="my-1"
                    max-width="50"
                    max-height="50"
                    @click="scaleImg(BASE_URL + '/' + item.commodityPhoto)"
                    :src="BASE_URL + '/' + item.commodityPhoto"
                  ></v-img>
                </template>
                <template v-slot:[`item.specs`]="{ item }">
                  <v-btn dark v-if="item.specs[0]" @click="_getSpecs(item.specs)">查看规格</v-btn>
                  <div v-else>无</div>
                </template>
              </v-data-table>
            </v-card>
          </v-dialog>
          <v-btn
            dark
            @click="_getShopLicense"
          >
            店铺证书
          </v-btn>
          <v-dialog v-model="showLicense" max-width="700px">
            <v-card class="d-flex justify-space-between flex-wrap pa-5">
              <div class="text-center my-2" v-for="item in license" :key="item.url">
                <div>{{item.name}}</div>
                <v-img 
                  max-width="200px" 
                  max-height="200px" 
                  :src="BASE_URL + '/' + item.url"
                  @click="scaleImg(BASE_URL + '/' + item.url)"></v-img>
              </div>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  import {
    shopIdGetShop,
    shopIdGetCommodity,
    shopIdGetShopLicense
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
        shopHead: '',
        showCommodity: false,
        commodityHeaders: [
          {
            text: '商品所属分类',
            align: 'start',
            sortable: false,
            value: 'categoryName',
          },
          {
            text: '商品名',
            align: 'start',
            sortable: false,
            value: 'commodityName',
          },
          {
            text: '图片',
            align: 'start',
            sortable: false,
            value: 'commodityPhoto',
          },
          {
            text: '详情',
            align: 'start',
            sortable: false,
            value: 'commodityDetail',
          },
          {
            text: '规格',
            align: 'start',
            sortable: false,
            value: 'specs',
          },
          {
            text: '基础价格（元）',
            align: 'start',
            sortable: false,
            value: 'commodityPrice',
          },
        ],
        shopCommodity: [],
        showSpecs: false,
        showLicense: false,
        specsHeaders: [
          {
            text: '规格名称',
            align: 'start',
            sortable: false,
            value: 'specName',
          },
          {
            text: '规格属性',
            align: 'start',
            sortable: false,
            value: 'attributeName',
          },
          {
            text: '额外价格（元）',
            align: 'start',
            sortable: false,
            value: 'attributePrice',
          }
        ],
        specs: [],
        imgUrl: '',
        showImg: false,
        license: []
      }
    },
    async mounted() {
      await shopIdGetShop({
        shopId: this.$store.state.shopId
      }).then(res => {
        if(res.code == H_config.STATECODE_get_SUCCESS) {
          let shop = res.data
          this.shopName = shop.shopName
          this.shopHead = shop.shopHead
          let keys = Object.keys(shop)
          for(let i in keys) {
            if(this.keys.indexOf(keys[i]) !== -1) {
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
    
      shopIdGetCommodity({
        shopId: this.$store.state.shopId
      }).then(res => {
        if(res.code == H_config.STATECODE_get_SUCCESS) {
          let shop = res.data
          for(let cate of shop) {
            for(let food of cate.dates) {
              food.categoryName = cate.categoryName
              this.shopCommodity.push(food)
            }
          }
        }
      })
    },
    methods: {
      _shopIdGetCommodity() {
        this.showCommodity = true
      },
      _getSpecs(allSpecs) {
        this.showSpecs = true
        for(let specs of allSpecs) {
          for(let spec of specs.attributes) {
            spec.specName = specs.specName
            this.specs.push(spec)
          }
        }
      },
      _getShopLicense() {
        shopIdGetShopLicense({
          shopId: this.$store.state.shopId
        }).then(res => {
          if(res.code === H_config.STATECODE_get_SUCCESS) {
            let license = res.data
            let keys = Object.keys(license)
            for(let i in keys) {
              let img = {}
              switch(keys[i]) {
                case 'busLicense': img.name = '营业执照'; break;
                case 'cardBack': img.name = '手持身份证背面'; break;
                case 'cardFront': img.name = '手持身份证正面'; break;
                case 'restLicense': img.name = '餐饮许可证'; break;
                case 'shopIn': img.name = '店铺内部照'; break;
                case 'shopOut': img.name = '店铺外部照'; break;
              }
              img.url = license[keys[i]]
              this.license.push(img)
            }
          }
        })
        this.showLicense = true
      },
      scaleImg(url) {
        this.imgUrl = url
        this.showImg = true
      }
    }
  }
</script>

<style lang="sass" scoped>

</style>
