'use strict'
import axios from 'axios'
import store from '@/store'
import { changeObjToKeyValueForm } from './util'
import { Message } from 'element-ui'
import QS from 'qs'

const TIMEOUT = 30 * 1000

export const contentType = {
    form: 'application/x-www-form-urlencoded',
    default: 'application/json; charset=UTF-8;',
    upload: 'multipart/form-data'
}


/**
 * 响应拦截器
 */
const response = (response) => {
    const res = response.data
    if (response.status === 200) {
        if (res.state || res.status) {
            // 不了解业务不知道做啥处理
        }
    } else {
        Message({
            message: res.message || '[warning]::接口返回出错',
            type: 'error',
            duration: 5 * 1000
        })
    }
    return res
}


const error = (error) => {
    console.log('[ SYSTEM API RESPONSE ERRPR ]' + error)
    Message({
        message: error.message || '[error]::接口请求错误',
        type: 'error',
        duration: 5 * 1000
    })
    return Promise.reject(error)
}


const apiInstance = axios.create({})
apiInstance.defaults.timeout = TIMEOUT
apiInstance.defaults.baseURL = process.env.VUE_APP_API
apiInstance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
apiInstance.interceptors.request.use(
    request => {
        if (store.getters.token) {
            // request.headers['apikey'] = 'EWqSloxOnNUdWjyI'
        }
        return request
    },
    error => {
        console.log('【 API-OF-51 REQUEST ERROR 】::', error)
        return Promise.reject(error)
    }
)

apiInstance.interceptors.response.use(response, error)



export const post = (url) => {
    return async data => {
        return (await apiInstance({
            method: 'post',
            url,
            data,
            headers: {
                'Content-Type': contentType.default
            },
            paramsSerializer: params => {
                return QS.stringify(params)
            }
        }))
    }
}


export const postForm = (url) => {
    return async data => {
        return (await apiInstance({
            method: 'post',
            url,
            data,
            headers: {
                'Content-Type': `${contentType.form};`
            }
        }))
    }
}


export const postObjToForm = (url) => {
    return async data => {
        return (await apiInstance({
            method: 'post',
            url,
            data,
            headers: {
                'Content-Type': `${contentType.form};`
            },
            transformRequest: [
                (data) => changeObjToKeyValueForm(data)
            ]
        }))
    }
}


export const get = (url) => {
    return async data => {
        return (await apiInstance({
            method: 'get',
            url,
            params: {
                ...data
            },
            headers: {
                'Content-Type': contentType.default
            }
        }))
    }
}

export const customInstanceApi = apiInstance