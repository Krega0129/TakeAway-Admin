<template>
  <v-app class="admin">
    <v-navigation-drawer app fixed width="180" v-model="drawer" color="blue-grey darken-3" stateless>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title text-center white--text pt-2 pb-5">
            后台管理系统
          </v-list-item-title>
          <v-card class="mx-auto mt-4 rounded-0 blue-grey darken-3" style="box-shadow: none">
            <v-list>
              <div v-for="item in items" :key="item.title">
                <v-list-group v-if="item.items">
                  <template v-slot:activator>
                    <v-list-item-content class="pl-4 text--white">
                      <v-list-item-title v-text="item.title" class="text-caption"></v-list-item-title>
                    </v-list-item-content>
                  </template>

                  <v-list-item v-for="subItem in item.items" :to="subItem.route" :key="subItem.title" class="blue-grey darken-4">
                    <v-list-item-content>
                      <v-list-item-title v-text="subItem.title" class="text-caption"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-group>

                <v-list-item v-else :to="item.route">
                  <v-list-item-content class="pl-4">
                    <v-list-item-title v-text="item.title" class="text-caption"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </div>
            </v-list>
          </v-card>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="blue"></v-app-bar-nav-icon>
      {{title}}
      <!-- 图标分界 -->
      
      <!-- <v-btn icon>
        <v-icon>mdi-autorenew</v-icon>
      </v-btn> -->

      <v-spacer></v-spacer>

        你好，{{campusAddress}}

      <!-- <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn> -->
      <v-menu
        bottom
        right
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-if="topManager" @click="accountManage = true">
            <v-list-item-title class="black--text px-4"> 账号管理 </v-list-item-title>
          </v-list-item>
          <v-list-item @click="logOut">
            <v-list-item-title class="black--text px-4"> 退出登录 </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-dialog v-model="accountManage" max-width="800">
        <v-card>
          <v-toolbar dense flat>
            <v-toolbar-title>账号管理</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              color="success"
              @click="setAccount = true"
              small
            >
              新增账号
            </v-btn>
          </v-toolbar>
          <v-data-table
            :headers="accountHeaders"
            :items="accountItems"
            class="elevation-1"
            no-data-text="没有数据"
            hide-default-footer
            item-key="managerId"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon
                @click="chooseCampus(item)"
              >
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-dialog>

      <v-dialog v-model="setAccount" max-width="600">
        <v-card>
          <v-card-title>新增账号</v-card-title>
          <v-form
            v-model="valid"
          >
            <v-card-text>
              <v-row>
                <v-col cols="5">
                  <v-text-field
                    :rules="accountRules"
                    label="账号"
                    v-model="account"
                  ></v-text-field>
                </v-col>
                <v-col cols="5">
                  <v-text-field
                    :type="showPassword ? 'text' : 'password'"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    label="密码"
                    v-model="password"
                    :rules="passwordRules"
                    @click:append="showPassword = !showPassword"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="5">
                  <v-text-field
                    :rules="rules"
                    label="校区"
                    v-model="campus"
                  ></v-text-field>
                </v-col>
                <v-col cols="5">
                  <v-text-field
                    label="微信号"
                    v-model="wechat"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </v-form>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="setAccount = false">
              取消
            </v-btn>
            <v-btn color="primary"
              @click="addNewAccount"
              :disabled="!valid"
            >
              确定
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="deleteCampus" max-width="600">
        <v-card>
          <v-card-title>确认删除该账号？</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="deleteCampus = false">
              取消
            </v-btn>
            <v-btn color="primary"
              @click="deleteAccount()"
            >
              确定
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-app-bar>
    <v-main class="main">
      <v-container fluid>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </v-container>
    </v-main>

    <toast ref="toast"></toast>

  </v-app>
</template>

<script>
  import { H_config } from '../network/config';
  import toast from '../components/toast';
  import { 
    getAllManagerAccount,
    deleteManagerAccount,
    addNewManagerAccount
  } from '../network/work';

  export default {
    name: 'admin',
    data() {
      return {
        drawer: true,
        items: [
          {
            action: '平台',
            title: '平台',
            items: [
              {
                action: '海报',
                title: '海报',
                route: '/admin/poster'
              },
              {
                action: '订单查询',
                title: '订单查询',
                route: '/admin/searchOrder'
              },
              {
                action: '公告&提示',
                title: '公告&提示',
                route: '/admin/setNotice'
              },
            ]
          },
          {
            action: '店铺管理',
            title: '店铺管理',
            items: [
              {
                action: '新店申请',
                title: '新店申请',
                route: '/admin/newShop'
              },
              {
                action: '修改审核',
                title: '修改审核',
                route: '/admin/shopRenewInfo'
              },
              {
                action: '店铺列表',
                title: '店铺列表',
                route: '/admin/shopList'
              }
            ]
          },
          {
            action: '骑手管理',
            title: '骑手管理',
            items: [
              {
                action: '信息审核',
                title: '信息审核',
                route: '/admin/riderVerify'
              },
              {
                action: '骑手管理',
                title: '骑手管理',
                route: '/admin/riderManage'
              }
            ]
          },
          {
            action: '用户管理',
            title: '用户管理',
            items: [
              {
                action: '分享校园',
                title: '分享校园',
                route: '/admin/shareCampus'
              },
              {
                action: '快递查询',
                title: '快递查询',
                route: '/admin/express'
              }
            ]
          }
        ],
        title: '资金管理',
        campusAddress: localStorage.getItem('campusAddress'),
        topManager: localStorage.getItem('campusAddress') === '管理员',
        accountManage: false,
        accountHeaders: [
          {
            text: '校区名称',
            align: 'start',
            sortable: false,
            value: 'campusAddress'
          },
          {
            text: '账号',
            align: 'start',
            sortable: false,
            value: 'account'
          },
          {
            text: '密码',
            align: 'start',
            sortable: false,
            value: 'str'
          },
          {
            text: '微信',
            align: 'start',
            sortable: false,
            value: 'wechat'
          },
          {
            text: '操作',
            align: 'center',
            sortable: false,
            value: 'actions'
          }
        ],
        accountItems: [],
        setAccount: false,
        deleteCampus: false,
        managerId: -1,
        accountRules: [
          v => !!v || '内容不能为空',
          v => /^\d{5,9}$/.test(v) || '只能5-9位数字'
        ],
        passwordRules: [
          v => !!v || '内容不能为空',
          v => /^\w{6,16}$/.test(v) || '只能6-16位数字字母下划线'
        ],
        rules: [
          v => !!v || '内容不能为空',
        ],
        showPassword: false,
        valid: true,
        account: '',
        password: '',
        campus: '',
        wechat: ''
      }
    },
    components: {
      toast
    },
    mounted() {
      this.title = this.$route.meta.title
      this._getAllManagerAccount()
      if(this.$store.state.topManager || localStorage.getItem('campusAddress') === '管理员') {
        this.items[0].items.push({
          action: '设置校区',
          title: '设置校区',
          route: '/admin/campus'
        }, {
          // 包含查看订单金额
          action: '资金管理',
          title: '资金管理',
          route: '/admin/money'
        }, {
          action: '投诉与建议',
          title: '投诉与建议',
          route: '/admin/advice'
        },)
      } else {
        this.items[0].items.push({
          action: '设置抽成比',
          title: '设置抽成比',
          route: '/admin/profit'
        })
      }
    },
    watch: {
      $route: {
        handler(val, oldval) {
          this.title = val.meta.title
        }
      }
    },
    methods: {
      _getAllManagerAccount() {
        getAllManagerAccount().then(res => {
          if(res.code === H_config.STATECODE_SUCCESS) {
            this.accountItems = res.data
          }
        })
      },
      chooseCampus(item) {
        this.deleteCampus = true
        this.managerId = item.managerId
      },
      logOut() {
        localStorage.removeItem('takeAwayManage_TOKEN')
        localStorage.removeItem('campusAddress')
        history.go(0)
      },
      addNewAccount() {
        addNewManagerAccount({
          account: this.account,
          password: this.password,
          campusAddress: this.campus,
          wechat: this.wechat
        }).then(res => {
          if(res.code === H_config.STATECODE_SUCCESS) {
            this.setAccount = false
            Object.assign(this, {
              account: '',
              password: '',
              campus: '',
              wechat: ''
            })
            this._getAllManagerAccount()
            this.$refs.toast.setAlert('新增成功')
          } else {
            this.$refs.toast.setAlert('新增失败', 'error')
          }
        })
      },
      deleteAccount() {
        deleteManagerAccount({
          managerId: this.managerId
        }).then(res => {
          if(res.code === H_config.STATECODE_SUCCESS) {
            this._getAllManagerAccount()
            this.deleteCampus = false
            this.$refs.toast.setAlert('删除成功')
          } else {
            this.$refs.toast.setAlert('删除失败', 'error')
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep {
    .v-list-group__items>.v-list-item.v-list-item--link.theme--light {
      padding: 0 16px;
    }
    .v-list-item.theme--light {
      padding: 0;
    }
    .v-list-item__title {
      color: white;
    }
    .v-icon.notranslate.mdi.mdi-chevron-down.theme--light {
      margin-right: 10px;
    }
    .mdi-chevron-down::before {
      color: white;
    }
  }

  .main {
    height: 100vh;
    min-width: 600px;
  }
  
  .router-link-active{
    background-color: skyblue;
    color: white;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .25s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
