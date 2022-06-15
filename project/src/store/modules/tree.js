import Vue from 'vue'
import { isString, isObject } from '@/util/common/type-check'
import { vehicleModel, JapanModel } from '@/mock/treedata'

const request = {
    /**
     * 走 API 用的
     * @param {*} type 
     * @returns 
     */
    // refreshDataInfo: async(type) => {
    //     let result, apiReturn
    //     switch (type) {
    //         case 'vehicleData':
    //             // apiReturn = vehicleData
    //             result = vehicleData
    //             break
    //         case 'vehicleModel':
    //             // apiReturn = vehicleModel
    //             result = vehicleModel
    //             break
    //     }
    //     request[type] = result
    //     return result
    // },


    /**
     * 走假数据用的
     * @param {*} type 
     * @returns 
     */
    refreshDataInfo: (type) => {
        return new Promise((resolve, reject) => {
            try {
                let result
                switch (type) {
                    case 'JapanModel':
                        result = JapanModel
                        break
                    case 'vehicleModel':
                        result = vehicleModel
                        break
                }
                request[type] = result
                resolve(result)
            } catch (error) {
                reject(error)
            }
        })
    },

    /**
     * 
     * @param {树的sign} type 
     * @returns 
     * 
     * 防止频繁的调用接口找数据，先去 request 底下找找看
     */
    getTypeTree: async(type) => {
        if (request[type]) {
            return request[type]
        }
        const res = await request.refreshDataInfo(type)
        return res
    },

    clear(type) {
        request[type] = null
    }
}

const state = {
    treeData: {
        vehicleTree: {
            loading: false,
            data: null
        },
        vehicleModel: {
            loading: false,
            data: null
        }
    }
}

const mutations = {
    setTreeData(state, { key, value }) {
        if (!state.treeData[key]) return
        Vue.set(state.treeData, key, {
            loading: false,
            data: value
        })
    },

    toggleTreeLoading(state, { key, value }) {
        if (!state.treeData[key]) return
        state.treeData[key].loading = value === undefined ? !state[key].loading : value
    },

    clearAll(state) {
        for (const key of Object.keys(state.treeData)) {
            state.treeData[key].data = null
            request[key] = null
        }
    }
}


const actions = {
    //  如果没有在vuex 中拿到数据那么重新请求一下
    async getTreeData({ state, commit }, params) {
        let type
        // 是否在去服务器上拿一份？？ fromServer  true 去， false  不去
        let fromServer = true

        if (isString(params)) {
            type = params
        } else if (isObject(params)) {
            type = params.type
            fromServer = params.fromServer
        } else {
            throw new Error('params must be String or Object')
        }

        // 去 vuex 看看数据在不在
        if (!fromServer && state.treeData[type] && state.treeData[type]?.data) {
            return state.treeData[type].data
        } else {
            commit('toggleTreeLoading', { key: type, value: true })
            commit('setTreeData', { key: type, value: [] })
            fromServer && request.clear(type)

            
            const result = await request.getTypeTree(type)
            commit('setTreeData', { key: type, value: result })
            commit('toggleTreeLoading', { key: type, value: false })
            return result
        }
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}