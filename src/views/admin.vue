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
      
      <v-btn icon>
        <v-icon>mdi-autorenew</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-avatar>
        <img
          src="https://cdn.vuetifyjs.com/images/john.jpg"
          alt="John"
        >
      </v-avatar>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main class="main">
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
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
                // 包含查看订单金额
                action: '资金管理',
                title: '资金管理',
                route: '/admin/money'
              },
              {
                action: '订单查询',
                title: '订单查询',
                route: '/admin/searchOrder'
              },
              {
                action: '店铺选项',
                title: '店铺选项',
                route: '/admin/shopOptions'
              },
              {
                action: '海报',
                title: '海报',
                route: '/admin/poster'
              },
              {
                action: '设置校区',
                title: '设置校区',
                route: '/admin/campus'
              }
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
                action: '查看信息',
                title: '查看信息',
                route: '/admin/checkShop'
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
                action: '封停账号',
                title: '封停账号',
                route: '/admin/banAccount'
              }
            ]
          },
          {
            action: '分享校园',
            title: '分享校园',
            route: '/admin/user'
          }
        ],
        title: '资金管理'
      }
    },
    components: {
      
    },
    mounted() {
      // 刷新页面返回资金管理页面
      this.title = this.$route.meta.title
    },
    watch: {
      $route: {
        handler(val, oldval) {
          this.title = val.meta.title
        }
      }
    },
    methods: {
      
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
    // overflow-y: scroll;
  }
</style>
