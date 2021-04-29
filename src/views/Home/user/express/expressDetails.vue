<template>
  <v-data-table
    :headers="headers"
    :items="orderInfo"
    class="elevation-1"
    hide-default-footer
    no-data-text="没有数据"
    item-key="orderInfoName"
    disable-pagination
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title class="mr-16">订单详情</v-toolbar-title>
      </v-toolbar>
    </template>

    <template v-slot:[`item.orderInfoValue`]="{ item }">
      <div
        v-if="item.orderInfoName === '订单状态'"
      >{{status[item.orderInfoValue]}}</div>
      <div v-else>{{item.orderInfoValue ? item.orderInfoValue : '无'}}</div>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'expressDetails',
  data() {
    return {
      headers: [
        {
          text: '订单信息',
          align: 'start',
          width: 200,
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
      orderInfo: [],
      keys: [
        'addresseeName', 'addresseePhone', 'campus', 'distributionFee', 'expressContent',
        'expressType', 'orderNumber', 'orderTime', 'pickUpAddress', 'pickUpCode', 'riderPrifit',
        'pickUpType', 'riderName', 'riderPhone', 'serviceAddress', 'specifications', 'status'
      ],
      status: ['待接单', '待送达', '已完成', '已退款', '已取消']
    }
  },
  mounted() {
    const express = this.$store.state.expressDetails
    const keys = Object.keys(express)
    for(let i in keys) {
      if(this.keys.indexOf(keys[i]) !== -1) {
        const orderInfo = {}
        switch(keys[i]) {
          case 'addresseeName': orderInfo.orderInfoName = '用户姓名'; break;
          case 'addresseePhone': orderInfo.orderInfoName = '用户电话'; break;
          case 'campus': orderInfo.orderInfoName = '校区'; break;
          case 'distributionFee': orderInfo.orderInfoName = '配送费'; break;
          case 'expressContent': orderInfo.orderInfoName = '快递物品'; break;
          case 'expressType': orderInfo.orderInfoName = '快递公司'; break;
          case 'orderNumber': orderInfo.orderInfoName = '订单编号'; break;
          case 'orderTime': orderInfo.orderInfoName = '下单时间'; break;
          case 'pickUpAddress': orderInfo.orderInfoName = '取件地址'; break;
          case 'pickUpCode': orderInfo.orderInfoName = '取件码'; break;
          case 'riderPrifit': orderInfo.orderInfoName = '骑手利润'; break;
          case 'pickUpType': orderInfo.orderInfoName = '取件类型'; break;
          case 'reservedTime': orderInfo.orderInfoName = '预定时间'; break;
          case 'riderName': orderInfo.orderInfoName = '骑手姓名'; break;
          case 'riderPhone': orderInfo.orderInfoName = '骑手电话'; break;
          case 'serviceAddress': orderInfo.orderInfoName = '收件地址'; break;
          case 'specifications': orderInfo.orderInfoName = '快递规格'; break;
          case 'status': orderInfo.orderInfoName = '订单状态'; break;
        }
        orderInfo.orderInfoValue = express[keys[i]]
        this.orderInfo.push(orderInfo)
      }
    }
  }
}
</script>