import Vue from 'vue'
import VueRouter from 'vue-router'

const Admin = () => import('@/views/admin');
const Login = () => import('@/views/login');

const Money = () => import('@/views/Home/work/money');
const Campus = () => import('@/views/Home/work/campus');
const Poster = () => import('@/views/Home/work/poster');
const SearchOrder = () => import('@/views/Home/work/searchOrder');
const ShopOptions = () => import('@/views/Home/work/shopOptions');

const NewShop = () => import('@/views/Home/shop/newShop');
const ShopRenewInfo = () => import('@/views/Home/shop/shopRenewInfo');
const CheckShop = () => import('@/views/Home/shop/checkShop');
const ShopRenewDetails = () => import('@/views/Home/shop/shopRenewDetails')

const RiderVerify = () => import('@/views/Home/rider/riderVerify');
const BanAccount = () => import('@/views/Home/rider/banAccount');

const User = () => import('@/views/Home/user/user');

Vue.use(VueRouter)

const adminRoute = [
  {
    path: '',
    redirect: 'money'
  },
  {
    path: 'money',
    meta: {
      title: '资金管理'
    },
    component: Money
  },
  {
    path: 'campus',
    meta: {
      title: '设置校区'
    },
    component: Campus
  },
  {
    path: 'poster',
    meta: {
      title: '海报设置'
    },
    component: Poster
  },
  {
    path: 'searchOrder',
    meta: {
      title: '订单查询'
    },
    component: SearchOrder
  },
  {
    path: 'shopOptions',
    meta: {
      title: '店铺选项'
    },
    component: ShopOptions
  },
  {
    path: 'newShop',
    meta: {
      title: '新店申请'
    },
    component: NewShop
  },
  {
    path: 'shopRenewInfo',
    meta: {
      title: '修改审核'
    },
    component: ShopRenewInfo
  },
  {
    path: 'checkShop',
    meta: {
      title: '查看信息'
    },
    component: CheckShop
  },
  {
    path: 'riderVerify',
    meta: {
      title: '信息审核'
    },
    component: RiderVerify
  },
  {
    path: 'banAccount',
    meta: {
      title: '封停账号'
    },
    component: BanAccount
  },
  {
    path: 'user',
    meta: {
      title: '分享校园'
    },
    component: User
  },

  {
    path: 'shopRenewDetails',
    meta: {
      title: '审核信息详情'
    },
    component: ShopRenewDetails
  }
]

const routes = [
  {
    path: '/',
    redirect: '/admin'
  },
  {
    path: '/admin',
    meta: {
      title: '管理系统'
    },
    component: Admin,
    children: adminRoute,
    // 判断是否登录
    beforeEnter: (to, from, next) => {
      if (!localStorage.takeAwayManage_TOKEN) {
        next({ [meta.title]: 'login' })
      } else {
        next()
      }
    }
  },
  {
    path: '/login',
    meta: {
      title: '登录'
    },
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
