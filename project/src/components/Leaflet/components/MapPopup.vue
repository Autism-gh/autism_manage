<template>
    <div class="popup-wrapper">
        <slot></slot>
    </div>
</template>

<script>
import L from 'leaflet'
export default {
    name: 'Popup',
    data () {
        return {
            visible: false,

            mapInstance: null,

            popopInstance: null,

            currentMarker: null
        }
    },
    props: {
        className: {
            type: String,
            default: 'custom'
        },
        maxWidth: {             // 最大像素
            type: Number,
            default: 300
        },
        minWidth: {             // 最小像素
            type: Number,
            default: 200
        },
        autoPan: {              //  地图平移仍然打开
            type: Boolean,
            default: true
        },
        keepInView: {           //  防止用户在屏幕打开时弹出屏幕上的弹出窗口 将其设置为true.
            type: Boolean,
            default: false
        },
        autoClose: {            // 如果在打开另一个弹窗时，是否自动关闭之前的弹窗.
            type: Boolean,
            default: true
        },
        closeOnClick: {
            type: Boolean,
            default: true
        },
        closeOnMove: {
            type: Boolean,
            default: true
        },
        offset: {
            type: Array,
            default: () => {
                return [0, 0]
            }
        }
    },
    methods: {
        init(map) {
            this.mapInstance = map
            this.popopInstance = L.popup({
                className: this.className,
                maxWidth: this.maxWidth,
                minWidth: this.minWidth,
                autoPan: this.autoPan,
                keepInView: this.keepInView,
                autoClose: this.autoClose,
                closeOnClick: this.closeOnClick,
                offset: this.offset
            })
            .setLatLng([30.1956,120.2073])
            .setContent(this.$el);

            return this.popopInstance;
        },
        open(marker) {
            if(marker instanceof L.Marker) {
                this.visible = true
                this.removeListener()
                marker.on('disappear',this.close)

                if(this.closeOnMove) {
                    marker.on('move',this.positionChangedListener)
                }

                this.currentMarker = marker
                this.popopInstance.setLatLng(marker.getLatLng()).openOn(this.mapInstance)
            } else if (marker instanceof L.LatLng) {
                this.visible = true
                this.popopInstance.setLatLng(marker).openOn(this.mapInstance)
            }
        },
        removeListener() {
            if (this.currentMarker) {
                this.currentMarker.off('disappear',this.close)
                this.currentMarker.off('move',this.positionChangedListener)
                this.currentMarker = null
            }
        },
        positionChangedListener(e) {
            if (this.visible) {
                this.popopInstance.setLatLng(e.latlng)
            }
        },
        close() {
            this.mapInstance.closePopup(this.popopInstance)
        }
    },
    beforeDestroy() {
        this.removeListener()
    }
}
</script>

<style lang="scss" scoped>

</style>

