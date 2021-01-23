<template>
  <div class="banAccount">

    <component
      :is="tip"
      :alertText="alertText"
      :alertType="alertType"
      :showTip="show"
    ></component>

    <v-data-table
      :headers="headers"
      :items="riderInfo"
      class="elevation-1"
      no-data-text="没有数据"
      hide-default-footer
      hide-default-header
      item-key="infoName"
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
  import { H_config } from '../../../../network/config';
  import {
    getRiderInfo,
    updateReviewStatus
  } from '../../../../network/rider';
  import tip from '../../../../components/tip';
  import { showTip } from '../../../../utils'

  export default {
    name: 'banAccount',
    data() {
      return {
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
        riderInfo: [],
        riderName: '骑手姓名',
        riderStatus: null,
        keys: ['campusName', 'driverGender', 'driverName', 'driverPhone', 'driverStatus'],
        show: false,
        alertText: '',
        alertType: 'success',
        dialog: false
      }
    },
    components: {
      tip
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
        }
      })
    },
    computed: {
      tip() {
        return 'tip'
      }
    },
    watch: {
      
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
            showTip.call(this, '修改成功')
          } else {
            showTip.call(this, '修改失败', 'error')
          }
          this.closeDialog()
        })
      }
    }
  }
</script>

<style lang="sass" scoped>

</style>