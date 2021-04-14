<template>
  <div>
    <v-row>
      <v-col cols="3">
        <v-select
          v-if="topManager"
          :items="campus"
          v-model="campusSelectValue"
          :label="campus[0]"
          dense
          solo
          class="mt-7"
          @change="_getNotice"
        ></v-select>
      </v-col>
      <v-col cols="7">
        <v-textarea
          outlined
          label="公告"
          v-model="notice"
        ></v-textarea>
      </v-col>
      <v-col cols="2">
        <v-btn
          color="primary"
          class="mt-7"
          @click="_setNotice"
        >
          确定
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="!topManager">
      <v-col cols="3"></v-col>
      <v-col cols="7">
        <v-textarea
          outlined
          label="商家入驻提示"
          v-model="shopTip"
        ></v-textarea>
      </v-col>
      <v-col cols="2">
        <v-btn
          color="primary"
          class="mt-7"
          @click="_setTip(0)"
        >
          确定
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="!topManager">
      <v-col cols="3"></v-col>
      <v-col cols="7">
        <v-textarea
          outlined
          label="骑手入驻提示"
          v-model="riderTip"
        ></v-textarea>
      </v-col>
      <v-col cols="2">
        <v-btn
          color="primary"
          class="mt-7"
          @click="_setTip(1)"
        >
          确定
        </v-btn>
      </v-col>
    </v-row>
    <toast ref="toast"></toast>
  </div>
</template>

<script>
  import {
    getAllCampus,
    getNotice,
    setNotice,
    setTip
  } from '../../../network/work';
  import {
    H_config
  } from '../../../network/config';
  import toast from '../../../components/toast';
export default {
  name: 'setNotice', 
  data() {
    return {
      topManager: localStorage.getItem('campusAddress') === '管理员',
      campus: [],
      campusSelectValue: '',
      notice: '',
      shopTip: '',
      riderTip: ''
    }
  },
  components: {
    toast
  },
  async mounted() {
    this.topManager && await getAllCampus().then(res => {
      if(res.code === H_config.STATECODE_SUCCESS) {
        this.campus.push(...res.data.map(item => item.campusName))
        this.campusSelectValue = this.campus[0]
      }
    })

    this._getNotice()
  },
  methods: {
    _setNotice() {
      setNotice({
        address: this.campusSelectValue,
        notice: this.notice
      }).then(res => {
        if(res.code === 3200) {
          this.$refs.toast.setAlert('设置成功')
        } else {
          this.$refs.toast.setAlert('设置失败', 'error')
        }
      })
    },
    _getNotice() {
      getNotice({
        address: this.campusSelectValue
      }).then(res => {
        if(res.code === 3200) {
          this.notice = res.data?.noticeInfo
        }
      })
    },
    _setTip(type) {
      setTip({
        tip: type === '' ? this.shopTip : this.riderTip,
        type: ''
      }).then(res => {
        console.log(res);
      })
    }
  }
}
</script>

<style scoped>

</style>