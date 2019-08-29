<template>
  <div class="all-bg">
    <image class="animation" :animation="animation" src="/static/images/user.png" @transitionend="stepEnd(4)"></image>
    <button @click='rotate' class='btn' type='primary'>旋转一下</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      animation: '',
      isShow: false,
      stepNum: 0
    }
  },
  watch: {
    animation (val) {
      console.log('val', val)
    }
  },
  methods: {
    create () {
      this.animation = ''
      // 实例化一个动画
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
    stepEnd (endNum) {
      console.log('stepEnd', this.stepNum)
      this.stepNum += 1
      if (this.stepNum === endNum + 1) {
        this.reset()
        console.log('last', this.stepNum)
      }
    },
    reset () {
      this.create()
      this.animation.rotate(0, 0)
        .scale(1)
        .translate(0, 0)
        .skew(0, 0)
        .step({ duration: 0 })
      this.animation = this.animation.export()
      this.animation.t = +new Date()
      this.stepNum = 0
    },

    rotate () {
      this.create()
      // let that = this
      this.isShow = true

      this.animation.rotate(150).scale(2).step()
        .skew(10).rotate(0).width(10).height(10).step({ ducation: 1000 })
        .translate(-94, -100).step({ ducation: 1000 })
        .skew(0).step()
      this.animation = this.animation.export()
      this.animation.t = +new Date()
      console.log(this.animation)
    }
  }
}
</script>
<style scoped>
.all-bg {
  height: 100vh;
  position: relative;
}

.animation {
  width: 60rpx;
  height: 60rpx;
  position: absolute;
  right: -60rpx;
  top: 50%;
}

</style>
