<template>
  <div class="searchOrder">
    <v-data-table
      :headers="headers"
      :items="orders"
      class="elevation-1"
      :search="search"
      no-data-text="没有数据"
      :custom-filter="filterOnlyCapsText"
      item-key="shopName"
      :items-per-page="5"
      v-if="this.$route.meta.title === '订单查询'"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="搜索订单"
            class="mt-6"
          ></v-text-field>
        </v-toolbar>
      </template>
      
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn 
          small
          dark
          class="mx-2"
          @click="checkOrderDetails(item)">
        <v-icon
          small
          class="mr-2"
        >
          mdi-menu
        </v-icon>
        订单详情
        </v-btn>
      </template>
    </v-data-table>
    <router-view v-else></router-view>
  </div>
</template>

<script>
  export default {
    name: 'searchOrder',
    data() {
      return {
        headers: [
          {
            text: '用户',
            align: 'center',
            sortable: false,
            value: 'user',
          },
          {
            text: '订单编号',
            align: 'center',
            sortable: false,
            value: 'orderNum'
          },
          {
            text: '下单时间',
            align: 'center',
            sortable: false,
            value: 'orderTime'
          },
          {
            text: '查看详情',
            align: 'center',
            sortable: false,
            width: 200,
            value: 'actions'
          }
        ],
        orders: [
          {
            user: '啊强',
            orderNum: '111111111111111111',
            orderTime: '2021-01-16 09:30'
          }
        ],
        search: '',
        orderIndex: -1
      }
    },
    methods: {
      filterOnlyCapsText(value, search, item) {
        return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().indexOf(search) !== -1;
      },
      checkOrderDetails(item) {
        this.orderIndex = this.orders.indexOf(item)
        this.$router.push('searchOrder/orderDetails')
      }
    }
  }
</script>

<style lang="scss" scoped>
  
</style>