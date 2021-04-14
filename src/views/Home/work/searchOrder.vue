<template>
  <div class="searchOrder">

    <toast ref="toast"></toast>

    <div
      v-if="this.$route.meta.title === '订单查询'"
    >
      <v-data-table
        :headers="headers"
        :items="orders"
        class="elevation-1"
        no-data-text="没有数据"
        hide-default-footer
        item-key="orderNumber"
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
            <v-icon
              class="ml-5"
              color="primary"
              @click="refresh"
            >
              mdi-refresh
            </v-icon>
            <v-spacer></v-spacer>
            <v-select
              v-if="topManager"
              :items="campus"
              v-model="campusSelectValue"
              label="全部校区"
              dense
              solo
              class="mt-7"
              style="max-width: 15vw"
            ></v-select>
            <v-spacer></v-spacer>
            <v-dialog
              ref="dialog"
              :return-value.sync="date"
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  label="选择日期"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  class="mt-5 mr-5"
                  style="max-width: 150px"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                :max="maxDate"
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="_selectAllOrder(true)"
                >
                  确定
                </v-btn>
              </v-date-picker>
            </v-dialog>
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
      <div class="text-center">
        <v-container>
          <v-row justify="center">
            <v-col cols="6">
              <v-container class="max-width">
                <v-pagination
                  v-model="curPage"
                  :length="totalPages"
                  @input="_selectAllOrder"
                ></v-pagination>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
    <router-view v-else></router-view>
  </div>
</template>

<script>
  import { H_config } from '../../../network/config';
  import {
    getOrderByOrderNum,
    getAllCampus,
    selectAllOrder
  } from '../../../network/work';
  import toast from '../../../components/toast';

  export default {
    name: 'searchOrder',
    data() {
      return {
        topManager: localStorage.getItem('campusAddress') === '管理员',
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
        disable: true,
        date: new Date().toISOString().substr(0, 10),
        maxDate: new Date().toISOString().substr(0, 10),
        campus: ['全部校区'],
        campusSelectValue: '全部校区',
        curPage: 1,
        totalPages: 1
      }
    },
    components: {
      toast
    },
    async mounted() {
      this.topManager && await getAllCampus().then(res => {
        if(res.code === H_config.STATECODE_SUCCESS) {
          this.campus.push(...res.data.map(item => item.campusName))
        }
      })
      this._selectAllOrder()
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
      },
      _selectAllOrder(bool) {
        if(bool) {
          this.$refs.dialog.save(this.date)
        }
        selectAllOrder({
          campus: this.topManager ? '' : localStorage.getItem('campusAddress'),
          date: this.date,
          pageNumber: this.curPage,
          pageSize: 10
        }).then(res => {
          if(res.code === 3208) {
            this.totalPages = res.data.pages || 1
            this.orders = res.data.list
          }
        })
      },
      refresh() {
        this.curPage = 1
        this.totalPages = 1
        this.date = new Date().toISOString().substr(0, 10)
        this.search = ''
        this._selectAllOrder()
      }
    }
  }
</script>