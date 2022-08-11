<template>
    <div :class="['table-container', {'has-extand': $slots.extand}]">
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
            <div class="table-lock-icon">
                <i class="el-icon-download"></i>
                <i class="el-icon-setting" @click="handleOpenFieldDialog"></i>
            </div>

            <el-table 
                ref="automaticstable"
                :data="tableData" 
                border stripe highlight-current-row
                height='100%'
                style="width: 100%"
                v-on="$listeners">
                
                <el-table-column
                    v-if="preColumns.includes('checkbox')"
                    type="selection"
                    width="55"
                    align="center"
                    :fixed="fixedCheckbox">
                </el-table-column>

                <el-table-column
                    v-if="preColumns.includes('index')"
                    label="序号"
                    type="index"
                    width="50"
                    align="center"
                    :fixed="fixedIndex">
                </el-table-column>

                <el-table-column 
                    v-for="(item, index) in formatFieldsConfig" 
                    :key="`${ item.field }-${ index }`" 
                    :label="item.name"
                    :width="item.width"
                    :min-width="item.minWidth"
                    :fixed="item.fixed"
                    :sortable="item.sortable"
                    :align="item.align">
                    
                    <template slot-scope="{ row }">
                        <template v-if="item.components">  
                            <slot :data="row" :name="`table-${item.components}`"></slot>
                        </template> 
                        <template v-else-if="item.formatter">
                            {{ item.formatter({ row, value: row[item.field] }) }}
                        </template>
                        <template v-else>
                            {{ row[item.field] }}
                        </template>
                    </template>

                </el-table-column>

                <el-table-column fixed="right" label="操作" :width="manageColumn.length * 40" align="center">
                    <template slot-scope="{ row }">
                        <i @click.stop="handleEmitEvent(item, row)" 
                            class="element-table-icon" 
                            v-for="item in manageColumn" 
                            :key="item.event" :class="item.icon">
                        </i>
                    </template>
                </el-table-column>

                <el-table-column fixed="right" label="" width="70"></el-table-column>
            </el-table>
        </div>
        <div class="page-wrapper">
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

        <FieldsSetting ref="FieldsSetting"></FieldsSetting>

        <slot></slot>
    </div>
</template>

<script>
import { scrollTo } from '@/util/common/scroll-to'
import FieldsSetting from './components/FieldsSetting.vue'
export default {
    components: { 
        FieldsSetting,
    },
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
        }

    },
    name: 'TableAutomatic',
    data() {
        return {
            showMore: false,

            fixedCheckbox: false,

            fixedIndex: false
        };
    },
    watch: {
        formatFieldsConfig: {
            handler() {
                this.reflash()
            },
            immediate: true
        },

        tableData: {
            handler() {
                this.reflash()
            },
            immediate: true
        },
    },
    computed: {
        formatToal() {
            return this.total || this.tableData?.length || 0
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

        formatFieldsConfig() {
            // 这些都是配好的
            if(this.checkedField?.length) {
                return this.checkedField.map((item, index) => {
                    const fixed = index < (this.pinned - this.preColumns.length)
                    return Object.assign(item, { fixed })
                })
            } else {
                // 没配好的可能还没格式化
                return this.fieldConfig.map((item, index) => {
                    const { width, minWidth, align } = item
                    const fixed = index < (this.pinned - this.preColumns.length)
                    return Object.assign(item, {
                        fixed,
                        width: width,
                        minWidth: minWidth || 120,
                        align: align || 'center'
                    })
                })
            }
        }
    },
    methods: {
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


        async reflash() {
            this.fixedIndex = this.pinned >= this.preColumns.length
            await this.$nextTick()
            this.fixedCheckbox = this.pinned >= this.preColumns.length
            await this.$nextTick()
            this.$refs['automaticstable'].doLayout()

            // const operateInstance = document.getElementsByClassName('el-table-slot-btn')[0]
            // if(operateInstance) {
            //     this.manageWidth = operateInstance?.offsetWidth + 50
            // }
        },

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
<style lang="scss" scoped>
@import './scss/table.scss'
</style>