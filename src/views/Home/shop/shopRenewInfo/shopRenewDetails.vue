<template>
  <div class="shopRenewDetails">
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
              <v-card-title class="headline">确定{{status === 1 ? '' : '不'}}通过审核?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDialog">取消</v-btn>
                <v-btn color="blue darken-1" text @click="confirmReview">确定</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:[`item.oldDetails`]="{ item }">
        <v-img
          v-if="item.InfoName == '店铺头像'"
          class="my-1"
          max-width="100"
          max-height="100"
          :src="BASE_URL + '/' + item.oldDetails"
        ></v-img>
        <div v-else>{{item.oldDetails}}</div>
      </template>

      <template v-slot:[`item.newDetails`]="{ item }">
        <v-img
          v-if="item.InfoName == '店铺头像'"
          class="my-1"
          max-width="100"
          max-height="100"
          :src="BASE_URL + '/' + item.newDetails"
        ></v-img>
        <div v-else>{{item.newDetails}}</div>
      </template>

    </v-data-table>
    <div class="text-center mt-4" v-if="$store.state.shopReviewStatus == 0">
      <v-btn
        large
        color="error"
        class="mx-2"
        @click="openDialog(2)"
      >
        审核不通过
      </v-btn>
      <v-btn
        large
        color="success"
        class="mx-2"
        @click="openDialog(1)"
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
  import { 
    auditShopUpdate
  } from '../../../../network/shop'
  import { BASE_URL, H_config } from '../../../../network/config';

  import tip from '../../../../components/tip'
  import { showTip, close } from '../../../../utils';

  export default {
    name: 'shopRenewDetails',
    data() {
      return {
        BASE_URL: BASE_URL,
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
        status: null,
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
            case 'shopHead': diffInfo.InfoName = '店铺头像';
                  if(!newInfo[newKeys[i]]) continue
                  break;
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
      openDialog(status) {
        this.status = status
        this.passReview = true
      },
      closeDialog() {
        this.status = null
        this.passReview = false
      },
      confirmReview() {
        auditShopUpdate({
          auditStatus: this.status,
          ids: this.updateId
        }).then(res => {
          if(res.code === H_config.STATECODE_review_SUCCESS) {
            showTip.call(this, '修改成功')
            close.call(this)
          } else {
            showTip.call(this, '网络异常', 'error')
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>