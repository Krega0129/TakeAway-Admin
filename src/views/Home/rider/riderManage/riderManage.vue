<template>
  <div class="riderManage">
    <v-data-table
      :headers="headers"
      :items="riders"
      class="elevation-1"
      :search="search"
      no-data-text="没有数据"
      :custom-filter="filterOnlyCapsText"
      item-key="riderName"
      :items-per-page="5"
      v-if="this.$route.meta.title === '骑手管理'"
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
  name: 'riderManage',
  data() {
    return {
      headers: [
        {
          text: '姓名',
          align: 'start',
          sortable: false,
          value: 'riderName'
        },
        {
          text: '电话号码',
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
        }
      ],
      riders: [
        {
          riderName: '啊强',
          riderTel: '1111111111111'
        },
        {
          riderName: '啊龙',
          riderTel: '1111111111111'
        },
        {
          riderName: '啊锴',
          riderTel: '1111111111111'
        }
      ],
      search: '',
      editIndex: -1,
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
      this.$router.push('riderManage/banAccount')
    },
  }
}
</script>