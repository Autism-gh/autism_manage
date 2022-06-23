<template>
    <FlexContainer>
        <template slot="leftWrapper">
            <ElementTree treeSign="vehicleModel" default-expand-all></ElementTree>
        </template>
        <template slot="rightBottom">
            <TableManual :size="size" :page="page" :total="total" background>

                <template slot="filterLeft">
                    <div class="filter-item">
                        <span class="title">车牌号: </span>
                        <el-input class="control" v-model="platNo" placeholder="请输入车牌号"></el-input>
                    </div>
                    <div class="filter-item">
                        <span class="title">SIM卡号: </span>
                        <el-input class="control" v-model="simNo" placeholder="请输入车牌号"></el-input>
                    </div>

                    <el-button type="primary">新增</el-button>
                    <el-button type="primary">导入</el-button>
                    <el-button type="primary">导出</el-button>
                </template>

                <template slot="table">
                    <el-table 
                        :data="defaultData" 
                        border stripe highlight-current-row
                        height='100%'
                        size="mini"
                        style="width: 100%">

                        <el-table-column
                            type="selection"
                            width="55"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            label="序号"
                            type="index"
                            width="50"
                            align="center">
                        </el-table-column>

                        <el-table-column 
                            v-for="item in tableOptions" 
                            :key="item.field" 
                            :prop="item.field" 
                            :label="item.name"
                            width="150"
                            align="center">
                        </el-table-column>

                        <el-table-column align="center" fixed="right" label="操作" width="100">
                            <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row)" type="text" size="mini">查看</el-button>
                                <el-button type="text" size="mini">编辑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>

                <!-- <template slot="button">
                    <el-button type="primary">新增</el-button>
                    <el-button type="primary">导入</el-button>
                    <el-button type="primary">导出</el-button>
                </template> -->

                <template slot="pageLeft">
                    <el-button type="primary">删除</el-button>
                </template>

            </TableManual>
        </template>
    </FlexContainer>
</template>

<script>
    import ElementTree from '@/components/ElementTree/ElementTree'
    import FlexContainer from '@/components/Layout/FlexContainer'
    import TableManual from '@/components/ElementTable/TableManual'
    import { tableOptions, defaultData } from './components/fieldConfig'
    export default {
        components: {
            FlexContainer,
            TableManual,
            ElementTree
        },
        props: {},
        name: 'VehicleManage',
        data() {
            return {
                size: 50,
                page: 1,
                total: 135,

                platNo: '',

                simNo: '',

                tableOptions,

                defaultData,
            };
        },
        watch: {

        },
        computed: {

        },
        methods: {

        },
        created() {

        },
        mounted() {

        },
    };
</script>
<style lang="scss" scoped>

</style>