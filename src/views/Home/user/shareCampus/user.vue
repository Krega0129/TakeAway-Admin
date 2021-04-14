<template>
  <div class="user">
    <img-dialog ref="img"></img-dialog>
    <toast ref="toast"></toast>

    <div v-if="this.$route.meta.title === '分享校园'">
      <v-data-table
        :headers="headers"
        :items="records"
        class="elevation-1"
        :search="search"
        no-data-text="没有数据"
        :custom-filter="filterOnlyCapsText"
        item-key="userName"
        hide-default-footer
        :loading="loading"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="搜索记录"
              class="mt-6"
            ></v-text-field>
            <v-spacer></v-spacer>

            <v-select
              dense
              class="mt-6 mx-5"
              :items="status"
              style="width: 30px"
              label="未审核"
              solo
              v-model="selectStatusVal"
            ></v-select>

            <v-select
              v-if="$store.state.topManager"
              dense
              class="mt-6"
              :items="campus"
              style="width: 30px"
              label="全部校区"
              solo
              v-model="selectCampusVal"
            ></v-select>
            <!-- <v-btn
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
            </v-btn> -->
          </v-toolbar>
        </template>

        <template v-slot:[`item.img`]="{ item }">
          <v-img
            class="my-1"
            max-width="50"
            max-height="50"
            :src="BASE_URL + '/' + item.sharePicture"
            @click="$refs.img.scaleImg(BASE_URL + '/' + item.sharePicture)"
          ></v-img>
        </template>
        
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn 
            small
            dark
            class="mx-2"
            @click="reviewUser(item)">
          <v-icon
            small
            class="mr-2"
          >
            mdi-menu
          </v-icon>
          详情
          </v-btn>
        </template>
      </v-data-table>
      <div class="text-center">
        <v-container>
          <v-row justify="center">
            <v-col cols="8">
              <v-container class="max-width">
                <v-pagination
                  v-model="page"
                  :length="totalPages"
                  @input="_getShareSchoolByStatus"
                ></v-pagination>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import {
    getShareSchoolByStatus,
    updateShareSchoolStatus
  } from '../../../../network/user';
  import {
    getAllCampus
  } from '../../../../network/work'
  import { 
    H_config,
    BASE_URL
    } from '../../../../network/config';
  import imgDialog from '../../../../components/imgDialog';
  import toast from '../../../../components/toast';

  export default {
    name: 'user',
    data() {
      return {
        BASE_URL: BASE_URL,
        headers: [
          {
            text: '用户名',
            align: 'start',
            sortable: false,
            value: 'nickName'
          },
          {
            text: '图片',
            align: 'start',
            sortable: false,
            value: 'img'
          },
          {
            text: '内容',
            align: 'center',
            sortable: false,
            width: 400,
            value: 'shareContent'
          },
          {
            text: '操作',
            align: 'center',
            sortable: false,
            value: 'actions'
          }
        ],
        users: [
          // {
          //   userName: '啊强',
          //   userAccount: '11111111111',
          //   content: '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
          //   img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3155998395,3600507640&fm=26&gp=0.jpg'
          // },
          // {
          //   userName: '啊龙',
          //   userAccount: '11111111111',
          //   content: 'asdhgakdgrgirtyrhhg',
          //   img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3155998395,3600507640&fm=26&gp=0.jpg'
          // },
          // {
          //   userName: '啊锴',
          //   userAccount: '11111111111',
          //   content: 'asdhgakdgrgirtyrhhg',
          //   img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3155998395,3600507640&fm=26&gp=0.jpg'
          // }
        ],
        search: '',
        multiSelect: false,
        singleSelect: false,
        // selected: [],
        status: ['未审核', '审核已通过', '审核未通过'],
        campus: ['全部校区'],
        selectStatusVal: '未审核',
        selectCampusVal: '全部校区',
        selectStatusIndex: 2,
        page: 1,
        totalPages: 1,
        records: [],
        loading: true
      }
    },
    components: {
      imgDialog,
      toast
    },
    async mounted() {
      await getAllCampus().then(res => {
        if(res && res.code == H_config.STATECODE_campus_SUCCESS) {
          let campusList = res.data
          for(let campus of campusList) {
            this.campus.push(campus.campusName)
          }
        } else {
          this.$refs.toast.setAlert('网络异常', 'error')
        }
      })

      this._getShareSchoolByStatus()
    },
    watch: {
      selectStatusVal(val) {
        switch(val) {
          case '未审核': this.selectStatusIndex = 2; break;
          case '审核已通过': this.selectStatusIndex = 1; break;
          case '审核未通过': this.selectStatusIndex = 0;
        }
        this.loading = true
        this._getShareSchoolByStatus()
      },
      selectCampusVal() {
        this.loading = true
        this._getShareSchoolByStatus()
      },
      '$route'(val) {
        if(val.fullPath === '/admin/shareCampus') {
          this.loading = true
          this._getShareSchoolByStatus()
        }
      }
    },
    methods: {
      filterOnlyCapsText(value, search, item) {
      return value != null &&
        search != null &&
        typeof value === 'string' &&
        value.toString().indexOf(search) !== -1;
      },
      reviewUser(item) {
        this.$store.commit('updateShareCampus', item)
        this.$router.push('shareCampus/reviewShareCampus')
      },
      // reviewMultiPass() {
      //   console.log('批量通过');
      // },
      // reviewMultiOut() {
      //   console.log('批量淘汰');
      // }
      _getShareSchoolByStatus() {
        getShareSchoolByStatus({
          auditStatus: this.selectStatusIndex,
          campusName: localStorage.getItem('campusAddress') === '管理员' ? this.selectCampusVal =='全部校区' ? '' : this.selectCampusVal : localStorage.getItem('campusAddress'),
          pageNum: this.page,
          pageSize: 6
        }).then(res => {
          if(res && res.code && res.code === H_config.STATECODE_getShareSchoolByStatus_SUCCESS) {
            this.loading = false
            this.page = res.data.pageNum
            this.totalPages = res.data.pages
            this.records = res.data.list
          } else {
            this.$refs.toast.setAlert('加载失败', 'error')
          }
        })
      }
    }
  }
</script>

<style lang="sass" scoped>

</style>
