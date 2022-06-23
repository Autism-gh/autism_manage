<template>
    <FlexContainer>
        <template slot="leftWrapper">
            <ElementTree treeSign="vehicleModel" default-expand-all></ElementTree>
        </template>
        <template slot="rightTop">
            您好
        </template>
        <template slot="rightBottom">
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
                :gridTag="gridTag"
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

                <template slot="filterRight">
                    <SearchPanel v-model="driverName" @search="handleGetTableData" placeholder="请输入驾驶员名称"></SearchPanel>
                </template>

                <template slot="extand">
                    <div class="filter-item">
                        <span class="title">手机号: </span>
                        <el-input class="control" v-model="simNo" placeholder="请输入手机号"></el-input>
                    </div>
                </template>

                <template slot="pageLeft">
                    <el-button type="primary">删除</el-button>
                </template>

                <template slot="table-ComponetRow" slot-scope="{ data }">
                    <el-tag @click.stop="handleEmitExtandEvent(data)">哈哈哈</el-tag>
                </template>

            </TableAutomatic>
        </template>
    </FlexContainer>
</template>

<script>
    import ElementTree from '@/components/ElementTree/ElementTree'
    import FlexContainer from '@/components/Layout/FlexContainer'
    import {TableAutomatic, SearchPanel} from '@/components/ElementTable'


    import { tableOptions, defaultData } from './components/fieldConfig'
    import singletable from '@/util/mixins/singletable'
    export default {
        components: {
            FlexContainer,
            TableAutomatic,
            ElementTree,
            SearchPanel
        },
        props: {},
        mixins: [singletable],
        name: 'VehicleManage',
        data() {
            return {
                gridTag: 'driverManage',
                
                platNo: '',

                simNo: '',

                total: 9,

                driverName: '',

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
            },

            handleEmitExtandEvent(row) {
                console.log('handleEmitExtandEvent', row)
            },

            handleGetTableData() {
                console.log('handleGetTableData', this.driverName)
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