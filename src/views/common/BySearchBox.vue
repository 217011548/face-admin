<template>
    <div class="BySearchBox">
        <div class="search-box">
            <div class="table-box-title" @click="showSearch" style="cursor: pointer;">
                <div class="table-box-title-left">
                    <span>Search</span>
                    <div class="icon-box">
                        <i :class="showCollapse ?'el-icon-caret-top':'el-icon-caret-bottom'"></i>
                    </div>
                </div>
            </div>
            <div class="search-content" v-show="showCollapse">
                <slot name="body"></slot>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "BySearchBox",
    data() {
      return {
        showCollapse: false
      };
    },
    methods: {
      showSearch() {
        this.showCollapse = !this.showCollapse;
        this.$emit("search");
      }
    }
  };
</script>

<style scoped>
    .search-box {
        width: 100%;
        padding-top: 10px;
        border-bottom: 1px solid #DDDEE3;
    }

    .search-content {
        border-top: 1px solid #ebeef5;
        border-left: 1px solid #ebeef5;
        border-right: 1px solid #ebeef5;
    }

    .table-box-title {
        height: 55px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-content: center;
        align-items: center;
        background: #FAFAFA;
        padding: 0 10px;
        border-top: 1px solid #DDDEE3;
        border-left: 1px solid #DDDEE3;
        border-right: 1px solid #DDDEE3;
    }

    .table-box-title-left {
        width: 100%;
        display: flex;
        font-size: 14px;
        color: #000;
        font-weight: bold;
        flex-direction: row;
        align-content: center;
        align-items: center;
        justify-content: space-between;
        padding: 0 5px;
        box-sizing: border-box;
    }
    .icon-box {
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        background: #F2F3F6;
        border: 0.5px solid #DDDEE3;
    }

    .table-box-title-left i {
        display: inline-block
    }
</style>
