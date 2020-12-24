import Vue from 'vue'
import VueRouter from 'vue-router'

const Admin = () => import('@/views/admin');

const Money = () => import('@/views/Home/work/money');
const Campus = () => import('@/views/Home/work/campus');
const Poster = () => import('@/views/Home/work/poster');
const SearchOrder = () => import('@/views/Home/work/searchOrder');
const ShopOptions = () => import('@/views/Home/work/shopOptions');

const NewShop = () => import('@/views/Home/shop/newShop');
const ShopRenewInfo = () => import('@/views/Home/shop/shopRenewInfo');
const CheckShop = () => import('@/views/Home/shop/checkShop');

const RiderVerify = () => import('@/views/Home/rider/riderVerify');
const BanAccount = () => import('@/views/Home/rider/banAccount');

const User = () => import('@/views/Home/user/user');

Vue.use(VueRouter)

const adminRoute = [
  {
    path: '/',
    redirect: 'money'
  },
  {
    path: 'money',
    component: Money
  },
  {
    path: 'campus',
    component: Campus
  },
  {
    path: 'poster',
    component: Poster
  },
  {
    path: 'searchOrder',
    component: SearchOrder
  },
  {
    path: 'shopOptions',
    component: ShopOptions
  },
  {
    path: 'newShop',
    component: NewShop
  },
  {
    path: 'shopRenewInfo',
    component: ShopRenewInfo
  },
  {
    path: 'checkShop',
    component: CheckShop
  },
  {
    path: 'riderVerify',
    component: RiderVerify
  },
  {
    path: 'banAccount',
    component: BanAccount
  },
  {
    path: 'user',
    component: User
  }
]

const routes = [
  {
    path: '/',
    redirect: '/admin'
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    children: adminRoute
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
