<template>
    <div :class="['table-container', {'has-extand': $slots.extand}]">
        <div class="query-wrapper">
            <div class="first-floor">
                <div class="filter-left" v-if="$slots.filterLeft">
                    <slot name="filterLeft"></slot>
                </div>
                <div class="filter-right">
                    <slot name="filterRight"></slot>
                </div>
            </div>
            <div v-show="showMore" class="extand-floor" v-if="$slots.extand">
                <slot name="extand"></slot>
            </div>
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
                    fixed>
                </el-table-column>

                <el-table-column
                    v-if="preColumns.includes('index')"
                    label="序号"
                    type="index"
                    width="50"
                    align="center"
                    fixed>
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
                            <component :is="item.components"></component>
                        </template>
                        <template v-else>
                            {{ row[item.field] }}
                        </template>
                    </template>

                </el-table-column>

                <el-table-column fixed="right" label="操作" width="100" align="center">
                    <template slot-scope="{ row }">
                        <i @click.stop="handleEmitEvent(item, row)" class="element-table-icon" v-for="item in manageColumn" :key="item.event" :class="item.icon"></i>
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
    </div>
</template>

<script>
import { scrollTo } from '@/util/common/scroll-to'
import FieldsSetting from './components/FieldsSetting.vue'
// import ComponetRow from '@/page/bussiness/DriverManage/components/ComponetRow.vue'
import EVENTS from '@/util/EVENTS'
export default {
    components: { 
        FieldsSetting,

        /* eslint-disable */
        // ComponetRow
        /* eslint-enable */
    },
    props: {  

        /**
         * 分页数据传递
         */
        pageOptions: {
            type: Object,
            default: function() {
                return {
                    // pageSizes: [30, 50, 100, 150, 200],
                    pageSizes: [2, 3, 4, 5, 6],
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
            default: 2,
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
    name: '',
    data() {
        return {
            showMore: false
        };
    },
    watch: {
        formatFieldsConfig() {
            this.reflash()
        }
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
            return this.fieldConfig.map((item, index) => {
                const { width, minWidth, align } = item
                return Object.assign(item, {
                    fixed: index < (this.pinned - this.preColumns.length),
                    width: width || 150,
                    minWidth: minWidth || 150,
                    align: align || 'center'
                })
            })
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


        reflash() {
            this.$refs['automaticstable'].doLayout()
        }
    },
    created() {
        
    },
    beforeMount() {
        this.$on(EVENTS.MANAGE_HANDLER, (type, data) => {
            this.$emit(type, data)
        })
    },
    mounted() {
        
    },

    beforeDestroy() {
        this.$off(EVENTS.MANAGE_HANDLER, () => {})
    }
};
</script>
<style lang="scss" scoped>
@import './scss/table.scss'
</style>