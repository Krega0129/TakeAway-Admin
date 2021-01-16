<template>
  <div class="orderDetails">
    <v-data-table
      :headers="headers"
      :items="orderInfo"
      class="elevation-1"
      hide-default-footer
      no-data-text="没有数据"
      item-key="orderInfoName"
    >
      <template v-slot:top>
        <v-toolbar flat>
          
        </v-toolbar>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  export default {
    name: 'orderDetails',
    data() {
      return{
        headers: [
          {
            text: '订单信息',
            align: 'start',
            sortable: false,
            value: 'orderInfoName'
          },
          {
            text: '订单详情',
            align: 'start',
            sortable: false,
            value: 'orderInfoValue'
          }
        ],
        orderInfo: [
          {
            orderInfoName: '订单号',
            orderInfoValue: '111111111111111'
          },
          {
            orderInfoName: '商家名称',
            orderInfoValue: '广工三饭'
          },
          {
            orderInfoName: '用户名',
            orderInfoValue: '啊强'
          },
          {
            orderInfoName: '用户电话',
            orderInfoValue: '12121212121'
          }
        ]
      }
    }
  }
</script>