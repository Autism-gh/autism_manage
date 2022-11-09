export const acctiveMap = 'GaoDe.Normal.Map'

export const timmeMap = 'GaoDe.Time.Map'


import L from '@/components/Leaflet/leaflet'

export const leafletMapIcon = {
    'default': L.icon({ iconUrl: require('../../assets/images/map/default.png'), iconSize: [22, 33], iconAnchor: [11,  32] }),
    
    'start': L.icon({ iconUrl: require('../../assets/images/map/start.png'), iconSize: [24, 32], iconAnchor: [12,  32] }),
    'end': L.icon({ iconUrl: require('../../assets/images/map/end.png'), iconSize: [24, 32], iconAnchor: [12,  32] }),

    'online': L.icon({ iconUrl: require('../../assets/images/map/online.png'), iconSize: [28, 28], iconAnchor: [14,  14] }),
    'offline': L.icon({ iconUrl: require('../../assets/images/map/offline.png'), iconSize: [28, 28], iconAnchor: [14,  14] })
}


export const translateDireDesc = (dire) => {
    var text = ''
    if(!dire && dire != 0) {
        text = '-'
        return text
    } else if (dire == 0 || dire == 360) {
        text = '正北'
    } else if (dire > 0 && dire < 90) {
        text = '东北'
    } else if (dire == 90) {
        text = '正东'
    } else if (dire > 90 && dire < 180) {
        text = '东南'
    } else if (dire == 180) {
        text = '正南'
    } else if (dire > 180 && dire < 270) {
        text = '西南'
    } else if (dire == 270) {
        text = '正西'
    } else if (dire > 270 && dire < 360) {
        text = '西北'
    } else {
        text = '正北'
    }
    return text
}
