<template>
  <div class="newShop">

    <component
      :is="tip"
      :alertText="alertText"
      :alertType="alertType"
      :showTip="show"
    ></component>

    <v-data-table
      :headers="header"
      :items="shops"
      class="elevation-1"
      :search="search"
      no-data-text="没有数据"
      :custom-filter="filterOnlyCapsText"
      :show-select="multiSelect"
      item-key="shopName"
      :items-per-page="5"
      :single-select="singleSelect"
      v-model="selected"
      v-if="this.$route.meta.title === '新店申请'"
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
            :items="selectItem"
            style="width: 30px"
            label="请选择校区"
            solo
          ></v-select>

          <v-spacer></v-spacer>

          <v-btn
            dark
            class="ma-2"
            @click="multiSelect = !multiSelect"
          >
            批量选择
          </v-btn>
          <v-btn
            :color="multiSelect ? 'success' : ''"
            class="ma-2"
            :disabled="!multiSelect ||　multiSelect && !selected[0]"
            @click="reviewMultiPass"
          >
            批量通过
          </v-btn>
          <v-btn
            :color="multiSelect ? 'error' : ''"
            class="ma-2"
            :disabled="!multiSelect ||　multiSelect && !selected[0]"
            @click="reviewMultiOut"
          >
            批量淘汰
          </v-btn>

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
      
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn 
          small
          dark
          class="mx-2"
          @click="editItem(item)">
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
            color="success"
            class="mx-2"
            @click="review(item)">
          <v-icon
            small
            class="mr-2"
          >
            mdi-check
          </v-icon>
          审核通过
        </v-btn>
      </template>
    </v-data-table>
    <router-view v-else></router-view>
  </div>
</template>

<script>
  import {
    reviewNewShop,
    getShop,
    
  } from '../../../../network/shop'
  import tip from '../../../../components/tip';
  import { showTip } from '../../../../utils';

  export default {
    name: 'newShop',
    data() {
      return {
        selected: [],
        singleSelect: false,
        multiSelect: false,
        search: '',
        selectItem: [ '广工', '广大' ],
        passReview: false,
        header: [
          {
            text: '店铺名称',
            align: 'start',
            sortable: false,
            value: 'shopName',
          },
          { 
            text: '审核', 
            value: 'actions', 
            width: 300,
            align: 'center',
            sortable: false 
          },
        ],
        shops: [],
        editedIndex: -1,
        alertText: '',
        alertType: 'success',
        show: false
      }
    },
    components: {
      tip,
    },
    mounted() {
      this.initialize()
    },
    watch: {
      selected (val) {
        console.log(val);
      }
    },
    computed: {
      tip() {
        return 'tip'
      }
    },
    methods: {
      // 搜索过滤条件
      filterOnlyCapsText (value, search, item) {
        return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().indexOf(search) !== -1
      },
      initialize () {
        this.shops = [
          {
            shopName: '15',
          },
          {
            shopName: '14',
          },
          {
            shopName: '13',
          },
          {
            shopName: '12',
          },
          {
            shopName: '11',
          },
          {
            shopName: '10',
          },
          {
            shopName: '9',
          },
          {
            shopName: '8',
          },
          {
            shopName: '7',
          },
          {
            shopName: '6',
          },
          {
            shopName: '5',
          },
          {
            shopName: '4',
          },
          {
            shopName: '3',
          },
          {
            shopName: '2',
          },
          {
            shopName: '1',
          }
        ]
      },
      // 详情
      editItem (item) {
        this.$router.push('newShop/newShopInfo')
      },
      // 审核
      review (item) {
        this.editedIndex = this.shops.indexOf(item)
        this.passReview = true
      },
      // 确定
      confirmReview () {
        this.shops.splice(this.editedIndex, 1)
        this.passReview = false
        reviewNewShop({
          auditStatus: 1,
          
        })
        showTip.call(this, '审核已通过')
      },
      // 取消
      cancelReview () {
        this.passReview = false
        showTip.call(this, '审核已取消')
      },
      // 多选通过
      reviewMultiPass() {
        console.log('批量通过');
      },
      reviewMultiOut() {
        console.log('批量淘汰');
      }
    }
  }
</script>