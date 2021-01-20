<template>
  <div class="shopRenewInfo">

    <component
      :is="tip"
      :alertText="alertText"
      :alertType="alertType"
      :showTip="show"
    ></component>

    <v-data-table
      :headers="headers"
      :items="desserts"
      class="elevation-1"
      :search="search"
      no-data-text="没有数据"
      :custom-filter="filterOnlyCapsText"
      :show-select="multiSelect"
      item-key="updateId"
      :items-per-page="5"
      :single-select="singleSelect"
      v-model="selected"
      v-if="this.$route.meta.title === '修改审核'"
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
            class="mt-6"
            :items="selectItem"
            style="width: 30px"
            label="待审核"
            v-model="statusSelectVal"
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
    reviewDetails,
  } from '../../../../network/shop'

  import tip from '../../../../components/tip';
  import { showTip } from '../../../../utils';

  export default {
    data () {
      return {
        // 已经选择的数据
        selected: [],
        // 单选
        singleSelect: false,
        multiSelect: false,
        // 搜索文本
        search: '',
        selectItem: [ '待审核', '已通过', '未通过' ],
        // 通过审核
        passReview: false,
        // 表头
        headers: [
          {
            text: '店铺名称',
            align: 'start',
            sortable: false,
            value: 'shopName',
          },
          {
            text: '修改时间',
            align: 'start',
            sortable: false,
            value: 'auditTime',
          },
          { 
            text: '审核', 
            value: 'actions', 
            width: 300,
            align: 'center',
            sortable: false 
          }
        ],
        // 数据列表
        desserts: [],
        // 点击的数据索引
        editedIndex: -1,
        shopList: [],
        alertText: '',
        alertType: 'success',
        show: false,
        statusSelectVal: '未审核',
        statusSelectIndex: 0
      }
    },
    components: {
      tip,
    },
    mounted() {
      this._reviewDetails()
    },
    computed: {
      tip() {
        return 'tip'
      }
    },
    watch: {
      selected (val) {
        console.log(val);
      },
      $route(val) {
        if(val.fullPath == '/admin/shopRenewInfo') {
          this._reviewDetails()
        }
      },
      statusSelectVal(val) {
        this.statusSelectIndex = this.selectItem.indexOf(val)
        this._reviewDetails()
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
      _reviewDetails() {
        reviewDetails({
          auditStatus: this.statusSelectIndex
        }).then(res => {
          console.log(res);
          if(res.code == 1200) {
            this.desserts = []
            this.shopList = res.data.list
            for(let item of this.shopList) {
              this.desserts.push(item[0])
            }
          }
        })
      },
      // 详情
      editItem (item) {
        // 获取索引
        this.editedIndex = this.desserts.indexOf(item)
        this.$store.commit('changeShopInfo', {
          shopNewInfo: this.shopList[this.editedIndex][0],
          shopOldInfo: this.shopList[this.editedIndex][1]
        })
        this.$router.push('shopRenewInfo/shopRenewDetails')
      },
      // 审核
      review (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.passReview = true
      },
      // 确定
      confirmReview () {
        this.desserts.splice(this.editedIndex, 1)
        this.passReview = false
        showTip.call(this, '审核通过')
      },
      // 取消
      cancelReview () {
        this.passReview = false
        showTip.call(this, '审核已取消', 'error')
      },
      // 多选通过
      reviewMultiPass() {
        console.log('批量通过');
      },
      reviewMultiOut() {
        console.log('批量淘汰');
      }
    },
  }
</script>

<style lang="sass" scoped>

</style>