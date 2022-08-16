<template>
    <div :class="['table-container', $slots.extand ? 'has-extand' : '']">
        <div class="query-wrapper">
            <div class="first-floor">
                <div class="filter-left" v-if="$slots.filterLeft">
                    <slot name="filterLeft"></slot>
                </div>
                <div class="filter-right">
                    <slot name="filterRight"></slot>
                    <i v-if="$slots.extand" :class="['filter-more-icon', showMore ? 'el-icon-arrow-up': 'el-icon-arrow-down']"  @click="showMore = !showMore" />
                </div>
            </div>
            <el-collapse-transition>
                <div v-show="showMore" class="extand-floor" v-if="$slots.extand">
                    <slot name="extand"></slot>
                </div>
            </el-collapse-transition>
        </div>
        <div class="botton-wrapper" v-if="$slots.button">
            <slot name="button"></slot>
        </div>
        <div class="table-wrapper">
            <div v-show="!formatTableList.length" class="el-table-custom-entry">{{ emptyText }}</div>

            <el-table 
                v-loading="tableLoading"
                class="el-table__format"
                :row-class-name="tableRowClassName"
                ref="automaticstable"
                :data="formatTableList" 
                border stripe highlight-current-row
                height='100%'
                style="width: 100%"
                v-on="$listeners"
                @row-contextmenu="handleRightClickEvent">
                
                <el-table-column
                    v-if="preColumns.includes('checkbox')"
                    type="selection"
                    align="center"
                    :fixed="fixedCheckbox"
                    width="55">
                </el-table-column>

                <el-table-column
                    v-if="preColumns.includes('index')"
                    label="序号"
                    type="index"
                    align="center"
                    :fixed="fixedIndex"
                    width="50">
                </el-table-column>

                <el-table-column 
                    v-for="(item, index) in formatFieldsConfig" 
                    :key="`${ item.field }-${ index }`" 
                    show-overflow-tooltip
                    :label="item.name"
                    :width="item.width"
                    :min-width="item.minWidth"
                    :fixed="item.fixed"
                    :sortable="item.sortable"
                    :align="item.align"
                    :prop="item.field">
                    
                    <template slot-scope="{ row }">
                        <template v-if="item.components">  
                            <slot :data="row" :name="`table-${item.components}`"></slot>
                        </template> 
                        <template v-else>
                            {{ row[item.field] || '-' }}
                        </template>
                    </template>

                </el-table-column>


                <el-table-column v-if="$scopedSlots.tableoperate" v-show="manageWidth"
                    fixed="right" label="操作" :width="scopedSlotsWidth" align="center">
                    <template slot-scope="{ row }">
                        <div class="el-table-slot-btn">
                            <slot name="tableoperate" :data="row"></slot>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column v-if="manageColumn.length" v-show="manageWidth" 
                    fixed="right" label="操作" :width="iconsSlotsWidth" align="center">
                    <template slot-scope="{ row }">
                        <div class="el-table-slot-icon">
                            <span v-for="item in manageColumn" :key="item.event">
                                <span v-show="item.usetext" @click.stop="handleEmitEvent(item, row)" class="element-table-text">{{ item.name }}</span>
                                <IconBtn v-show="!item.usetext" @click.stop="handleEmitEvent(item, row)"  class="element-table-icon" :icon="item.icon" :title="item.name"></IconBtn>
                            </span>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column v-if="fileIcon || exportIcon" fixed="right" width="70" align="center">
                    <template slot="header" >
                        <IconBtn v-if="exportIcon" icon="el-icon-download" @click="exportExcel" title=导出></IconBtn>
                        <IconBtn v-if="fileIcon" icon="el-icon-setting" @click="handleOpenFieldDialog" title="设置"></IconBtn>
                    </template>
                </el-table-column>

            </el-table>
        </div>


        <div class="page-wrapper" v-show="usePage">
            <div class="page-left" v-if="$slots.pageLeft">
                <slot name="pageLeft"></slot>
            </div>
            <div class="page-right">
                <el-pagination
                    v-bind="pageAttrs"
                    :current-page.sync="currentPage"
                    :page-size.sync="currentPageSize"
                    :total="formatToal"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>

        <ul class="right-click-container" ref="rightMenuRef" v-show="rightMenu.show">
            <li v-for="item in rightMenu.list" 
                :key="item.key" @click="handleContentEvent(item)">
                {{ item.name }}
            </li>
        </ul>

        <FieldsSetting ref="FieldsSetting"></FieldsSetting>

        <slot></slot>
    </div>
</template>

<script>
import { scrollTo } from '@/util/common/scroll-to'
import FieldsSetting from './components/FieldsSetting.vue'
import { listToObj } from '@/util/common/common'
import exportXsl from './mixins/exportExl'
import _ from 'lodash'

export default {
    components: { 
        FieldsSetting,
    },
    mixins: [exportXsl],
    props: {  

        /**
         * 分页数据传递
         */
        pageOptions: {
            type: Object,
            default: function() {
                return {
                    pageSizes: [30, 50, 100, 150, 200],
                    // pageSizes: [2, 3, 4, 5, 6],
                    layout: 'total, sizes, prev, pager, next, jumper',
                }
            }
        },

        page: {
            type: Number,
            default: 1
        },

        pagesize: {
            type: Number,
            default: 50
        },

        total: {
            required: true,
            type: Number
        },

        gridTag: {
            type: String,
            default: ''
        },

        pinned: {
            type: Number,
            default: 0,
        },

        /**
         * 
         * 表格数据
         * 
         */

        tableData: {
            type: Array,
            default: function() {
                return []
            }
        },
        
        /**
         * 
         * 序号，选中框
         * 
         */
        preColumns: {
            type: Array,
            default: function() {
                return []
            }
        },

        manageColumn: {
            type: Array,
            default: function() {
                return []
            }
        },

        /**
         * 
         * 显示配置
         * 
         */

        fieldConfig: {
            type: Array,
            default: function() {
                return []
            }
        },
        
        // 选中的
        checkedField: {
            type: Array,
            default: function() {
                return []
            }
        },

        exportIcon: {
            type: [Boolean,String],
            default: true
        },

        fileIcon: {
            type: Boolean,
            default: true
        },

        emptyText: {
            type: String,
            default: '暂无数据'
        },

        usePage: {
            type: Boolean,
            default: true
        }

    },
    name: 'TableAutomatic',
    data() {
        return {
            tableLoading: false,

            showMore: false,

            manageWidth: 0,

            fixedCheckbox: false,

            fixedIndex: false,

            formatTableList: [],

            scopedSlotsWidth: 100,

            iconsSlotsWidth: 100,

            rightMenu: {
                show: false,

                list: [
                    { name: '复制本格', key: 'benge', copy: true },
                    { name: '复制本格(含标题)', key: 'bengeTitle', copy: true },
                    { name: '复制本行', key: 'benhang', copy: true },
                    { name: '复制本行(含标题)', key: 'benhangTtle', copy: true },
                    { name: '导出Excel', key: 'excel', copy: false },
                    { name: '设置', key: 'setting', copy: false },
                ],

                activeData: {},

                activeCell: ''
            }
        };
    },
    
    computed: {
        formatToal() {
            return this.total || this.formatTableList?.length || 0
        },

        pageAttrs() {
            return Object.assign(this.pageOptions, this.$attrs)
        },

        currentPage: {
            get() {
                return this.page
            },
            set(val) {
                this.$emit('update:page', val)
            }
        },
        currentPageSize: {
            get() {
                return this.pagesize
            },
            set(val) {
                this.$emit('update:pagesize', val)
            }
        },

        pageStart() {
            return (this.currentPage - 1) * this.currentPageSize
        },  

        fiedlRules() {
            return listToObj(this.fieldConfig, 'field')
        },

        formatFieldsConfig() {
            // 这些都是配好的
            if(!this.gridTag || !this.checkedField?.length) {
                // 没配好的可能还没格式化
                return this.fieldConfig.map((item, index) => {
                    const { width, minWidth, align } = item
                    const fixed = index < (this.pinned - this.preColumns.length)
                    return Object.assign(item, {
                        fixed: fixed,
                        width: width,
                        minWidth: minWidth || 120,
                        align: align || 'center'
                    })
                })
            } else {
                const format = this.checkedField.filter(item => this.fiedlRules[item.field])
                return format.map((item, index) => {
                    const { field } = item
                    const rule = this.fiedlRules[field]
                    const fixed = index < (this.pinned - this.preColumns.length)
                    return Object.assign(rule, { fixed: fixed })
                })
            }
        }
    },

    watch: {
        formatFieldsConfig: {
            handler() {
                this.reflashField()
            },
            immediate: true
        },

        tableData: {
            handler(newVal) {
                this.handleDataChange(newVal)
            },
            immediate: true
        },
    },
    
    methods: {
        /**
         * 右键
         */

        async handleRightClickEvent(row, columns, event) {
            const { property, label } = columns
            const menuDom = this.$refs['rightMenuRef']
            event.preventDefault();
            menuDom.style.left = event.clientX + "px";
            menuDom.style.top = event.clientY + "px";
            await this.$nextTick()
            this.rightMenu.show = true
            this.rightMenu.activeData = JSON.parse(JSON.stringify(row))
            this.rightMenu.activeCell = { property, label }
        },

        handleContentEvent({ copy, key }) {
            try {
                if(copy) {
                    const { activeData, activeCell: { property, label } } = this.rightMenu
                    const rules = this.fiedlRules[property]
                    let activeText

                    if(rules.components) {
                        activeText = '不可复制'
                    } else {
                        switch (key) {
                            case 'benge':
                                activeText = activeData[property]
                                break;
                            case 'bengeTitle':
                                activeText = `${ label }: ${ activeData[property] }`
                                break;
                            case 'benhang':
                                activeText = this.getRowFormatCopy(activeData)
                                break;
                            case 'benhangTtle':
                                activeText = this.getRowFormatCopy(activeData, true)
                                break;
                        }
                    }

                    this.handleCopyClick(activeText)
                } else {
                    if(key === 'excle') {
                        this.exportExcel()
                    }
                    if(key === 'setting') {
                        this.handleOpenFieldDialog()
                    }
                }
            } catch (error) {
                console.log('error', error)
            } finally {
                this.rightMenu.show = false
            }   
        },

        getRowFormatCopy(activeData, useTitle = false) {
            const keysList = this.checkedField.map(item => item.field)

            const list = []
            keysList.forEach(item => {
                const { name, components } = this.fiedlRules[item]
                let ruleValue = components ? '该字段不可复制' : activeData[item]
                if(useTitle) {
                    ruleValue = `${ name }: ${ ruleValue }`
                }
                list.push(ruleValue)
            })
            return list.join(',')
        },      

        handleCopyClick(text) {
            const inputInstance = document.createElement('input')
            inputInstance.value = text;
            document.body.appendChild(inputInstance)
            inputInstance.select()
            document.execCommand('copy')
            document.body.removeChild(inputInstance)
        },

        tableRowClassName({ row, rowIndex }) {
            row.el_table_index = rowIndex;
        },



        handleOpenFieldDialog() {
            this.$refs['FieldsSetting'].handleOpenModal({
                allData: this.fieldConfig,
                checked: this.checkedField,
                pinned: this.pinned,
                gridTag: this.gridTag,
            })
        },

        handleSizeChange(val) {
            this.$emit('pagination', { page: this.currentPage, pagesize: val })
            if (this.autoScroll) {
                scrollTo(0, 800)
            }
        },

        handleCurrentChange(val) {
            this.$emit('pagination', { page: val, pagesize: this.currentPageSize })
            if (this.autoScroll) {
                scrollTo(0, 800)
            }
        },

        handleEmitEvent({ event }, row) {
            this.$emit(event, row)
        },




        /**
         * 
         * 刷新数据
         * 
         */
        handleDataChange: _.debounce(async function() {
            this.tableLoading = true

            const rulesList = this.fieldConfig.filter(item => item.formatter)

            if(!rulesList.length) {
                this.formatTableList = [...this.tableData]
            } else {
                const ruleObj = listToObj(rulesList, 'field')
                const keyList = Object.keys(ruleObj)
                const copyList = [...this.tableData]
                copyList.forEach(item => {
                    const obj = {}
                    keyList.forEach(child => {
                        const currentRule = ruleObj[child]
                        const { field, formatter } = currentRule
                        obj[field] = formatter({ row: item, value: item[field]  })
                    })
                    Object.assign(item, obj)
                })
                this.formatTableList = copyList
            }


            this.tableLoading = false

            this.reflashTable()
        }, 300),


        async reflashTable() {
            await this.$nextTick()
            this.$refs['automaticstable']?.doLayout()
        },


        reflashField: _.debounce(async function() {
            // 属实难受，fixed 走的循环，同一时间循环的东西太多导致第二个无法执行，所以等等
            this.fixedIndex = this.pinned > 0
            await this.$nextTick()
            this.fixedCheckbox = this.pinned >= this.preColumns.length

            if(this.$scopedSlots.tableoperate) {
                const operateInstance = document.getElementsByClassName('el-table-slot-btn')[0]
                if(operateInstance) {
                    this.scopedSlotsWidth = operateInstance?.offsetWidth + 50
                }
            }
            
            if(this.preColumns?.length) {
                const iconInstance = document.getElementsByClassName('el-table-slot-icon')[0]
                if(iconInstance) {
                    this.iconsSlotsWidth = iconInstance?.offsetWidth + 50
                }
            }

            this.reflashTable()
        }, 100),

        getCheckedRows() {
            return this.$refs['automaticstable'].selection
        }
    },
    created() {
        
    },
    beforeMount() {
        
    },
    mounted() {
        
    },

    beforeDestroy() {

    }
};
</script>
<style lang="scss">
.table-container {
    .el-table__format {
        margin-bottom: 10px;
    }

    .el-table__empty-block {
        display: none;
    }
}
</style>
<style lang="scss" scoped>
@import './scss/table.scss'
</style>