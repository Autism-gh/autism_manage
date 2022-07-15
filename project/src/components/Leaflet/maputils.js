export const acctiveMap = 'GaoDe.Normal.Map'

export const timmeMap = 'GaoDe.Time.Map'


import L from '@/components/Leaflet/leaflet'

export const leafletMapIcon = {
    'default': L.icon({ iconUrl: require('../../assets/images/map/default.png'), iconSize: [22, 33] }),
    'start': L.icon({ iconUrl: require('../../assets/images/map/start.png'), iconSize: [24, 32] }),
    'end': L.icon({ iconUrl: require('../../assets/images/map/end.png'), iconSize: [24, 32] }),

    'online': L.icon({ iconUrl: require('../../assets/images/map/online.png'), iconSize: [28, 28] }),
    'offline': L.icon({ iconUrl: require('../../assets/images/map/offline.png'), iconSize: [28, 28] })
}
