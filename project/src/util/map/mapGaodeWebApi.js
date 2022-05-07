import PinyinMatch from 'pinyin-match'


/**
 * 开发认证得地方
 * https://console.amap.com/dev/index
 */


import { geo2coord } from './mapBaiduGeoTrans'
import { gcj02towgs84, gcj02tobd09 } from './coordinateChange'
const gaodeCityCode = require('./mapGaodeCityCode.json')


const gaodekeyLLQ = '8678d946c69dff3fe9090aaf2cc090c7'


/**
 * 该值为本页面默认返回坐标系类型
 * 后面可以直接对上 vuex 内系统坐标系类型
 * bd09  百度
 * gcj02 高德 / 谷歌
 * wgs84 大地 / 天地图（国标）
 */
const returnCoordinate = 'gcj02' 


/**
 * 返回得list类型得坐标点 先后顺序
 * true:  latlng
 * false: lnglat
 */
const returnLatlngSort = 'latlng'



/**
 * 获取到的这个东西可是很重要的哦~
 * @param {城市名称} cityName 
 * @returns 
 */
const getCityCodeOrderGaode = (cityName) => {
    if(!cityName || !gaodeCityCode.length) return []
    let currentArray = gaodeCityCode.filter(item => PinyinMatch.match(item.chinese_name, cityName))
    return currentArray
}



/**
 * 这里是是根据城市名称通过上面的方法拿到code 然后在请求接口得到城市的天气信息
 * @param {城市名称} cityName 
 */

export const getCityWeatherBorderGaode = (cityName) => {
    return new Promise((resolve, reject) => {
        let citycode = cityName
        if(!isFinite(cityName)) {
            let getCode = getCityCodeOrderGaode(cityName)
            citycode = getCode[0].city_code
        }
        let getpath = `https://restapi.amap.com/v3/weather/weatherInfo?city=${ citycode }&key=${ gaodekeyLLQ }`
        $.ajax({
            url: getpath,
            type: "GET",
            dataType: "jsonp",
            success: (res) => {
                if(!res || +res.status != 1) {
                    resolve(res.info)
                    return
                }
                resolve(res.lives)
            }
        }).catch(e => {
            reject(new Error(e))
        })
    })
}



/**
 * 
 * @param {ip地址} ip 
 * @returns 
 */
export const getUserAddressByIP = (ip) => {
    return new Promise((resolve, reject) => {
        let v3path = `https://restapi.amap.com/v3/ip?ip=${ ip }&output=json&key=${ gaodekeyLLQ }`
        let v5path = `https://restapi.amap.com/v5/ip?ip=${ ip }&output=json&key=${ gaodekeyLLQ }&type=ipv4`
        $.ajax({
            url: v3path,
            type: "GET",
            dataType: "jsonp",
            success: (res) => {
                if(!res || +res.status != 1) {
                    resolve(res.info)
                    return
                }
                resolve(res)
            }
        }).catch(e => {
            reject(new Error(e))
        })
    })
}




