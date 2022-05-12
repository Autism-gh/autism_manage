<template>
    <el-row class="treedemo-container" type="flex" justify="space-between">
        <div class="treedemo-wrapper">
            <div class="top">
                <ElementTree ref="treeInstance" :treeData="treeData"></ElementTree>
            </div>
            <div class="bottom">
                <el-button @click="changeTreeData" type="primary">切换数据</el-button>
            </div>
        </div>
        <div class="treedemo-wrapper">
            <ElementTree treeSign="vehicleModel" @mounted="handleTreeReady"></ElementTree>
        </div>
        <div class="treedemo-wrapper">
            <ElementTree treeSign="vehicleModel" checkMode="radio"></ElementTree>
        </div>
        <div class="treedemo-wrapper">
            <ElementTree treeSign="vehicleModel" checkMode="radio" :nodeShowRules="nodeShowRules"></ElementTree>
        </div>
        <div class="treedemo-wrapper">
            <ElementTree treeSign="vehicleModel" checkMode="radio" :nodeShowRules="nodeShowRules" treeLine></ElementTree>
        </div>
    </el-row>
</template>

<script>
    import ElementTree from '@/components/ElementTree/ElementTree'
    import { vehicleModel, JapanModel } from '@/mock/treedata'
    export default {
        components: {
            ElementTree
        },
        props: {},
        name: 'TreeDemo',
        data() {
            return {
                state: false,
                
                treeData: [],

                nodeShowRules: {
                    first: {
                        showCheckbox: false
                    },
                    second: {
                        showCheckbox: false
                    }
                }
            };
        },
        watch: {

        },
        computed: {

        },
        methods: {
            handleTreeReady($tree, { treeList, treeData, firstNode }) {
                // console.log('$tree', $tree)
                // console.log('treeList', treeList)
                // console.log('treeData', treeData)
                // console.log('firstNode', firstNode)
            },

            async changeTreeData() {
                this.state = !this.state

                if(this.state) {
                    this.treeData = [...vehicleModel]
                } else {
                    this.treeData = [...JapanModel]
                }

                await this.$nextTick()

                // 数据刷新完的验证钩子
                await this.$refs['treeInstance'].waitForInit

                console.log('你们相信光吗')
            }
        },
        created() {

        },
        mounted() {

        },
    };
</script>
<style lang="scss" scoped>
    .treedemo-container {
        width: 100%;
        height: 100%;
        padding: var(--default-padding);

        .treedemo-wrapper {
            height: 100%;
            width: calc((100% - 30px) / 5);
            background-color: var(--color-white);

            .top {
                height: calc(100% - 50px);
            }

            .bottom {
                height: 50px;
            }
        }
    }
</style>