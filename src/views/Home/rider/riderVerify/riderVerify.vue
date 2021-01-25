<template>
  <div class="riderVerify">
    <v-data-table
      :headers="headers"
      :items="riders"
      class="elevation-1"
      :search="search"
      no-data-text="没有数据"
      :custom-filter="filterOnlyCapsText"
      :show-select="multiSelect"
      item-key="riderName"
      :items-per-page="5"
      :single-select="singleSelect"
      v-model="selected"
      v-if="this.$route.meta.title === '信息审核'"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="搜索"
            class="mt-6"
          ></v-text-field>
          
          <v-spacer></v-spacer>

          <v-select
            dense
            class="mt-6 mr-5"
            :items="campus"
            style="width: 30px"
            label="全部校区"
            v-model="selectCampusVal"
            solo
          ></v-select>

          <v-select
            dense
            class="mt-6"
            :items="status"
            style="width: 30px"
            label="全部"
            v-model="selectStatusVal"
            solo
          ></v-select>

          <v-spacer></v-spacer>

          <v-btn
            dark
            class="ma-2"
            @click="multiSelect = !multiSelect"
          >
            批量选择
          </v-btn>
          <v-btn
            :color="multiSelect ? 'success' : ''"
            class="ma-2"
            :disabled="!multiSelect ||　multiSelect && !selected[0]"
            @click="reviewMultiPass"
          >
            批量通过
          </v-btn>
          <v-btn
            :color="multiSelect ? 'error' : ''"
            class="ma-2"
            :disabled="!multiSelect ||　multiSelect && !selected[0]"
            @click="reviewMultiOut"
          >
            批量淘汰
          </v-btn>

          <v-dialog v-model="reviewRider" max-width="500px">
            <v-card>
              <v-card-title class="headline">确定{{toStatus === 1 ? '': '不'}}通过审核?</v-card-title>
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
      
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn 
          small
          dark
          class="mx-2"
          @click="riderDetails(item)">
        <v-icon
          small
          class="mr-2"
        >
          mdi-menu
        </v-icon>
        详情
        </v-btn>
        <v-btn 
          small
          color="success"
          class="mx-2"
          v-if="selectStatusVal == '待审核'"
          @click="openDialog(item, 1)">
        <v-icon
          small
          class="mr-2"
        >
          mdi-check
        </v-icon>
          通过
        </v-btn>
        <v-btn 
          small
          color="error"
          v-if="selectStatusVal == '待审核'"
          class="mx-2"
          @click="openDialog(item, 2)">
        <v-icon
          small
          class="mr-2"
        >
          mdi-block-helper
        </v-icon>
          不通过
        </v-btn>
      </template>
    </v-data-table>
    <router-view v-else></router-view>
  </div>
</template>

<script>
  import { H_config } from '../../../../network/config'
  import {
    getAllCampus
  } from '../../../../network/work';
  import {
    getRiderByStatus,
    updateReviewStatus
  } from '../../../../network/rider'
  import { showTip } from '../../../../utils';

  export default {
    name: 'riderVerify',
    data() {
      return {
        headers: [
          {
            text: '骑手姓名',
            align: 'start',
            sortable: false,
            value: 'driverName'
          },
          {
            text: '骑手电话',
            align: 'start',
            sortable: false,
            value: 'driverPhone'
          },
          {
            text: '详情',
            align: 'center',
            sortable: false,
            value: 'actions',
            width: 400
          },
        ],
        riders: [],
        search: '',
        reviewRider: false,
        editIndex: -1,
        multiSelect: false,
        singleSelect: false,
        selected: [],
        campus: ['全部校区'],
        selectCampusVal: '',
        status: ['待审核', '已通过', '未通过'],
        selectStatusVal: '待审核',
        // 要改变成哪个状态
        toStatus: null
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

      this._getRiderByStatus()
      this.$bus.$on('changeRiderReviewStatus', () => {
        this.riders.splice(this.editIndex, 1)
      })
    },
    beforeDestroy() {
      this.$bus.$off('changeRiderReviewStatus')
    },
    watch: {
      selectCampusVal() {
        this.selectCampusVal = this.selectCampusVal == '全部校区' ? '' : this.selectCampusVal
        this._getRiderByStatus()
      },
      selectStatusVal() {
        this.riders = []
        this._getRiderByStatus()
      }
    },
    methods: {
      filterOnlyCapsText(value, search, item) {
        return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().indexOf(search) !== -1;
      },
      _getRiderByStatus() {
        getRiderByStatus({
          driverStatus: this.status.indexOf(this.selectStatusVal),
          campusName: this.selectCampusVal
        }).then(res => {
          if(res.code === H_config.STATECODE_rider_SUCCESS) {
            this.riders = res.data
          }
        })
      },
      riderDetails(item) {
        this.editIndex = this.riders.indexOf(item)
        this.$store.commit('updateRiderStatus', item.driverStatus)
        this.$store.commit('updateRiderId', item.driverId)
        this.$router.push('riderVerify/riderDetails')
      },
      _updateReviewStatus() {
        updateReviewStatus({
          driverId: this.riders[this.editIndex].driverId,
          driverStatus: this.toStatus
        }).then(res => {
          if(res.code === H_config.STATECODE_rider_SUCCESS) {
            this.riders.splice(this.editIndex, 1)
            showTip.call(this, '修改成功')
          } else {
            showTip.call(this, '修改失败', 'error')
          }
          this.closeDialog()
        })
      },
      openDialog(item, status) {
        this.editIndex = this.riders.indexOf(item)
        this.toStatus = status
        this.reviewRider = true
      },
      closeDialog() {
        this.editIndex = -1
        this.reviewRider = false
      },
      reviewMultiPass() {
        console.log('批量通过');
      },
      reviewMultiOut() {
        console.log('批量淘汰');
      }
    }
  }
</script>

<style lang="sass" scoped>

</style>
