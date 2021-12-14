<template>
  <div class="goodsList">
    <goods-list-item v-for="(item, index) in goodsList" :goods-list-item="item"></goods-list-item>
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";

  export default {
    name: "GoodsList",
    components: {
      GoodsListItem
    },
    props: {
      goodsList: {
        type: Array,
        default() {
          return [];
        }
      }
    }
  }
</script>

<style scoped>
  .goodsList {
    display: flex;
    flex-wrap: wrap;  /*规定灵活的项目在必要的时候拆行或拆列*/
    justify-content: space-around;  /*位于各行之前、之间、之后都留有空白的容器内*/
    padding: 2px;
  }
</style>
