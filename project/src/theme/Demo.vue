<template>
    <div class="themedemo bg">

        <div class="themedemo__left">
            <div class="themedemo_row">
                <div class="themedemo_row-title">
                    按钮组
                </div>
                <div class="themedemo_row-content">
                    <el-row>
                        <el-button>默认按钮</el-button>
                        <el-button type="primary">主要按钮</el-button>
                        <el-button type="success">成功按钮</el-button>
                        <el-button type="info">信息按钮</el-button>
                        <el-button type="warning">警告按钮</el-button>
                        <el-button type="danger">危险按钮</el-button>
                    </el-row>
                    <el-row>
                        <el-button plain>朴素按钮</el-button>
                        <el-button type="primary" plain>主要按钮</el-button>
                        <el-button type="success" plain>成功按钮</el-button>
                        <el-button type="info" plain>信息按钮</el-button>
                        <el-button type="warning" plain>警告按钮</el-button>
                        <el-button type="danger" plain>危险按钮</el-button>
                    </el-row>
                </div>
            </div>


            <div class="themedemo_row">
                <div class="themedemo_row-title">
                    单选框
                </div>
                <div class="themedemo_row-content">
                    <el-row>
                        <el-radio v-model="radio.default" label="1">备选项</el-radio>
                        <el-radio v-model="radio.default" label="2">备选项</el-radio>
                    </el-row>
                    <el-row>
                        <el-radio disabled v-model="radio.disable" label="1">备选项</el-radio>
                        <el-radio disabled v-model="radio.disable" label="2">备选项</el-radio>
                    </el-row>
                    <el-row>
                        <el-radio-group v-model="radio.btngroup" size="small">
                            <el-radio-button label="上海"></el-radio-button>
                            <el-radio-button label="北京" disabled ></el-radio-button>
                            <el-radio-button label="广州"></el-radio-button>
                            <el-radio-button label="深圳"></el-radio-button>
                        </el-radio-group>
                    </el-row>
                    <el-row>
                        <el-radio-group v-model="radio.btngroup1" size="small">
                            <el-radio label="1" border>备选项1</el-radio>
                            <el-radio label="2" border disabled>备选项2</el-radio>
                        </el-radio-group>
                    </el-row>
                </div>
            </div>


            <div class="themedemo_row">
                <div class="themedemo_row-title">
                    多选框
                </div>
                <div class="themedemo_row-content">
                    <el-row>
                        <el-checkbox-group v-model="checkbox.checkedlist">
                            <el-checkbox label="复选框 A"></el-checkbox>
                            <el-checkbox label="复选框 B"></el-checkbox>
                            <el-checkbox label="复选框 C"></el-checkbox>
                            <el-checkbox label="禁用" disabled></el-checkbox>
                            <el-checkbox label="选中且禁用" disabled></el-checkbox>
                        </el-checkbox-group>
                    </el-row>
                    <el-row>
                        <el-checkbox-group v-model="checkbox.checkedlist1" size="small">
                            <el-checkbox-button v-for="city in checkbox.cityOptions" :label="city" :disabled="city === '北京'" :key="city">{{city}}</el-checkbox-button>
                        </el-checkbox-group>
                    </el-row>
                    <el-row>
                        <el-checkbox-group v-model="checkbox.checkedlist2" size="small">
                            <el-checkbox label="备选项1" border></el-checkbox>
                            <el-checkbox label="备选项2" border disabled></el-checkbox>
                        </el-checkbox-group>
                    </el-row>
                </div>
            </div>


            <div class="themedemo_row">
                <div class="themedemo_row-title">
                    输入框
                </div>
                <div class="themedemo_row-content">
                    <el-row>
                        <el-input style="width: 250px" v-model="input.input0" placeholder="请输入内容"></el-input>
                    </el-row>
                    <el-row>
                        <el-input style="width: 250px"  placeholder="请输入内容" v-model="input.input1" :disabled="true"></el-input>
                    </el-row>
                    <el-row>
                        <el-input style="width: 250px"  placeholder="请输入内容" v-model="input.input2"><template slot="prepend">Http://</template></el-input>
                    </el-row>
                </div>
            </div>


            <div class="themedemo_row">
                <div class="themedemo_row-title">
                    计数器
                </div>
                <div class="themedemo_row-content">
                    <el-row>
                        <el-input-number v-model="number.num0" :min="1" :max="10" label="描述文字"></el-input-number>
                    </el-row>
                    <el-row>
                        <el-input-number v-model="number.num1" :disabled="true"></el-input-number>
                    </el-row>
                </div>
            </div>


            <div class="themedemo_row">
                <div class="themedemo_row-title">
                    选择器
                </div>
                <div class="themedemo_row-content">
                    <el-row>
                        <el-select v-model="select.value0" placeholder="请选择">
                            <el-option
                                v-for="item in select.options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                :disabled="item.disabled">
                            </el-option>
                        </el-select>
                    </el-row>
                    <el-row>
                        <el-select v-model="select.value1" disabled placeholder="请选择">
                            <el-option
                                v-for="item in select.options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-row>
                </div>
            </div>



            <div class="themedemo_row">
                <div class="themedemo_row-title">
                    选择器
                </div>
                <div class="themedemo_row-content">
                    <el-row>
                        <el-select v-model="select.value0" placeholder="请选择">
                            <el-option
                                v-for="item in select.options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                :disabled="item.disabled">
                            </el-option>
                        </el-select>
                    </el-row>
                    <el-row>
                        <el-select v-model="select.value1" disabled placeholder="请选择">
                            <el-option
                                v-for="item in select.options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-row>
                </div>
            </div>


            <div class="themedemo_row">
                <div class="themedemo_row-title">
                    开关
                </div>
                <div class="themedemo_row-content">
                    <el-row>
                        <el-switch v-model="switch1.value0"></el-switch>
                        <el-switch v-model="switch1.value1" disabled></el-switch>
                    </el-row>
                </div>
            </div>


            <div class="themedemo_row">
                <div class="themedemo_row-title">
                    滑块
                </div>
                <div class="themedemo_row-content">
                    <el-row>
                        <el-slider style="width: 250px"  v-model="slider.value1"></el-slider>
                    </el-row>
                    <el-row>
                        <el-slider style="width: 250px"  v-model="slider.value2" disabled></el-slider>
                    </el-row>
                </div>
            </div>



            <div class="themedemo_row">
                <div class="themedemo_row-title">
                    时间选择器
                </div>
                <div class="themedemo_row-content">
                    <el-row>
                        <el-date-picker
                            v-model="datePicker.value"
                            align="right"
                            type="date"
                            placeholder="选择日期"
                            :picker-options="datePicker.pickerOptions">
                        </el-date-picker>
                    </el-row>
                    <el-row>
                        <el-time-picker
                            is-range
                            v-model="timepicker.value"
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            placeholder="选择时间范围">
                        </el-time-picker>
                    </el-row>
                    <el-row>
                        <el-date-picker
                            v-model="dateTimePicker.value"
                            type="datetimerange"
                            :picker-options="dateTimePicker.pickerOptions"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            align="right">
                        </el-date-picker>
                    </el-row>
                </div>
            </div>


            <div class="themedemo_row">
                <div class="themedemo_row-title">
                    颜色选择器
                </div>
                <div class="themedemo_row-content">
                    <el-row>
                        <el-color-picker v-model="colorPicker.value1"></el-color-picker>
                    </el-row>
                    <el-row>
                        <el-color-picker v-model="colorPicker.value2" show-alpha></el-color-picker>
                    </el-row>
                </div>
            </div>



            <div class="themedemo_row">
                <div class="themedemo_row-title">
                    传输框
                </div>
                <div class="themedemo_row-content">
                    <el-row>
                        <el-transfer
                            style="text-align: left; display: inline-block"
                            v-model="transForm.value"
                            filterable
                            :left-default-checked="[2, 3]"
                            :right-default-checked="[1]"
                            :render-content="transForm.renderFunc"
                            :titles="['Source', 'Target']"
                            :button-texts="['到左边', '到右边']"
                            :format="{
                                noChecked: '${total}',
                                hasChecked: '${checked}/${total}'
                            }"
                            :data="transForm.data">
                            <el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button>
                            <el-button class="transfer-footer" slot="right-footer" size="small">操作</el-button>
                        </el-transfer>
                    </el-row>
                </div>
            </div>



            <div class="themedemo_row">
                <div class="themedemo_row-title">
                    文字链接
                </div>
                <div class="themedemo_row-content">
                    <div>
                        <el-link href="https://element.eleme.io" target="_blank">默认链接</el-link>
                        <el-link type="primary">主要链接</el-link>
                        <el-link type="success">成功链接</el-link>
                        <el-link type="warning">警告链接</el-link>
                        <el-link type="danger">危险链接</el-link>
                        <el-link type="info">信息链接</el-link>
                    </div>
                </div>
            </div>


            


            


            <div class="themedemo_row">
                <div class="themedemo_row-title">
                    tag标签
                </div>
                <div class="themedemo_row-content">
                    <el-row>
                        <el-tag
                            style="margin-right: 20px"
                            v-for="tag in tag.taglist"
                            :key="tag.name"
                            closable
                            :type="tag.type">
                            {{tag.name}}
                        </el-tag>
                    </el-row>
                </div>
            </div>


            <div class="themedemo_row">
                <div class="themedemo_row-title">
                    Badge标记
                </div>
                <div class="themedemo_row-content">
                    <el-badge :value="12" class="item" style="margin-right: 20px">
                        <el-button size="small">评论</el-button>
                    </el-badge>
                    <el-badge :value="3" class="item" style="margin-right: 20px">
                        <el-button size="small">回复</el-button>
                    </el-badge>
                    <el-badge :value="1" class="item" style="margin-right: 20px" type="primary">
                        <el-button size="small">评论</el-button>
                    </el-badge>
                    <el-badge :value="2" class="item" style="margin-right: 20px" type="warning">
                        <el-button size="small">回复</el-button>
                    </el-badge>
                </div>
            </div>

        </div>

        <div class="themedemo__right">
            
            <FormGroup text="主题切换">
                <theme-picker style="float: right;height: 26px;margin: -3px 8px 0 0;" @change="themeChange" />
            </FormGroup>


        </div>

    </div>
</template>

<script>
import ThemePicker from '../viewmanage/entry/components/ThemePicker/index'
    export default {
        components: { ThemePicker },
        props: {},
        name: 'themedemo',
        data() {
            const generateData = _ => {
                const data = [];
                for (let i = 1; i <= 15; i++) {
                data.push({
                    key: i,
                    label: `备选项 ${ i }`,
                    disabled: i % 4 === 0
                });
                }
                return data;
            };
            return {
                transForm: {
                    data: generateData(),
                    value: [1],
                    renderFunc(h, option) {
                        return <span>{ option.key } - { option.label }</span>;
                    }
                },

                radio: {
                    default: '1',
                    disable: '1',
                    btngroup: '上海',
                    btngroup1: '1'
                },

                checkbox: {
                    cityOptions: ['上海', '北京', '广州', '深圳'],
                    checkedlist: ['选中且禁用','复选框 A'],
                    checkedlist1: ['上海'],
                    checkedlist2: ['备选项1']
                },

                input: {
                    input0: '',
                    input1: '',
                    input2: ''
                },

                number: {
                    num0: '',
                    num1: ''
                },

                select: {
                    options: [
                        { value: '选项1', label: '黄金糕' }, 
                        { value: '选项2', label: '双皮奶', disabled: true }, 
                        { value: '选项3', label: '蚵仔煎' }, 
                        { value: '选项4', label: '龙须面' }, 
                        { value: '选项5', label: '北京烤鸭' }
                    ],
                    value0: '',
                    value1: ''
                },

                switch1: {
                    value0: true,
                    value1: true
                },

                slider: {
                    value1: 42,
                    value2: 42
                },

                tag: {
                    taglist: [
                        { name: '标签一', type: '' },
                        { name: '标签二', type: 'success' },
                        { name: '标签三', type: 'info' },
                        { name: '标签四', type: 'warning' },
                        { name: '标签五', type: 'danger' }
                    ]
                },

                

                timepicker: {
                    value: ''
                },

                datePicker: {
                    value: '',
                    pickerOptions: {
                        disabledDate(time) {
                            return time.getTime() > Date.now();
                        },
                        shortcuts: [{
                            text: '今天',
                            onClick(picker) {
                            picker.$emit('pick', new Date());
                            }
                        }, {
                            text: '昨天',
                            onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                            }
                        }, {
                            text: '一周前',
                            onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                            }
                        }]
                    }
                },

                dateTimePicker: {
                    value: '',
                    pickerOptions: {
                        shortcuts: [{
                            text: '最近一周',
                            onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                            }
                        }, {
                            text: '最近一个月',
                            onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                            }
                        }, {
                            text: '最近三个月',
                            onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                            }
                        }]
                    }
                },

                colorPicker: {
                    value1: '#19ac9e',
                    value2: ''
                },

                control: {
                    style: 'black',
                        
                    styleList: [
                        { name: '黑板', key: 'black' },
                        { name: '白版', key: 'white' },
                        { name: '黑版2', key: 'black2' },
                    ],

                    black: {
                        "box-shadow": '',
                        "border": '',
                        "background": '',
                        "background-second": '',
                        "background-third": '',
                        "font-color": '',
                    },


                    white: {
                        "box-shadow": '',
                        "border": '',
                    },


                    detail: {
                        success: '',
                        warning: '',
                        error: '',
                        info: '',
                        
                        main: '',
                        disabled: '',
                    }
                }

            };
        },
        watch: {

        },
        computed: {

        },
        methods: {
            themeChange(val) {
                this.$store.dispatch('settings/changeSetting', {
                    key: 'theme',
                    value: val
                })
            }
        },
        created() {

        },
        mounted() {

        },
    };

</script>
<style lang="scss" scoped>
.themedemo {
    width: 100%;
    height: 100%;
    padding: 20px;
    position: relative;
    display: flex;
    flex-direction: row;

    &__left {
        position: relative;
        height: 100%;
        width: calc(100% - 500px);
        overflow-y: auto;
    }

    &__right {
        position: relative;
        width: 500px;
        padding: 40px 20px;
    }

    .themedemo_row {
        margin-bottom: 30px;

        &:last-child {
            margin: 0;
        }

        .themedemo_row-title {
            font-size: 30px;
            font-weight: bold;
            margin-bottom: 15px;
        }

        .themedemo_row-content {
            .el-row {
                margin: 10px 0;
            }
        }
    }

    .rightcontrol {
        position: absolute;
        right: 0;
        top: 0;
        width: 400px;
        box-shadow: 0 2px 12px 0 #0000001a;
    }
}
</style>
