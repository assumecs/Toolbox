<template>
  <div>
    <div class="item item-title">请选择省市区</div>
    <region :areaCode="areaCode" :areaInfo="areaInfo" @cancel="regionCancel" @select="regionSelect"></region>
    <div class="item item-title">请选择出生年月日</div>
    <picker mode="date" :value="birthday" :start="startDate" :end="endDate" @change="birthdayChange">
      <view class="item item-content">
        {{birthday}}
      </view>
    </picker>
    <div class="item item-title">请选择性别</div>
    <radio-group class="radio-group item item-content" @change="genderChange">
      <label class="radio" v-for="(item, index) in genders" :key="index">
        <radio :value="item.code" :checked="item.code==gender"/>{{item.value}}
      </label>
    </radio-group>
    <button class="gen" @click="gen">获取可用的身份证号码</button>
    <div class="item">{{result}}</div>
  </div>
</template>

<script>

import region from '@/components/region'
import { formatDate } from '@/utils/index'
let date = new Date()
date.setFullYear(date.getFullYear() - 20)

export default {
  components: {
    region
  },
  data () {
    return {
      genders: [{
        code: '1',
        value: '男'
      }, {
        code: '2',
        value: '女'
      }],
      areaCode: '110105',
      areaInfo: '北京市 北京市 朝阳区',
      birthday: formatDate(date, 'yyyy-MM-dd'),
      startDate: '1880-01-01',
      endDate: '2100-12-12',
      gender: '1',
      result: '',
      extra: ''
    }
  },
  methods: {
    regionCancel () {
      console.log('region cancel: ', ...arguments)
    },
    regionSelect (region, regionCode) {
      console.log('region select: ', ...arguments)
      this.areaInfo = region
      this.areaCode = regionCode
    },
    birthdayChange (e) {
      console.log('birthday e.mp.detail.value: ', e.mp.detail.value)
      this.birthday = e.mp.detail.value
      console.log('birthday: ', this.birthday)
    },
    genderChange (e) {
      console.log('gender e.mp.detail.value: ', e.mp.detail.value)
      this.gender = e.mp.detail.value
    },
    gen () {
      var ex = this.areaCode + this.birthday.replace(/-/g, '')
      this.result = ex
      console.log(ex)
      // for( let i = 0; i < 500; i++) {
      //   // TODO
      // }
    }
  }
}
</script>

<style >
.item {
  border-bottom: 1px #ccc solid;
  padding: 10px 16px;
}
.item-title {
  color: #444;
}
.item-content {
  text-align: right;
}
.gen {
  margin-top: 20px;
}
</style>
