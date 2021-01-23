<template>
  <div class="user">
    <v-data-table
      :headers="headers"
      :items="users"
      class="elevation-1"
      :search="search"
      no-data-text="没有数据"
      :custom-filter="filterOnlyCapsText"
      item-key="userName"
      :items-per-page="5"
      :show-select="multiSelect"
      :single-select="singleSelect"
      v-model="selected"
      v-if="this.$route.meta.title === '分享校园'"
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
        </v-toolbar>
      </template>

      <template v-slot:[`item.img`]="{ item }">
        <v-img
          class="my-1"
          max-width="50"
          max-height="50"
          :src="item.img"
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
    <router-view v-else></router-view>
  </div>
</template>

<script>
  export default {
    name: 'user',
    data() {
      return {
        headers: [
          {
            text: '用户名',
            align: 'start',
            sortable: false,
            value: 'userName'
          },
          {
            text: '账号',
            align: 'center',
            sortable: false,
            value: 'userAccount'
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
            value: 'content'
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
        selected: []
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
        this.orderIndex = this.users.indexOf(item)
        this.$router.push('user/reviewUser')
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
