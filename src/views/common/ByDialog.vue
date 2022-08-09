<template>
    <!-- dialog -->
    <el-dialog :title="title" :visible="dialogVisible" :show-close="showClose"
               :max-width="maxWidth"
               :width="width"
               @close="closeClick" :close-on-click-modal="closeClickModal">
        <template v-if="!$slots.body">
            <div class="delete-content">{{content}}</div>
            <div v-if="subContent" class="delete-sub">{{subContent}}</div>
        </template>
        <slot v-if="$slots.body" name="body"></slot>
        <span slot="footer" class="dialog-footer" v-if="showButtons">
                <el-button @click="cancelClick" v-if="showCancel">{{cancelStr}}</el-button>
                <el-button :class="showCancel?'dialog-ok-btn':'dialog-ok-btn-only'" type="primary" v-if="showSubmit"
                           @click="okClick">{{okStr
                    }}</el-button>
            </span>
    </el-dialog>
</template>

<script>
    export default {
        name: "ByDialog",
        data() {
            return {
                closeClickModal: false
            };
        },
        props: {
            width: {
                type: String,
                default: "50%"
            },
            maxWidth: {
                type: String
            },
            okStr: {
                type: String,
                default: "Confirm"
            },
            cancelStr: {
                type: String,
                default: "Cancel"
            },
            title: {
                type: String,
                default: "Delete"
            },
            visible: {
                type: Boolean,
                default: false
            },
            content: {
                type: String
            },
            subContent: {
                type: String
            },
            showCancel: {
                type: Boolean,
                default: true
            },
            showSubmit: {
                type: Boolean,
                default: true
            },
            showClose: {
                type: Boolean,
                default: true
            },
            showButtons: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            dialogVisible: function () {
                return this.visible;
            }
        },
        methods: {
            okClick() {
                this.$emit("ok");
            },
            cancelClick() {
                this.$emit("cancel");
            },
            closeClick() {
                this.$emit("close");
            }
        }
    }
</script>

<style scoped>
    .dialog-footer {
        display: flex;
        justify-content: center;
        padding-bottom: 50px;
    }

    .delete-content {
        color: #272727;
        font-weight: bold;
        font-size: 18px;
        width: 100%;
        text-align: center;
    }

    .delete-sub {
        color: #272727;
        font-size: 14px;
        width: 100%;
        text-align: center;
        margin-top: 10px;
    }

    .dialog-ok-btn {
        margin-left: 50px;
    }

    .dialog-ok-btn-only {
        margin-left: 0px;
    }

    >>> .el-dialog__header {
        height: 60px;
        padding: 0 0 0 15px;
    }

    >>> .el-dialog__title {
        font-family: PingFangSC-Regular;
        font-size: 16px;
        font-weight: bold;
        letter-spacing: 0;
        text-align: right;
        line-height: 60px;
    }

    >>> .el-dialog__headerbtn {
        font-size: 28px;
        line-height: 60px;
        top: 0;
        right: 15px;
    }
</style>
