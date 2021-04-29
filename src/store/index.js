import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    topManager: false,

    // shopList: [],
    currentShop: {},
    shopReviewStatus: 0,
    shopId: -1,
    shopOldInfo: {},
    shopNewInfo: {},

    riderStatus: -1,
    riderId: -1,
    // riderIndex: -1,

    order: {},

    shareCampus: {},

    expressDetails: {}
  },
  mutations: {
    login(state, payload) {
      state.topManager = payload === '管理员'
    },
    changeShopInfo(state, payload){
      state.shopOldInfo = payload.shopOldInfo
      state.shopNewInfo = payload.shopNewInfo
    },
    updateExpressOrder(state, payload) {
      state.expressDetails = payload
    },
    updateCurrentShop(state, payload) {
      state.currentShop = payload.shop
      state.shopReviewStatus = payload.status
    },
    updateShopReviewStatus(state, payload) {
      state.shopReviewStatus = payload
    },
    changeShopId(state, payload) {
      state.shopId = payload
    },
    updateRiderId(state, payload) {
      state.riderId = payload
    },
    // updateRiderIndex(state, payload) {
    //   state.riderIndex = payload
    // },
    updateRiderStatus(state, payload) {
      state.riderStatus = payload
    },
    updateOrder(state, payload) {
      state.order = payload
    },
    updateShareCampus(state, payload) {
      state.shareCampus = payload
    }
  },
  actions: {
    
  },
  modules: {
  },
  plugins: [createPersistedState(
    { storage: window.sessionStorage }
  )],
})
