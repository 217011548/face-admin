<template>
    <div class="filter-container">

        <el-row class="filter-body" v-if="showExpand" v-show="expand" type="flex" justify="space-between">
            <template v-if="$slots.body">
                <slot name="body"></slot>
            </template>
            <template v-if="!$slots.body">
                <div class="flex-horizontal" v-if="shouldShowSelect(item.onlyAll)" v-for="(item,index) in children"
                     :key="`${item.label}${index}`">
                    <span v-show="item.type !== 'switchDate'" class="filter-label">{{item
                        .label}}</span>
                    <span v-show="item.type == 'switchDate'">
                    <el-dropdown @command="handleCommand">
                      <div class="el-dropdown-link">
                        {{choseType || item.defaultType}}<i class="el-icon-arrow-down el-icon--right"></i>
                      </div>
                        :
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="type in item.dateType" :key="type.dateType"
                                          :command="type">{{type.name}}</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>

                </span>
                    <el-select clearable size="small" v-if="item.type === 'select'"
                               class="role-select"
                               v-model="item.value" :placeholder="item.placeholder">
                        <el-option v-for="option in item.options" :key="option.value" :label="option.label"
                                   :value="option.value"></el-option>
                    </el-select>
                    <el-date-picker v-else-if="item.type === 'switchDate'" size="small" v-model="item.value"
                                    type="datetimerange" align="center" unlink-panels range-separator="to"
                                    start-placeholder="Start Time"
                                    end-placeholder="End Time" :picker-options="pickerShortcut ? shortcut : []"
                                    value-format="yyyy-MM-dd HH:mm:ss" style="margin-left: 5px;">
                    </el-date-picker>

                    <el-date-picker v-else-if="item.type === 'datePicker'" size="small" v-model="item.value"
                                    type="datetimerange" align="center" unlink-panels range-separator="to"
                                    start-placeholder="Start Time"
                                    end-placeholder="End Time" :picker-options="pickerShortcut ? shortcut : []"
                                    value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                    <!--<el-date-picker size="small" v-else-if="item.type === 'datePicker'" v-model="item.value" type="datetime"-->
                    <!--:placeholder="item.placeholder" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>-->
                    <el-input size="small" clearable v-else-if="item.type === 'input'" :class="item.long ? 'filter-input-long' :
                'filter-input'"
                              :placeholder="item.placeholder" v-model="item.value"></el-input>
                    <el-cascader clearable v-else-if="item.type === 'cascader'" class="cascader" size="small"
                                 :options="item.options"
                                 v-model="item.value" :props="item.props" :show-all-levels="false"
                                 @active-item-change="item.activeChangeHandler"></el-cascader>
                </div>
                <div class="flex-horizontal">
                    <el-button v-for="(item, index) in children" v-if="item.type === 'button'"
                               :key="`${item.label}${index}`"
                               class="filter-submit" type="primary" @click="customBtnClick(item.name)">{{item.label}}
                    </el-button>
                    <el-button v-if="showReset" class="filter-submit" plain @click="resetClick">Reset</el-button>
                    <el-button class="filter-submit" type="primary" @click="filterClick">Search</el-button>
                </div>
            </template>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "ByFilter",
        data() {
            return {
                expand: true,
                shortcut: {
                    shortcuts: [
                        {
                            text: 'Today',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date(new Date(new Date().toLocaleDateString()).getTime());
                                //start.setTime(start);
                                picker.$emit('pick', [start, end]);
                            }
                        },
                        {
                            text: 'Yesterday ',
                            onClick(picker) {
                                const end = new Date(new Date(new Date().toLocaleDateString()).getTime());
                                const start = new
                                Date(new Date(new Date().toLocaleDateString()).getTime()-24*3600*1000);
                                //start.setTime(start.getTime() - 3600 * 1000 * 24 );
                                picker.$emit('pick', [start, end]);
                            }
                        },{
                        text: 'Last week',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: 'Last Month',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, ]
                },
                choseType: '',
                choseTypeValue: ''
            };
        },
        props: {
            title: {
                type: String,
                default: "Filter"
            },
            showExpand: {
                type: Boolean,
                default: true
            },
            showReset: {
                type: Boolean,
                default: true
            },
            isNotAll: {
                type: Boolean,
                default: false
            },
            pickerShortcut: {
                type: Boolean,
                default: true
            },
            long: {
                type: Boolean,
                default: false
            },
            children: {
                type: Array,
                default: function () {
                    return [{
                        name: 'name',
                        type: "input",
                        label: "enter search：",
                        placeholder: "ID/Name"
                    }];
                },
                validator: function (val) {
                    if (val.length > 0) {
                        for (let i = 0; i < val.length; i++) {
                            if (!val[i].hasOwnProperty('name')) {
                                return false;
                            }
                        }
                    }
                    return true;
                }
            }
        },
        methods: {
            shouldShowSelect(onlyAll) {
                if (this.isNotAll) {
                    return !onlyAll;
                } else {
                    return true;
                }
            },
            handleCommand(cmd) {
                this.choseType = cmd.name
                this.choseTypeValue = cmd.value
            },
            resetClick() {
                this.children.forEach(item => {
                    item.value = undefined;
                });
            },
            customBtnClick(name) {
                this.$emit(name);
            },
            expandClick() {
                this.expand = !this.expand;
            },
            getSelectLabel(value, element) {
                try {
                    return element.options.filter(d => d.value === value)[0].label;
                } catch (e) {
                    return undefined;
                }
            },
            clearObj() {
                this.children.map(v => {
                    v.value = ""
                })
            },
            getQueryObj() {
                let queryObj = {};

                try {
                    this.children.map(d => {
                        let v;

                        if (d.type === 'select') {
                            // v = this.getSelectLabel(d.value, d);
                            v = d.value;
                        }
                        if (d.type === 'cascader') {
                            v = d.value[d.value.length - 1];
                        }
                        if (d.type !== 'button') {
                            v = d.value;
                        }
                        if (d.type === 'switchDate') {
                            if(d.value){
                                if (this.choseTypeValue) {
                                    queryObj['startTime'] = d.value[0];
                                    queryObj['endTime'] = d.value[1];
                                    queryObj['timeType'] = Number(this.choseTypeValue)
                                } else {
                                    queryObj['startTime'] = d.value[0];
                                    queryObj['endTime'] = d.value[1];
                                    queryObj['timeType'] = Number(d.defaultTypeValue)
                                }
                            }
                        }
                        if (v && d.name!=='ignore') {
                            queryObj[d.name] = v;
                        }
                    });
                } catch (e) {
                    // ignore
                }
                return queryObj;
            },
            filterClick() {
                let queryObj = this.getQueryObj();
                this.$emit("filter", queryObj);
            }
        }
    }
</script>

<style scoped>
    .filter-container {
        /*border: 1px solid #EBEEF5;;*/
    }

    .expand-container {
        height: 55px;
        width: 55px;
        margin-right: -35px;
        padding: 12.5px;
    }

    .filter-head {
        padding: 0px 15px;
        height: 55px;
        background: #FAFAFA;
    }

    .filter-expand {
        width: 30px;
        height: 30px;
        background: #F2F3F6;
        border: 0.5px solid #DDDEE3;
        cursor: pointer;
        outline: none;
    }

    .filter-title {
        line-height: 55px;
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #000000;
        font-weight: bold;
        text-align: center;
    }

    .filter-body {
        /*height: 55px;*/
        background: #FFFFFF;
        padding: 0px 5px;
        flex-wrap: wrap;
    }

    .flex-horizontal {
        margin: 5px;
        padding: 5px;
        display: flex;
        align-items: center;
    }

    .filter-input {
        width: 162px;
    }

    .filter-input-long {
        width: 260px;
    }

    .filter-label {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #000000;
        width: auto;
        min-width: 60px;
        line-height: 35px;
        text-align: center;
    }

    .filter-submit {
        width: 80px;
        height: 30px;
        padding: 0;
        line-height: 30px;
    }

    .role-select {
        min-width: 120px;

    }

    .cascader {
        min-width: 120px;
        max-width: 180px;
    }
    >>>.el-dropdown-selfdefine{
        font-size: 12px;
        color: #000000;
        cursor: pointer;
    }
    .el-dropdown-link{
        padding:0 10px;
        height: 30px;
        line-height: 30px;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        display: inline-block;
    }
</style>
