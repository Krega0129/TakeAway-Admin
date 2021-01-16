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

          <v-dialog v-model="deleteShop" max-width="500px">
            <v-card>
              <v-card-title class="headline">确定通过审核?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="cancelDelete">取消</v-btn>
                <v-btn color="blue darken-1" text @click="confirmDelete">确定</v-btn>
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
      </template>
    </v-data-table>
    <router-view v-else></router-view>
  </div>
</template>

<script>
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
            width: 200,
            align: 'center',
            sortable: false 
          }
        ],
        shop: [
          {
            shopName: '广工三饭',
            shopStatus: '营业中'
          },
          {
            shopName: '广工四饭',
            shopStatus: '休息中'
          }
        ],
        search: '',
        deleteShop: false,
        editIndex: -1,
        multiSelect: false,
        singleSelect: false,
        selected: [],
        selectItem: ['广工', '广大']
      }
    },
    methods: {
      filterOnlyCapsText(value, search, item) {
        return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().indexOf(search) !== -1;
      },
      shopDetails(item) {
        this.editIndex = this.shop.indexOf(item)
        this.$router.push('shopList/shopInfo')
      },
      deShop(item) {
        this.editIndex = this.shop.indexOf(item)
        this.deleteShop = true
      },
      cancelDelete() {
        this.editIndex = -1;
        this.deleteShop = false
      },
      confirmDelete() {
        this.campus.slice(this.editIndex, 1)
        this.editIndex = -1;
        this.deleteShop = false
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