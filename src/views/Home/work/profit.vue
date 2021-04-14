<template>
  <v-container>
    <v-row>
      <v-col cols="4"></v-col>
      <v-col cols="4">
        <v-card style="min-height: 60vh; position: relative">
          <div>
            <v-card-text class="mt-10 pl-10 py-15 text-left">
              <div class="text-h5 font-weight-bold py-2" style="white-space: nowrap">商家抽成比：{{shopTakePercentage}} %</div>
              <div class="text-h5 font-weight-bold py-2" style="white-space: nowrap">骑手抽成比：{{riderTakePercentage}} %</div>
              <div class="text-h5 font-weight-bold py-2" style="white-space: nowrap">负责人抽成比：{{managerTakePercentage}} %</div>
              <div class="text-h5 font-weight-bold py-2" style="white-space: nowrap">快递抽成比：{{expressTakePercentage}} %</div>
            </v-card-text>
            <v-card-actions class="px-10">
              <v-btn
                color="primary"
                dense
                block
                @click="setTakePercentageDialog = true"
              >
                修改
              </v-btn>
            </v-card-actions>
          </div>

          <v-dialog max-width="600px" v-model="setTakePercentageDialog">
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
                        :items-per-page="7"
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
                      外卖骑手抽成比：
                      <v-text-field
                        v-model="newRiderTakePercentage"
                        :rules="takePercentageRules"
                        append-outer-icon="%"
                        reverse
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6">
                      校区负责人抽成比：
                      <v-text-field
                        v-model="newManagerTakePercentage"
                        :rules="takePercentageRules"
                        append-outer-icon="%"
                        required
                        reverse
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      快递骑手抽成比：
                      <v-text-field
                        v-model="newExpressTakePercentage"
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
                  @click="setTakePercentageDialog = false"
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
        </v-card>
      </v-col>
      <v-col cols="3"></v-col>
    </v-row>
    <toast ref="toast"></toast>
  </v-container>
</template>

<script>
import {
  getNewestTakePercentageByCampus,
  setTakePercentage,
  getProfitHistory
} from '../../../network/work';
import {
  H_config
} from '../../../network/config';
import toast from '../../../components/toast';

export default {
  name: 'profit',
  data() {
    return {
      setTakePercentageDialog: false,
      shopTakePercentage: '',
      riderTakePercentage: '',
      managerTakePercentage: '',
      expressTakePercentage: '',
      newShopTakePercentage: '',
      newRiderTakePercentage: '',
      newManagerTakePercentage: '',
      newExpressTakePercentage: '',
      takePercentageRules: [
        v => !!v || '抽成比不能为空',
        v => /^0*?[0-9]{1,2}$/.test(v) || '抽成比只能为 1% ~ 90% 之间的整数',
        () => Number(this.newShopTakePercentage) + Number(this.newRiderTakePercentage) <= 900 || '抽成比加起来不能大于90%'
      ],
      valid: false,
      loading: false,
      headers: [
        {
          text: '记录',
          align: 'start',
          sortable: false,
          value: 'profitId'
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
          text: '负责人抽成比(%)',
          align: 'start',
          sortable: false,
          value: 'profitDriverAdmin'
        },
        {
          text: '快递抽成比(%)',
          align: 'start',
          sortable: false,
          value: 'profitAgent'
        },
        {
          text: '修改时间',
          align: 'start',
          sortable: false,
          value: 'updateTime'
        }
      ],
      records: []
    }
  },
  components: {
    toast
  },
  mounted() {
    this._getNewestTakePercentageByCampus()
  },
  methods: {
    save() {
      /**
       * 设置抽成比例
       * @param {profitDriver} 骑手抽成比
       * @param {profitMerchant} 商家抽成比
       */
      setTakePercentage({
        campusName: localStorage.getItem('campusAddress'),
        profitDriver: this.newRiderTakePercentage / 100,
        profitMerchant: this.newShopTakePercentage / 100,
        profitDriverAdmin: this.newManagerTakePercentage / 100,
        profitAgent: this.newExpressTakePercentage / 100
      }).then(res => {
        if(res.code === H_config.STATECODE_takePercentage_SUCCESS) {
          this._getNewestTakePercentageByCampus()
          this.$refs.toast.setAlert('修改成功')
        } else {
          this.$refs.toast.setAlert('修改失败', 'error')
        }
        this.setTakePercentageDialog = false
      })
    },
    _getNewestTakePercentageByCampus() {
      getNewestTakePercentageByCampus({
        campusName: localStorage.getItem('campusAddress')
      }).then(res => {
        if(res.code === H_config.STATECODE_takePercentage_SUCCESS) {
          this.riderTakePercentage = res.data.profitDriver * 100
          this.shopTakePercentage = res.data.profitMerchant * 100
          this.managerTakePercentage = res.data.profitDriverAdmin * 100
          this.expressTakePercentage = res.data.profitAgent * 100
        } else {
          this.riderTakePercentage = 0
          this.shopTakePercentage = 0
          this.managerTakePercentage = 0
          this.expressTakePercentage = 0
        }
      })
    },
    getProfitRecord() {
      this.loading = true
      getProfitHistory().then(res => {
        this.loading = false
        if(res.code === H_config.STATECODE_takePercentage_SUCCESS) {
          this.records = res.data
          console.log(this.records);
        } else {
          this.$refs.toast.setAlert('加载失败', 'error')
        }
      })
    },
  }
}
</script>

<style scoped>

</style>
