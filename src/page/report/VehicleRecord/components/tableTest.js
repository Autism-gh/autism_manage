import moment from "moment"

import { translateDireDesc } from '@/components/Leaflet/maputils'

export const formatColumnTime = ({ value }) => {
    return value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : '-'
}


export const fieldConfig = [
    {
        name: '车辆名称',
        field: 'name',
        minWidth: '150',
        default: false,
    },
    {
        name: '车牌号',
        field: 'plate_no',
        minWidth: '150',
        default: false,
    },
    {
        name: '车龄',
        field: 'age',
        minWidth: '150',
        default: false,
    },
    {
        name: '方向',
        field: 'dire',
        minWidth: '150',
        default: false,
        formatter: ({value}) => {
            return value ? translateDireDesc(value) : '-';
        }
    },

    {
        name: '注册时间',
        field: 'start_time',
        minWidth: '150',
        default: false,
        formatter: formatColumnTime
    },
    {
        name: '报废时间',
        field: 'end_time',
        minWidth: '150',
        default: false,
        formatter: formatColumnTime
    },
    {
        name: '测试数据1',
        field: 'test1',
        minWidth: '150',
        default: false,
    },
    {
        name: '测试数据2',
        field: 'test2',
        minWidth: '150',
        default: false,
    },
    {
        name: '测试数据3',
        field: 'test3',
        minWidth: '150',
        default: false,
        components: 'hahahaha'
    },
    {
        name: '测试数据4',
        field: 'test4',
        minWidth: '150',
        default: false,
    },
    {
        name: '测试数据5',
        field: 'test5',
        minWidth: '150',
        default: false,
    },
    {
        name: '测试数据6',
        field: 'test6',
        minWidth: '150',
        default: false,
    },
]


export const getCustomData = (size = 100) => {
    const list = []
    for(let i = 0; i < size; i ++) {
        const suffix = Math.floor(Math.random() * 1000)
        const dire = Math.floor(Math.random() * 360)
        list.push({
            name: `车辆--${ suffix }`,
            plate_no: `浙A2B22P--${ suffix }`,
            age: `${ suffix }`,
            dire: dire,
            start_time: moment().startOf('day').valueOf(),
            end_time: moment().endOf('day').valueOf(),
            test1: `data1--${ suffix }`,
            test2: `data2--${ suffix }`,
            test3: `data3--${ suffix }`,
            test4: `data4--${ suffix }`,
            test5: `data5--${ suffix }`,
            test6: `data6--${ suffix }`,
        })
    }
    return list
}