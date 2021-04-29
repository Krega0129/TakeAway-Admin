<template>
  <v-card flat>
    <v-card-title>投诉与建议</v-card-title>
    <v-data-table
      :headers="headers"
      :items="advice"
      class="elevation-1"
      no-data-text="没有数据"
      hide-default-footer
      item-key="shopName"
      @click:row="readAdvice"
    ></v-data-table>
    <div class="text-center">
      <v-container class="max-width">
        <v-pagination
          v-model="curPage"
          :length="totalPages"
          @input="_getAdvice"
        ></v-pagination>
      </v-container>
    </div>
    <toast ref="toast"></toast>

    <v-dialog
      v-model="dialog"
      width="290px"
    >
      <v-card>
        <v-card-title></v-card-title>
        <v-card-text>
          {{content}}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          {{date}}
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      totalPages: 1,
      dialog: false,
      content: '',
      date: ''
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
      getAdvice({
        pageNum: this.curPage,
        pageSize: 10
      }).then(res => {
        if(res.code === 3200) {
          this.totalPages = res.data.totalPages || 1
          this.advice = res.data.list
        } else {
          this.$refs.toast.setAlert('加载失败', 'error')
        }
      })
    },
    readAdvice(item) {
      this.dialog = true
      this.content = item.adviseInfo
      this.date = item.uploadTime
    }
  }
}
</script>

<style scoped>

</style>