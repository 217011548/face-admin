<template>
  <div>
    <span class="vm">经度：</span>
    <!--   :readonly="!currentValue.address" -->
    <el-input
      v-model="currentValue.longitude"
      @click.native="onFocusAddress"
      readonly
      :disabled="disabled"
      class="w110 mr10"
    >
    </el-input>
    <span>纬度：</span>
    <el-input
      v-model="currentValue.latitude"
      @click.native="onFocusAddress"
      readonly
      :disabled="disabled"
      class="w110 mr10"
    >
    </el-input>
    <el-tooltip
      class="item locationBox pointer"
      effect="dark"
      content="点击定位地址"
      placement="right"
    >
      <el-button
        icon="el-icon-location"
        :disabled="disabled"
        type="primary"
        @click="showMap"
      >
        <!-- <i class="el-icon-location fs20"></i> -->
      </el-button>
    </el-tooltip>
  </div>
</template>

<script>
import mapTool from "./tool";
export default {
  components: {},
  props: {
    obj: {
      type: Object,
      default() {
        return {};
      }
    },
    hasLngLat: {
      type: Boolean,
      default: false
    },
    value: {
      type: Object,
      default() {
        return {
          longitude: "",
          latitude: "",
          adCode: "",
          address: ""
        };
      }
    },
    city: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      address: ""
    };
  },
  computed: {
    currentValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("change", val);
      }
    }
  },
  watch: {},
  created() {
    // this.address
  },
  methods: {
    onFocusAddress() {
      if (!this.currentValue.address && !this.disabled) {
        this.showMap();
      }
    },
    showMap() {
      mapTool({
        mapCenter: [],
        address: "",
        code: "",
        obj: this.obj,
        hasLngLat: this.hasLngLat
      })
        .then(d => {
          console.log("mapData", d);
          this.location = d.address;
          const params = {
            longitude: "" + d.lnglat[0],
            latitude: "" + d.lnglat[1],
            // adCode: d.adcode,
            address: d.address
          };
          this.currentValue = { ...params };
        })
        .catch(() => {});
    }
  }
};
</script>
