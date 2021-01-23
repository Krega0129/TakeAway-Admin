<template>
  <div class="orderDetails">
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
          <v-dialog v-model="showImg" max-width="500px">
            <v-img :src="imgUrl" max-width="500px" max-height="500px"></v-img>
          </v-dialog>
          <v-dialog v-model="showCommodity" max-width="1000px">
            <v-card>
              <v-data-table
                :headers="commodityHeaders"
                :items="foodCommodity"
                class="elevation-1"
                no-data-text="没有数据"
                hide-default-footer
                item-key="goodsName + foodCommodity"
              >
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-toolbar-title class="mr-16">购买商品</v-toolbar-title>
                  </v-toolbar>
                </template>

                <template v-slot:[`item.picture`]="{ item }">
                  <v-img
                    class="my-1"
                    max-width="50"
                    max-height="50"
                    :src="item.picture"
                    @click="scaleImg(item.picture)"
                  ></v-img>
                </template>
              </v-data-table>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:[`item.orderInfoValue`]="{ item }">
        <v-img
          v-if="item.orderInfoName == '店铺图片'"
          class="my-1"
          max-width="100"
          max-height="100"
          :src="item.orderInfoValue"
          @click="scaleImg(item.orderInfoValue)"
        ></v-img>
        <v-btn
          dark
          dense
          v-else-if="item.orderInfoName == '购买商品'"
          @click="openDialog(item.orderInfoValue)"
        >查看详情</v-btn>
        <div v-else>{{item.orderInfoValue ? item.orderInfoValue : '无'}}</div>
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
        keys: ['businessPhone', 'commodities', 'completeTime', 'deliveryAddress', 'deliveryFee', 
               'deliveryTime', 'isReserved', 'orderNumber', 'paymentTime', 'receiveTime', 'remarks', 
               'reservedTime', 'riderName', 'riderPhone', 'shopAddress', 'shopName', 'shopPicture',
               'totalAmount','totalQuantity', 'userName', 'userPhone' ],
        showCommodity: false,
        commodityHeaders: [
          {
            text: '商品名称',
            align: 'start',
            sortable: false,
            value: 'goodsName'
          },
          {
            text: '商品图片',
            align: 'start',
            sortable: false,
            value: 'picture'
          },
          {
            text: '数量',
            align: 'start',
            sortable: false,
            value: 'quantity'
          },
          {
            text: '规格',
            align: 'start',
            sortable: false,
            value: 'specification'
          },
          {
            text: '单价',
            align: 'start',
            sortable: false,
            value: 'unitPrice'
          },
          {
            text: '总价格',
            align: 'start',
            sortable: false,
            value: 'totalPrice'
          }
        ],
        foodCommodity: [],
        imgUrl: '',
        showImg: false
      }
    },
    mounted() {
      const order = this.$store.state.order
      const keys = Object.keys(order)
      for(let i in keys) {
        if(this.keys.indexOf(keys[i]) !== -1) {
          const orderInfo = {}
          switch(keys[i]) {
            case 'businessPhone': orderInfo.orderInfoName = '商家电话'; break;
            case 'commodities': orderInfo.orderInfoName = '购买商品'; break;
            case 'completeTime': orderInfo.orderInfoName = '订单完成时间'; break;
            case 'deliveryAddress': orderInfo.orderInfoName = '配送地址'; break;
            case 'deliveryFee': orderInfo.orderInfoName = '配送费'; break;
            case 'deliveryTime': orderInfo.orderInfoName = '配送时间'; break;
            case 'isReserved': orderInfo.orderInfoName = '是否预定'; break;
            case 'orderNumber': orderInfo.orderInfoName = '订单编号'; break;
            case 'paymentTime': orderInfo.orderInfoName = '支付时间'; break;
            case 'receiveTime': orderInfo.orderInfoName = '收货时间'; break;
            case 'remarks': orderInfo.orderInfoName = '备注'; break;
            case 'reservedTime': orderInfo.orderInfoName = '预定时间'; break;
            case 'riderName': orderInfo.orderInfoName = '骑手姓名'; break;
            case 'riderPhone': orderInfo.orderInfoName = '骑手电话'; break;
            case 'shopAddress': orderInfo.orderInfoName = '店铺地址'; break;
            case 'shopName': orderInfo.orderInfoName = '店铺名称'; break;
            case 'shopPicture': orderInfo.orderInfoName = '店铺图片'; break;
            case 'totalAmount': orderInfo.orderInfoName = '总价格'; break;
            case 'totalQuantity': orderInfo.orderInfoName = '总数量'; break;
            case 'userName': orderInfo.orderInfoName = '用户名'; break;
            case 'userPhone': orderInfo.orderInfoName = '用户电话'; break;
          }
          orderInfo.orderInfoValue = order[keys[i]]
          this.orderInfo.push(orderInfo)
        }
      }
      const orderStatus = { orderInfoName: '订单状态' }
      let tip = ''
      switch(order.orderStatus) {
        case 0: tip = '待付款'; break;
        case 1: tip = '已付款'; break;
        case 2: tip = '已退款'; break;
        case 3: tip = '已取消'; break;
      }
      if(order.orderStatus === 1) {
        switch(order.deliveryStatus) {
          case 0: ;
          case 1: tip += '，等待商家接单'; break;
          case 2: tip += '，待发货'; break;
          case 3: tip += '，已发货，等待骑手接单'; break;
          case 4: tip += '，待取货'; break;
          case 5: tip += '，待送达'; break;
          case 6: tip += '，订单已完成'; break;
        }
      }
      orderStatus.orderInfoValue = tip;
      this.orderInfo.push(orderStatus)
    },
    methods: {
      openDialog(item) {
        this.foodCommodity = []
        for(let food of item) {
          this.foodCommodity.push(food)
        }
        this.showCommodity = true
      },
      scaleImg(url) {
        this.imgUrl = url
        this.showImg = true
      }
    }
  }
</script>