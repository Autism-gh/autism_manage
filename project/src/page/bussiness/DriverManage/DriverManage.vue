<template>
    <FlexContainer>
        <template slot="leftWrapper">
            <ElementTree treeSign="vehicleModel" default-expand-all></ElementTree>
        </template>
        <template slot="rightWrapper">
            <TableAutomatic 
                :fieldConfig="fieldConfig"
                :checkedField="checkedField"
                :tableData="formatTableData"
                :manageColumn="manageColumn"
                :preColumns="preColumns"
                :pagesize.sync="pagesize" 
                :page.sync="page" 
                :total="total" 
                :pinned="pinned"
                @pagination="handleChangePageView"
                @modify="handleModifyEvent"
                @remove="handleRemoveEvent"
                @row-click="handleClickRow">

                <template slot="filterLeft">
                    <div class="filter-item">
                        <span class="title">驾驶员名称: </span>
                        <el-input class="control" v-model="platNo" placeholder="请输入名称"></el-input>
                    </div>
                    <div class="filter-item">
                        <span class="title">手机号: </span>
                        <el-input class="control" v-model="simNo" placeholder="请输入手机号"></el-input>
                    </div>

                    <el-button type="primary">新增</el-button>
                    <el-button type="primary">导入</el-button>
                    <el-button type="primary">导出</el-button>
                </template>

                <template slot="pageLeft">
                    <el-button type="primary">删除</el-button>
                </template>

            </TableAutomatic>
        </template>
    </FlexContainer>
</template>

<script>
    import ElementTree from '@/components/ElementTree/ElementTree'
    import FlexContainer from '@/components/Layout/FlexContainer'
    import TableAutomatic from '@/components/ElementTable/TableAutomatic'
    import { tableOptions, defaultData } from './components/fieldConfig'
    import singletable from '@/util/mixins/singletable'
    import ComponetRow from './components/ComponetRow.vue'
    export default {
        components: {
            FlexContainer,
            TableAutomatic,
            ElementTree,
            
            /* eslint-disable */
            ComponetRow
            /* eslint-enable */
        },
        props: {},
        mixins: [singletable],
        name: 'VehicleManage',
        data() {
            return {
                platNo: '',

                simNo: '',

                total: 9,

                tableData: defaultData,

                fieldConfig: tableOptions
            };
        },
        watch: {

        },
        computed: {
            pageStart() {
                return (this.page - 1) * this.pagesize
            },
            formatTableData() {
                return this.tableData.slice(this.pageStart, this.pageStart + this.pagesize)
            },
        },
        methods: {
            handleChangePageView({ page, pagesize }) {
                console.log('handleChangePageView', page, pagesize)
            },

            handleModifyEvent(row) {
                console.log('handleModifyEvent', row)
            },

            handleRemoveEvent(row) {
                console.log('handleRemoveEvent', row)
            },

            handleClickRow(row) {
                console.log('handleClickRow', row)
            }
        },
        created() {

        },
        mounted() {

        },
    };
</script>
<style lang="scss" scoped>

</style>