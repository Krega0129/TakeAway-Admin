<template>
  <div class="banAccount">
    <v-data-table
      :headers="headers"
      :items="riderInfo"
      class="elevation-1"
      no-data-text="没有数据"
      hide-default-footer
      hide-default-header
      item-key="infoName"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{riderName}}</v-toolbar-title>
        </v-toolbar>
      </template>
    </v-data-table>
    <div class="text-center mt-4">
      <v-btn
        large
        color="error"
        class="mx-2"
      >
        封停账号
      </v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'banAccount',
    data() {
      return {
        headers: [
          {
            text: '信息名称',
            align: 'start',
            sortable: false,
            value: 'infoName',
          },
          {
            text: '信息值',
            align: 'start',
            sortable: false,
            value: 'infoValue',
          }
        ],
        riderInfo: [
          {
            infoName: '姓名',
            infoValue: '啊强'
          },
          {
            infoName: '电话号码',
            infoValue: '12345678910'
          },
          {
            infoName: '校区',
            infoValue: '广工'
          }
        ],
        riderName: '骑手姓名'
      }
    }
  }
</script>

<style lang="sass" scoped>

</style>