<template>
  <el-dialog
    :visible.sync="computedVisible"
    :title="title"
    :top="top"
    :fullscreen="fullscreen"
    :modal="modal"
    :modal-append-to-body="modalAppendToBody"
    :append-to-body="appendToBody"
    :lock-scroll="lockScroll"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    :show-close="showClose"
    :before-close="onBeforeClose"
    :center="center"
    class="zm-panel"
    :class="[sideStatusClass, { 'has-footer': $slots.footer }]"
  >
    <template v-if="showHeader">
      <div slot="title" class="el-dialog__title">
        <slot v-if="$slots.title || title" name="title">{{ title }}</slot>
        <div v-if="requiredTag" class="fr mr30 fs14">
          <span class="red">*</span>must fill
        </div>
      </div>
    </template>
    <div v-if="showSlot">
      <slot />
    </div>
    <template v-if="showFooter">
      <span slot="footer" class="dialog-footer cf">
        <slot v-if="$slots.footer" name="footer" class="fl" />
        <template v-else>
          <el-button @click="cancel">{{ cancelText }}</el-button>
          <el-button type="primary" @click="ok">{{ okText }}</el-button>
        </template>
      </span>
    </template>
  </el-dialog>
</template>

<script>
// import { Dialog, Button } from 'element-ui'
// import { mapGetters } from "vuex";
export default {
  // components: {
  //   ElDialog: Dialog,
  //   ElButton: Button
  // },
  model: {
    prop: "visible",
    event: "change"
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "Message"
    },
    subTitle: {
      type: [String, Object],
      default: ""
    },
    requiredTag: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: "small",
      validator(value) {
        return ["mini", "small", "large", "auto"].includes(value);
      }
    },
    customWidth: {
    
      type: String,
      default: ""
    },
    top: {
      type: String,
      default: "15vh"
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    modal: {
      type: Boolean,
      default: false
    },
    modalAppendToBody: {
      type: Boolean,
      default: true
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    lockScroll: {
      type: Boolean,
      default: true
    },
    closeOnClickModal: {
      type: Boolean,
      default: false
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    center: {
      type: Boolean,
      default: false
    },
    beforeClose: {
      type: Function,
      required: false
    },
    keepAlive: {
      type: Boolean,
      default: false
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    okText: {
      type: String,
      default: "Confirm"
    },
    cancelText: {
      type: String,
      default: "Cancel"
    }
  },
  data() {
    return {
      showSlot: true,
      slot: {
        footer: false
      }
    };
  },
  computed: {
    // ...mapGetters(['sidebar', 'device']),
    computedVisible: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) window.authDialog = null;
        this.$emit("change", value);
      }
    },
    renderEveryTime() {
      if (this.keepAlive) {
        return true;
      } else {
        return this.visible;
      }
    },
    sideStatusClass() {
      // return `${this.device}-${this.sidebar.opened ? 'open' : 'close'}`
      return `open`;
    }
    // width () {
    //   const _size = this.size
    //   let _width = '700'
    //   if (_size === 'mini') {
    //     _width = '400'
    //   } else if (_size === 'small') {
    //     _width = '700'
    //   } else if (_size === 'large') {
    //     _width = '1000'
    //   } else if (_size === 'auto') {
    //     _width = 'auto'
    //   }
    //   return (this.customWidth || _width) + 'px'
    // }
  },
  watch: {
    visible(value) {
      if (this.keepAlive === false) {
        this.showSlot = value;
      }
    }
  },
  mounted() {
    window.authDialog = this;
  },
  destroyed() {
    window.authDialog = null;
  },
  methods: {
    onBeforeClose(done) {
      if (typeof this.beforeClose === "function") {
        this.beforeClose(done);
      } else {
        this.$emit("change", false);
      }
    },
    cancel() {
      this.computedVisible = false;
      this.$emit("cancel");
    },
    ok() {
      this.$emit("confirm", () => {
        this.computedVisible = false;
      });
    }
  }
};
</script>
<style lang="scss">
.zm-panel {
  &.el-dialog__wrapper {
    position: absolute;
  }
  background: rgba(0, 0, 0, 0.3);
  &.desktop-close {
    .el-dialog {
      left: 72px;
    }
  }

  &.desktop-open {
    .el-dialog {
      left: 230px;
    }
  }

  &.mobile-close {
    .el-dialog {
      left: 10px;
      right: 10px;
    }
  }

  &.mobile-open {
    .el-dialog {
      left: 230px;
    }
  }
  .el-dialog {
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    &__body {
      flex: 1;
      padding: 10px 20px;
      overflow-y: auto;
      overflow-x: hidden;
      max-height: inherit !important;
    }
    &__header {
      border-bottom: 1px solid #eee;
    }
    &__footer {
      border-top: 1px solid #eee;
    }
    position: absolute;
    margin: 0 !important;
    width: auto;
    position: absolute;
    right: 10px;
    left: 260px;
    top: 70px;
    bottom: 10px;
  }
}
</style>
