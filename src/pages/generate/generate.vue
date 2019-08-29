<template>
  <div>
    <div class="addr">
      <picker mode="region" @change="bindRegionChange" :value="region">
        <view class="picker">
          当前选择：{{region[0]}}，{{region[1]}}，{{region[2]}}
        </view>
      </picker> 
    </div>
    <button @click="selectDistrict">show address</button>
    <span :value="areaInfo"></span>
    <view class="picker-view" :animation="animationAddressMenu" :style="{'visibility':addressMenuIsShow ? 'visible':'hidden'}">
      <view style="height:10% ;width:95%;margin-top:10rpx">
        <span @click="cityCancel">取消</span>
        <span style="float: right" @click="citySure">确定</span>
      </view>
      <picker-view style="width: 100%; height: 300px;" @change="cityChange" :value="value" wx:key="">
        <picker-view-column>
          <view v-for="(item, index) in provinces" class="picker-item" :key="index">
            {{item.name}}
          </view>
        </picker-view-column>
        <picker-view-column>
          <view v-for="(item, index) in cities" class="picker-item" :key="index">
            {{item.name}}
          </view>
        </picker-view-column>
        <picker-view-column>
          <view v-for="(item, index) in counties" class="picker-item" :key="index">
            {{item.name}}
          </view>
        </picker-view-column>
      </picker-view>
    </view>
    <animation></animation>
  </div>
</template>

<script>

import province from '@/utils/province'
import city from '@/utils/city'
import county from '@/utils/county'
import animation from '@/components/animation'
var address = {}

export default {
  components: {
    animation
  },
  created () {
    // ID ParentID Name Code
    var provinces = []
    province.forEach(element => {
      provinces.push({
        id: element[0],
        name: element[2]
      })
    })
    this.provinces = address.provinces = provinces
    // 市
    var cities = {}
    city.forEach(element => {
      if (cities.hasOwnProperty(element[1])) {
        cities[element[1]].push({
          id: element[0],
          name: element[2]
        })
      } else {
        cities[element[1]] = [{
          id: element[0],
          name: element[2]
        }]
      }
    })
    address.cities = cities
    this.cities = address.cities[this.provinces[0].id]
    // 区
    var counties = {}
    county.forEach(element => {
      if (counties.hasOwnProperty(element[1])) {
        counties[element[1]].push({
          id: element[0],
          name: element[2]
        })
      } else {
        counties[element[1]] = [{
          id: element[0],
          name: element[2]
        }]
      }
    })
    address.counties = counties
    this.counties = address.counties[this.cities[0].id]
    // var id = address.provinces[0].id
    // this.setData({
    //   provinces: address.provinces,
    //   cities: address.cities[id],
    //   counties: address.counties[address.cities[id][0].id],
    // })

    // 初始化一个动画
    this.animation = wx.createAnimation({
      // 动画持续时间 单位ms 默认 400
      duration: 1000,
      /**
        *  linear  动画一直较为均匀
        *  ease    从匀速到加速在到匀速
        *  ease-in 缓慢到匀速
        *  ease-in-out 从缓慢到匀速再到缓慢
        *  step-start 动画一开始就跳到 100% 直到动画持续时间结束 一闪而过
        *  step-end   保持 0% 的样式直到动画持续时间结束        一闪而过
        */
      timingFunctionL: 'linear',
      // 延迟多长时间开始
      delay: 100,
      /**
       * 以什么为基点做动画
       * left,center right是水平方向取值，对应的百分值为left=0%;center=50%;right=100%
       * top center bottom是垂直方向的取值，其中top=0%;center=50%;bottom=100%
       */
      transformOrigin: '0 0 0',
      success (res) {
        console.log(res)
      }
    })
  },
  data () {
    return {
      region: ['北京市', '北京市', '朝阳区'],
      // provinces: province,
      // cities: city,
      // counties: county,
      extra: '',
      animationAddressMenu: {},
      addressMenuIsShow: false,
      value: [0, 0, 0],
      provinces: [],
      cities: [],
      counties: [],
      areaInfo: ''
    }
  },
  methods: {
    bindRegionChange () {
      console.log('arguments', arguments)
      console.log('region', this.region)
    },
    // 点击所在地区弹出选择框
    selectDistrict (e) {
      // var that = this
      // 如果已经显示，不在执行显示动画
      if (this.addressMenuIsShow) {
        return
      }
      // 执行显示动画
      this.startAddressAnimation(true)
    },
    // 执行动画
    startAddressAnimation (isShow) {
      console.log(isShow)
      var that = this
      if (isShow) {
        // vh是用来表示尺寸的单位，高度全屏是100vh
        that.animation.translateY(0 + 'vh').step()
      } else {
        that.animation.translateY(40 + 'vh').step()
      }
      // that.setData({
      //   animationAddressMenu: that.animation.export(),
      //   addressMenuIsShow: isShow,
      // })
      that.animationAddressMenu = this.animation.export()
      that.addressMenuIsShow = isShow
    },
    // 点击地区选择取消按钮
    cityCancel (e) {
      this.startAddressAnimation(false)
    },
    // 点击地区选择确定按钮
    citySure (e) {
      var that = this
      // var city = that.city
      var value = that.value
      that.startAddressAnimation(false)
      // 将选择的城市信息显示到输入框
      var areaInfo = that.provinces[value[0]].name + ',' + that.cities[value[1]].name + ',' + that.counties[value[2]].name
      // that.setData({
      //   areaInfo: areaInfo,
      // })
      that.areaInfo = areaInfo
      console.log('areaCode', that.counties[value[2]].id)
    },
    // 点击蒙版时取消组件的显示
    hideCitySelected (e) {
      console.log(e)
      this.startAddressAnimation(false)
    },
    // 处理省市县联动逻辑
    cityChange (e) {
      console.log(e)
      var value = e.mp.detail.value
      var provinces = this.provinces
      var cities = this.cities
      // var counties = this.counties
      var provinceNum = value[0]
      var cityNum = value[1]
      var countyNum = value[2]
      // 如果省份选择项和之前不一样，表示滑动了省份，此时市默认是省的第一组数据，
      if (this.value[0] !== provinceNum) {
        var id = provinces[provinceNum].id
        // this.setData({
        this.value = [provinceNum, 0, 0]
        this.cities = address.cities[id]
        this.counties = address.counties[address.cities[id][0].id]
        // })
      } else if (this.value[1] !== cityNum) {
        // 滑动选择了第二项数据，即市，此时区显示省市对应的第一组数据
        // var id = cities[cityNum].id
        // this.setData({
        this.value = [provinceNum, cityNum, 0]
        this.counties = address.counties[cities[cityNum].id]
        // })
      } else {
        // 滑动选择了区
        // this.setData({
        this.value = [provinceNum, cityNum, countyNum]
        // })
      }
      console.log(this)
    }
  // ：https://blog.csdn.net/qq_38125123/article/details/75043607
  }
}
</script>

<style >
.picker-view {
  width: 100%;
  display: flex;
  z-index:12;
  background-color: #fff;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0rpx;
  left: 0rpx;
  height: 40vh;
}
 
.picker-item {
  line-height: 70rpx;
  margin-left: 5rpx;
  margin-right: 5rpx;
  text-align: center;
}
</style>
