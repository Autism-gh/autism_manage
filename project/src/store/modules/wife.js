const state = {

    wifemessage: '老匹夫，欢迎您！',

    modelId: 1,
}

const mutations = {
    changeMessage(state, value) {
        state.wifemessage = value
    },

    setCurrentState(state, { key, value }) {
        state[key] = value
    }
}

const actions = {

}

const getters = {
    
}

export default {
    namespaced: true,
    actions,
    state,
    mutations,
    getters,
}