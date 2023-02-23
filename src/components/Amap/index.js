import AMapLoader from '@amap/amap-jsapi-loader';

const install = (Vue) => {
    AMapLoader.load({
        key: '7b2cba923209a39276afb036395b5eb3', // key
        plugins: [
            "AMap.Geocoder",
            "AMap.MapType",
            "AMap.OverView",
            "AMap.Scale",
            "AMap.ToolBar",
            "AMap.MouseTool",
            "AMap.CircleEditor",
            "AMap.PolyEditor",
            "AMap.RectangleEditor",
            "AMap.MarkerClusterer",
            "AMap.PolygonEditor",
            "AMap.RangingTool",
            "AMap.GeoJSON"
        ], // 插件
        version:'2.0',
        Loca:{                              // 是否加载 Loca， 缺省不加载
            "version": '2.0.0'              // Loca 版本，缺省 1.3.2
        },
    }).then((amap)=>{
        Vue.prototype.$Amap = amap
        window.Amap = amap
    }).catch(err=>{
        throw(new Error('加载高德地图失败：'+err,))
    })
}

export default {
    install,
}