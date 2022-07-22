import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken } from '@/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getToken() || {},
    // 搜索关键词
    keyword: '',
    // 搜索历史记录
    keywordsHistory: JSON.parse(localStorage.getItem('KEY_HISTORY')) || []
  },
  getters: {},
  mutations: {
    setUser (state, payload) {
      state.user = payload
      setToken(payload)
    },
    setKeyword (state, keyword) {
      state.keyword = keyword
      state.keywordsHistory.unshift(keyword)
      state.keywordsHistory = [...new Set(state.keywordsHistory)]
      localStorage.setItem('KEY_HISTORY', JSON.stringify(state.keywordsHistory))
    },
    clearKeywords (state) {
      state.keywordsHistory = []
    }
  },
  actions: {},
  modules: {}
})
