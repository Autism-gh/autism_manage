class ToolDrawer {
    constructor(map) {
        // 地图实例
        this.mapInstance = map
        // 绘图工具实例
        this.toolInatnce = null
        // 编辑工具实例
        this.currentEditor = null
        // 图层实例
        this.layerInstance = null
        // 状态
        this.isDraw = false
        // 类型
        this.type = null
        // 配置信息
        this.options = null
    }

    create() {
        this.toolInatnce = new window.Amap.MouseTool(this.mapInstance) 

        this.toolInatnce.on('draw', e => {
            this.layerInstance = e.obj
            this.mapInstance.add(this.layerInstance)
            // 开始编辑
            this.initEdit()
            // 关闭画图
            this.close()
        })
    }

    setDefault({ layer, type, options }) {
        this.clearLayer()

        if(type) {
            this.type = type
        }

        if(options) {
            this.options = options
        }

        if(layer) {
            this.isDraw = true
            this.layerInstance = layer
            this.mapInstance.add(this.layerInstance)
            this.mapInstance.setFitView(this.layerInstance)
        }
    }

    clearLayer() {
        if(this.layerInstance) {
            this.isDraw = false
            this.closeEdit()
            this.mapInstance.remove(this.layerInstance)
            this.layerInstance = null
        }
    }

    getParmas() {
        let result

        if(this.type === 'Polyline') {
            result = this.layerInstance.getPath()
        }

        if(this.type === 'Polygon') {
            const list = this.layerInstance.getPath()
            const format = list.map(item => {
                const { lng, lat } = item
                return [lng, lat]
            })
            result = {
                lnglat: format
            }
        }

        if(this.type === 'Rectangle') {
            const { northEast: { lng, lat }, southWest: { lng: lng1, lat: lat1 } } = this.layerInstance.getBounds()
            result = {
                lnglat: [
                    [ lng, lat ],
                    [ lng1, lat1 ]
                ]
            }
        }

        if(this.type === 'Circle') {
            const { lng, lat} = this.layerInstance.getCenter()
            result = {
                lnglat: [lng, lat],
                radius: this.layerInstance.getRadius()
            }
        }
        
        return result
    }

    initEdit() {
        let currentEditor = null

        switch (this.type) {
            case 'Polyline':
                currentEditor = new window.Amap.PolyEditor(this.mapInstance, this.layerInstance)
            break;
            case 'Polygon':
                currentEditor = new window.Amap.PolyEditor(this.mapInstance, this.layerInstance)
            break;
            case 'Rectangle':
                currentEditor = new window.Amap.RectangleEditor(this.mapInstance, this.layerInstance)
            break;
            case 'Circle':
                currentEditor = new window.Amap.CircleEditor(this.mapInstance, this.layerInstance)
            break;
        }

        this.currentEditor = currentEditor
        this.startEdit()
    }

    closeEdit() {
        this.currentEditor && this.currentEditor.close()
    }

    startEdit() {
        this.currentEditor && this.currentEditor.open()
    }


    draw(type, options) {
        this.type = type
        this.options = options

        switch (type) {
            case 'Polyline':
                this.toolInatnce.polyline(options)
            break;
            case 'Polygon':
                this.toolInatnce.polygon(options)
            break;
            case 'Rectangle':
                this.toolInatnce.rectangle(options)
            break;
            case 'Circle':
                this.toolInatnce.circle(options)
            break;
        }

        this.isDraw = true
    }

    close() {
        this.toolInatnce && this.toolInatnce.close()
    }

    destory() {
        this.closeEdit()

        if(this.toolInatnce) this.toolInatnce.close(true)
        
        if(this.mapInstance) {
            this.layerInstance && this.mapInstance.remove(this.layerInstance)
            this.currentEditor && this.mapInstance.remove(this.currentEditor)
            this.toolInatnce && this.mapInstance.remove(this.toolInatnce)
        }
    }
}

export default ToolDrawer