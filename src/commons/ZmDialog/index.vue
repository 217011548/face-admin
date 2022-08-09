<template>
  <el-dialog
    :visible.sync="computedVisible"
    :title="title"
    :width="width"
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
    class="zm-dialog"
  >
    <!-- <div v-if="showSlot"> -->
      <slot />
    <!-- </div> -->
    <template v-if="showFooter">
      <span slot="footer" class="dialog-footer cf">
        <hr v-if="showFooterLine" />
        <slot v-if="$slots.footerLeft" name="footerLeft" />
        <slot v-if="$slots.footer" name="footer" class="fl" />
        <template v-if="!$slots.footer">
          <el-button @click="cancel">{{ cancelText }}</el-button>
          <el-button type="primary" @click="ok">{{ okText }}</el-button>
        </template>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { Dialog, Button } from 'element-ui'
export default {
  components: {
    ElDialog: Dialog,
    ElButton: Button
  },
  model: {
    prop: 'visible',
    event: 'change'
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Message'
    },
    size: {
      type: String,
      default: 'small',
      validator (value) {
        return ['mini', 'small', 'large'].includes(value)
      }
    },
    customWidth: {
      type: String,
      default: ''
    },
    top: {
      type: String,
      default: '15vh'
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    modal: {
      type: Boolean,
      default: true
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
      required: false,
      default () {
        return function () {}
      }
    },
    keepAlive: {
      type: Boolean,
      default: false
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    okText: {
      type: String,
      default: 'Confirm'
    },
    cancelText: {
      type: String,
      default: 'Cancel'
    },
    showFooterLine: Boolean
  },
  data () {
    return {
      showSlot: true,
      slot: {
        footer: false
      }
    }
  },
  computed: {
    computedVisible: {
      get () {
        return this.visible
      },
      set (value) {
        this.$emit('change', value)
      }
    },
    width () {
      let res = ''
      if (!this.customWidth) {
        const _size = this.size
        let _width = '700'
        if (_size === 'mini') {
          _width = '400'
        } else if (_size === 'small') {
          _width = '700'
        } else if (_size === 'large') {
          _width = '1000'
        }
        res = _width + 'px'
      } else {
        res = this.customWidth
      }
      return res
    }
  },
  watch: {
    visible (value) {
      if (this.keepAlive === false) {
        this.showSlot = value
      }
    }
  },
  methods: {
    onBeforeClose (done) {
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(done)
      } else {
        done()
      }
    },
    cancel () {
      this.computedVisible = false
      this.$emit('cancel')
    },
    ok () {
      this.$emit('confirm', () => {
        this.computedVisible = false
      })
    }
  }
}
</script>
<style lang="scss">
.zm-dialog .el-dialog__body {
  padding: 10px 20px;
}
</style>
