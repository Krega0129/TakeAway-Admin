<template>
  <div class="newShop">

    <toast ref="toast"></toast>
    <img-dialog ref="img"></img-dialog>

    <v-data-table
      :headers="header"
      :items="shops"
      class="elevation-1"
      :search="search"
      no-data-text="没有数据"
      :custom-filter="filterOnlyCapsText"
      :show-select="multiSelect"
      item-key="shopId"
      :items-per-page="5"
      :single-select="singleSelect"
      v-model="selected"
      :loading="loading"
      loading-text="加载中...请稍后"
      v-if="this.$route.meta.title === '新店申请'"
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
            class="mt-6 mx-5"
            :items="status"
            style="width: 30px"
            label="未审核"
            solo
            v-model="selectStatusVal"
          ></v-select>

          <v-select
            v-if="topManager"
            dense
            class="mt-6"
            :items="campus"
            style="width: 30px"
            label="全部校区"
            solo
            v-model="selectCampusVal"
          ></v-select>

          <v-spacer></v-spacer>

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

          <v-dialog v-model="passReview" max-width="500px">
            <v-card>
              <v-card-title class="headline">确定通过审核?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="cancelReview">取消</v-btn>
                <v-btn color="blue darken-1" text @click="confirmReview">确定</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:[`item.shopHead`]="{ item }">
        <v-img
          class="my-1"
          max-width="50"
          max-height="50"
          @click="$refs.img.scaleImg(BASE_URL + '/' + item.shopHead)"
          :src="BASE_URL + '/' + item.shopHead"
        ></v-img>
      </template>
      
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn 
          small
          dark
          class="mx-2"
          @click="editItem(item)">
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
            v-if="statusSelectIndex == 0"
            color="success"
            class="mx-2"
            @click="review(item)">
          <v-icon
            small
            class="mr-2"
          >
            mdi-check
          </v-icon>
          审核通过
        </v-btn>
      </template>
    </v-data-table>
    <router-view v-else></router-view>
  </div>
</template>

<script>
  import {
    reviewNewShop,
    getShop
  } from '../../../../network/shop'
  import {
    getAllCampus
  } from '../../../../network/work'
  import { 
    BASE_URL,
    H_config
  } from '../../../../network/config'
  import toast from '../../../../components/toast.vue';
  import imgDialog from '../../../../components/imgDialog';

  export default {
    name: 'newShop',
    data() {
      return {
        topManager: localStorage.getItem('campusAddress') === '管理员',
        selected: [],
        singleSelect: false,
        multiSelect: false,
        search: '',
        passReview: false,
        header: [
          {
            text: '店铺名称',
            align: 'start',
            sortable: false,
            value: 'shopName',
          },
          {
            text: '头像',
            align: 'start',
            sortable: false,
            value: 'shopHead'
          },
          { 
            text: '审核', 
            value: 'actions', 
            width: 300,
            align: 'center',
            sortable: false 
          },
        ],
        shops: [],
        editedIndex: -1,
        BASE_URL: BASE_URL,
        campus: ['全部校区'],
        status: ['未审核', '已通过', '未通过'],
        selectCampusVal: '全部校区',
        selectStatusVal: '未审核',
        campusSelectIndex: 0,
        statusSelectIndex: 0,
        loading: true
      }
    },
    components: {
      toast,
      imgDialog
    },
    async mounted() {
      this.topManager && await getAllCampus().then(res => {
        if(res && res.code == H_config.STATECODE_campus_SUCCESS) {
          console.log(res);
          let campusList = res.data
          for(let campus of campusList) {
            this.campus.push(campus.campusName)
          }
        } else {
          this.$refs.toast.setAlert('网络异常', 'error')
        }
      })
      this._getShop()
    },
    watch: {
      selected (val) {
        console.log(val);
      },
      '$route'(val) {
        if(val.fullPath == '/admin/newShop') {
          this.loading = true
          this._getShop()
        }
      },
      selectCampusVal(val) {
        this.campusSelectIndex = this.campus.indexOf(val)
        this.loading = true
        this._getShop()
      },
      selectStatusVal(val) {
        this.statusSelectIndex = this.status.indexOf(val)
        this.loading = true
        this._getShop()
      }
    },
    methods: {
      // 搜索过滤条件
      filterOnlyCapsText (value, search, item) {
        return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().indexOf(search) !== -1
      },
      _getShop() {
        getShop({
          auditStatus: this.statusSelectIndex,
          address: this.topManager ? this.selectCampusVal =='全部校区' ? '' : this.selectCampusVal : localStorage.getItem('campusAddress')
        }).then(res => {
          if(res && res.code == H_config.STATECODE_get_SUCCESS) {
            // this.$store.commit('updateShopList', res.data)
            this.shops = res.data
          } else if(res && res.code == H_config.STATECODE_getNull_FAILED) {
            // this.$store.commit('updateShopList', [])
            this.shops = []
          } else {
            this.$refs.toast.setAlert('网络异常', 'error')
          }
          this.loading = false
        })
      },
      // 详情
      editItem (item) {
        this.editedIndex = this.shops.indexOf(item)
        this.$store.commit('updateCurrentShop', { shop: item, status: this.statusSelectIndex })
        this.$router.push('newShop/newShopInfo')
      },
      // 审核
      review (item) {
        this.editedIndex = this.shops.indexOf(item)
        this.passReview = true
      },
      // 确定
      confirmReview () {
        this.passReview = false
        reviewNewShop({
          auditStatus: 1,
          shopIds: this.shops[this.editedIndex].shopId
        }).then(res => {
          if(res.code == H_config.STATECODE_update_SUCCESS) {
            this.shops.splice(this.editedIndex, 1)
            this.$refs.toast.setAlert('审核已通过')
          } else {
            this.$refs.toast.setAlert('审核失败', 'error')
          }
        })
      },
      // 取消
      cancelReview () {
        this.passReview = false
        this.$refs.toast.setAlert('审核已取消')
      },
      // 多选通过
      reviewMultiPass() {
        console.log('批量通过');
      },
      reviewMultiOut() {
        console.log('批量淘汰');
      }
    }
  }
</script>