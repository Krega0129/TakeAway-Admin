<template>
  <div class="money">
    <v-toolbar 
      flat
      class="my-5"
      style="padding-right: 10vw"
    >
      <v-select
        :items="campus"
        label="全部校区"
        dense
        solo
        v-model="selectCampusVal"
        style="max-width: 20vw"
      ></v-select>
      
      <v-spacer></v-spacer>

      <v-select
        :items="time"
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
            @click="$refs.dialog.save(date)"
          >
            确定
          </v-btn>
        </v-date-picker>
      </v-dialog>
    </v-toolbar>
    <v-row>
      <v-col cols="8">
        <div class="echart d-inline-block" ref="echartA" style="width: 100%; height: 60vh;"></div>
      </v-col>
      <v-col cols="3">
        <v-card style="min-height: 50vh">
          <v-card-title class="font-weight-bold">今日收入：</v-card-title>
          <div class="font-weight-bold text-h4 text-center red--text my-5">￥100</div>
          <v-card-text class="mt-15">
            <span class="text-subtitle-1 font-weight-bold">设置抽成比：</span>
            <v-text-field
              dense
              reverse
              class="d-inline-block"
              style="width: 40%"
            ></v-text-field>
            <span class="text-h6"> %</span>
            <v-btn
              color="primary"
              dense
              block
            >
              确定
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-divider 
      vertical 
    ></v-divider>
    <!-- <div class="echart d-inline-block" ref="echartB" style="width: 20vw; height: 60vh; margin-left: 7vw"></div> -->
    
    <!-- <div
      class="d-inline-block"
      style="width: 20vw; height: 60vh; margin-left: 0vw; vertical-align: top"
    >
      
    </div> -->
  </div>
</template>

<script>
  const echarts = require('echarts')
  import {
    getAllCampus
  } from '../../../network/work'
  import { H_config } from '../../../network/config';
  export default {
    name: 'money',
    data() {
      return {
        campus: ['全部校区'],
        selectCampusVal: '全部校区',
        time: ['七天内', '一个月', '一年内', '总计'],
        date: new Date().toISOString().substr(0, 10),
        modal: false,
        maxDate: new Date().toISOString().substr(0, 10)
      }
    },
    async mounted() {
      await getAllCampus().then(res => {
        if(res.code == H_config.STATECODE_campus_SUCCESS) {
          for(let school of res.data) {
            this.campus.push(school.campusName)
          }
        }
      })
      this.renewCharts()
    },
    watch: {
      selectCampusVal() {
        
      }
    },
    methods: {
      renewCharts() {
        let myChartA = echarts.init(this.$refs.echartA);
        // let myChartB = echarts.init(this.$refs.echartB);
        let optionA = {
          // title: {
          //   text: '盈利'
          // },
          tooltip: {},
          legend: {
            data:['盈利']
          },
          xAxis: {
            data: ['a', 'b', 'c', 'd', 'e', 'f', 'g']
          },
          yAxis: {},
          series: [{
            name: '盈利',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20, 12]
          }]
        };
        // let optionB = {
        //   title: {
        //     text: '今日收入'
        //   },
        //   width: 150,
        //   tooltip: {},
        //   xAxis: {
        //     data: ["今日收入"]
        //   },
        //   yAxis: {},
        //   series: [{
        //     name: '今日收入',
        //     type: 'bar',
        //     data: [65]
        //   }]
        // };

        // 使用刚指定的配置项和数据显示图表。
        myChartA.setOption(optionA);
        // myChartB.setOption(optionB);
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
