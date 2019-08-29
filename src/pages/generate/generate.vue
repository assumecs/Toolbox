<template>
  <div>
    <div class="addr">
      <picker mode="region" @change="bindRegionChange" v-model="region">
        <view class="picker">
          当前选择：{{region[0]}}，{{region[1]}}，{{region[2]}}
        </view>
      </picker> 
    </div>
  </div>
</template>

<script>

import province from '@/utils/province'
import city from '@/utils/city'
// import county from '@/utils/county'

export default {
  data () {
    return {
      region: ['北京市', '北京市', '朝阳区'],
      provinces: province,
      cities: city,
      // counties: county,
      extra: ''
    }
  },
  methods: {
    bindRegionChange () {
      console.log('arguments', arguments)
      console.log('region', this.region)
    }
  }
}
</script>