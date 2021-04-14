<template>
  <v-card 
    tile
    class="d-flex justify-center"
    color="blue-grey darken-4"
    style="width: 100%; height: 100vh;"
  >

    <toast ref="toast"></toast>

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
        :append-icon="showPassW ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="passwordRules"
        :type="showPassW ? 'text' : 'password'"
        label="密码"
        @click:append="showPassW = !showPassW"
        required
      ></v-text-field>

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
  import toast from '../components/toast';
import { H_config } from '../network/config';
  import { 
    login
   } from "../network/work";

  export default {
    data() {
      return {
        // 是否合法
        valid: true,
        // 显示密码
        showPassW: false,
        account: '',
        accountRules: [
          v => !!v || '账号不能为空',
          v => (v && v.length <= 10) || '账号长度不能超过10个字',
        ],
        password: '',
        passwordRules: [
          v => (!!v && v.length >= 5 && v.length <= 16) || '密码长度必须为6-16位',
          v => /^[a-zA-Z0-9_]{5,16}$/.test(v) || '密码含非法字符',
        ]
      }
    },
    components: {
      toast
    },
    methods: {
      validate () {
        this.$refs.form.validate()
        // if(this.account == 'admin' && this.password === 'admin') {
        //   localStorage.setItem('takeAwayManage_TOKEN', 11)
        //   localStorage.setItem('account', this.account)
        //   this.$store.commit('login', this.account)
        //   this.$refs.toast.setAlert('登录成功')
        //   this.$router.replace('/admin') 
        // } else {
        //   this.$refs.toast.setAlert('账号或密码错误', 'error')
        // }
        login({
          account: this.account,
          password: this.password
        }).then(res => {
          if(res.code === H_config.STATECODE_SUCCESS) {
            localStorage.setItem('takeAwayManage_TOKEN', res.data.token);
            localStorage.setItem('campusAddress', res.data.campusAddress || '管理员')
            this.$store.commit('login', res.data.campusAddress || '管理员')
            this.$refs.toast.setAlert('登录成功')
            this.$router.replace('/admin/poster') 
          } else {
            this.$refs.toast.setAlert('账号或密码错误', 'error')
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>