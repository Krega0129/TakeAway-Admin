<template>
  <v-card>
    <v-card-title>投诉与建议</v-card-title>
    <v-data-table
      :headers="headers"
      :items="advice"
      class="elevation-1"
      no-data-text="没有数据"
      hide-default-footer
      item-key="shopName"
    ></v-data-table>
    <div class="text-center">
      <v-container class="max-width">
        <v-pagination
          v-model="curPage"
          :length="totalPages"
          @input=""
        ></v-pagination>
      </v-container>
    </div>
    <toast ref="toast"></toast>
  </v-card>
</template>

<script>
  import toast from '../../../components/toast';
  import {
    getAdvice
  } from '../../../network/work';

export default {
  name: 'cooperationTip',
  data() {
    return {
      headers: [
        {
          text: '投诉与建议',
          align: 'start',
          sortable: false,
          value: 'adviseInfo',
        },
        {
          text: '提交时间',
          align: 'center',
          sortable: false,
          width: 200,
          value: 'uploadTime',
        }
      ],
      advice: [],
      curPage: 1,
      totalPages: 1
    }
  },
  components: {
    toast
  },
  mounted() {
    this._getAdvice()
  },
  methods: {
    _getAdvice() {
      getAdvice().then(res => {
        if(res.code === 3200) {
          this.advice = res.data
        } else {
          this.$refs.toast.setAlert('加载失败', 'error')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>