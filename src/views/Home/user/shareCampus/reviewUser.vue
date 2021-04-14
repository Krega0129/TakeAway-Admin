<template>
  <div class="reviewUser">
    <img-dialog ref="img"></img-dialog>
    <toast ref="toast"></toast>

    <v-card
      class="d-flex pa-5"
      flat
    >
      <div style="width: 25%; max-width: 300px">
        <div class="d-flex">
          <v-img
            class="mx-5"
            max-width="50"
            max-height="50"
            :src="BASE_URL + '/' + shareCampus.head"
          ></v-img>
          <div class="font-weight-bold">{{shareCampus.nickName}}</div>
        </div>
        <v-simple-table class="mt-5">
          <template v-slot:default>
            <tbody>
              <tr>
                <td>校区</td>
                <td>{{ shareCampus.schoolAddress }}</td>
              </tr>
              <tr>
                <td>分享时间</td>
                <td>{{ shareCampus.shareTime }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
      <v-card class="pa-5 ml-8 text-justify" style="width: 60%">
        {{shareCampus.shareContent}}
        <v-img
          max-width="200"
          max-height="200"
          class="mt-5"
          :src="BASE_URL + '/' + shareCampus.sharePicture"
          @click="$refs.img.scaleImg(BASE_URL + '/' + shareCampus.sharePicture)"
        ></v-img>
      </v-card>
    </v-card>
    <div class="text-center mt-4" v-if="shareCampus.auditStatus === 2">
      <v-btn
        large
        color="error"
        class="mx-2"
        @click="openDialog(0)"
      >
        审核不通过
      </v-btn>
      <v-btn
        large
        color="success"
        class="mx-2"
        @click="openDialog(1)"
      >
        审核通过
      </v-btn>
    </div>

    <div class="text-center mt-4 green--text" v-if="shareCampus.auditStatus === 1">
      审核已通过
    </div>
    <div class="text-center mt-4 red--text" v-if="shareCampus.auditStatus === 0">
      审核未通过
    </div>

    <v-dialog v-model="passReview" max-width="500px">
      <v-card>
        <v-card-title class="headline">确定{{flag ? '' : '不'}}通过审核?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click="cancelReview" text>取消</v-btn>
          <v-btn color="blue darken-1" text @click="confirmReview">确定</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import imgDialog from '../../../../components/imgDialog'
import { 
  BASE_URL,
  H_config
} from '../../../../network/config';
import {
  updateShareSchoolStatus
} from '../../../../network/user';
import toast from '../../../../components/toast';
  export default {
    name: 'reviewUser',
    data() {
      return {
        BASE_URL: BASE_URL,
        shareCampus: {},
        passReview: false,
        flag: null
      }
    },
    components: {
      imgDialog,
      toast
    },
    mounted() {
      this.shareCampus = this.$store.state.shareCampus
    },
    methods: {
      openDialog(flag) {
        this.flag = flag
        this.passReview = true
      },
      cancelReview() {
        this.passReview = false
      },
      confirmReview() {
        this.passReview = false
        updateShareSchoolStatus({
          auditStatus: this.flag,
          shareId: this.shareCampus.shareId
        }).then(res => {
          if(res.code === H_config.STATECODE_getShareSchoolByStatus_SUCCESS) {
            this.shareCampus.auditStatus = this.flag
            this.$refs.toast.setAlert('修改成功')
            setTimeout(() => {
              this.$router.go(-1)
            },500);
          } else {
            this.$refs.toast.setAlert('修改失败', 'error')
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>