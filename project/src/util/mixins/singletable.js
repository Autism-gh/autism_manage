import store from '@/store'

/**
 * 
 *  { name: '修改', icon: 'el-icon-edit-outline', event: 'modify' },
    { name: '删除', icon: 'el-icon-delete', event: 'remove' },
    { name: '查看', icon: 'el-icon-search', event: 'show' },
    { name: '下载', icon: 'el-icon-download', event: 'download' },
 * 
 */

const defaultPage = 100


const mixin = {
    components: { },
    data() {
        return {
            gridTag: '',

            fieldConfig: [],

            checkedField: [],

            preColumns: ['checkbox','index'],

            manageColumn: [
                { name: '修改', icon: 'el-icon-edit-outline', event: 'modify' },
                { name: '删除', icon: 'el-icon-delete', event: 'remove' },
            ],

            page: 1,

            pagesize: defaultPage,

            total: 0,

            pinned: 4
        }
    },
    watch: {

    },
    computed: {},

    async beforeMount() {
        await this.getColumns(this.gridTag)

        this.$watch(() => {
            return this.$store.getters.columnsSettings[this.gridTag]
        }, (val) => {
            this.pinned = val.pinned
            this.checkedField = val.fields
        })
    },

    methods: {
        async getColumns(tag) {
            const res = await store.dispatch('columns/getColumns', tag)
            this.pinned = res?.pinned || 2
            this.checkedField = res?.fields && res?.fields?.length || this.fieldConfig
        }
    }
}

export default mixin