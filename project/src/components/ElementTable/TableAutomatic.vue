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
            <el-table 
                :data="tableData" 
                border stripe highlight-current-row
                height='100%'
                style="width: 100%">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    type="index"
                    width="50">
                </el-table-column>
                <el-table-column 
                    v-for="item in tableOptions" 
                    :key="item.field" 
                    :prop="item.field" 
                    :label="item.name"
                    align="center">
                </el-table-column>

                <el-table-column fixed="right" label="操作" width="100">
                    <template>
                        <el-button type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
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
                    :page-size.sync="size"
                    :total="total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { scrollTo } from '@/util/common/scroll-to'
export default {
    components: {  },
    props: {  

        /**
         * 分页数据传递
         */
        pageOptions: {
            type: Object,
            default: function() {
                return {
                    pageSizes: [30, 50, 100, 150, 200],
                    layout: 'total, sizes, prev, pager, next, jumper',
                }
            }
        },

        page: {
            type: Number,
            default: 1
        },

        size: {
            type: Number,
            default: 50
        },

        total: {
            required: true,
            type: Number
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



    },
    name: '',
    data() {
        return {
            showMore: false,
        };
    },
    watch: {
        
    },
    computed: {
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
        pageSize: {
            get() {
                return this.size
            },
            set(val) {
                this.$emit('update:size', val)
            }
        },
    },
    methods: {
        handleSizeChange(val) {
            this.$emit('pagination', { page: this.currentPage, pageSize: val })
            if (this.autoScroll) {
                scrollTo(0, 800)
            }
        },

        handleCurrentChange(val) {
            this.$emit('pagination', { page: val, pageSize: this.pageSize })
            if (this.autoScroll) {
                scrollTo(0, 800)
            }
        }
    },
    created() {
        
    },
    mounted() {
        
    },
};
</script>
<style lang="scss" scoped>
@import './scss/table.scss'
</style>