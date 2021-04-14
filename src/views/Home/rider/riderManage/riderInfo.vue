<template>
  <div class="banAccount">

    <toast ref="toast"></toast>
    <img-dialog ref="img"></img-dialog>

    <v-data-table
      :headers="headers"
      :items="riderInfo"
      class="elevation-1"
      no-data-text="没有数据"
      hide-default-footer
      hide-default-header
      item-key="infoName"
      :loading="loadingName === 'infoLoading'"
      loading-text="加载中...请稍后"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{riderName}}</v-toolbar-title>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title class="headline">确定{{riderStatus == 3 ? '解封' : '封停'}}该骑手?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDialog">取消</v-btn>
                <v-btn color="blue darken-1" text @click="updateBanStatus">确定</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            class="mr-5"
            @click="_getOrderHistory"
          >
            接单历史
          </v-btn>
          <v-btn
            dark
            @click="_getRiderLicense"
          >
            审核资料
          </v-btn>
          <v-dialog v-model="showLicense" max-width="500px">
            <v-card class="d-flex justify-space-between flex-wrap pa-5">
              <div class="text-center my-2" v-for="item in license" :key="item.url">
                <div>{{item.name}}</div>
                <v-img 
                  max-width="200px" 
                  max-height="200px" 
                  :src="BASE_URL + '/' + item.url"
                  @click="$refs.img.scaleImg(BASE_URL + '/' + item.url)"></v-img>
              </div>
            </v-card>
          </v-dialog>
          <v-dialog v-model="orderHistoryDialog" max-width="800px">
            <v-card>
              <v-card-title>接单历史</v-card-title>
              <v-data-table
                :headers="orderHeaders"
                :items="orderHistory"
                class="elevation-1"
                no-data-text="没有数据"
                hide-default-footer
                item-key="infoName"
                :loading="loadingName === 'orderLoading'"
                loading-text="加载中...请稍后"
              >

              </v-data-table>
              <div class="text-center">
                <v-container>
                  <v-row justify="center">
                    <v-col cols="6">
                      <v-container class="max-width">
                        <v-pagination
                          v-model="curPage"
                          :length="totalPages"
                          @input=""
                        ></v-pagination>
                      </v-container>
                    </v-col>
                  </v-row>
                </v-container>
              </div>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
    </v-data-table>
    <div class="text-center mt-4">
      <v-btn
        large
        :color="riderStatus == 3 ? 'success' : 'error'"
        @click="openDialog"
        class="mx-2"
      >
        {{riderStatus == 3 ? '解封账号' : '封停账号'}}
      </v-btn>
    </div>
  </div>
</template>

<script>
  import { H_config, BASE_URL } from '../../../../network/config';
  import {
    getRiderInfo,
    updateReviewStatus,
    selectById,
    selectRiderOrderInfoByDate
  } from '../../../../network/rider';
  import toast from '../../../../components/toast';
  import imgDialog from '../../../../components/imgDialog';

  export default {
    name: 'banAccount',
    data() {
      return {
        BASE_URL: BASE_URL,
        headers: [
          {
            text: '信息名称',
            align: 'start',
            sortable: false,
            value: 'InfoName',
          },
          {
            text: '信息值',
            align: 'start',
            sortable: false,
            value: 'infoValue',
          }
        ],
        orderHeaders: [
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
        orderHistory: [],
        riderInfo: [],
        riderName: '骑手姓名',
        riderStatus: null,
        keys: ['campusName', 'driverGender', 'driverName', 'driverPhone', 'driverStatus'],
        dialog: false,
        LicenseKeys: ['studentCard', 'schoolCard', 'driverIdcardFront', 'driverIdcardBehind'],
        showLicense: false,
        license: [],
        loadingName: 'infoLoading',
        orderHistoryDialog: false,
        curPage: 1,
        totalPages: 1,
        disable: true,
        date: new Date().toISOString().substr(0, 10),
        maxDate: new Date().toISOString().substr(0, 10),
      }
    },
    components: {
      toast,
      imgDialog
    },
    mounted() {
      getRiderInfo({
        driverId: this.$store.state.riderId
      }).then(res => {
        if(res.code == H_config.STATECODE_rider_SUCCESS) {
          let rider = res.data
          this.riderStatus = rider.driverStatus
          this.riderName = rider.driverName
          let keys = Object.keys(rider)
          for(let i in keys) {
            if(this.keys.indexOf(keys[i]) != -1) {
              let riderInfo = {}
              switch(keys[i]) {
                case 'campusName': riderInfo.InfoName = '校区'; break;
                case 'driverGender': riderInfo.InfoName = '性别'; break;
                case 'driverName': riderInfo.InfoName = '姓名'; break;
                case 'driverPhone': riderInfo.InfoName = '联系电话'; break;
                case 'driverStatus': riderInfo.InfoName = '状态'; break;
              }
              if(riderInfo.InfoName == '性别') {
                riderInfo.infoValue = rider[keys[i]] == 0 ? '男' : '女'
              } else if(riderInfo.InfoName == '状态') {
                 riderInfo.infoValue = rider[keys[i]] == 3 ? '已封停' : '正常'
              } else {
                riderInfo.infoValue = rider[keys[i]]
              }
              this.riderInfo.push(riderInfo)
            }
          }
        } else {
          this.$refs.toast.setAlert(res.msg, 'error')
        }
        this.loadingName = ''
      })
    },
    methods: {
      openDialog() {
        this.dialog = true
      },
      closeDialog() {
        this.dialog = false
      },
      updateBanStatus() {
        updateReviewStatus({
          driverId: this.$store.state.riderId,
          driverStatus: this.riderStatus == 3 ? 1 : 3
        }).then(res => {
          if(res.code == H_config.STATECODE_rider_SUCCESS) {
            this.riderStatus = this.riderStatus == 3 ? 1 : 3
            this.$store.commit('updateRiderStatus', this.riderStatus)
            this.$refs.toast.setAlert('修改成功')
          } else {
            this.$refs.toast.setAlert('修改失败', 'error')
          }
          this.closeDialog()
        })
      },
      _getRiderLicense() {
        selectById({
          driverId: this.$store.state.riderId
        }).then(res => {
          console.log(res);
          if(res.code === H_config.STATECODE_rider_SUCCESS) {
            this.license = []
            const driver = res.data[0]
            let keys = Object.keys(driver)
            for(let i in keys) {
              if(this.LicenseKeys.indexOf(keys[i]) !== -1) {
                let driverInfo = {}
                switch(keys[i]) {
                  case 'studentCard': driverInfo.name = '学生卡'; break;
                  case 'schoolCard': driverInfo.name = '校园卡'; break;
                  case 'driverIdcardFront': driverInfo.name = '身份证正面'; break;
                  case 'driverIdcardBehind': driverInfo.name = '身份证反面'; break;
                }
                driverInfo.url = driver[keys[i]]
                this.license.push(driverInfo)
              }
            }
            this.showLicense = true
          } else {
            this.$refs.toast.setAlert('网络异常', 'error')
          }
        })
      },
      _getOrderHistory() {
        this.orderHistoryDialog = true
        selectRiderOrderInfoByDate({
          date: '2020-07-25',
          riderId: this.$store.state.riderId
        }).then(res => {
          console.log(res);
        })
      }
    }
  }
</script>

<style lang="sass" scoped>

</style>