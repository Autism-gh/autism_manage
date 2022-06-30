import axios from 'axios'
import PinyinMatch from 'pinyin-match'


/**
 * 开发认证得地方
 * https://console.amap.com/dev/index
 */

const gaodeCityCode = require('./mapGaodeCityCode.json')

const gaodekeyLLQ = '8678d946c69dff3fe9090aaf2cc090c7'



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

        axios.get(getpath).then(res => {
            const { status, info, lives } = res?.data || {}
            if(!status || status != '1') {
                resolve(info)
                return
            }
            resolve(lives)
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

        axios.get(v3path).then(res => {
            const { status, info } = res?.data || {}
            if(!status || status != '1') {
                resolve(info)
                return
            }
            resolve(res?.data)
        }).catch(e => {
            reject(new Error(e))
        })
    })
}



export const getAddressByLnglat = ({ lng, lat, radius = 1000 }, format = true) => {
    return new Promise((resolve, reject) => {
        let v3path = `https://restapi.amap.com/v3/geocode/regeo?output=json&location=${lng},${lat}&key=${ gaodekeyLLQ }&radius=${ radius }&extensions=all`

        axios.get(v3path).then(res => {
            const { status, info } = res?.data || {}
            if(!status || status != '1') {
                resolve(info)
                return
            }

            if(format) {
                const { formatted_address, addressComponent } = res?.data?.regeocode
                resolve({ formatted_address, addressComponent })
            } else {
                resolve(res?.data)
            }
        }).catch(e => {
            reject(new Error(e))
        })
    })
}
