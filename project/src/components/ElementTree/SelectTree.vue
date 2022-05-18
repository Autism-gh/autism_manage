<template>
    <el-select ref="select" 
        :disabled="disable" 
        :value="formatSelectValue" 
        :popper-append-to-body="false"
        :placeholder="placeholder" 
        popper-class="tree-select-container" 
        @visible-change="handleScroll($event, false)">

        <!-- 演员 -->
        <el-option :style="formatTreeStyle" value="">&nbsp;</el-option>

        <div class="selectTree">
            <div class="selectTree__main">
                <ElementTree ref="selectTreeRef" 
                    v-bind="$attrs" 
                    @mounted="handleTreeAfterInit"
                    @node-simple-click="handleClick" 
                    @node-check="handleChecked" />
            </div>
            <div v-if="!asyncCommit" class="selectTree__fotter">
                <span class="font--12 text--brand">
                    <span v-if="haveCheckBox">
                        {{ selectTree.checked.length }} / {{ select.rootNumber }}
                    </span>
                </span>
                <span>
                    <el-button class="text--secondary" type="text" @click="cancleSelect">取消</el-button>
                    <el-button type="text" @click="commitSelect">确认</el-button>
                </span>
            </div>
        </div>

    </el-select>
</template>

<script>
    import ElementTree from './ElementTree.vue'
    import { deepClone } from '@/util/common/common'
    import { isString, isObject } from '@/util/common/type-check'
    import { isEmpty } from '@/util/common/common'
    export default {
        model: {
            prop: 'chooseValue',
            event: 'change'
        },

        components: {
            ElementTree
        },
        props: {
            /**
             * 
             * 绑定的值！
             * 
             */
            chooseValue: {
                type: [Object, Array, String],
                default: function() {
                    return {}
                }
            },

            /**
             * 
             * 有用的值！
             * chooseValue 传递什么出去就传递什么进来！
             * 
             */
            useKey: {
                type: [String, Array],
                default: function() {
                    return 'id'
                }
            },




            disable: {
                type: Boolean,
                default: false
            },

            placeholder: {
                type: String,
                default: '请选择对象'
            },

            selectText: {
                type: String,
                default: '个对象'
            },

            treeHeight: {
                type: [String, Number],
                default: 400
            },

            treeWidth: {
                type: String,
                default: '300px'
            },


            /**
             * 可选的节点
             *
             * {
             *    key: 'type',    那个值？
             *    value: ['first', 'second']   有哪些可能的？？？计算在里面
             * }
             * 需要节点筛选，满足key value匹配的节点将会在返回结果中过滤
             * 
             * 如上述，所有节点的 type值 为 first second 的 将不做返回
             */
            returnRules: {
                type: [String, Object],
                default: function() {
                    return {}
                }
            },


            /**
             * 返回选中值的方式
             * asyncCommit 异步提交 ？ false emit 修改数据  true 同步提交
             * async 异步  走 emit &  @change
             * sync  同步  调用之后可直接获取  result = await initDialogTree(' 想选中的值的id / list ')
             */
            asyncCommit: {
                type: Boolean,
                default: false
            },
        },
        name: '',
        data() {
            return {
                select: {
                    nodeOptions: {},
                    treeData: [],
                    rootNumber: 0
                },


                selectTree: {
                    // 选中的节点数据（多）
                    checked: [],
                    // 可以选择的数据的数量
                    clicked: {},
                    // 高亮选中的数据
                    heightLightId: ''
                },


                waitForInit: null,

                promiseResolve: null
            };
        },
        watch: {
            
        },
        computed: {
            checkMode() {
                return this.$attrs['check-mode'] || this.$attrs['checkMode'] || 'checkbox'
            },

            haveCheckBox() {
                return this.checkMode !== 'nocheck'
            },

            formatTreeStyle() {
                const { treeHeight, treeWidth } = this
                const height =  `height: ${ isString(treeHeight) ? treeHeight : `${ treeHeight }px` }`
                return `${ height }; width: ${ treeWidth }; background-color: var(--color-white)`
            },


            formatSelectValue() {
                const { checked, clicked } = this.selectTree
                const { rootNumber, nodeOptions } = this.select
                const number = checked?.length || 0
                if (number) {
                    const text = number === rootNumber ? '全部' : ''
                    return `已选择${text}${number}${this.selectText}`
                } else {
                    return clicked ? clicked[nodeOptions.label] || '' : ''
                }
            }
        },
        methods: {
            async setInputValue() {
                const $tree = this.$refs['selectTreeRef']
                
                if(isEmpty(this.chooseValue)) {
                    // 清空选中和高亮
                    $tree.clearChecked()
                    $tree.clearCurrent()
                    return
                }

                const { nodeOptions, treeData } = this.select
                const { id: ruleId } = nodeOptions

                console.log('this.chooseValue', this.chooseValue)

                let heightLight
                // 有框的选中
                if(this.haveCheckBox) {
                    let checkedKeys

                    // ruleId 是树配置的 id 是通过 setCheckedKeys 去选中的方式，你可以要其他数据，但是不能少了它！
                    if(isString(this.useKey) && this.useKey !== 'all' && this.useKey === ruleId) {
                        this.selectTree.clicked = treeData.find(item => item[ruleId] === this.chooseValue)
                        checkedKeys = [this.chooseValue]
                        heightLight = this.chooseValue
                    } else {
                        this.selectTree.checked = treeData.filter(item => this.chooseValue.includes(item[ruleId]))
                        checkedKeys = this.chooseValue.map(item => item[ruleId])
                    }

                    console.log('checkedKeys', checkedKeys)
                    $tree.setCheckedKeys(checkedKeys)
                } else {
                    heightLight = this.chooseValue
                }

                const currentNode = $tree.getNode(heightLight)
                currentNode && currentNode.expand(null, true);
                $tree.setCurrentKey(currentNode)
            },


            async handleClick(data, node) {
                // 不是选中模式的点击事件不作为
                if (this.checkMode === 'checkbox') return
                this.selectTree.clicked = data
                
                if(this.asyncCommit) {
                    this.handleEmitValue(data)
                    await this.$nextTick()
                    if (this.checkMode !== 'checkbox') {
                        this.cancleSelect()
                    }
                }
            },


            async handleChecked(data, node) {
                if(!node) return
                if (this.checkMode === 'radio') {
                    this.selectTree.clicked = node.checkedNodes[0]
                } else {
                    this.selectTree.checked = this.handleCanSelectList(node.checkedNodes)
                }

                if(this.asyncCommit) {
                    const { checked, clicked } = this.selectTree
                    const handleData = this.checkMode === 'radio' ? clicked : checked

                    this.handleEmitValue(handleData)
                    await this.$nextTick()

                    if (this.checkMode !== 'checkbox') {
                        this.cancleSelect()
                    }
                }
            },


            handleEmitValue(data) {
                let formatResult = {}
                // 需要node 中的多种数据
                const arrayType = Array.isArray(this.useKey)

                if(isEmpty(data)) {
                    formatResult = Array.isArray(data) ? [] : null
                } else {
                    if(this.useKey === 'all') {
                        formatResult = deepClone(data)
                    } else {

                        // 数据多选的情况
                        if(Array.isArray(data)) {
                            
                            if (arrayType) {
                                formatResult = data.map(item => {
                                    const obj = {}
                                    this.useKey.forEach(key => {
                                        obj[key] = item[key]
                                    })
                                    return obj
                                })
                            } else {
                                formatResult = data.map(item => item[this.useKey])
                            }
                        }
                        // 数据单选选择的情况
                        else 
                        {
                            if (arrayType) {
                                const obj = {}
                                this.useKey.forEach(key => {
                                    obj[key] = data[key]
                                })
                                formatResult = obj
                            } else {
                                formatResult = data[this.useKey]
                            }
                        }
                    }
                }

                // this.$emit('update:chooseValue', formatResult)
                this.$emit('change', formatResult)
            },







            cancleSelect() {
                this.$refs['select'].blur()
            },


            commitSelect() {
                const result = this.getCommitSelect()
                this.$emit('change', result)
                this.cancleSelect()
            },


            /**
             * 外界手动获取目前选中 / 点击的单选的数据
             */
            getCommitSelect() {
                let result
                const { nodeOptions } = this.select
                const { checked, clicked } = this.selectTree
                const { id: ruleId } = nodeOptions

                if (this.checkMode === 'checkbox') {
                    const keyList = checked.map(item => item[ruleId])
                    result = {
                        keyList: keyList,
                        nodeList: checked
                    }
                } else {
                    result = {
                        key: clicked[ruleId],
                        node: clicked
                    }
                }
                return result
            },











            handleScroll(val, deep = true) {
                const { heightLightId } = this.selectTree
                const $tree = this.$refs['selectTree']
                if (!val || !heightLightId) return
                if (deep) {
                    $tree.scrollToRightView(heightLightId)
                    return
                }
            },


            handleTreeAfterInit($tree, { treeList, nodeOptions }) {
                if (!treeList || !treeList.length) return
                this.select.nodeOptions = deepClone(nodeOptions)
                this.select.treeData = deepClone(treeList)

                const canList = this.handleCanSelectList(treeList)
                this.select.rootNumber = canList.length

                this.setInputValue()
                this.promiseResolve({ state: true, message: 'OK' })
            },

            
            reSetPromiseInit(type = true) {
                try {
                    if (this.waitForInit) {
                        this.promiseResolve({ state: false,  message: 'open again' })
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

            handleCanSelectList(list) {
                let result
                if (isObject(this.returnRules) && JSON.stringify(this.returnRules) !== '{}') {
                    const { key, value } = this.returnRules
                    result = list.filter(item => item[key] !== undefined && value.includes(item[key]))
                } else {
                    result = list
                }
                return result
            },

        },
        created() {
            this.reSetPromiseInit()
        },
        mounted() {
            console.log('giao')
        },  

        beforeDestroy() {
            this.reSetPromiseInit(false)
        }
    };
</script>
<style lang="scss">
    .tree-select-container {
        height: max-content;

        .el-scrollbar {
            height: 100%;
        }

        .el-scrollbar__bar {
            display: none;
        }

        .el-select-dropdown__wrap {
            width: 100%;
            height: 100%;
            overflow: hidden;
            max-height: inherit;
        }

        .el-select-dropdown__item {
            padding: 0 8px 5px 0px;
        }

        .el-select-dropdown__list {
            padding: 0;
        }
    }

    .selectTree-tooltip {

        &.el-tooltip__popper[x-placement^=top],
        &.el-popper[x-placement^=top] {
            margin-bottom: 6px;
        }
    }
</style>
<style lang="scss" scoped>
    .selectTree {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 100;

        &__main {
            height: calc(100% - 36px);
            width: 100%;
        }

        &__fotter {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 36px;
            padding: 0 10px;
            border-top: solid 1px var(--border-color-base);
        }
    }
</style>