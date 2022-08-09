<template>
  <div>
    <zm-dialog
      title="loaction"
      :visible.sync="mapShow"
      append-to-body
      :before-close="_cancelMap"
      :close-on-click-modal="false"
      size="small"
      class="dialog-map"
      @cancel="_cancelMap"
      @confirm="_confirmMap"
    >
      <div class="amap-box">
        <div>
          <div v-if="obj.cinemaName">now house:{{ obj.cinemaName }}</div>
          <div v-if="addressComponent.province">
            Now location:<span class="text">{{
              addressComponent.province +
                addressComponent.city +
                addressComponent.district
            }}</span>
          </div>
          <div class="pos-r pt10">
            <div class="map-input-box">
              <el-autocomplete
                class="inline-input w300"
                v-model="keyword"
                :fetch-suggestions="_querySearch"
                placeholder="please insert"
                @select="_handleSelect"
                size="mini"
              ></el-autocomplete>
            </div>
            <div
              class="amap-container"
              id="mapContainer"
              style="height:400px"
            ></div>
          </div>
        </div>
      </div>
    </zm-dialog>
  </div>
</template>
<script>
import * as mapUtils from "./mapUtils";
export default {
  name: "MapAnalyse",
  data() {
    return {
      map: null,
      mapCenter: [119.296531, 26.074184],
      mapShow: false,
      isResolve: false,
      address: "",
      keyword: "",
      code: "",
      city: "",
      adcode: "",
      obj: {},
      hasLngLat: false,
      addressComponent: {}
    };
  },
  computed: {
    addrObj() {
      return {
        lnglat: this.mapCenter,
        address: this.address,
        addressComponent: this.addressComponent
      };
    }
  },
  watch: {
    mapShow(nv) {
      if (!nv) {
        this.keyword = "";
      }
    }
  },
  methods: {
    handleName(v) {
      return v ? v + "-" : "";
    },
    // initMap
    async _initMap() {
      const obj = this.obj;
      const vm = this;
      this.city = "";
      this.map = new AMap.Map("mapContainer", {
        resizeEnable: true,
        zoom: 14,
        city: this.code
      });

      if (this.obj.longitude && this.obj.latitude) {
        // if have longitude & latitude
        this.mapCenter = [this.obj.longitude, this.obj.latitude];
        this.map.setZoom(15);
        this._initCommon(vm.mapCenter);
      } else if (obj.cityName || obj.address) {
        const _address = `${this.handleName(obj.provinceName)}${this.handleName(
          obj.cityName
        )}${obj.countyName || ""}${obj.address || ""}`;
        this._querySearch(_address, data => {
          if (data.length) {
            vm.mapCenter = [data[0].label.lng, data[0].label.lat];
            vm.map.setZoom(15);
            vm._initCommon(vm.mapCenter);
          } else {
            vm.$message("No info");
            const LngLatXY = vm.map.getCenter();
            vm.mapCenter = [LngLatXY.lng, LngLatXY.lat];
            vm._generatorMarker();
            vm.marker.setPosition(LngLatXY);
            vm._setMapPosition();
          }
        });
      } else {
        if (this.mapCenter.length < 2) {
          const area = await mapUtils.showCurrentArea();
          if (area[0] === "complete" && area[1].info === "SUCCESS") {
            this.adcode = area[1].addressComponent.adcode;
            this.code =
              area[1].addressComponent.province + area[1].addressComponent.city;
            this.city = area[1].addressComponent.city;
            this.addressComponent = area[1].addressComponent;
            this.mapCenter = [area[1].position.lng, area[1].position.lat];
          } else {
            const cityS = await mapUtils.showCityInfo();
            this.addressComponent = cityS.addressComponent;
            this.city = cityS.city;
            this.code = cityS;
            this.map.setCity(cityS.city);
            const center = this.map.getCenter();
            this.mapCenter = [center.lng, center.lat];
            this.$message({
              message: "get location fail please try again！",
              type: "warning"
            });
          }
        }
        this._initCommon(this.mapCenter);
      }
    },
    _initCommon(center = [119.296531, 26.074184]) {
      this.map.setCenter(center);
      this._generatorMarker();
      this._setMapPosition(true);
      AMap.plugin(["AMap.ToolBar", "AMap.Scale"], () => {
        this.map.addControl(new AMap.ToolBar());
        this.map.addControl(new AMap.Scale());
      });

      AMap.event.addListener(this.map, "dragstart", () => {
        mapUtils.clearInfoWindow(this.map);
      });
      AMap.event.addListener(this.map, "dragging", () => {
        const LngLatXY = this.map.getCenter();
        this.marker.setPosition(LngLatXY);
      });
      AMap.event.addListener(this.map, "dragend", () => {
        this._setMapPosition();
      });
    },
    // setMapPosition
    _setMapPosition(isInit = false) {
      if (!isInit) {
        const LngLatXY = this.map.getCenter();
        this.marker.setPosition(LngLatXY);
        this.mapCenter = [LngLatXY.lng, LngLatXY.lat];
      }
      mapUtils.getAddreByLnglat(this.mapCenter, this.code).then(data => {
        const obj = data.regeocode;
        const addCp = obj.addressComponent;
        this.address = obj.formattedAddress
          .replace(addCp.province, "")
          .replace(addCp.city, "")
          .replace(addCp.district, "");
        this.city = addCp.city;
        this.adcode = addCp.adcode;
        this.addressComponent = addCp;
        mapUtils.generateInfoContentFor(this.map, this.marker, this.address);
      });
    },
    // generator the Marker
    _generatorMarker() {
      this.marker = mapUtils.createMarker(this.map, this.mapCenter);
    },
    // cancel the Map
    _cancelMap() {
      this.isResolve = -1;
      this.mapShow = false;
    },
    // confirm the Map
    _confirmMap() {
      this.isResolve = 1;
      this.mapShow = false;
    },
    // Search
    _querySearch(str, cb) {
      mapUtils.getLocaltionByWord(str, this.city).then(
        result => {
          const _pois = result.poiList.pois;
          const _data = Object.freeze(
            _pois.map(p => {
              return {
                value: p.name + ` ( ${p.cityname} ${p.adname} )`,
                label: p.location,
                pos: p
              };
            })
          );
          cb(_data);
        },
        () => {
          cb();
        }
      );
    },
    // handle the Select
    _handleSelect(item) {
      this.mapCenter = [item.label.lng, item.label.lat];
      this.map.setCenter(this.mapCenter);
      // const LngLatXY = this.map.getCenter()
      this.marker.setPosition(this.mapCenter);
      setTimeout(() => {
        const _item = item.pos;
        this.address = _item.address;
        this.city = _item.cityname;
        this.adcode = _item.adcode;
        this.addressComponent = {
          province: _item.pname,
          city: _item.cityname,
          district: _item.adname
        };
        // this._generatorMarker()
        mapUtils.generateInfoContentFor(this.map, this.marker, this.address);
      }, 0);
    }
  }
};
</script>
<style lang="scss">
@import "./style";
</style>
