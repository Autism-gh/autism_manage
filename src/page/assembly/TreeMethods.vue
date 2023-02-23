<template>
    <div class="treemethods-container">
        <div class="left-wrapper">
            <ElementTree 
                ref="treeInstance" 
                :treeSign="treeSign"
                :treeIcon="treeIcon"
                :treeLine="treeLine"
                :checkMode="checkMode"
                :useDBClick="useDBClick"
                :treeNodeHover="treeNodeHover"

                @node-check="handleNodeCheck"
                @node-double-click="handleNodeDBClick"
                @node-simple-click="handleNodeSimpleClick"
                >
            </ElementTree>
        </div>
        <div class="right-wrapper">
            <div class="setting-item">
                <div class="title">选中模式</div>
                <div class="control">
                    <el-radio-group v-model="checkMode">
                        <el-radio label="checkbox">多选</el-radio>
                        <el-radio label="radio">单选</el-radio>
                        <el-radio label="nocheck">无</el-radio>
                    </el-radio-group>
                </div>
            </div>

            <div class="setting-item">
                <div class="title">显示图标</div>
                <div class="control">
                    <el-switch v-model="treeIcon"></el-switch>
                </div>
            </div>

            <div class="setting-item">
                <div class="title">显示引导线</div>
                <div class="control">
                    <el-switch v-model="treeLine"></el-switch>
                </div>
            </div>

            <div class="setting-item">
                <div class="title">开启触碰详情</div>
                <div class="control">
                    <el-switch v-model="treeNodeHover"></el-switch>
                </div>
            </div>

            <div class="setting-item">
                <div class="title">开启双击模拟事件</div>
                <div class="control">
                    <el-switch v-model="useDBClick"></el-switch>
                </div>
            </div>
            

            <div class="setting-item">
                <el-button type="primary" @click="checkTreeNodeByNodeID">根据【nodeId】选中本田</el-button>
                <el-button type="primary" @click="checkTreeNodeByNode">根据【node】选中本田</el-button>
                <el-button type="primary" @click="clearTreeChecked">清空所有选中</el-button>
            </div>

            <div class="setting-item">
                <el-button type="primary" @click="setHeightLight">设置本田高亮</el-button>
                <el-button type="primary" @click="clearHeightLight">清空高亮</el-button>
                <el-button type="primary" @click="scrollToRightView('tang')">滚动到比亚迪唐</el-button>
                <el-button type="primary" @click="scrollToRightView('siyu')">滚动到思域</el-button>
            </div>

            <div class="setting-item">
                <el-button type="primary" @click="expandCurrentNode">展开本田</el-button>
                <el-button type="primary" @click="expandAllNode(true)">展开全部</el-button>
                <el-button type="primary" @click="expandAllNode(false)">收起全部</el-button>
            </div>


            <div class="setting-item">
                <span class="card" v-show="!useDBClick">普通点击事件： {{ nodeClickEventNum }}</span>
                <span class="card" v-show="useDBClick">[双击模式] 点击事件： {{ clickEventNum }}</span>
                <span class="card" v-show="useDBClick">[双击模式] 双击事件 {{ dbClickEventNum }}</span>
                <span class="card">选中事件： {{ checkEventNum }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import ElementTree from '@/components/ElementTree/ElementTree'
export default {
    components: { ElementTree },
    props: {  },
    name: '',
    data() {
       return {
           treeSign: 'vehicleModel',

           treeIcon: true,

           treeLine: true,

           checkMode: 'checkbox',

           treeNodeHover: false,

           useDBClick: false,


           checkEventNum: 0,

           clickEventNum: 0,

           dbClickEventNum: 0,

           nodeClickEventNum: 0
       };
    },
    watch: {
        
    },
    computed: {
        
    },
    methods: {
        checkTreeNodeByNodeID() {
            const $tree = this.$refs['treeInstance']
            $tree.setCheckedKeys(['bentian'])
        },

        checkTreeNodeByNode() {
            const $tree = this.$refs['treeInstance']
            const node = $tree.getNode('bentian')
            $tree.setCheckedNodes([node.data])
        },

        clearTreeChecked() {
            const $tree = this.$refs['treeInstance']
            $tree.clearChecked()
        },


        setHeightLight() {
            const $tree = this.$refs['treeInstance']
            $tree.setCurrentKey('siyu')
        },

        clearHeightLight() {
            const $tree = this.$refs['treeInstance']
            $tree.clearCurrent()
        },

        scrollToRightView(type) {
            const $tree = this.$refs['treeInstance']
            $tree.scrollToRightView(type)
        },

        expandCurrentNode() {
            const $tree = this.$refs['treeInstance']
            $tree.expandByNodeId('bentian')
        },

        expandAllNode(type) {
            const $tree = this.$refs['treeInstance']
            $tree.expandAllNode(type)
        },


        handleNodeCheck(data, node) {
            this.checkEventNum ++
        },

        handleNodeDBClick(data, node) {
            this.dbClickEventNum ++
        },

        handleNodeSimpleClick(data, node) {
            this.clickEventNum ++
        },

        handleNodeClick(data, node) {
            this.nodeClickEventNum ++
        }


    },
    created() {
        
    },
    mounted() {
        
    },
};
</script>
<style lang="scss" scoped>
.treemethods-container {
    width: 100%;
    height: 100%;
    padding: var(--default-padding);
    display: flex;
    justify-content: space-between;

    .left-wrapper {
        height: 100%;
        width: 300px;
        background-color: var(--color-white);
    }   

    .right-wrapper {
        height: 100%;
        width: calc(100% - 310px);
        background-color: var(--color-white);
    }

    .setting-item {
        height: 40px;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0 10px;
        margin-bottom: 10px;

        .card {
            margin-right: 10px;
        }

        .title {
            width: 150px;
            margin-right: 20px;
        }

        .control {

        }
    }
}
</style>