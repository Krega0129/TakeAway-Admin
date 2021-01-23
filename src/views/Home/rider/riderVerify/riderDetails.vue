<template>
  <div class="riderDetails">
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
              <v-card-title class="headline">确定{{status == 1 ? '通过' : '不通过'}}该骑手的信息?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDialog">取消</v-btn>
                <v-btn color="blue darken-1" text @click="_updateReviewStatus">确定</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
    </v-data-table>
    <div class="text-center mt-4" v-if="$store.state.riderStatus === 0">
      <v-btn
        large
        color="error"
        class="mx-2"
        @click="disPass"
      >
        审核不通过
      </v-btn>
      <v-btn
        large
        color="success"
        @click="pass"
        class="mx-2"
      >
        审核通过
      </v-btn>
    </div>
    <div class="text-center mt-4 green--text" v-else-if="$store.state.riderStatus == 1">
      审核已通过
    </div>
    <div class="text-center mt-4 red--text" v-if="$store.state.riderStatus == 2">
      审核未通过
    </div>
  </div>
</template>

<script>
import {
  updateReviewStatus,
} from '../../../../network/rider';
import { H_config } from '../../../../network/config';
import { showTip, close } from '../../../../utils';

export default {
  name: 'riderDetails',
  data() {
    return {
      headers: [
        {
          text: '信息名称',
          align: 'start',
          sortable: false,
          value: 'infoName',
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
      dialog: false,
      status: this.$store.state.riderStatus
    }
  },
  methods: {
    _updateReviewStatus() {
      updateReviewStatus({
        driverId: this.$store.state.riderId,
        driverStatus: this.status == 3 ? 1 : 3
      }).then(res => {
        if(res.code == H_config.STATECODE_rider_SUCCESS) {
          this.state = this.status == 3 ? 1 : 3
          this.$store.commit('updateRiderStatus', this.status)
          showTip.call(this, '修改成功')
          close.call(this)
        } else {
          showTip.call(this, '修改失败', 'error')
        }
        this.closeDialog()
      })
    },
    disPass() {
      this.status = 2
      this.dialog = true
    },
    pass() {
      this.status = 1
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>