<template>
  <div class="menu-list">
    <a class="menu-item" v-for="(item, index) in menu" :key="index" @click="clickItem(item)">
      <img class="menu-icon" :src="item.icon" background-size="cover" />
      <card :text="item.name"></card>
    </a>
  </div>    
</template>

<script>
import card from '@/components/card'

export default {
  components: {
    card
  },
  data () {
    return {
      menu: [{
        name: '生成证件号',
        icon: '/static/images/user.png',
        url: '/pages/generate/main'
      }, {
        name: '解析证件号',
        icon: '/static/images/user.png',
        url: ''
      }, {
        name: '颜色选择器',
        icon: '/static/images/user.png',
        url: ''
      }, {
        name: 'counter',
        icon: '/static/images/user.png',
        url: ''
      }]
    }
  },
  methods: {
    clickItem (item) {
      if (item.url) {
        wx.navigateTo({
          url: item.url
        })
      } else {
        this.$tips.alert('coming soon...')
      }
    }
  }
}
</script>

<style scoped>
.menu-list {
  display: flex;
  flex-wrap: wrap;
}
.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 49vw;
  padding: 44px 0px;
  border: 1px #ccc solid;
}

.menu-icon {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.menu-name {
  color: #aaa;
}
</style>