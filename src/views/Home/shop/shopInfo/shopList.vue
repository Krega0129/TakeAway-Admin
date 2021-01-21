<template>
  <div class="shopList">
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
      v-if="this.$route.meta.title === '查看信息'"
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
            dense
            class="mt-6"
            :items="campus"
            style="width: 30px"
            label="全部校区"
            v-model="campusSelectVal"
            solo
          ></v-select>

          <v-spacer></v-spacer>

          <v-btn
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
          </v-btn>

          <v-dialog v-model="banShop" max-width="500px">
            <v-card>
              <v-card-title class="headline">确定{{isBan ? '解封': '封停'}}该店铺?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="cancelBan">取消</v-btn>
                <v-btn color="blue darken-1" text @click="confirmBan">确定</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
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
          color="error"
          class="mx-2"
          @click="changeUpdate(item)"
          v-if="item.runStatus != 2">
        <v-icon
          small
          class="mr-2"
        >
          mdi-menu
        </v-icon>
        封停店铺
        </v-btn>
        <v-btn 
          small
          color="success"
          class="mx-2"
          @click="changeUpdate(item)"
          v-else>
        <v-icon
          small
          class="mr-2"
        >
          mdi-menu
        </v-icon>
        解封店铺
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
    updateAllRunStatus
  } from '../../../../network/shop';
  import { H_config } from '../../../../network/config';
  import { showTip, close } from '../../../../utils';

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
            value: 'shopStatus'
          },
          {
            text: '详情', 
            value: 'actions', 
            width: 300,
            align: 'center',
            sortable: false 
          }
        ],
        shop: [],
        search: '',
        banShop: false,
        editIndex: -1,
        multiSelect: false,
        singleSelect: false,
        selected: [],
        campus: ['全部校区'],
        campusSelectVal: '',
        campusSelectIndex: 0,
        isBan: false
      }
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
      campusSelectVal(val) {
        // this.campusSelectIndex = this.campus.indexOf(val)
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
      _getShop() {
        getShop({
          address: this.campusSelectVal == '全部校区' ? '' : this.campusSelectVal
        }).then(res => {
          if(res.code == H_config.STATECODE_get_SUCCESS) {
            this.shop = res.data
          } else if(res.code == H_config.STATECODE_getNull_FAILED) {
            this.shop = []
          }
        })
      },
      shopDetails(item) {
        this.editIndex = this.shop.indexOf(item)
        this.$store.commit('changeShopId', item.shopId)
        this.$router.push('shopList/shopInfo')
      },
      changeUpdate(item) {
        this.editIndex = this.shop.indexOf(item)
        this.isBan = item.runStatus == 2
        this.banShop = true
      },
      cancelBan() {
        this.editIndex = -1;
        this.banShop = false
      },
      async confirmBan() {
        await updateAllRunStatus({
          runStatus: this.isBan ? 1 : 2,
          shopIds: this.shop[this.editIndex].shopId
        }).then(res => {
          console.log(res);
          if(res.code == H_config.STATECODE_update_SUCCESS) {
            this.shop[this.editIndex].runStatus = this.isBan ? 1 : 2
            showTip.call(this, this.isBan ? '解封成功' : '封停成功')
          } else {
            showTip.call(this, this.isBan ? '解封失败' : '封停失败', 'error')
          }
        })
        this.editIndex = -1;
        this.banShop = false
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