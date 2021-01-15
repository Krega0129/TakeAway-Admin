<template>
  <div class="checkShop">
    <v-data-table
      :headers="headers"
      :items="shopInfo"
      class="elevation-1"
      no-data-text="没有数据"
      hide-default-footer
      hide-default-header
      item-key="infoName"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{shopName}}</v-toolbar-title>
        </v-toolbar>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  export default {
    name: 'checkShop',
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
        shopInfo: [
          {
            infoName: '商铺名',
            infoValue: '潮汕小吃'
          },
          {
            infoName: '地址',
            infoValue: '南亭'
          },
          {
            infoName: '电话',
            infoValue: '1111111111'
          },
        ],
        shopName: '商家名字'
      }
    }
  }
</script>

<style lang="sass" scoped>

</style>
