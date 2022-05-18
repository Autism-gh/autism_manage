<template>
    <div class="dialogTree-container">

        <div class="dialogTree-item">
            <el-button type="primary" @click="handleOpenModal('checkbox')">打开同步多选弹框树</el-button>
            <el-button type="primary" @click="handleOpenModal('radio')">打开同步单选弹框树</el-button>
            <div class="message">同步取值，调用方法直接打开 / 传递值， 不用来回搞事件传递，配置好东西就可以直接通过方法内获取想要的数据</div>
        </div>
        <DialogTree 
            ref="dialogTree" 
            :checkMode="dialogTreeModel"
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
                <el-button type="primary" @click="handleOpenFormModal('vehicle')">模拟给【单选】添加默认值并打开弹框</el-button>
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
                <el-button type="primary" @click="handleOpenFormModal('vehicleList')">模拟给【多选】添加默认值并打开弹框</el-button>
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
                        ref="selectTree1"
                        v-model="modal.data.vehicle" 
                        checkMode="radio" 
                        treeSign="vehicleModel" 
                        asyncCommit>
                    </SelectTree>
                </el-form-item>
                <el-form-item label="哪些车">
                    <SelectTree 
                        ref="selectTree2"
                        v-model="modal.data.vehicleList"
                        treeSign="vehicleModel" 
                        asyncCommit>
                    </SelectTree>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="modal.show = false">取 消</el-button>
                <el-button type="primary" @click="handleCommit">确 定</el-button>
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
            const defaultData = {
                name: '',
                age: '',
                vehicle: '',
                vehicleList: []
            }

            return {
                treeDialog: false,

                dialogTreeModel: 'radio',

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

                    defaultData,
                    data: JSON.parse(JSON.stringify(defaultData))
                }
            };
        },
        watch: {

        },
        computed: {

        },
        methods: {
            
            /**
             * 
             * 传值的方式如下
             * 
             * 如果是普通情况的 就 ['id'] 即可
             * 
             * 也可以是 但是注意啊，这个id 必须和树上你想要的那个 id 名字一样 ，就是唯一值！！！！如果是
             * [
             *  { id: '', type: '' },
             *  { id: '', type: '' },
             *  { id: '', type: '' }
             * ]
             * 
             */
            async handleOpenFormModal(type) {
                this.modal.show = true
                this.modal.data = JSON.parse(JSON.stringify(this.modal.defaultData))
                await this.$nextTick()

                //  多选情况如下
                if(type === 'vehicleList') {
                    const mockData = ['siyu', 'yage', 'xuefulan']
                    // const mockData = [
                    //     { id: 'siyu', a: '', b: '' },
                    //     { id: 'yage', a: '', b: '' },
                    //     { id: 'xuefulan', a: '', b: '' },
                    // ]

                    Object.assign(this.modal.data, {
                        vehicleList: mockData,
                        vehicle: ''
                    })
                }
                
                // 单选情况 甩他妈个 id 就行了！
                else  {
                    // const mockData = 'siyu'

                    const mockData = { id: 'siyu', a: '' }
                    
                    Object.assign(this.modal.data, {
                        vehicle: mockData,
                        vehicleList: []
                    })
                }
            },

            /**
             * 
             * 同步形式获取需要的数据
             * 
             */
            async handleOpenModal(type) {
                this.dialogTreeModel = type
                await this.$nextTick()
                const parmas = type === 'radio' ? ['siyu'] : ['siyu', 'yage']
                const $dialogTree = this.$refs['dialogTree']
                const result = await $dialogTree.initDialogTreeData(parmas)
                console.log('【同步】获取弹框树的值', result)
            },

            handleTreeSelectChange(result) {
                console.log('【异步】获取弹框树的值', result)
                this.treeDialog = false
            },


            handleCommit() {
                console.log('this.modal.data', this.modal.data)
                this.modal.show = false
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