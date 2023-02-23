<template>
    <div class="rollTable hide-scrollbar">
        <div class="table-header">
            <ul>
                <li v-for="item in fieldConfig" :key="item.key" :style="`width: ${ item.width }; text-align: ${ item.align || 'center' };`">
                    {{ item.name }}
                </li>
            </ul>
        </div>
        <div class="table-content" ref="scrollContent">
            <div class="table-scroll"
                @mouseenter="handleMouseEnter" 
                @mouseleave="handleMouseLeave" 
                :style="{ transform: `translate(0px,-${scrollTop}px)` }" >
                <div class="table-main" ref="tablemain">
                    <ul v-for="(data, index) in tableData" :key="index">
                        <li v-for="field in fieldConfig" :key="field.key" :style="`width: ${ field.width }; text-align: ${ field.align || 'center' };`">
                            {{ data[field.key] }}
                        </li>
                    </ul>
                </div>
                <!-- 对留白问题进行填充，看起来连贯很多 -->
                <div class="table-main" v-html="copyHtml"></div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'RollTable',
        components: {},
        props: {
            // fieldConfig: {
            //     type: Array,
            //     default: () => []
            // },

            // tableData: {
            //     type: Array,
            //     default: () => []
            // },

            scrollSpeed: {
                type: Number,
                default: 50
            }
        },
        data() {
            return {
                fieldConfig: [
                    {
                        name: '姓名',
                        key: 'name',
                        width: '20%',
                    },
                    {
                        name: '年龄',
                        key: 'age',
                        width: '20%',
                    },
                    {
                        name: '部门',
                        key: 'group',
                        width: '20%',
                    },
                    {
                        name: '岗位',
                        key: 'job',
                        width: '20%',
                    },
                    {
                        name: '爱好',
                        key: 'love',
                        width: '20%',
                    }
                ],

                allowScroll: false,

                tableData: [],

                scrollTop: 0, //列表滚动高度

                scrollTimer: null,

                copyHtml: null
            }
        },
        computed: {

        },
        methods: {
            initScroll() {
                const $scroll = this.$refs['scrollContent']
                const $table = this.$refs['tablemain']

                // console.log('sss', $scroll.offsetHeight, $table.offsetHeight)
                // 高度不够不滚动
                if($scroll.offsetHeight < $table.offsetHeight) {
                    this.allowScroll = true
                } else {
                    this.allowScroll = false
                }
                this.copyHtml = this.$refs.tablemain.innerHTML
                this.startScroll()
            },
            
            handleMouseEnter() {
                this.stopScroll()
            },

            handleMouseLeave() {
                this.startScroll()
            },

            startScroll() {
                if(this.allowScroll) {
                    this.stopScroll()
                    this.scrollTimer = setInterval(this.handleScrollBar, this.scrollSpeed)
                }
            },

            stopScroll() {
                if(this.scrollTimer) {
                    clearInterval(this.scrollTimer)
                    this.scrollTimer = null
                }
            },

            handleScrollBar() {
                this.scrollTop++
                // 获取需要滚动的盒子的高度
                let scrollItemBox = this.$refs.tablemain.offsetHeight
                // 当判断滚动的高度大于等于盒子高度时，从头开始滚动
                if (this.scrollTop >= scrollItemBox) {
                    this.scrollTop = 0
                }
            },

            async refreshChartData() {
                const tableData = []
                for(let i = 0; i < 20;  i ++) {
                    tableData.push({
                        name: `name${i}`, age: `age${i}`, group: `group${i}`, job: `job${i}`, love: `love${i}`
                    })
                }
                this.tableData = tableData
                await this.$nextTick()
                this.initScroll()
            }
        },
        beforeCreate() {

        },
        created() {

        },
        beforeMount() {

        },
        mounted() {
            this.refreshChartData()
            
        },
        beforeDestroy() {
            this.stopScroll()
        },
    }
</script>
<style lang="scss" scoped horizontalvw>
.rollTable {
    height: 100%;
    width: 100%;
    color: #999999;
    overflow: hidden;

    .table-header {
        height: 40px;
        background-color: rgba(0,0,0,0.35);
        z-index: 1000;

        ul {
            height: 100%;
            display: flex;
            line-height: 40px;
            li {
                font-size: 14px;
            }
        }
    }
    .table-content {
        height: calc(100% - 40px);
        overflow-y: hidden;
    }

    .table-scroll {
        width: 100%;
        overflow-y: auto;
    }
    
    .table-main {
        ul {
            display: flex;
            height: 40px;
            line-height: 40px;
            li {
                font-size: 14px;
            }


            &:nth-child(odd) {
                background-color: rgba(0,0,0,0.15);
            }
        }
    }
}
</style>