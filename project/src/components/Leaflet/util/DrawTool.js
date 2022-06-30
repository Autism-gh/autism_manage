import L from '@/components/Leaflet/index'

/**
 * 
 * 一个画图的处理器
 * 
 */

class DrawTool {
    constructor(map) {
        // 地图实例
        this.mapInstance = map

        this.drawControl = null

        this.featureGroup = null

        this.activeDrawer = null
        // 状态
        this.isDraw = false
        // 类型
        this.type = null
        // 配置信息
        this.options = null
    }

    create() {
        // 存储可编辑图层
        this.featureGroup = new L.FeatureGroup()
        this.mapInstance.addLayer(this.featureGroup)


        this.drawControl = {
            Circle : new L.Draw.Circle(this.mapInstance, {shapeOptions: { weight:3, fillOpacity:0.35 }}),

            Rectangle : new L.Draw.Rectangle(this.mapInstance, {metric:'km',showArea:true,shapeOptions: {weight:3,fillOpacity:0.35}}),

            Polygon: new L.Draw.Polygon(this.mapInstance, {showArea:true,showLength:true, allowIntersection:false,shapeOptions:{weight:3,fillOpacity:0.35}}),

            Polyline: new L.Draw.Polyline(this.mapInstance, {showLength:true, allowIntersection:false,shapeOptions:{weight:4,fillOpacity:0.35}}),

            Marker: new L.Draw.Marker(this.mapInstance, {shapeOptions: {weight:3,fillOpacity:0.35}}),

            Edit: new L.EditToolbar.Edit(this.mapInstance, {featureGroup: this.featureGroup}),

            Delete: new L.EditToolbar.Delete(this.mapInstance, {featureGroup: this.featureGroup})
        }

        this.mapInstance.on(L.Draw.Event.CREATED, (event) => {
            const { layer } = event
            this.isDraw = true
            this.featureGroup.addLayer(layer)
        })
    }

    addLayer({ layer, type, options }) {
        this.type = type
        // 清空已有
        if(this.isDraw) {
            this.clear()
        }

        if(options) this.options = options

        if(layer) {
            this.isDraw = true
            this.featureGroup.addLayer(layer)
            const bounds = this.featureGroup.getBounds()
            this.mapInstance.setBounds(bounds)
        }
    }

    /**
     * polyline, polygon, circle, rectangle, marker, circlemarker
     * @param {*} type 
     */
    draw(type, options) {
        this.type = type
        this.options = options

        // 清空已有
        if(this.isDraw) {
            this.clear()
        }

        // 停止绘画
        this.stopDraw()
        
        this.activeDrawer = this.drawControl[type]

        if(this.activeDrawer) {
            if(options) this.activeDrawer.setOptions(options)
            this.activeDrawer.enable()
        }
    }

    stopDraw() {
        if(this.activeDrawer) this.activeDrawer.disable()
    }

    edit() {
        this.drawControl && this.drawControl.Edit.enable()
    }

    stopEdit() {
        this.isDraw = false
        this.drawControl && this.drawControl.Edit.disable()
    }

    save() {
        this.drawControl && this.drawControl.Edit.save()
    }

    clear() {
        if(this.featureGroup) this.featureGroup.clearLayers()
        this.isDraw = false
    }

    getLayer() {
        if(!this.featureGroup) return
        const layers = this.featureGroup.getLayers()
        return layers[0]
    }

    getParmas() {
        if(!this.featureGroup) return
        const currentLayer = this.featureGroup.getLayers()[0]
        let parmas = null
        if(this.type === 'Circle') {
            parmas = {
                latlng: currentLayer.getLatLng(),
                radius: currentLayer.getRadius()
            }
        }

        if(this.type === 'Marker') {
            parmas = {
                latlng: currentLayer.getLatLng()
            }
        }

        if(['Polyline', 'Polygon', 'Rectangle'].includes(this.type)) {
            parmas = {
                latlng: currentLayer.getLatLngs()
            }
        }

        return parmas
    }

    destroyed() {
        if(this.featureGroup) this.featureGroup.clearLayers()
        this.mapInstance.off('click', L.Draw.Event.CREATED);
    }
}


export default DrawTool