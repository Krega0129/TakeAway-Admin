<template>
  <div class="reviewUser">
    <v-card
      class="d-flex pa-5"
      flat
    >
      <div style="width: 25%; max-width: 300px">
        <div class="d-flex">
          <v-img
            class="mx-5"
            max-width="50"
            max-height="50"
            src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3155998395,3600507640&fm=26&gp=0.jpg"
          ></v-img>
          <div class="font-weight-bold">{{userName}}</div>
        </div>
        <v-simple-table class="mt-5">
          <template v-slot:default>
            <tbody>
              <tr
                v-for="item in user"
                :key="item.key"
              >
                <td>{{ item.key }}</td>
                <td>{{ item.val }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
      <v-card class="pa-5 ml-8 text-justify" style="width: 60%">
        内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
        内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
        <v-img
          max-width="200"
          max-height="200"
          class="mt-5"
          src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3155998395,3600507640&fm=26&gp=0.jpg"
        ></v-img>
      </v-card>
    </v-card>
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
    name: 'reviewUser',
    data() {
      return {
        userName: '用户名',
        user: [
          {
            key: '账号',
            val: '1111111111111'
          },
          {
            key: '校区',
            val: '广东工业大学'
          }
        ]
      }
    },
    methods: {

    }
  }
</script>

<style lang="scss" scoped>

</style>