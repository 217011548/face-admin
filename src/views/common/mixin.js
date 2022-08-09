import {get} from "../../utils/auth";

const mixin = {
  data: function () {
    return {
      autoHeight: 400,
      tableData: [],
      currentPage: 1,
      currentSize: 10,
      totalNum: 0,
      test3: [
        {value: "1", label: "personal"},
        {value: "2", label: "commerical"}
      ],
      appList: [],

    };
  },
  created: function () {
    this.setFilterChild("test3", "options", this.test3);
    this.appList=JSON.parse(get("appList"));
    this.setFilterChild("appList", "options", this.appList);
  },
  mounted: function () {
    this.init();
    let _this = this;
    window.onresize = () => {
      return (() => {
        let height = document.body.clientHeight - _this.$refs.tableBox.offsetTop - 176;
        _this.autoHeight = height < 200 ? 200 : height;
      })();
    };
    this.getListRequest && this.getListRequest();
  },
  activated: function () {
    this.getListRequest && this.getListRequest();
  },
  methods: {
    setFilterChild(filterName, key, val) {
      try {
        this.filterData.children.filter(d => d.name === filterName).forEach(item => {
          item[key] = val;
        });
      } catch (e) {
        console.log("Please check the word：filterData.children");
      }
    },
    getLabelByKv(key, val) {
      try {
        if (val === undefined || val === null) {
          return "";
        } else {
          let arr = eval(this[key]);
          return arr.filter(d => d.value == val)[0].label;
        }
      } catch (e) {
        return "";
      }
    },
    init() {
      this.$nextTick(() => {
        let height = document.body.clientHeight - this.$refs.tableBox.offsetTop - 176;
        this.autoHeight = height < 200 ? 200 : height;
      });
    },
    showSearch() {
      this.init();
    },
    handleFilterClick() {
      this.currentPage = 1;
      this.getListRequest && this.getListRequest();
    },
    handleSizeChange(size) {
      this.currentSize = size;
      this.getListRequest && this.getListRequest();
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.getListRequest && this.getListRequest();
    }
  }
};
export default mixin;
