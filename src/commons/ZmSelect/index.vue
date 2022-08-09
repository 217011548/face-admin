<!-- ZmSelect -->
<template>
  <el-select
    v-model="currentValue"
    v-bind="$attrs"
    v-on="$listeners"
    :placeholder="placeholder"
    :filterable="filterable"
    :clearable="clearable"
    @clear="handleClear"
    :multiple="multiple"
  >
    <slot />
  </el-select>
</template>

<script>
export default {
  name: "ZmSelect",
  props: {
    filterable: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: "Select"
    },
    clearable: {
      type: Boolean,
      default: true
    },
    value: [String, Number, Array],

    clearValue: {
      type: String,
      default: ""
    },

 
    rangeSeparator: {
      type: String,
      default: ","
    },
    multiple: Boolean,
    str: Boolean 
  },
  data() {
    return {};
  },
  computed: {
    currentValue: {
      set(v) {
        if (this.multiple && this.str) {
          this.$nextTick(() => {
            this.$emit("input", v.join(this.rangeSeparator));
          });
          return;
        }
        this.$nextTick(() => {
          this.$emit("input", v);
        });
      },

      get() {
        const v = this.value || "";
        if (this.multiple && this.str) {
          return (v + "").split(this.rangeSeparator).filter(Boolean);
        }
        if (v instanceof Array) {
          return v;
        }
        return v + "";
      }
    }
  },
  methods: {
   
    init() {},
    handleClear() {
      this.currentValue = this.clearValue || this.multiple ? [] : "";
    }
  }
};
</script>
<style lang="scss" scoped></style>
