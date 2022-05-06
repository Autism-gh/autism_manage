import { getToken, setToken, removeToken } from '@/util/app/auth'

import router, { resetRouter } from '@/router'

import { Base64 } from 'js-base64'

import moment from 'moment'

const state = {
    token: getToken(),

    userInfo: {
        name: 'testNewUser',
        hangye: 14,
        area: '杭州'
    },

    roles: [],

    allowUser: ['wuchuang', 'wuch', 'admin'],
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },

    SET_USER_INFO: (state, userInfo) => {
        Object.assign(state.userInfo, userInfo)
    },

    SET_ROLES: (state, roles) => {
        state.roles = roles
    }
}

const actions = {
    // user login
    login({ commit, dispatch }, userInfo) {
        const { username, password, remember } = userInfo

        return new Promise((resolve, reject) => {
            try {
                if (state.allowUser.includes(username.trim())) {
                    if (remember) {
                        dispatch('setLoginInfo', userInfo)
                    } else {
                        dispatch('clearLoginInfo', userInfo)
                    }
                    const mockToken = 'BIRENWUCHUANGQINGDUOGUANZHAO'
                    commit('SET_TOKEN', mockToken)
                    setToken(mockToken)

                    console.log('【log, 用户登入】', username, password)
                    resolve(true)
                } else {
                    resolve(false)
                }
            } catch (error) {
                reject(error)
            }
            
        })
    },

    async setLoginInfo({ dispatch }, userInfo) {
        const {
            username,
            password
        } = userInfo
        const nowTime = moment().valueOf()
        const {
            time
        } = await dispatch('getLoginInfo')
        if (nowTime - time > 7 * 86400000) {
            dispatch('clearLoginInfo')
        } else {
            const code = `1dw45wuch1${username}tb2xh${password}lao3xie${nowTime}ymd`
            localStorage.setItem('loginInfo', Base64.encode(code))
        }
    },

    clearLoginInfo() {
        if (localStorage.removeItem('loginInfo')) localStorage.removeItem('loginInfo')
    },

    getLoginInfo() {
        const userInfo = localStorage.getItem('loginInfo')
        const lastLoginInfo = userInfo ? Base64.decode(userInfo) : ''

        if (lastLoginInfo) {
            const keyList = lastLoginInfo.replaceAll(/tb2xh|wuch1|lao3xie|ymd/g, () => '___').split('___')
            return {
                username: keyList[1],
                password: keyList[2],
                time: keyList[3]
            }
        } else {
            return {}
        }
    },

    // get user info
    getInfo({ commit, }) {
        return new Promise((resolve, reject) => {
            try {
                const userInfo = {
                    name: 'Admin',
                    avatar: '爱你三千遍',
                    introduction: '欢迎光临'
                }
                const roles = ['admin']
                commit('SET_ROLES', roles)
                commit('SET_USER_INFO', userInfo)
                resolve({ roles })
            } catch (error) {
                reject()
            }
        })
    },

    // user logout
    logout({ commit, dispatch }) {
        return new Promise((resolve, reject) => {
            try {
                commit('SET_TOKEN', '')
                commit('SET_ROLES', [])
                removeToken()
                resetRouter()
                // reset visited views and cached views
                // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
                dispatch('tagsView/delAllViews', null, { root: true })
                resolve()
            } catch (error) {
                reject()
            }
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
        })
    },

    async changeRoles({ commit, dispatch }, role) {
        const token = role + '-token'
    
        commit('SET_TOKEN', token)
        setToken(token)
    
        const { roles } = await dispatch('getInfo')
    
        resetRouter()
    
        // generate accessible routes map based on roles
        const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
        // dynamically add accessible routes
        router.addRoutes(accessRoutes)
    
        // reset visited views and cached views
        dispatch('tagsView/delAllViews', null, { root: true })
      }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}