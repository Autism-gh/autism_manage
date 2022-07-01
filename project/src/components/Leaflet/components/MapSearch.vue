<template>
  <div class="leaflet-search-container">
      <div class="address bg"  @click="search.show = !search.show">
        <span>{{ search.value.name }}</span>
        <i :class="[search.show? 'el-icon-arrow-up': 'el-icon-arrow-down']"></i>
      </div>
      <div class="address-content bg" v-show="search.show">
        <div class="address-row">
            <div class="title">常用城市</div>
            <div class="content">
                <span class="city" v-for="item in search.common" :key="item.city_code" @click="handleChangeHot(item)">
                  {{ item.chinese_name }}
                </span>
            </div>
        </div>
        <div class="address-row">
            <div class="title">选择城市</div>
            <div class="content">
              <el-cascader
                @change="handleChangeCenter"
                style="width: 100%"
                placeholder="试试搜索：指南"
                :options="search.list"
                v-model="search.active"
                filterable>
              </el-cascader>
            </div>
        </div>
      </div>

      <div class="search">
          <el-select
            v-model="address.value"
            multiple filterable remote
            reserve-keyword placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :loading="address.loading">
            <el-option
              v-for="item in address.list"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button type="primary" icon="el-icon-search"></el-button>
      </div>
  </div>
</template>
<script>
import L from '../leaflet'
import { regionData } from "element-china-area-data"
import { hotCityList } from '../util/hotcity'
const GaodeCityInfo = require('@/util/map/mapGaodeCityInfo.json')
export default {
  name: '',
  components: {  },
  props: {  },
  data () {
    return {
      search: {
        active: [],
        value: {},
        list: regionData,
        common: hotCityList,
        show: false,
      },

      address: {
        loading: false,
        list: [],
        value: ''
      },

      mapInstance: null,

      featureGroup: null
    }
  },
  computed: {

  },
  methods: {
    init(map) {
      this.mapInstance = map
      this.mapInstance = new L.FeatureGroup().addTo(this.mapInstance)

      
    },


    remoteMethod(query) {
      if (query !== '') {
        this.address.loading = true;
        setTimeout(() => {
          console.log('query', query)
          this.address.loading = false;
          this.address.options = []
        }, 200);
      } else {
        this.address.options = [];
      }
    },

    handleChangeCenter(data) {
      const code = data[data.length - 1]
      const acdtive = GaodeCityInfo.find(item => item.city_code === code)
      this.handleChangeHot(acdtive)
    },

    handleChangeHot(item) {
      const { chinese_name, center, city_code } = item
      this.search.value = {
        name: chinese_name,
        code: city_code,
        center: center
      }

      if(center) {
        this.setCurrentView(center)
      }
    },

    setCurrentView(latlng, zoom = 16) {
      this.mapInstance.setView(L.latLng(latlng), zoom)
    },

    cleanLayer() {
      if(this.featureGroup) {
        this.featureGroup.clearLayers()
        this.featureGroup.remove()
        this.featureGroup = null
      }
    }

  },
  beforeCreate () {

  },
  created () {

  },
  beforeMount () {

  },
  mounted () {

  },
  beforeDestroy() {
    this.cleanLayer()
  },
}
</script>
<style lang="scss">
.leaflet-search-container {
  .search {
    .el-input {
      .el-input__inner {
        line-height: 28px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }

    .el-button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
}
</style>

<style lang="scss" scoped>
.leaflet-search-container {
  position: absolute;
  left: var(--default-padding);
  top: var(--default-padding);
  z-index: 1000;
  font-size: 12px;
  display: flex;
  flex-direction: row;

  .bg {
    background-color: var(--color-white);
    box-shadow: var(--box-shadow-base);
    border-radius: 4px;
  }

  .address {
    position: relative;
    height: max-content;
    width: max-content;
    height: 28px;
    padding: 0 8px;
    cursor: pointer;
    display: flex;
    align-items: center;

    i {
      font-size: 16px;
      margin-left: 5px;
    }
  }

  .address-content {
    position: absolute;
    width: 350px;
    top: 40px;
    z-index: 100;
    padding: 5px 10px 10px 10px;

    .city {
      cursor: pointer;
      line-height: 24px;
      color: var(--color-text-secondary);
      margin-right: var(--default-padding);
    }

    .address-row {

      .title {
        line-height: 30px;
      }
      .content {

      }
    }
  }

  .search {
    display: flex;
    align-items: center;
    position: relative;
    height: max-content;
    width: max-content;
    margin-left: var(--default-padding);
  }
}
</style>
