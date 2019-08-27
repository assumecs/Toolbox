<template>
  <div class="product-list">
    <div class="product-item" v-for="(item, index) in productList" :key="index">{{item.name}}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: this.productList
    }
  },
  props: {
    productList: {
      type: Array,
      default: []
    }
  }
}
</script>