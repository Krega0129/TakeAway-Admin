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
    }
  },
  actions: {
    
  },
  modules: {
  },
  plugins: [createPersistedState()],
})
