<template>
  <div class="shopRenewInfo">
    <v-data-table
      :headers="header"
      :items="desserts"
      class="elevation-1"
      :search="search"
      no-data-text="没有数据"
      :custom-filter="filterOnlyCapsText"
      :show-select="multiSelect"
      item-key="shopName"
      :items-per-page="5"
      :single-select="singleSelect"
      v-model="selected"
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
            :dark="multiSelect"
            class="ma-2"
            :disabled="!multiSelect"
            @click="reviewMulti"
          >
            批量通过
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
          mdi-pencil
        </v-icon>
        详情
        </v-btn>
        <v-btn 
            small
            dark
            class="mx-2"
            @click="review(item)">
          <v-icon
            small
            class="mr-2"
          >
            mdi-pencil
          </v-icon>
          审核通过
        </v-btn>
      </template>
      <!-- <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn>
      </template> -->
    </v-data-table>
  </div>
</template>

<script>
  import { reviewDetails } from '../../../network/shop'

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
        selectItem: [ '待审核', '已审核', '已通过', '未通过' ],
        // 通过审核
        passReview: false,
        // 表头
        header: [
          {
            text: '店铺名称',
            align: 'start',
            sortable: false,
            value: 'shopName',
          },
          { 
            text: '审核', 
            value: 'actions', 
            width: 300,
            align: 'center',
            sortable: false 
          },
        ],
        // 数据列表
        desserts: [],
        // 点击的数据索引
        editedIndex: -1
      }
    },
    mounted() {
      this.initialize()
      reviewDetails({auditStatus: 1}).then(res => {
        console.log(res);
        if(res.code == 1200) {
          // this.desserts = res.data
          this.initialize()
        }
      })
    },
    computed: {
      
    },
    watch: {
      selected (val) {
        console.log(val);
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

      initialize () {
        this.desserts = [
          {
            shopName: '15',
          },
          {
            shopName: '14',
          },
          {
            shopName: '13',
          },
          {
            shopName: '12',
          },
          {
            shopName: '11',
          },
          {
            shopName: '10',
          },
          {
            shopName: '9',
          },
          {
            shopName: '8',
          },
          {
            shopName: '7',
          },
          {
            shopName: '6',
          },
          {
            shopName: '5',
          },
          {
            shopName: '4',
          },
          {
            shopName: '3',
          },
          {
            shopName: '2',
          },
          {
            shopName: '1',
          }
        ]
      },
      // 详情
      editItem (item) {
        this.$router.push('/admin/shopRenewDetails')
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
        console.log('审核通过了');
      },
      // 取消
      cancelReview () {
        this.passReview = false
        console.log('取消了');
      },
      // 多选通过
      reviewMulti() {
        
      }
    },
  }
</script>

<style lang="sass" scoped>

</style>