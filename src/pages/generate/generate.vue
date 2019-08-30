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
    <!-- <div class="item">{{result}}</div> -->
    <div class="list">
      <div class="item item-idno" v-for="(item, index) in list" :key="index">
        <span>{{item}}</span>
        <button @click="copy(item)" class="copy-btn">复制</button>
      </div>
    </div>
  </div>
</template>

<script>

import region from '@/components/region'
import { formatDate } from '@/utils/index'
let date = new Date()
date.setFullYear(date.getFullYear() - 20)

let weight = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
let tail = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']

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
      list: [],
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
    /**
     * 17 位 加权因子
     * 1 2  3 4 5 6 7 8 9 10 11 12 13 14 15 16 17
     * 7 9 10 5 8 4 2 1 6  3  7  9 10  5  8  4  2
     * 余数 校验码 /11
     * 0 1 2 3 4 5 6 7 8 9 10
     * 1 0 X 9 8 7 6 5 4 3  2
     */
    gen () {
      var ex = this.areaCode + this.birthday.replace(/-/g, '')
      this.result = ex
      console.log(ex)
      let list = []
      let temp = ''
      for (let i = 0; i < 500; i++) {
        // TODO
        temp = this.padding(i * 2 + Number(this.gender), 3)
        temp = ex + temp
        // console.log(temp)
        let sum = 0
        weight.forEach((item, index) => {
          sum += item * temp[index]
        })
        let remainder = sum % 11
        temp = temp + tail[remainder]
        list.push(temp)
      }
      if (this.gender === '2') {
        list.pop()
      }
      this.list = list
    },
    padding (num, len) {
      num = '' + num
      var lenth = num.length
      while (lenth < len) {
        num = '0' + num
        lenth++
      }
      return num
    },
    copy (item) {
      wx.setClipboardData({
        data: item,
        success (res) {
          wx.getClipboardData({
            success (res) {
              console.log(res.data) // data
            }
          })
        }
      })
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
  margin: 20px 5px;
}
.item-idno {
  display: flex;
  justify-content: space-between;
}
.copy-btn {
  border: 2rpx #ccc solid;
  border-radius: 10rpx;
  padding: 0 10rpx;
  line-height: 1.2em;
  margin: 0;
  font-size: 1em;
}
</style>
