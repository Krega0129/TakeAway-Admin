import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    shopList: [],
    currentShop: {},
    currentShopIndex: -1,
    shopReviewStatus: 0,
    shopId: -1,
    shopOldInfo: {},
    shopNewInfo: {}
  },
  mutations: {
    changeShopInfo(state, payload){
      state.shopOldInfo = payload.shopOldInfo
      state.shopNewInfo = payload.shopNewInfo
    },
    updateShopList(state, payload) {
      state.shopList = payload
    },
    updateCurrentShop(state, payload) {
      state.currentShop = payload.shop
      state.shopReviewStatus = payload.status
    },
    changeShopId(state, payload) {
      state.shopId = payload
    }
  },
  actions: {
    
  },
  modules: {
  },
  plugins: [createPersistedState()],
})
