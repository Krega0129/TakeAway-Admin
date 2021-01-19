<template>
  <div>

    <component
      :is="tip"
      :alertText="alertText"
      :alertType="alertType"
      :showTip="show"
    ></component>

    <v-data-table
      :headers="headers"
      :items="details"
      class="elevation-1"
      no-data-text="没有数据"
      item-key="shopName"
      hide-default-footer
    >
      <template v-slot:top>
        <v-toolbar flat>
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
        </v-toolbar>
      </template>
    </v-data-table>
    <div class="text-center mt-4">
      <v-btn
        large
        color="error"
        class="mx-2"
        @click="cancelReview"
      >
        审核不通过
      </v-btn>
      <v-btn
        large
        color="success"
        class="mx-2"
        @click="confirmReview"
      >
        审核通过
      </v-btn>
    </div>
  </div>
</template>

<script>
  import { 
    reviewShopRenewInfo,
    auditShopUpdate
  } from '../../../../network/shop'

  import tip from '../../../../components/tip'
  import { showTip, close } from '../../../../utils';

  export default {
    name: 'shopRenewDetails',
    data() {
      return {
        passReview: false,
        headers: [
          {
            text: '信息名',
            align: 'start',
            sortable: false,
            value: 'InfoName',
          },
          {
            text: '原信息',
            align: 'start',
            sortable: false,
            value: 'oldDetails',
          },
          { 
            text: '新信息', 
            value: 'newDetails', 
            align: 'start',
            sortable: false 
          }
        ],
        details: [],
        // 可修改的值
        keys: ['campusAddress', 'contactPhone', 'detailAddress', 'shopCategory', 'shopHead', 'shopIntroduce', 'shopName'],
        updateId: null,
        alertText: '',
        alertType: 'success',
        show: false
      }
    },
    components: {
      tip,
    },
    computed: {
      tip() {
        return 'tip'
      },
    },
    mounted() {
      let oldInfo = this.$store.state.shopOldInfo
      let newInfo = this.$store.state.shopNewInfo
      let oldKeys = Object.keys(this.$store.state.shopOldInfo)
      let newKeys = Object.keys(this.$store.state.shopNewInfo)
      this.updateId = newInfo.updateId
      for(let i in oldKeys) {
        if(oldInfo[oldKeys[i]] !== newInfo[newKeys[i]] && this.keys.indexOf(oldKeys[i]) != -1) {
          let diffInfo = {}
          switch(oldKeys[i]) {
            case 'campusAddress': diffInfo.InfoName = '校区'; break;
            case 'contactPhone': diffInfo.InfoName = '联系电话'; break;
            case 'detailAddress': diffInfo.InfoName = '详细地址'; break;
            case 'shopCategory': diffInfo.InfoName = '店铺分类'; break;
            case 'shopHead': diffInfo.InfoName = '店铺头像'; break;
            case 'shopIntroduce': diffInfo.InfoName = '商铺简介'; break;
            case 'shopName': diffInfo.InfoName = '商铺名称'; break;
          }
          diffInfo.oldDetails = oldInfo[oldKeys[i]]
          diffInfo.newDetails = newInfo[newKeys[i]]
          this.details.push(diffInfo)
        }
      }
    },
    methods: {
      confirmReview() {
        auditShopUpdate({
          auditStatus: 1,
          ids: this.updateId
        }).then(res => {
          showTip.call(this, '审核已通过')
          setTimeout(() => {
            this.$router.go(-1)
          }, 1000)
        })
      },
      cancelReview() {
        auditShopUpdate({
          auditStatus: 2,
          ids: this.updateId
        }).then(res => {
          showTip.call(this, '审核不通过', 'error')
          setTimeout(() => {
            this.$router.go(-1)
          }, 1000)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>