<template>
  <div class="riderVerify">
    <v-data-table
      :headers="headers"
      :items="riders"
      class="elevation-1"
      :search="search"
      no-data-text="没有数据"
      :custom-filter="filterOnlyCapsText"
      :show-select="multiSelect"
      item-key="riderName"
      :items-per-page="5"
      :single-select="singleSelect"
      v-model="selected"
      v-if="this.$route.meta.title === '信息审核'"
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
            label="请选择校区"
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

          <v-dialog v-model="reviewRider" max-width="500px">
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
          @click="riderDetails(item)">
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
    <router-view v-else></router-view>
  </div>
</template>

<script>
  export default {
    name: 'riderVerify',
    data() {
      return {
        headers: [
          {
            text: '骑手姓名',
            align: 'start',
            sortable: false,
            value: 'riderName'
          },
          {
            text: '骑手电话',
            align: 'center',
            sortable: false,
            value: 'riderTel'
          },
          {
            text: '详情',
            align: 'center',
            sortable: false,
            value: 'actions',
            width: 200
          },
        ],
        riders: [
          {
            riderName: '啊强',
            riderTel: '111111111111'
          },
          {
            riderName: '啊龙',
            riderTel: '222222222222'
          }
        ],
        search: '',
        reviewRider: false,
        editIndex: -1,
        multiSelect: false,
        singleSelect: false,
        selected: [],
        selectItem: ['广工', '广大']
      }
    },
    methods: {
      filterOnlyCapsText(value, search, item) {
        return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().indexOf(search) !== -1;
      },
      riderDetails(item) {
        this.editIndex = this.riders.indexOf(item)
        this.$router.push('riderVerify/riderDetails')
      },
      cancelReview() {
        this.editIndex = -1;
        this.deleteShop = false
      },
      confirmReview() {
        this.riders.slice(this.editIndex, 1)
        this.editIndex = -1;
        this.deleteShop = false
      },
      reviewMultiPass() {
        console.log('批量通过');
      },
      reviewMultiOut() {
        console.log('批量淘汰');
      }
    }
  }
</script>

<style lang="sass" scoped>

</style>
