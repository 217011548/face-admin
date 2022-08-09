<template>
<el-row class="th-container" :class="fullBorder ? '' : 'border-bottom-none'" type="flex" align="middle" justify="space-between">
    <el-col :span="8">
        <slot v-if="$slots.title" name="title"></slot>
        <span v-if="!$slots.title" class="table-title">{{title}}</span>
    </el-col>
    <el-col v-if="!onlyHead" :span="5" type="flex" justify="space-around">
        <el-row :span="3" type="flex" justify="end" class="filters-container">
            <el-button v-for="item in actions" @click="item.handle" size="small" :key="item.name" :plain="item.plain"
                       :type="item.plain ? '' : 'primary'">
                {{item.name}}</el-button>
            <el-select class="filter-select" v-model="item.value" v-for="item in filters" :key="item.placeholder" :placeholder="item.placeholder">
                <el-option v-for="option in item.options" :key="option.value" :label="option.label" :value="option.value"></el-option>
            </el-select>
        </el-row>
    </el-col>
</el-row>
</template>

<script>
import log from '../../utils/log';
export default {
    name: "ByTableHead",
    data() {
        return {
            value: ""
        };
    },
    props: {
        onlyHead: {
            type: Boolean,
            default: false
        },
        fullBorder: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: "Data List"
        },
        plain: {
            type: Boolean,
            default: false
        },
        actions: {
            type: Array,
            default: function() {
                return [{
                    name: "Add",
                    handle:function (){
                        console.log(123)
                    }
                }];
            }
        },
        filters: {
            type: Array,
            default: function() {
                return [];
            }
        }
    },
    mounted(){
        console.log(this.title);
    }
    
}
</script>

<style scoped>
.th-container {
    border: 1px solid #EBEEF5;
    background: #FAFAFA;
    height: 55px;
}

.border-bottom-none {
    border-bottom: none;
}

.filters-container{
    margin-right: 15px;
}
.filter-select {
    width: 100px;
    min-width: 100px;
    margin-left: 10px;
}
.table-title {
    margin-left: 15px;
    line-height: 55px;
    font-size: 14px;
    font-weight: bold;
    color: #000;
    text-align: center;
}
</style>
