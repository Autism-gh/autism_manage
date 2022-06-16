import Vue from 'vue'

const state = {
  columnsSettings: {}
}

const mutations = {
  SET_COLUMNS: (state, { tag, setting }) => {
    Vue.set(state.columnsSettings, tag, setting)
  }
}

const actions = {
  async getColumns({ state }, tag) {
    return new Promise((resolve, reject) => {
      try {
        if (state.columnsSettings[tag]) {
          resolve(state.columnsSettings[tag])
        } else {
          resolve({ fields: [], pinned: 2 })
        }
      } catch (error) {
        reject(error)
      }
    })
  },

  async setColumns({ commit }, { tag, fields, pinned }) {
    return new Promise((resolve, reject) => {
      try {
        const format = { fields, pinned }
        commit('SET_COLUMNS', { tag, setting: format })
        resolve(format)
      } catch (error) {
        reject(error)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
