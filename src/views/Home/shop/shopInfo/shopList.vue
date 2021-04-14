<template>
  <div class="shopList">

    <toast ref="toast"></toast>

    <v-data-table
      :headers="headers"
      :items="shop"
      class="elevation-1"
      :search="search"
      no-data-text="没有数据"
      :custom-filter="filterOnlyCapsText"
      :show-select="multiSelect"
      item-key="shopName"
      :items-per-page="5"
      :single-select="singleSelect"
      v-model="selected"
      :loading="loading"
      loading-text="加载中...请稍后"
      v-if="this.$route.meta.title === '店铺列表'"
    >
      <template v-slot:top>
        <v-toolbar flat>
          
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="搜索"
            class="mt-6"
          ></v-text-field>
          
          <v-spacer></v-spacer>

          <v-select
            v-if="$store.state.topManager"
            dense
            class="mt-6"
            :items="campus"
            style="width: 30px"
            label="全部校区"
            v-model="campusSelectVal"
            solo
          ></v-select>

          <v-spacer></v-spacer>

          <!-- <v-btn
            dark
            class="ma-2"
            @click="multiSelect = !multiSelect"
          >
            批量管理
          </v-btn>
          <v-btn
            :color="multiSelect ? 'error' : ''"
            class="ma-2"
            :disabled="!multiSelect ||　multiSelect && !selected[0]"
            @click="closeShop"
          >
            封停店铺
          </v-btn>
          <v-btn
            :color="multiSelect ? 'success' : ''"
            class="ma-2"
            :disabled="!multiSelect ||　multiSelect && !selected[0]"
            @click="openShop"
          >
            解封店铺
          </v-btn> -->

          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title class="headline">确定{{titleText}}该店铺?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDialog">取消</v-btn>
                <v-btn color="blue darken-1" text @click="btnStatus(titleText)">确定</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:[`item.runStatus`]="{ item }">
        {{item.runStatus == 0 ? '营业中' : item.runStatus == 1 ? '已打烊' : '停业中'}}
      </template>
      
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn 
          small
          dark
          class="mx-2"
          @click="shopDetails(item)">
        <v-icon
          small
          class="mr-2"
        >
          mdi-menu
        </v-icon>
        详情
        </v-btn>

        <v-btn 
          small
          :color="item.topChecked ? 'orange' : 'blue'"
          class="mx-2"
          @click="changeUpdate(item, 0)">
        <v-icon
          small
          class="mr-2"
        >
          mdi-{{item.topChecked ? 'close' : 'arrow-up'}}
        </v-icon>
          {{item.topChecked ? '取消置顶' : '置顶店铺'}}
        </v-btn>

        
        <v-btn 
          small
          :color="item.runStatus == 2 ? 'success' : 'error'"
          class="mx-2"
          @click="changeUpdate(item, 1)">
        <v-icon
          small
          class="mr-2"
        >
          mdi-{{item.runStatus == 2 ? 'check' : 'block-helper'}}
        </v-icon>
        {{item.runStatus == 2 ? '解封店铺' : '封停店铺'}}
        </v-btn>
      </template>
    </v-data-table>
    <router-view v-else></router-view>
  </div>
</template>

<script>
  import {
    getAllCampus
  } from '../../../../network/work';
  import {
    getShop,
    updateAllRunStatus,
    updateTopStatus
  } from '../../../../network/shop';
  import { H_config } from '../../../../network/config';
  import toast from '../../../../components/toast'

  export default {
    name: 'shopList',
    data() {
      return {
        headers: [
          {
            text: '商铺名',
            align: 'start',
            sortable: false,
            value: 'shopName'
          },
          {
            text: '状态',
            align: 'start',
            sortable: false,
            value: 'runStatus'
          },
          {
            text: '详情', 
            value: 'actions', 
            width: 400,
            align: 'center',
            sortable: false 
          }
        ],
        shop: [],
        search: '',
        dialog: false,
        title: ['置顶', '取消置顶','封停', '解封'],
        titleText: '',
        editIndex: -1,
        multiSelect: false,
        singleSelect: false,
        selected: [],
        campus: ['全部校区'],
        campusSelectVal: '',
        loading: true
      }
    },
    components: {
      toast
    },
    mounted() {
      getAllCampus().then(res => {
        if(res.code == H_config.STATECODE_campus_SUCCESS) {
          for(let school of res.data) {
            this.campus.push(school.campusName)
          }
        }
      })
      this._getShop()
    },
    watch: {
      campusSelectVal() {
        this.loading = true
        this._getShop()
      }
    },
    methods: {
      filterOnlyCapsText(value, search, item) {
        return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().indexOf(search) !== -1;
      },
      btnStatus(titleText) {
        this.title.indexOf(titleText) < 2 ? this.changeTopStatus() : this.updateBanStatus()
      },
      _getShop() {
        getShop({
          address: localStorage.getItem('campusAddress') === '管理员' ? this.selectCampusVal =='全部校区' ? '' : this.selectCampusVal : localStorage.getItem('campusAddress')
        }).then(res => {
          if(res.code == H_config.STATECODE_get_SUCCESS) {
            this.shop = res.data
          } else if(res.code == H_config.STATECODE_getNull_FAILED) {
            this.shop = []
          } else {
            this.$refs.toast.setAlert('网络异常', 'error')
          }
          this.loading = false 
        })
      },
      shopDetails(item) {
        this.editIndex = this.shop.indexOf(item)
        this.$store.commit('changeShopId', item.shopId)
        this.$router.push('shopList/shopInfo')
      },
      changeUpdate(item, index) {
        this.editIndex = this.shop.indexOf(item)
        this.titleText = index == 0 ? this.title[item.topChecked] : item.runStatus == 2 
                                    ? this.title[3] : this.title[2]
        this.dialog = true
      },
      closeDialog() {
        this.editIndex = -1;
        this.dialog = false
      },
      async updateBanStatus() {
        await updateAllRunStatus({
          runStatus: this.shop[this.editIndex].runStatus == 2 ? 1 : 2,
          shopIds: this.shop[this.editIndex].shopId
        }).then(res => {
          if(res.code == H_config.STATECODE_update_SUCCESS) {
            this.shop[this.editIndex].runStatus = this.shop[this.editIndex].runStatus == 2 ? 1 : 2
            this.$refs.toast.setAlert('修改成功')
          } else {
            this.$refs.toast.setAlert('修改失败', 'error')
          }
        })
        this.editIndex = -1;
        this.closeDialog()
      },
      async changeTopStatus() {
        await updateTopStatus({
          shopIds: this.shop[this.editIndex].shopId,
          topStatus: Number(this.shop[this.editIndex].topChecked == 0)
        }).then(res => {
          if(res.code == H_config.STATECODE_update_SUCCESS) {
            this.shop[this.editIndex].topChecked = Number(!this.shop[this.editIndex].topChecked)
            this.$refs.toast.setAlert('修改成功')
          } else {
            this.$refs.toast.setAlert('修改失败', 'error')
          }
        })
        this.closeDialog()
      },
      closeShop() {
        console.log('批量关店');
      },
      openShop() {
        console.log('批量关店');
      }
    }
  }
</script>