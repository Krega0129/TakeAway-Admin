<template>
  <div class="searchOrder">

    <component
      :is="tip"
      :alertText="alertText"
      :alertType="alertType"
      :showTip="show"
    ></component>

    <v-data-table
      :headers="headers"
      :items="orders"
      class="elevation-1"
      no-data-text="没有数据"
      hide-default-footer
      item-key="shopName"
      v-if="this.$route.meta.title === '订单查询'"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-form
            v-model="disable"
            class="d-flex"
          >
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              :rules="rule"
              label="输入订单编号"
              class="mt-6"
            ></v-text-field>
            <v-btn
              color="primary"
              class="ml-5 mt-6"
              @click="_getOrderByOrderNum"
              :disabled="!disable"
            >
              搜索
            </v-btn>
          </v-form>
          <v-spacer></v-spacer>
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
  import { H_config } from '../../../network/config';
  import {
    getOrderByOrderNum
  } from '../../../network/work';
  import tip from '../../../components/tip';
  import { showTip } from '../../../utils';

  export default {
    name: 'searchOrder',
    data() {
      return {
        headers: [
          {
            text: '用户',
            align: 'center',
            sortable: false,
            value: 'userName',
          },
          {
            text: '订单编号',
            align: 'center',
            sortable: false,
            value: 'orderNumber'
          },
          {
            text: '下单时间',
            align: 'center',
            sortable: false,
            value: 'completeTime'
          },
          {
            text: '查看详情',
            align: 'center',
            sortable: false,
            width: 200,
            value: 'actions'
          }
        ],
        orders: [],
        search: '',
        rule: [
          v => /^[0-9]{15,16}$/.test(v) || '订单编号必须为15-16位数字',
        ],
        show: false,
        alertText: '',
        alertType: 'success',
        disable: true,
      }
    },
    components: {
      tip
    },
    computed: {
      tip() {
        return 'tip'
      }
    },
    methods: {
      _getOrderByOrderNum() {
        getOrderByOrderNum({
          orderNumber: this.search
        }).then(res => {
          if(res.code === H_config.STATECODE_getOrderByOrderNum_SUCCESS) {
            this.orders = []
            this.orders.push(res.data)
            showTip.call(this, '查询成功')
          } else if(res.code === H_config.STATECODE_getOrderByOrderNum_FAILED) {
            showTip.call(this, res.msg, 'primary')
          } else {
            showTip.call(this, '查询失败', 'error')
          }
        })
      },
      checkOrderDetails(item) {
        this.$store.commit('updateOrder', item)
        this.$router.push('searchOrder/orderDetails')
      }
    }
  }
</script>