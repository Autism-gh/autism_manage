const state = {
    progressList: []
}

const mutations = {
    SET_PROGRESS: (state, progressObj) => {
        if (state.progressList.length) {
            const index = state.progressList.findIndex(item => item.path === progressObj.path)
            // 如果存在该下载修改进度
            if (index !== -1) {
                state.progressList[index].progress = progressObj.progress
            } else {
                state.progressList.push(progressObj)
            }
        } else {
            state.progressList.push(progressObj)
        }
    },

    DEL_PROGRESS: (state, props) => {
        state.progressList = state.progressList.filter(item => item.path !== props)
    },

    CHANGE_SETTING: (state, { key, value  }) => {
        // eslint-disable-next-line no-prototype-builtins
        if (state.hasOwnProperty(key)) {
            state[key] = value
        }
    }
}

const actions = {
    changeSetting({ commit }, data) {
        commit('CHANGE_SETTING', data)
    },

    setProgress({ commit }, data) {
        commit('SET_PROGRESS', data)
    },

    delProgress({ commit }, data) {
        commit('DEL_PROGRESS', data)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}