import PinyinMatch from 'pinyin-match'


/**
 * 开发认证得地方
 * https://lbsyun.baidu.com/apiconsole/center#/home
 */


import { geo2coord } from './mapBaiduGeoTrans'
import { bd09togcj02, gcj02towgs84 } from './coordinateChange'
import baiduCityCode from './mapBaiduCityCode.json'

const baidukey = 'EqVT3rPsm5I7vhWZmEN4tk7AwMRIn6Mh'
const baidukeyLLQ = 'aGdxMl5lj5I1ETAGFVEChj3yIGoBH5Bc'
const ponybaidukey = 'EqVT3rPsm5I7vhWZmEN4tk7AwMRIn6Mh'


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


const errorRequestDesc = {
    1: '服务器内部错误',
    2: '请求参数非法',
    3: '权限效验失败',
    4: '配额效验失败',
    5: 'AK不存在或者非法',
    6: '服务器禁用',
    7: '不通过百名版或者安全吗不对',
}



/**
 * @description 筛选城市大区的对应码 部分内部得编码可能用得到
 * @param {城市名字} dataType  obj   list 
 * 
 * 返回参数参见   mapGaodeCityCod.json 
 * @returns {
 *      chinese_name: '', 
 *      adcode: '',
 *      cityCode: ''
 * } list
 */
 export const getCityCodeOrderBaiDu = (dataType) => {
    if(!dataType || !baiduCityCode.length) return 
    let result
    
    switch (dataType) {
        case 'obj':
            result = {}
            baiduCityCode.forEach(item => {
                result[item.name] = item.citycode
            })
            break;
        case 'list':
            result = baiduCityCode.filter(item => PinyinMatch.match(item.chinese_name, dataType))
            break;
    }

    return result
}




/**
 * 地理编码  俗称根据地址获取当前地址得在地图上得地理坐标
 * @param {城市名字} address
 * @learning https://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-geocoding
 * @test {
 *      address: 北京市海淀区上地十街10号
 * }
 * 百度好像只会返回一个坐标位置哦，所以位置需要精确一点
 */

export const getLatLngByAddressOrderInBaidu = (address, corrdinate = returnCoordinate) => {
    return new Promise((resolve, reject) => {
        let path = `http://api.map.baidu.com/geocoding/v3/?address=${ address }&output=json&ak=${ baidukeyLLQ }`
        
        $.ajax({
            url: path,
            type: "GET",
            dataType: "jsonp",
            success: res => {
                if(!res || res.status != 0) {
                    resolve(res.msg ||  errorRequestDesc[res.status] || '百度地位webApi调用【结果】出错')
                    return
                }

                let resLngLat = res.result.location
                let result = res.result
                let gcjlatlng = bd09togcj02(resLngLat.lng, resLngLat.lat)

                switch (corrdinate) {
                    case 'bd09':
                        result.listlatlng = returnLatlngSort?[resLngLat.lat, resLngLat.lng]:[resLngLat.lng, resLngLat.lat]
                        result.objlatlng = resLngLat
                        break;
                    case 'gcj02':
                        result.listlatlng = returnLatlngSort?[gcjlatlng[1], gcjlatlng[0]]:gcjlatlng
                        result.objlatlng = { 
                            lng: gcjlatlng[0], 
                            lat: gcjlatlng[1]
                        }
                        break;
                    case 'wgs84':
                        let wgslatlng = gcj02towgs84(gcjlatlng[0], gcjlatlng[1])
                        result.listlatlng = returnLatlngSort?[wgslatlng[1], wgslatlng[0]]:wgslatlng
                        result.objlatlng = { 
                            lng: wgslatlng[0], 
                            lat: wgslatlng[1]
                        }
                        break;
                }
                delete result.location
                resolve(result)
            }
        }).catch(e => {
            console.log('百度地图webApi调用【过程中】出错')
            reject(new Error(e))
        })

    })
}





/**
 * 逆地理编码  俗称根据坐标点获取当前地址
 * 本方法得需要传当前坐标系是啷个得
 * @param {城市名字} address
 * @learning https://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-geocoding-abroad
 * @test {
 *      latlng: 规定只能latlng 即 31.225696563611,121.49884033194
 *      coordtype： bd09ll（默认）， gcj02ll， wgs84ll
 * }
 * 这个接口返回得东西有点那啥没有什么整理得必要，直接全盘托出
 * 
 */

// { latlng: [30.2028901165, 120.23779202613], coordtype: 'bd09' }
// { latlng: 31.225696563611,121.49884033194, coordtype: 'wgs84ll' }

 export const getAddressByLatLngOrderInBaidu = ({ latlng, coordtype }, corrdinate = returnCoordinate) => {
    return new Promise((resolve, reject) => {

        let flotlatlng = Array.isArray(latlng)?latlng.toString():latlng
        let path = `http://api.map.baidu.com/reverse_geocoding/v3/?ak=${ baidukeyLLQ }&output=json&coordtype=${ coordtype }&location=${ flotlatlng }`
        
        $.ajax({
            url: path,
            type: "GET",
            dataType: "jsonp",
            success: res => {
                if(!res || res.status != 0) {
                    resolve(res.msg ||  errorRequestDesc[res.status] || '百度地位webApi调用【结果】出错')
                    return
                }
                resolve(res.result)
            }
        }).catch(e => {
            console.log('百度地图webApi调用【过程中】出错')
            reject(new Error(e))
        })
    })
}




/**
 * 传入 1 - 10个顺序轨迹点，不要超过500m 得里程 经纬度点保留至少6个小数点
 * @param { 经纬度点 } latlnglist 
 * @learning https://lbsyun.baidu.com/index.php?title=webapi/roadinfo
 * @test [
 *      {
            "height": 1,                            // 轨迹点高度
            "loc_time": 1556162073,                 // 定位时间
            "coord_type_input": "bd09ll",           // 轨迹点坐标系
            "latitude": 39.950124,                  
            "longitude": 115.799985
        }
 * ]
    [{"height":1,"loc_time":1556162073,"coord_type_input":"bd09ll","latitude":39.950124,"longitude":115.799985}]
 */
export const getCurrentRoadInfo = (latlnglist, range = 500) => {
    return new Promise((resolve, reject) => {

        let flotlatlng = Array.isArray(latlnglist)?latlnglist.toString():latlnglist
        let path = `http://api.map.baidu.com/api_roadinfo/v1/track?point_list=${ flotlatlng }&range=${ range }&ak=${ ponybaidukey }`
        
        $.ajax({
            url: path,
            type: "GET",
            dataType: "jsonp",
            success: res => {
                if(!res || res.status != 0) {
                    resolve(res.msg ||  errorRequestDesc[res.status] || '百度地位webApi调用【结果】出错')
                    return
                }
                console.log('result', res)
            }
        }).catch(e => {
            console.log('百度地图webApi调用【过程中】出错')
            reject(new Error(e))
        })
    })
}

