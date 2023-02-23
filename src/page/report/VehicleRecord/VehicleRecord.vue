<template>
    <FlexContainer>
        <template slot="rightBottom">

            <TableAutomatic ref="planeTable" 
                :fieldConfig="fieldConfig" 
                :checkedField="checkedField" 
                :tableData="formatPlaneList"
                :manageColumn="manageColumn" 
                :preColumns="preColumns" 
                :pagesize.sync="pagesize" 
                :page.sync="page"
                :total="total" 
                :pinned="pinned" 
                :gridTag="gridTag" 
                @pagination="handleChangePageView">

                <template slot="table-hahahaha">
                    <el-tag type="success">标签二</el-tag>
                </template>

            </TableAutomatic>

        </template>
    </FlexContainer>
</template>

<script>
    import FlexContainer from '@/components/Layout/FlexContainer'
    import {
        TableAutomatic,
    } from '@/components/ElementTable'
    import {
        fieldConfig,
        getCustomData
    } from './components/tableTest'
    import singletable from '@/util/mixins/singletable'
    export default {
        components: {
            FlexContainer,
            TableAutomatic,
        },
        mixins: [singletable],
        props: {},
        name: 'VehicleRecord',
        data() {
            return {
                gridTag: 'vehicleRecord',

                fieldConfig,

                tableData: [],

                total: 200,

                timer: null
            };
        },
        watch: {

        },
        computed: {
            pageStart() {
                return (this.page - 1) * this.pagesize
            },  

            formatPlaneList() {
                return this.tableData.slice(this.pageStart, this.pageStart + this.pagesize)
            },
        },
        methods: {
            handleChangePageView({ page, pagesize } = {}) {
                this.page = page
                this.pagesize = pagesize
            },

            refreshData() {
                this.tableData = getCustomData(this.total)
            }
        },
        created() {

        },
        mounted() {
            this.timer = setInterval(() => {
                this.refreshData()
            }, 5000)
        },

        beforeDestroy() {
            if(this.timer) {
                clearInterval(this.timer)
                this.timer = null
            }
        }
    };
</script>
<style lang="scss" scoped>

</style>