<template>
  <div>
    <div @click="search">点我搜索</div>
    <div class="tabs">
      <div class="tab" v-for="(item, index) in tabs" :key="index" :class="index==activeTab" @click="clickTab(index)">{{item}}</div>
    </div>
    <div v-for="(item, index) in productList" :key="index">{{item.name}}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeTab: 0,
      tabs: ['产险', '个险', '车险'],
      productList: [{
        name: '产品1',
        code: 'product1',
        image: 'http://192.168.0.104/mock/image/nice&veryNice.png'
      }]
    }
  },
  mounted () {
    let that = this
    wx.request({
      url: 'http://192.168.0.104/mock/json/product_list.json',
      header: {
        'content-type': 'application/json'
      },
      success (resp) {
        console.log('product_list', resp.data)
        that.productList = resp.data
      }
    })
  },
  methods: {
    search () {
      console.log('点我搜索')
    },
    clickTab (tab) {
      this.activeTab = tab
    }
  }
}
</script>

<style scoped>
  .tabs {
    display: flex;
  }
  .tab {
    flex: 1;
    text-align: center;
    align-items: center;
    justify-content: center;
  }
</style>