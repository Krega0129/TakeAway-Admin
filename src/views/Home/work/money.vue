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
    <div class="echart d-inline-block" ref="echartA" style="width: 55vw; height: 60vh;"></div>
    <v-divider 
      vertical 
    ></v-divider>
    <div class="echart d-inline-block" ref="echartB" style="width: 20vw; height: 60vh; margin-left: 7vw"></div>
  </div>
</template>

<script>
  const echarts = require('echarts')
  export default {
    name: 'money',
    data() {
      return {
        campus: ['全部', '广工'],
        time: ['七天内', '一个月', '一年内', '总计'],
        date: new Date().toISOString().substr(0, 10),
        modal: false,
        maxDate: new Date().toISOString().substr(0, 10)
      }
    },
    mounted() {
      let myChartA = echarts.init(this.$refs.echartA);
      let myChartB = echarts.init(this.$refs.echartB);
      let optionA = {
        title: {
          text: '盈利'
        },
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
      let optionB = {
        title: {
          text: '今日收入'
        },
        width: 150,
        tooltip: {},
        xAxis: {
          data: ["今日收入"]
        },
        yAxis: {},
        series: [{
          name: '今日收入',
          type: 'bar',
          data: [65]
        }]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChartA.setOption(optionA);
      myChartB.setOption(optionB);
    },
    watch: {
      
    },
    methods: {
      
    }
  }
</script>

<style lang="scss" scoped>

</style>
