<template>
  <div class="money">

    <toast ref="toast"></toast>

    <v-toolbar 
      flat
      class="my-5"
      style="padding-right: 10vw"
    >
      
      <v-spacer></v-spacer>

      <v-select
        :items="time"
        v-model="profitSelectValue"
        label="七天内"
        dense
        solo
        style="max-width: 15vw"
      ></v-select>

      <v-spacer></v-spacer>
      <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="date"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="选择指定日期"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
            style="max-width: 15vw"
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
            @click="modal = false"
          >
            取消
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.dialog.save(date);_getDayProfit(date)"
          >
            确定
          </v-btn>
        </v-date-picker>
      </v-dialog>
      <v-dialog max-width="600px" v-model="setTakePercentage">
        <v-card>
          <v-toolbar flat>
            <v-card-title>设置抽成比</v-card-title>
            <v-spacer></v-spacer>
            <v-dialog max-width="800px">
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
                  @click="getProfitRecord"
                >修改记录</v-btn>
              </template>
              <v-card>
                <v-card-title>修改记录</v-card-title>
                <v-card-text>
                  <v-data-table
                    :headers="headers"
                    :items="records"
                    class="elevation-1"
                    no-data-text="没有数据"
                    item-key="campusName"
                    hide-default-footer
                    :loading="loading"
                    loading-text="加载中...请稍后"
                  ></v-data-table>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-toolbar>
          <v-card-text>
            <v-form
              v-model="valid"
            >
              <v-row>
                <v-col cols="6">
                  商家抽成比：
                  <v-text-field
                    v-model="newShopTakePercentage"
                    :rules="takePercentageRules"
                    append-outer-icon="%"
                    required
                    reverse
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  骑手抽成比：
                  <v-text-field
                    v-model="newRiderTakePercentage"
                    :rules="takePercentageRules"
                    append-outer-icon="%"
                    reverse
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="setTakePercentage = false"
            >
              取消
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              :disabled="!valid"
              @click="save"
            >
              确定
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-row>
      <v-col cols="8">
        <div class="echart d-inline-block" ref="echartA" style="width: 90%; height: 60vh;"></div>
      </v-col>
      <v-col cols="3">
        <v-card style="min-height: 36vh">
          <v-card-title class="font-weight-bold">今日收入：</v-card-title>
          <div class="font-weight-bold text-h3 text-center red--text my-5">￥{{profit}}</div>
          <v-card-text class="mt-15 pl-10 text-left">
            <div class="text-subtitle-1 font-weight-bold">商家抽成比：{{shopTakePercentage}} %</div>
            <div class="text-subtitle-1 font-weight-bold">骑手抽成比：{{riderTakePercentage}} %</div>
          </v-card-text>
          <v-card-actions class="px-10">
            <v-btn
              color="primary"
              dense
              block
              @click="setTakePercentage = true"
            >
              修改
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-divider 
      vertical 
    ></v-divider>
  </div>
</template>

<script>
  const echarts = require('echarts')
  import {
    getNewestTakePercentage,
    setTakePercentage,
    getProfitHistory,
    getWeeksProfit,
    getMonthsProfit,
    getYearsProfit,
    getDayProfit
  } from '../../../network/work'
  import { H_config } from '../../../network/config';
  import toast from '../../../components/toast';
  export default {
    name: 'money',
    data() {
      return {
        setTakePercentage: false,
        time: ['7天内', '30天内', '一年内'],
        shopTakePercentage: '',
        riderTakePercentage: '',
        newShopTakePercentage: '',
        newRiderTakePercentage: '',
        takePercentageRules: [
          v => !!v || '抽成比不能为空',
          v => /^0*?[0-9]{1,2}$/.test(v) || '抽成比只能为 1% ~ 90% 之间的整数',
          () => Number(this.newShopTakePercentage) + Number(this.newRiderTakePercentage) <= 900 || '抽成比加起来不能大于90%'
        ],
        date: new Date().toISOString().substr(0, 10),
        modal: false,
        maxDate: new Date().toISOString().substr(0, 10),
        valid: false,
        loading: false,
        headers: [
          {
            text: '记录',
            align: 'start',
            sortable: false,
            value: 'recordName'
          },
          {
            text: '商家抽成比(%)',
            align: 'start',
            sortable: false,
            value: 'profitMerchant'
          },
          {
            text: '骑手抽成比(%)',
            align: 'start',
            sortable: false,
            value: 'profitDriver'
          },
          {
            text: '修改时间',
            align: 'start',
            sortable: false,
            value: 'updateTime'
          }
        ],
        records: [],
        profitSelectValue: '七天内',
        profitSelectIndex: 0,
        profit: 0.00
      }
    },
    components: {
      toast
    },
    mounted() {
      getNewestTakePercentage().then(res => {
        if(res.code === H_config.STATECODE_takePercentage_SUCCESS) {
          this.riderTakePercentage = res.data.profitDriver * 100
          this.shopTakePercentage = res.data.profitMerchant * 100
        }
      })
      this.renewCharts()
      this._getDayProfit(this.date)
    },
    watch: {
      profitSelectValue(val) {
        this.profitSelectIndex = this.time.indexOf(val)
        this.renewCharts()
      },
      shopTakePercentage(val) {
        this.newShopTakePercentage = val
      },
      riderTakePercentage(val) {
        this.newRiderTakePercentage = val
      }
    },
    methods: {
      async renewCharts() {
        let x = []
        let xValue = []
        let profit = []
        if(this.profitSelectIndex === 0) {
          xValue = ['周一','周二', '周三', '周四', '周五', '周六', '周日']
          for(let i = 0; i < 7; i++) {
            x.push(xValue[(new Date().getDay() + i) % 7])
          }
          
          await getWeeksProfit({
            date: this.maxDate
          }).then(res => {
            if(res.code === H_config.STATECODE_getProfit_SUCCESS) {
              profit = res.data.map(item => {
                return item === null ? 0 : item
              })
            } else {
              this.$refs.toast.setAlert('加载失败', 'error')
            }
          })

        } else if (this.profitSelectIndex === 1) {
          x = ['第一周','第二周', '第三周', '第四周', '两天内']
          
          await getMonthsProfit({
            date: this.maxDate
          }).then(res => {
            if(res.code === H_config.STATECODE_getProfit_SUCCESS) {
              profit = res.data.map(item => {
                return item === null ? 0 : Number(item).toFixed(2)
              })
            } else {
              this.$refs.toast.setAlert('加载失败', 'error')
            }
          })
        } else {
          xValue = ['1月','2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          for(let i = 0; i < 12; i++) {
            x.push(xValue[(new Date().getMonth() + i + 1) % 12])
          }

          await getYearsProfit({
            date: this.maxDate
          }).then(res => {
            if(res.code === H_config.STATECODE_getProfit_SUCCESS) {
              profit = res.data.map(item => {
                return item === null ? 0 : Number(item).toFixed(2)
              })
            } else {
              this.$refs.toast.setAlert('加载失败', 'error')
            }
          })
        }

        let myChartA = echarts.init(this.$refs.echartA);
        console.log(profit);
        let optionA = {
          tooltip: {},
          legend: {
            data:['盈利']
          },
          xAxis: {
            data: x
          },
          yAxis: {},
          series: [{
            name: '盈利',
            type: 'bar',
            data: profit
          }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChartA.setOption(optionA);

        window.onresize = function () {
          myChartA.resize()
        }
      },
      save() {
        setTakePercentage({
          profitDriver: this.newRiderTakePercentage / 100,
          profitMerchant: this.newShopTakePercentage / 100
        }).then(res => {
          if(res.code === H_config.STATECODE_takePercentage_SUCCESS) {
            this.riderTakePercentage = this.newRiderTakePercentage
            this.shopTakePercentage = this.newShopTakePercentage
            this.$refs.toast.setAlert('修改成功')
          } else {
            this.$refs.toast.setAlert('修改失败', 'error')
          }
          this.setTakePercentage = false
        })
      },
      getProfitRecord() {
        getProfitHistory().then(res => {
          if(res.code === H_config.STATECODE_takePercentage_SUCCESS) {
            this.records = res.data
          } else {
            
          }
        })
      },
      _getDayProfit(date) {
        getDayProfit({
          date: date
        }).then(res => {
          if(res.code === H_config.STATECODE_getProfit_SUCCESS) {
            this.profit = res.data === null ? 0.00 : Number(res.data).toFixed(2)
            console.log(this.profit);
          } else {
            this.$refs.toast.setAlert('加载失败', 'error')
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
