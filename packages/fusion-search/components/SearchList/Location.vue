<template>
  <div class="MallCaseLocation">
    <div v-show="item.case_province_code || item.case_location_code || item.location"
      ><img src="../../static/location@2x.png" alt="" /><span>{{
        city_name(item.case_province_code) ||
          city_name(item.location) ||
          city_name(item.case_location_code)
      }}</span></div
    >
  </div>
</template>

<script>
import { city_group } from '../../common/city'

export default {
  name: 'Location',
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {
    city_name(location) {
      if (location) {
        if (String(location).includes('0000')) {
          return city_group[location]
        } else {
          const l = String(location).substring(0, 2) + '0000'
          return city_group[l] + '-' + city_group[location]
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.MallCaseLocation {
  font-size: 14px;
  font-family: MicrosoftYaqiHei;
  color: #1c2d5a;
  display: flex;
  div {
    display: flex;
    align-items: center;
  }
  img {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    margin-right: 5px;
  }
}
</style>
