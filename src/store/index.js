import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 1,
    shopList: [],
    currentShop: {},
    currentShopIndex: -1,
    shopOldInfo: {},
    shopNewInfo: {}
  },
  mutations: {
    increment(state) {
      state.count++
    },
    changeShopInfo(state, payload){
      state.shopOldInfo = payload.shopOldInfo
      state.shopNewInfo = payload.shopNewInfo
      // state.currentShopIndex = payload.currentShopIndex
    }
  },
  actions: {
    increment({ commit }) {
      setInterval(() => {
        commit('increment')
      }, 1000);
    }
  },
  modules: {
  },
  plugins: [createPersistedState()],
})
