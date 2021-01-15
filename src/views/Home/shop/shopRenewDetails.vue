<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="details"
      class="elevation-1"
      no-data-text="没有数据"
      item-key="shopName"
      hide-default-footer
    >
      <template v-slot:top>
        <v-toolbar flat>
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
    </v-data-table>
    <div class="text-center mt-4">
      <v-btn
        large
        color="error"
        class="mx-2"
      >
        审核不通过
      </v-btn>
      <v-btn
        large
        color="success"
        class="mx-2"
      >
        审核通过
      </v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'shopRenewDetails',
    data() {
      return {
        passReview: false,
        headers: [
          {
            text: '商铺原信息',
            align: 'center',
            sortable: false,
            value: 'oldDetails',
          },
          { 
            text: '新信息', 
            value: 'newDetails', 
            align: 'center',
            sortable: false 
          }
        ],
        details: [
          
        ]
      }
    },
    methods: {
      confirmReview() {
        console.log('审核通过');
      },
      cancelReview() {
        console.log('审核不通过');
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>