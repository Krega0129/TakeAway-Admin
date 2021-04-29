<template>
  <div class="searchOrder">

    <toast ref="toast"></toast>

    <div
      v-if="this.$route.meta.title === '快递查询'"
    >
      <v-data-table
        :headers="headers"
        :items="express"
        class="elevation-1"
        no-data-text="没有数据"
        hide-default-footer
        item-key="shopName"
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
                label="输入订单号"
                class="mt-6"
              ></v-text-field>
              <v-btn
                color="primary"
                class="ml-5 mt-6"
                @click="_selectOrderByOrderNumber"
                :disabled="!disable"
              >
                搜索
              </v-btn>
            </v-form>
            <v-spacer></v-spacer>
            
            <v-select
              v-if="topManager"
              :items="campus"
              v-model="campusSelectValue"
              :label="campus[0]"
              dense
              solo
              @change="_listAllOrder"
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
                  @click="changeDate"
                >
                  确定
                </v-btn>
              </v-date-picker>
            </v-dialog>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="getSpec"
            >
              管理规格
            </v-btn>

            <v-dialog
              max-width="600"
              v-model="specDialog"
            >
              <v-card>
                <v-data-table
                  :headers="specHeaders"
                  :items="specs"
                  class="elevation-1"
                  no-data-text="没有数据"
                  hide-default-footer
                  item-key="shopName"
                >
                  <template v-slot:top>
                    <v-toolbar flat>
                      <v-toolbar-title>
                        规格列表
                      </v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-select
                        v-if="topManager"
                        dense
                        class="mt-6"
                        :items="campus"
                        style="width: 30px"
                        :label="campus[0]"
                        @change="getSpec"
                        solo
                        v-model="ggCampusSelectValue"
                      ></v-select>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="primary"
                        @click="dialog = true"
                      >
                        新增规格
                      </v-btn>
                    </v-toolbar>
                  </template>

                  <template v-slot:[`item.actions`]="{ item }">
                    <v-icon @click="deleteSpec(item)">
                      mdi-delete
                    </v-icon>
                  </template>
                </v-data-table>
              </v-card>
            </v-dialog>

            <v-dialog
              max-width="300"
              v-model="dialog"
            >
              <v-card>
                <v-form
                  v-model="valid"
                >
                  <v-card-text>
                    <v-container>
                        <v-text-field
                          v-model="specName"
                          label="规格名称"
                          :rules="nameRules"
                        ></v-text-field>
                        <v-text-field
                          v-model="specPrice"
                          :rules="priceRules"
                          label="价格"
                        ></v-text-field>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="dialog = false"
                    >
                      取消
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      :disabled="!valid"
                      @click="save"
                    >
                      保存
                    </v-btn>
                  </v-card-actions>
                </v-form>
              </v-card>
            </v-dialog>

            <v-dialog v-model="isDeleteSpec" max-width="500px">
              <v-card>
                <v-card-title class="headline">确定删除该规格?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="isDeleteSpec = false">取消</v-btn>
                  <v-btn color="red" text @click="confirmDelete">确定</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <template v-slot:[`header.status`]>
          <v-select
            style="width: 150px"
            :items="expressStatus"
            v-model="curStatus"
            @change="_listAllOrder"
            label="状态"
          ></v-select>
        </template>

        <template v-slot:[`item.status`]="{ item }">
          {{expressStatus[item.status] ? expressStatus[item.status] : '订单异常'}}
        </template>
        
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn 
            small
            dark
            class="mx-2"
            @click="checkExpressDetails(item)">
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
        <v-container class="max-width">
          <v-pagination
            v-model="curPage"
            :length="totalPages"
            @input="_listAllOrder"
          ></v-pagination>
        </v-container>
      </div>
    </div>
    <router-view v-else></router-view>
  </div>
</template>

<script>
  import { H_config } from '../../../../network/config';
  import {
    getAllCampus
  } from '../../../../network/work';
  import {
    getExpressSpec,
    setExpressSpec,
    deleteExpressSpec,
    selectOrderByOrderNumber,
    listAllOrder
  } from '../../../../network/user';
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
            value: 'addresseeName',
          },
          {
            text: '订单号',
            align: 'center',
            sortable: false,
            value: 'orderNumber'
          },
          {
            text: '取件状态',
            align: 'center',
            sortable: false,
            width: 200,
            value: 'status'
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
        specHeaders: [
          {
            text: '规格名称',
            align: 'center',
            sortable: false,
            value: 'specifications',
          },
          {
            text: '价格',
            align: 'center',
            sortable: false,
            value: 'price',
          },
          {
            text: '操作',
            align: 'center',
            sortable: false,
            value: 'actions',
          },
        ],
        specs: [],
        search: '',
        rule: [
          v => /^[0-9-]{15,16}$/.test(v) || '订单号必须为15~16位数字',
        ],
        nameRules: [
          v => !!v || '规格名不能为空'
        ],
        priceRules: [
          v => v != null || '价格不能为空',
          v => /^[0-9]+([.]\d{1,2})?$/.test(v) || '必须为数字且最多包含两位小数',
        ],
        disable: true,
        specDialog: false,
        isDeleteSpec: false,
        deleteId: '',
        dialog: false,
        valid: false,
        specName: '',
        specPrice: 0,
        expressStatus: ['待接单', '待送达', '已完成', '已退款', '已取消'],
        curStatus: '待接单',

        date: new Date().toISOString().substr(0, 10),
        maxDate: new Date().toISOString().substr(0, 10),
        campus: [],
        campusSelectValue: '',
        curPage: 1,
        totalPages: 1,
        topManager: localStorage.getItem('campusAddress') === '管理员',
        ggCampusSelectValue: ''
      }
    },
    components: {
      toast
    },
    async mounted() {
      this.topManager && await getAllCampus().then(res => {
        if(res.code === H_config.STATECODE_SUCCESS) {
          this.campus.push(...res.data.map(item => item.campusName))
          this.ggCampusSelectValue = this.campus[0]
          this.campusSelectValue = this.campus[0]
        }
      })

      this._listAllOrder()
    },
    methods: {
      _listAllOrder() {
        listAllOrder({
          campus: this.topManager ? this.campusSelectValue : localStorage.getItem('campusAddress'),
          date: this.date,
          pageNumber: this.curPage,
          pageSize: 10,
          status: this.expressStatus.indexOf(this.curStatus)
        }).then(res => {
          console.log(res);
          if(res.code === 3200) {
            this.totalPages = res.data.pages || 1
            this.express = res.data.list
          } else {
            this.$refs.toast.setAlert('查询失败', 'error')
          }
        })
      },
      _selectOrderByOrderNumber() {
        selectOrderByOrderNumber({
          orderNumber: this.search,
          campus: this.topManager ? '' : localStorage.getItem('campusAddress')
        }).then(res => {
          if(res.code === 3200) {
            this.express = [res.data]
            this.$refs.toast.setAlert('查询成功')
          } else {
            this.$refs.toast.setAlert('查询失败', 'error')
          }
        })
      },
      changeDate() {
        this.$refs.dialog.save(this.date)
        this._listAllOrder()
      },
      checkExpressDetails(item) {
        console.log(item);
        this.$store.commit('updateExpressOrder', item)
        this.$router.push('express/expressDetails')
      },
      getSpec() {
        getExpressSpec({
          campus: this.topManager ? this.ggCampusSelectValue : localStorage.getItem('campusAddress')
        }).then(res => {
          if(res.code === H_config.STATECODE_express_SUCCESS) {
            this.specs = res.data
            this.specDialog = true
          } else {
            this.$refs.toast.setAlert('加载失败', 'error')
          }
        })
      },
      save() {
        const expressAgentPrice = JSON.stringify({
          specifications: this.specName,
          price: Number(this.specPrice),
          campus: this.topManager ? this.ggCampusSelectValue : localStorage.getItem('campusAddress')
        })
        setExpressSpec(expressAgentPrice).then(res => {
          console.log(res);
          if(res.code === H_config.STATECODE_setExpressSpec_SUCCESS) {
            this.$refs.toast.setAlert('设置成功')
            this.getSpec()
            this.dialog = false
            this.specPrice = 0
            this.specName = ''
          } else {
            this.$refs.toast.setAlert('设置失败', 'error')
          }
        })
      },
      deleteSpec(spec) {
        this.deleteId = spec.id
        this.isDeleteSpec = true
      },
      confirmDelete() {
        deleteExpressSpec({
          id: this.deleteId
        }).then(res => {
          if(res.code === H_config.STATECODE_express_SUCCESS) {
            this.$refs.toast.setAlert('删除成功')
            this.isDeleteSpec = false
            this.getSpec()
          } else {
            this.$refs.toast.setAlert('删除失败', 'error')
          }
        })
      }
    }
  }
</script>