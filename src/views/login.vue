<template>
  <v-card 
    tile
    class="d-flex justify-center"
    color="blue-grey darken-4"
    style="width: 100%; height: 100vh;"
  >
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      style="width: 300px; height: 300px"
      class="align-self-center white px-6 pt-3 rounded"
    >
      <div class="text-h6 text-center font-weight-bold my-3">管理员登录</div>
      <v-text-field
        v-model="account"
        :counter="10"
        :rules="accountRules"
        label="管理员账号"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="passwordRules"
        :type="show ? 'text' : 'password'"
        label="密码"
        @click:append="show = !show"
        required
      ></v-text-field>

      <div class="tag d-flex justify-space-between text-caption">
        <a href="#">注册账号</a>
        <a href="#">忘记密码</a>
      </div>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mt-4"
        style="width:100%"
        @click="validate"
      >
        登录
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
  export default {
    data() {
      return {
        // 是否合法
        valid: true,
        // 显示密码
        show: false,
        account: '',
        accountRules: [
          v => !!v || '账号不能为空',
          v => (v && v.length <= 10) || '账号长度不能超过10个字',
        ],
        password: '',
        passwordRules: [
          v => (!!v && v.length >= 6 && v.length <= 16) || '密码长度必须为6-16位',
          v => /^[a-zA-Z0-9_]{6,16}$/.test(v) || '密码含非法字符',
        ]
      }
    },
    mounted() {
      // 测试vuex
      // this.$store.dispatch('increment')
    },
    methods: {
      validate () {
        this.$refs.form.validate()
      }
    }
  }
</script>

<style scoped>

</style>