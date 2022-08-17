import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userToken: '',
  },
  getters: {
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.userToken = payload;
    },
    DELETE_TOKEN(state) {
      state.userToken = '';
    }
  },
  actions: {
    setToken({commit}, payload) {
      commit('SET_TOKEN', payload);
    },
    deleteToken({commit}) {
      commit('DELETE_TOKEN');
    }
  },
  modules: {
  }
})
