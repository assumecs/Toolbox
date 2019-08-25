<template>
  <div>
    <div @click="search">点我搜索</div>
    <div class="tabs">
      <div class="tab" v-for="(item, index) in tabs" :key="index" :class="index==activeTab" @click="clickTab(index)">{{item}}</div>
    </div>
    <div v-for="(item, index) in productList" :key="index">index</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeTab: 0,
      tabs: ['产险', '个险', '车险'],
      productList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
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