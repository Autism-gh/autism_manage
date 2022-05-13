<template>
    <el-row class="treedemo-container" type="flex" justify="space-between">
        <div class="treedemo-wrapper">
            <div class="top">
                <ElementTree ref="treeInstance" default-expand-all :treeData="treeData"></ElementTree>
            </div>
            <div class="bottom">
                <el-button @click="changeTreeData" type="primary">切换数据</el-button>
            </div>
        </div>
        <div class="treedemo-wrapper">
            <div class="half-height">
                <div class="title">
                    多选模式
                </div>
                <div class="content">
                    <ElementTree treeSign="vehicleModel" @mounted="handleTreeReady"></ElementTree>
                </div>
            </div>
            <div class="half-height">
                <div class="title">
                    单选模式
                </div>
                <div class="content">
                    <ElementTree treeSign="vehicleModel" checkMode="radio"></ElementTree>
                </div>
            </div>
        </div>
        <div class="treedemo-wrapper">
            <div class="half-height">
                <div class="title">
                    多选默认选中
                </div>
                <div class="content">
                    <ElementTree treeSign="vehicleModel" :defaultChecked="checkDefault"></ElementTree>
                </div>
            </div>
            <div class="half-height">
                <div class="title">
                    单选默认选中
                </div>
                <div class="content">
                    <ElementTree treeSign="vehicleModel" :defaultChecked="radioDefault" checkMode="radio"></ElementTree>
                </div>
            </div>
        </div>
        <div class="treedemo-wrapper">
            <div class="half-height">
                <div class="title">
                    无选中框默认选中
                </div>
                <div class="content">
                    <ElementTree treeSign="vehicleModel" :defaultSelect="nocheckDefault" checkMode="nocheck"></ElementTree>
                </div>
                <div class="title">
                    带上引导线
                </div>
                <div class="content">
                    <ElementTree treeSign="vehicleModel" treeLine checkMode="nocheck"></ElementTree>
                </div>
            </div>
        </div>
        <div class="treedemo-wrapper">
            <div class="half-height">
                <div class="title">
                    指定层级不显示选中
                </div>
                <div class="content">
                    <ElementTree treeSign="vehicleModel" default-expand-all :nodeShowRules="nodeShowRules"></ElementTree>
                </div>
            </div>
            <div class="half-height">
                <div class="title">
                    指定层级禁止选中
                </div>
                <div class="content">
                    <ElementTree treeSign="vehicleModel" default-expand-all :nodeShowRules="nodeShowRules2"></ElementTree>
                </div>
            </div>
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
                
                treeData: [...JapanModel],

                nodeShowRules: {
                    first: {
                        showCheckbox: false
                    },
                    second: {
                        showCheckbox: false
                    }
                },

                nodeShowRules2: {
                    first: {
                        disabled: true
                    },
                    second: {
                        disabled: true
                    }
                },


                checkDefault: ['bentian', 'kaidilake'],

                radioDefault: ['bentian'],

                nocheckDefault: 'bentian'
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

                console.log('加载完成验证')
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
                display: flex;
                align-items: center;
                justify-content: center;
                height: 50px;
            }
        }


        .half-height {
            height: 50%;

            .title {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 40px;
                background: var(--background-color-base);
            }

            .content {
                height: calc(100% - 40px);
            }
        }
    }
</style>