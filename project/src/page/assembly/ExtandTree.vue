<template>
    <div class="dialogTree-container">

        <div class="dialogTree-item">
            <el-button type="primary" @click="handleOpenModal">打开同步弹框树</el-button>
            <div class="message">同步取值，调用方法直接打开 / 传递值， 不用来回搞事件传递，配置好东西就可以直接通过方法内获取想要的数据</div>
        </div>
        <DialogTree 
            ref="dialogTree" 
            treeSign="vehicleModel"
            :mandatory="mandatory">
        </DialogTree>


        <div class="dialogTree-item">
            <el-button type="primary" @click="treeDialog = true">打开异步弹框树</el-button>
            <div class="message">异步取值， 事件传递形式的，可能用在触发什么 事件 调用什么查询方法啥的</div>
        </div>
        <DialogTree 
            ref="dialogTreeAsync" 
            v-model="treeDialog" 
            @change="handleTreeSelectChange" 
            :mandatory="mandatory"
            commitWay="async"
            treeSign="vehicleModel">
        </DialogTree>

        
        <div class="dialogTree-item leftRight">
            <div class="left-wrapper">
                <div class="setting-item">
                    <div class="title">双向绑定的值(多选)</div>
                    <div class="control">
                        {{ JSON.stringify(checkboxModelTree) }}
                    </div>
                </div>
                <div class="setting-item">
                    <div class="title">需要哪些字段？</div>
                    <div class="control">
                        <el-checkbox-group v-model="checkboxUseKey">
                            <el-checkbox label="id"></el-checkbox>
                            <el-checkbox label="parent"></el-checkbox>
                            <el-checkbox label="level"></el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
            </div>
            <div class="center-wrapper">
                <SelectTree 
                    v-model="checkboxModelTree"
                    :useKey="checkboxUseKey"
                    ref="selectTreecheckbox" 
                    treeSign="vehicleModel" 
                    asyncCommit>
                </SelectTree>
            </div>
            <div class="right-wrapper">
                <el-button type="primary" @click="handleOpenFormModal('siyu')">模拟给【单选】添加默认值并打开弹框</el-button>
            </div>
        </div>


        <div class="dialogTree-item leftRight">
            <div class="left-wrapper">
                <div class="setting-item">
                    <div class="title">双向绑定的值(单选)</div>
                    <div class="control">
                        {{ JSON.stringify(radioModelTree) }}
                    </div>
                </div>
                <div class="setting-item">
                    <div class="title">需要哪些字段？</div>
                    <div class="control">
                        <el-checkbox-group v-model="radioUseKey">
                            <el-checkbox label="id"></el-checkbox>
                            <el-checkbox label="parent"></el-checkbox>
                            <el-checkbox label="level"></el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
            </div>
            <div class="center-wrapper">
                <SelectTree 
                    v-model="radioModelTree" 
                    ref="selectTreeradio" 
                    checkMode="radio" 
                    treeSign="vehicleModel" 
                    :useKey="radioUseKey"
                    asyncCommit>
                </SelectTree>
            </div>
            <div class="right-wrapper">
                <el-button type="primary" @click="handleOpenFormModal(['siyu', 'yage'])">模拟给【多选】添加默认值并打开弹框</el-button>
            </div>
        </div>
        


        <el-dialog
            title="提示"
            :visible.sync="modal.show"
            width="30%">
            
            <el-form ref="form" :model="modal.data" label-width="80px">
                <el-form-item label="姓名">
                    <el-input v-model="modal.data.name"></el-input>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input-number v-model="modal.data.age" :min="1" :max="100"></el-input-number>
                </el-form-item>
                <el-form-item label="车型">
                    <SelectTree 
                        v-model="modal.data.vehicle" 
                        checkMode="radio" 
                        treeSign="vehicleModel" 
                        asyncCommit>
                    </SelectTree>
                </el-form-item>
                <el-form-item label="哪些车">
                    <SelectTree 
                        v-model="modal.data.vehicleList"
                        treeSign="vehicleModel" 
                        asyncCommit>
                    </SelectTree>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="modal.show = false">取 消</el-button>
                <el-button type="primary" @click="modal.show = false">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import DialogTree from '@/components/ElementTree/DialogTree'
    import SelectTree from '@/components/ElementTree/SelectTree'
    export default {
        components: {
            DialogTree,
            SelectTree
        },
        props: {},
        name: 'ExtandTree',
        data() {
            return {
                treeDialog: false,

                nodeShowRules: {
                    first: {
                        showCheckbox: false
                    },
                    second: {
                        showCheckbox: false
                    },
                    fouth: {
                        showNode: false
                    }
                },

                returnRules: {
                    key: 'level',
                    value: ['fouth']
                },

                // 不能为空
                mandatory: true,

                checkboxModelTree: null,

                radioModelTree: null,

                checkboxUseKey: ['id', 'parent'],

                radioUseKey: ['id', 'parent'],


                modal: {
                    show: false,

                    data: {
                        name: '',

                        age: '',

                        vehicle: '',

                        vehicleList: []
                    }
                }
            };
        },
        watch: {

        },
        computed: {

        },
        methods: {

            async handleOpenFormModal(parmas) {
                this.modal.show = true
                await this.$nextTick()
                
                if(Array.isArray(parmas)) {
                    Object.assign(this.modal.data, {
                        vehicleList: parmas
                    })
                } else {
                    Object.assign(this.modal.data, {
                        vehicle: parmas
                    })
                }
            },

            /**
             * 
             * 同步形式获取需要的数据
             * 
             */
            async handleOpenModal() {
                const $dialogTree = this.$refs['dialogTree']
                const result = await $dialogTree.initDialogTreeData('siyu')
                console.log('【同步】获取弹框树的值', result)
            },

            handleTreeSelectChange(result) {
                console.log('【异步】获取弹框树的值', result)
                this.treeDialog = false
            }
        },
        created() {

        },
        mounted() {

        },
    };
</script>
<style lang="scss" scoped>
    .dialogTree-container {
        width: 100%;
        height: 100%;
        padding: var(--default-padding);

        .dialogTree-item {
            margin-top: var(--default-padding);
            padding: var(--default-padding);
            display: flex;
            align-items: center;
            background-color: var(--color-white);

            .message {
                margin-left: var(--default-padding);
            }


            &.leftRight {
                flex-direction: row;

                .left-wrapper {
                    display: flex;
                    flex-direction: column;
                    width: 450px;

                    .setting-item {
                        margin-bottom: 10px;
                        line-height: 26px;
                    }
                }

                .center-wrapper {
                    width: 300px;
                }
            }

        }

        
    }
</style>