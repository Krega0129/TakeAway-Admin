<template>
  <div class="campusDetails">
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

          <v-btn
            dark
            class="ma-2"
            @click="multiSelect = !multiSelect"
          >
            批量选择
          </v-btn>
          <v-btn
            :color="multiSelect ? 'error' : ''"
            class="ma-2"
            :disabled="!multiSelect || multiSelect && !selected[0]"
            @click="deleteMulti"
          >
            批量封停
          </v-btn>

          <v-dialog v-model="deleteShop" max-width="500px">
            <v-card>
              <v-card-title class="headline">确定封停该商家?</v-card-title>
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
        商铺详情
        </v-btn>
        <v-btn 
            small
            dark
            class="mx-2"
            @click="deShop(item)">
          <v-icon
            small
            class="mr-2"
          >
            mdi-block-helper
          </v-icon>
          封停商铺
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  export default {
    name: 'campusDetails',
    data() {
      return {
        headers: [
          {
            text: '店铺名',
            align: 'start',
            sortable: false,
            value: 'shopName'
          },
          {
            text: '详情',
            align: 'center',
            sortable: false,
            value: 'actions',
            width: 300
          }
        ],
        shop: [
          {
            shopName: '广工三饭'
          },
          {
            shopName: '广工四饭'
          }
        ],
        search: '',
        deleteShop: false,
        editIndex: -1,
        multiSelect: false,
        singleSelect: false,
        selected: []
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
        this.$router.push('/admin/shopList/shopInfo')
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
      deleteMulti() {
        console.log('批量删除');
      }
    }
  }
</script>