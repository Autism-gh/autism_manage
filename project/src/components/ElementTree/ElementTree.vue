<template>
    <div class="tree-container" v-loading="tree.loading">

        <div class="header-wrapper">
            <el-select v-model="query.value" :placeholder="placeholder" filterable remote :clearable="false"
                :loading="query.loading" :remote-method="remoteMethod" @visible-change="showSelectNode"
                @change="sendSelectNode">
                <el-option v-for="item in query.filterList" :key="item[nodeOptions.id]"
                    :label="item[nodeOptions.label]" :value="item[nodeOptions.id]" />
            </el-select>

            <i class="tree-search-icon el-icon-search"></i>
        </div>

        <div class="content-wrapper" ref="treeWrap">
            <ElTree
                ref="tree"
                :class="[
                'customtree',
                `customtree--${ treeSign }`,
                `customtree--${ checkMode }`,
                { 'customtree--line': treeLine }]"
                :indent="treeLine ? 0 : 22"
                v-bind="treeAttrs"
                :data="tree.dataObject"
                :show-checkbox="hasCheckBox"
                :check-strictly="formatCheckStrictly"
                :render-content="renderContent"
                :node-key="nodeOptions.id"
                v-on="$listeners"
                @check="handleNodeCheck"
                @node-click="handleNodeClick"
                @check-change="handleCheckChange"
            >

                <div class="elementTree-tree-row" slot-scope="{ data }">
                    <i v-if="treeIcon" :class="['tree-icon', data[nodeOptions.icon]]" />
                    <!-- 
                        树后面带点东西
                     -->
                    <div v-if="checkHave" class="elementTree-tree-node">
                        <div class="element-tree-node__label">
                            {{ data[nodeOptions.label] }}
                        </div>
                        <slot :data="data" name="treeCustom" />
                    </div>
                    <!-- 
                        整个树节点根据你想要得重新来
                     -->
                    <div v-else class="elementTree-tree-node custom">
                        <slot :data="data" name="treeNode" />
                    </div>
                </div>
            </ElTree>
        </div>

    </div>
</template>

<script>
    import ElTree from './ElTree/tree.vue'
    import * as TreeUtil from './treeUtil'
    import { timeSleep } from '@/util/common/common'
    import { mapActions } from 'vuex'
    import PinyinMatch from 'pinyin-match'
    import _ from 'lodash'
    
    export default {
        components: { ElTree },
        props: {
            defaultChecked: {
                type: Array,
                default: () => []
            },

            /**
             * 
             * 可以根据这个东西 直接切换想要的树，这个数据是存到 vuex 里面的
             * 省的每次都调用接口这么麻烦
             * 
             */
            treeSign: {
                type: String,
                default: ''
            },

            defaultSelect: {
                type: String,
                default: ''
            },

            placeholder: {
                type: String,
                default: '请输入关键字查询'
            },

            /**
             * 
             * 选中模式
             * radio  checkbox  nocheck
             * 
             */
            checkMode: {
                type: String,
                default: 'checkbox'
            },

            /**
             * 
             * 自定义节点渲染函数 会覆盖掉slot的内容
             * 注意 渲染函数不会 添加 data-v-xxxxx 不会受到scoped样式影响 需要添加全局样式
             * 
             * 
             */
            renderContent: {
                type: Function,
                default: null
            },



            /**
             * 
             * 父子节点不关联
             * 
             */
            checkStrictly: {
                type: Boolean,
                default: false
            },
            

            /**
             * 
             * 树的图标是否显示
             * 
             */
            treeIcon: {
                type: Boolean,
                default: true
            },


            /**
             *
             *  节点显示规则
             *  type 为该层级的唯一标识
             *  rule hidden(该节点不显示) / showCheckbox(看不见选中框)
             *  {
             *    brand: {
             *      showCheckbox: false,    显示选中框
             *      showNode: false,        显示节点
             *    },
             *    model: {
             *      showCheckbox: false
             *      showNode: false
             *    },
             *  }
             */
            nodeShowRules: {
                type: Object,
                default: function() {
                    return {}
                }
            },

            /**
             * 
             *  树的导航线
             * 
             */
            treeLine: {
                type: Boolean,
                default: false
            },

            treeData: {
                type: Array,
                default: () => null
            },


            /**
             * 
             * element 原生没有双击节点事件，所以采用延迟的形式模拟了一个
             * 不知道后续会不会推出
             * 
             */
            useDBClick: {
                type: Boolean,
                default: false
            },

            
            /**
             * 
             * 不同的树 id name 什么的都是不一样的
             * 外界对 node 的基本配置
             * 
             */
            extandShowRules: {
                type: Object,
                default: () => null
            },

            /**
             * 
             * 点击展开节点规则
             * 有哪些特别的节点是可以通过点击展开的
             * 
             */
            idCanExpandByClick: {
                type: Array,
                default: () => []
            },

            /**
             * 
             * 触碰显示详情
             * 
             */
            treeNodeHover: {
                type: [Boolean, Array],
                default: false
            }
            
        },
        name: '',
        data() {
            return {
                query: {
                    value: '',
                    loading: false,
                    filterList: []
                },

                tree: {
                    loading: false,
                    dataArray: [],
                    dataObject: {},
                    currentChecked: null
                },

                dblickEvent: null,

                waitForInit: null,

                promiseResolve: null,

                nodeOptionRules: JSON.parse(JSON.stringify(TreeUtil.treeNodeOptions))

            };
        },

        provide() {
            return {
                treeArray: this.tree.dataArray
            }
        },

        computed: {
            checkHave() {
                return !this.$scopedSlots.treeNode
            },

            /**
             * 
             * 不同的树有不同的key节点，但是为了组件方便传值的key最好统一
             * 
             */
            nodeOptions() {
                if (this.extandShowRules) {
                    return this.extandShowRules
                } else {
                    return this.treeSign === '' ? this.nodeOptionRules.default : this.nodeOptionRules[this.treeSign] || this.nodeOptionRules.default
                }
            },

            /**
             * 
             * 是否有选中框
             * 
             */
            hasCheckBox() {
                return this.checkMode !== 'nocheck'
            },

            /**
             * 
             * 父子关联
             * 
             */
            formatCheckStrictly() {
                return this.checkMode === 'radio' ? true : this.checkStrictly
            },


            treeAttrs() {
                return Object.assign({
                    // 高亮显示
                    'highlight-current': true,  
                    // 关闭哪点击节点收缩功能改成配置的
                    'expand-on-click-node': false, 
                    // 点击节点选中 checkbox 只在  (有选中框的情况下才会开启)
                    'check-on-click-node': this.hasCheckBox
                }, this.$attrs)
            }
        },

        watch: {    
            treeData: {
                handler: function(value, oldV) {
                    // 重置验证装置
                    this.reSetPromiseInit()
                    // 好像会串数据走深拷贝 后面再看看
                    if(value && value.length) {
                        this.tree.dataArray = JSON.parse(JSON.stringify(value))
                        // this.tree.dataArray = [...value]
                    } else {
                        this.tree.dataArray = []
                    }
                },
                immediate: true
            },

            'tree.dataArray': {
                handler: async function(value, oldV) {
                    if (!value || !value.length) {
                        this.tree.dataObject = []
                        return
                    }
                    this.tree.dataObject = TreeUtil.listToTree(value, this.nodeOptions, this.nodeShowRules)
                    await this.$nextTick()
                    this.handleOverInit(value)
                },
                immediate: true
            },

            'query.value': function(value, oldV) {
                if (!value) return
                const $tree = this.$refs['tree']
                const node = $tree.getNode(value)
                $tree.setCurrentKey(value)
                node.expand(null, true)
            },

            checkMode(newVal) {
                this.clearChecked()
            }
        },

        methods: {
            ...mapActions('tree', {
                GetTreeDataArrayBySign: 'getTreeData'
            }),

            reSetPromiseInit(type = true) {
                try {
                    this.tree.loading = true
                    if (this.waitForInit) {
                        this.promiseResolve(`数据刷新清空回调`)
                        this.waitForInit = null
                        this.promiseResolve = null
                    }
                    if (!type) return

                    this.waitForInit = new Promise((resolve) => {
                        this.promiseResolve = resolve
                    })
                } catch (error) {
                    console.log('error', error)
                }
            },

            async handleOverInit(list = null) {
                this.handleInitCustom()
                const $tree = this.$refs['tree']
                // 双验证
                const { dataArray, dataObject } = this.tree

                const firstNode = dataArray?.[0]

                // 默认展开第一个节点
                if(firstNode) {
                    const activeNode = $tree?.getNode(firstNode)
                    if(activeNode) activeNode.expand(null, true)
                }

                this.$emit('mounted', $tree, {
                    treeList: list || dataArray,
                    treeData: dataObject,
                    firstNode: firstNode
                })
                this.promiseResolve('yes')
                await this.$nextTick()
                // await timeSleep(2000)
                this.tree.loading = false
            },
            
            
            handleInitCustom() {
                const $tree = this.$refs['tree']
                // 默认高亮
                if (this.defaultSelect) {
                    this.expandByNodeId(this.defaultSelect)
                    $tree.setCurrentKey(this.defaultSelect)
                }

                if (this.defaultChecked.length) {
                    if (this.checkMode === 'checkbox') {
                        $tree.setCheckedKeys(this.defaultChecked)
                    }

                    if (this.checkMode === 'radio') {
                        const checkId = this.defaultChecked[0]
                        this.expandByNodeId(checkId)
                        $tree.setChecked(checkId, true, false)
                        $tree.setCurrentKey(checkId)
                    }
                }
            },


            /**
             *
             *  拒绝监听vuex数据，这里添加是否从 API获取数据，与 ztreeData 呼应上
             *
             */
            async initTreeData(type = this.treeSign, fromApi = true) {
                if (!type) return
                this.tree.loading = true
                /**
                 *  根绝type 去 vuex 中拿到想要的数据
                 */
                const treeData = await this.GetTreeDataArrayBySign({ type, fromServer: fromApi })
                this.tree.dataArray = JSON.parse(JSON.stringify(treeData))
                await this.$nextTick()
                this.handleOverInit()
                this.tree.loading = false
            },



            /**
             * 
             * 常用的方法
             * 
             */
            clearChecked() {
                const $tree = this.$refs['tree']
                $tree.setCheckedKeys([]);
            },  

            setCheckedNodes(node) {
                const $tree = this.$refs['tree']
                $tree.setCheckedNodes(node)
                this.handleNodeCheck({}, this.getTreeCurrentState(), null)
            },
            
            setCheckedKeys(keys) {
                const $tree = this.$refs['tree']
                $tree.setCheckedKeys(keys)
                this.handleNodeCheck({}, this.getTreeCurrentState(), null)
            },

            getNode(key) {
                const $tree = this.$refs['tree']
                return $tree.getNode(key)
            },

            setCurrentKey(key) {
                const $tree = this.$refs['tree']
                $tree.setCurrentKey(key)
            },


            /**
             * 展开指定元素
             */
            expandByNode(node) {
                if (!node) return
                if (node?.parent) {
                    this.expandByNode(node.parent)
                }
                if (!node.expanded) {
                    node.expand()
                }
            },

            /**
             * 根据ID 展开
             */
            expandByNodeId(nodeId) {
                if (!nodeId) return
                const $tree = this.$refs['tree']
                const node = $tree.getNode(nodeId)
                this.expandByNode(node)
            },


            /**
             * 
             * 选中点击事件
             * 
             */
            handleCheckChange(data, checked, tree) {
                if (this.checkMode === 'radio' && checked) {
                    this.tree.currentChecked = data
                    this.$refs.tree.setCheckedNodes([data])
                }
            },

            async handleNodeCheck(data, node, $node) {
                this.$emit('node-check', data, node)
            },

            handleNodeClick(data, node, $node) {
                if (this.useDBClick) {
                    if (this.dblickEvent) {
                        clearTimeout(this.dblickEvent)
                        this.dblickEvent = undefined
                        this.$emit('node-double-click', data, node)
                    } else {
                        this.dblickEvent = setTimeout(() => {
                            this.dblickEvent = undefined
                        }, 300)
                    }
                } else {
                    if(this.idCanExpandByClick.length) {
                        const levelValue = data[this.nodeOptions.level]
                        if (levelValue && this.idCanExpandByClick.includes(levelValue)) {
                            if (node.expanded) {
                                node.collapse()
                            } else {
                                node.expand()
                            }
                        }
                    }
                    this.$emit('node-simple-click', data, node)
                }
            },


            getCurrentInfo(type) {
                const $tree = this.$refs['tree']
                const queryNode = $tree.getNode(this.query.value)

                switch (type) {
                    case 'current':
                        return queryNode.data
                    case 'checkedNodes':
                        return $tree.getCheckedNodes()
                    case 'checkedKeys':
                        return $tree.getCheckedKeys()
                    case 'halfCheckedNodes':
                        return $tree.getHalfCheckedNodes()
                    case 'halfCheckedKeys':
                        return $tree.getHalfCheckedKeys()
                    default:
                        return Object.assign({
                            queryNode: queryNode.data,
                            selectNode: $tree.getCurrentNode()
                        }, this.getTreeCurrentState())
                }
            },


            
            /**
             *  业务尚未贯彻，暂且不知道目前筛选方式的差异，后续改进可以添加新的选择框根据指定类型来查询
             *  筛选方法，后面肯定要升级先暂时用文字节点代替
             */
            remoteMethod(query) {
                if (query !== '') {
                    setTimeout(() => {
                        this.query.filterList = this.tree.dataArray.filter(item => PinyinMatch.match(item[this.nodeOptions.label], query))
                    }, 500)
                } else {
                    this.query.filterList = []
                }
            },

            showSelectNode(type) {
                if (type) {
                    const node = this.query.filterList.find(item => item[this.nodeOptions.id] === this.query.value)
                    const $tree = this.$refs['tree']
                    if (node) {
                        $tree.setCurrentNode(node)
                    }
                }
            },

            async sendSelectNode(index) {
                const $tree = this.$refs['tree']
                const node = $tree.getNode(this.query.value)
                $tree.setCurrentKey(node[this.nodeOptions.id])

                if (this.hasCheckBox) {
                    node.setChecked(true, true)
                    this.handleNodeCheck(node?.data, this.getTreeCurrentState(), null)
                } else {
                    this.handleNodeClick(node?.data, this.getTreeCurrentState(), null)
                }
                this.scrollToRightView()
            },

            getTreeCurrentState() {
                const $tree = this.$refs['tree']
                return {
                    checkedNodes: $tree.getCheckedNodes(),
                    checkedKeys: $tree.getCheckedKeys(),
                    halfCheckedNodes: $tree.getHalfCheckedNodes(),
                    halfCheckedKeys: $tree.getHalfCheckedKeys()
                }
            },


            scrollToRightView: _.debounce(async function(nodeId = null) {
                const $tree = this.$refs['tree']
                if (nodeId) {
                    $tree.setCurrentKey(nodeId)
                    this.expandByNode($tree.store.nodesMap[nodeId])
                    await this.$nextTick()
                    /**
                     * 
                     * 因为 select 下拉得时候有个动画延时，所以需要把这个时间给算进去
                     * 不然会出现定位不准确得问题，相当蓝瘦
                     * 
                     */
                    await timeSleep(400)
                }
                const $node = this.$el.querySelector('div[role=treeitem].el-tree-node.is-current')
                if ($node) {
                    const $treeWrap = this.$refs['treeWrap']
                    const wrapRect = $treeWrap.getBoundingClientRect()
                    const nodeRect = $node.getBoundingClientRect()
                    const { top } = wrapRect
                    $treeWrap.scrollTo({ top: (nodeRect.top + $treeWrap.scrollTop) - top })
                }
            }, 1000),
        },
        created() {
            this.reSetPromiseInit()
        },
        async mounted() {
            if (!this.treeData) {
                await this.initTreeData()
            }
        },
    };
</script>
<style lang="scss">
@import './ElementTree.scss';
</style>

<style lang="scss" scoped>
.tree-container {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;

    .header-wrapper {
        position: relative;
        padding: var(--default-padding);

        .el-select {
            width: 100%;
        }

        .tree-search-icon {
            position: absolute;
            right: 20px;
            top: 16px;
            font-size: 16px;
            color: var(--color-text-secondary);
        }
    }   
    
    .content-wrapper {
        flex-grow: 1;
        overflow: auto;
        margin: 0 var(--default-padding);
    }

    .elementTree-tree-row {
        display: flex;
        flex-direction: row;
        align-items: center;

        .tree-icon {
            font-size: 16px;
            margin-right: 5px;
            color: var(--color-primary);
        }
    }
}
</style>