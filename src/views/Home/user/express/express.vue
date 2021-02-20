<template>
  <div class="searchOrder">

    <toast ref="toast"></toast>

    <v-data-table
      :headers="headers"
      :items="express"
      class="elevation-1"
      no-data-text="没有数据"
      hide-default-footer
      item-key="shopName"
      v-if="this.$route.meta.title === '快递查询'"
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
              label="输入取件码"
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
  import { H_config } from '../../../../network/config';
  import {
    getOrderByOrderNum
  } from '../../../../network/work';
  import toast from '../../../../components/toast';

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
            text: '取件码',
            align: 'center',
            sortable: false,
            value: 'orderNumber'
          },
          {
            text: '取件状态',
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
        express: [],
        search: '',
        rule: [
          v => /^[0-9]{6}$/.test(v) || '取件码必须为6位数字',
        ],
        disable: true,
      }
    },
    components: {
      toast
    },
    methods: {
      _getOrderByOrderNum() {
        getOrderByOrderNum({
          orderNumber: this.search
        }).then(res => {
          if(res.code === H_config.STATECODE_getOrderByOrderNum_SUCCESS) {
            this.orders = []
            this.orders.push(res.data)
            this.$refs.toast.setAlert('查询成功')
          } else if(res.code === H_config.STATECODE_getOrderByOrderNum_FAILED) {
            this.$refs.toast.setAlert(res.msg, 'primary')
          } else {
            this.$refs.toast.setAlert('查询失败', 'error')
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