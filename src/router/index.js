import Vue from 'vue'
import VueRouter from 'vue-router'

const Admin = () => import('@/views/admin');
const Login = () => import('@/views/login');

const Money = () => import('@/views/Home/work/money');
const Campus = () => import('@/views/Home/work/campus');
const Poster = () => import('@/views/Home/work/poster');
const SearchOrder = () => import('@/views/Home/work/searchOrder');
const OrderDetails = () => import('@/views/Home/work/orderDetails');

const NewShop = () => import('@/views/Home/shop/newShop/newShop');
const NewShopInfo = () => import('@/views/Home/shop/newShop/newShopInfo')
const ShopRenewInfo = () => import('@/views/Home/shop/shopRenewInfo/shopRenewInfo');
const ShopInfo = () => import('@/views/Home/shop/shopInfo/shopInfo');
const ShopRenewDetails = () => import('@/views/Home/shop/shopRenewInfo/shopRenewDetails')
const ShopList = () => import('@/views/Home/shop/shopInfo/shopList')

const RiderVerify = () => import('@/views/Home/rider/riderVerify/riderVerify');
const RiderDetails = () => import('@/views/Home/rider/riderVerify/riderDetails');
const RiderManage = () => import('@/views/Home/rider/riderManage/riderManage')
const RiderInfo = () => import('@/views/Home/rider/riderManage/riderInfo');

const User = () => import('@/views/Home/user/shareCampus/user');
const ReviewUser = () => import('@/views/Home/user/shareCampus/reviewUser')
const Express = () => import('@/views/Home/user/express/express')
const ExpressDetails = () => ('@//views/Home/user/express/expressDetails')

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
    component: SearchOrder,
    children: [
      {
        path: 'orderDetails',
        meta: {
          title: '订单详情'
        },
        component: OrderDetails
      },
    ]
  },
  {
    path: 'newShop',
    meta: {
      title: '新店申请'
    },
    component: NewShop,
    children: [
      {
        path: 'newShopInfo',
        meta: {
          title: '店铺审核信息'
        },
        component: NewShopInfo
      }
    ]
  },
  {
    path: 'shopRenewInfo',
    meta: {
      title: '修改审核'
    },
    component: ShopRenewInfo,
    children: [
      {
        path: 'shopRenewDetails',
        meta: {
          title: '审核信息详情'
        },
        component: ShopRenewDetails
      },
    ]
  },
  {
    path: 'shopList',
    meta: {
      title: '店铺列表'
    },
    component: ShopList,
    children: [
      {
        path: 'shopInfo',
        meta: {
          title: '店铺详情'
        },
        component: ShopInfo
      }
    ]
  },
  {
    path: 'riderVerify',
    meta: {
      title: '信息审核'
    },
    component: RiderVerify,
    children: [
      {
        path: 'riderDetails',
        meta: {
          title: '骑手详情'
        },
        component: RiderDetails,
      }
    ]
  },
  {
    path: 'riderManage',
    meta: {
      title: '骑手管理'
    },
    component: RiderManage,
    children: [
      {
        path: 'riderInfo',
        meta: {
          title: '账号管理'
        },
        component: RiderInfo
      }
    ]
  },
  {
    path: 'shareCampus',
    meta: {
      title: '分享校园'
    },
    component: User,
    children: [
      {
        path: 'reviewShareCampus',
        meta: {
          title: '分享校园审核'
        },
        component: ReviewUser
      }
    ]
  },
  {
    path: 'express',
    meta: {
      title: '快递查询'
    },
    component: Express,
    children: [
      {
        path: 'expressDetails',
        meta: {
          title: '快递详情'
        },
        component: ExpressDetails
      }
    ]
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
      if (!localStorage.getItem('takeAwayManage_TOKEN')) {
        next({ path: '/login' })
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
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
