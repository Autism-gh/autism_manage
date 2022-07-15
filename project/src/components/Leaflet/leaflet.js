import L from 'leaflet'

import 'leaflet/dist/leaflet.css'
// 有些奇怪的样式
import './scss/leaflet.scss'


/**
 *  @description 地图基本图层
 *  https://github.com/htoooth/Leaflet.ChineseTmsProviders
 */
require('./lib/Leaflet.ChineseTmsProviders')


/**
 *  @description 常规聚合
 *  https://www.npmjs.com/package/leaflet.markercluster
 */
import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'


/**
 *  @description 图标旋转依赖
 *  https://www.npmjs.com/package/leaflet-rotatedmarker
 */
import 'leaflet-rotatedmarker'




/**
 *  @description 画图工具       内部已改成中文版本的了。。  文件内修改搜索（ handlers ）
 *  @apilink https://github.com/Leaflet/Leaflet.draw
 */
// import './lib/Leaflet.draw'
import 'leaflet-draw'
import './lib/Leaflet.draw-cn.js'
import 'leaflet-draw/dist/leaflet.draw.css'



/**
 * 测距
 */
import './lib/Leaflet-Polylinemeasure'



/**
 * 线段上带点东西
 */
import 'leaflet-polylinedecorator'


import './lib/Leaflet.LayerCollision'


/**
 * marker 动画
 */
// import './lib/Leaflet-AnimatedMarker'
// import './lib/Leaflet-AnimatedMarkerNew'


/**
 * 鹰眼地图
 */
import 'leaflet-minimap'
import 'leaflet-minimap/dist/Control.MiniMap.min.css'

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default L