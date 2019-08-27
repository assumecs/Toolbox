<template>
  <div>
    <div class="search">
      <input type="text" placeholder="请输入产品名称" v-model="keyWord">
      <button @click="search">搜索</button>
    </div>
    <product-list :productList="productList"></product-list>
  </div>
</template>

<script>
import ProductList from '@/components/productList'
export default {
  components: {
    ProductList
  },
  data () {
    return {
      keyWord: '',
      productList: []
    }
  },
  mounted () {
  },
  methods: {
    search () {
      console.log('点我搜索')
      if (!this.keyWord) {
        return this.$tips.alert('请输入关键字搜索')
      }
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