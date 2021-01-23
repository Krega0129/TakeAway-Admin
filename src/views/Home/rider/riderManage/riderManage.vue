<template>
  <div class="riderManage">

    <component
      :is="tip"
      :alertText="alertText"
      :alertType="alertType"
      :showTip="show"
    ></component>

    <v-data-table
      :headers="headers"
      :items="riders"
      class="elevation-1"
      :search="search"
      no-data-text="没有数据"
      :custom-filter="filterOnlyCapsText"
      item-key="riderName"
      :items-per-page="5"
      v-if="this.$route.meta.title === '骑手管理'"
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

          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title class="headline">确定{{`riders[editIndex].driverStatus` == 3 ? '解封' : '封停'}}该骑手?</v-card-title>
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

      <template v-slot:[`item.driverStatus`]="{ item }">
        {{item.driverStatus == 3 ? '已封停' : '正常'}}
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
          :color="item.driverStatus == 3 ? 'success' : 'error'"
          class="mx-2"
          @click="openDialog(item)">
        <v-icon
          small
          class="mr-2"
        >
          mdi-{{item.driverStatus == 3 ? 'check' : 'block-helper'}}
        </v-icon>
          {{item.driverStatus == 3 ? '解封骑手' : '封停骑手'}}
        </v-btn>
      </template>
    </v-data-table>
    <router-view v-else></router-view>
  </div>
</template>

<script>
  import {
    getAllRider,
    updateReviewStatus,
    getRiderByStatus
  } from '../../../../network/rider';
  import {
    getAllCampus
  } from '../../../../network/work';
  import { H_config} from '../../../../network/config';
  import tip from '../../../../components/tip';
  import { showTip } from '../../../../utils'

export default {
  name: 'riderManage',
  data() {
    return {
      headers: [
        {
          text: '姓名',
          align: 'start',
          sortable: false,
          value: 'driverName'
        },
        {
          text: '电话号码',
          align: 'center',
          sortable: false,
          value: 'driverPhone'
        },
        {
          text: '校区',
          align: 'center',
          sortable: false,
          value: 'campusName'
        },
        {
          text: '状态',
          align: 'center',
          sortable: false,
          value: 'driverStatus'
        },
        {
          text: '详情',
          align: 'center',
          sortable: false,
          value: 'actions',
          width: 300
        }
      ],
      riders: [],
      dialog: false,
      search: '',
      editIndex: -1,
      campus: ['全部校区'],
      selectCampusVal: '全部校区',
      status: ['全部', '正常', '已封停'],
      selectStatusVal: '全部',
      show: false,
      alertText: '',
      alertType: 'success',
    }
  },
  components: {
    tip
  },
  async mounted() {
    await getAllCampus().then(res => {
      if(res.code == H_config.STATECODE_campus_SUCCESS) {
        for(let school of res.data) {
          this.campus.push(school.campusName)
        }
      }
    })
    this._getAllRiders()
  },
  computed: {
    tip() {
      return 'tip'
    }
  },
  watch: {
    '$route'(to, from) {
      if(to.fullPath == '/admin/riderManage' && from.fullPath == '/admin/riderManage/riderInfo' && this.riderStatus != this.$store.state.riderStatus) {
        this.riders[this.editIndex].driverStatus = this.$store.state.riderStatus
      }
      
    },
    selectCampusVal() {
      this._getAllRiders()
    },
    selectStatusVal() {
      this._getAllRiders()
    }
  },
  methods: {
    filterOnlyCapsText(value, search, item) {
      return value != null &&
        search != null &&
        typeof value === 'string' &&
        value.toString().indexOf(search) !== -1;
    },
    openDialog(item) {
      this.editIndex = this.riders.indexOf(item)
      this.dialog = true
    },
    closeDialog() {
      this.editIndex = -1
      this.dialog = false
    },
    _getAllRiders() {
      getRiderByStatus({
        campusName: this.selectCampusVal == '全部校区' ? '' : this.selectCampusVal,
        driverStatus: this.selectStatusVal == '全部' ? '' : this.selectStatusVal == '正常' ? 1 : 3
      }).then(res => {
        if(res.code == H_config.STATECODE_rider_SUCCESS) {
          this.riders = res.data
        }
      })
    },
    riderDetails(item) {
      this.editIndex = this.riders.indexOf(item)
      this.$store.commit('updateRiderId', item.driverId)
      this.$store.commit('updateRiderStatus', this.riderStatus)
      this.$router.push('riderManage/riderInfo')
    },
    updateBanStatus() {
      updateReviewStatus({
        driverId: this.riders[this.editIndex].driverId,
        driverStatus: this.riders[this.editIndex].driverStatus == 3 ? 1 : 3
      }).then(res => {
        if(res.code == H_config.STATECODE_rider_SUCCESS) {
          this.riders[this.editIndex].driverStatus = this.riders[this.editIndex].driverStatus == 3 ? 1 : 3
          if(this.selectStatusVal !== '全部') {
            this.riders.splice(this.editIndex, 1)
          }
          this.closeDialog()
          showTip.call(this, '修改成功')
        } else {
          showTip.call(this, '修改失败', 'error')
        }
      })
    }
  }
}
</script>