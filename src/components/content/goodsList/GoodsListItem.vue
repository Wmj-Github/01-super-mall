<template>
  <div class="goodsListItem">
    <img :src="goodsListItem.show.img" alt="">
    <div class="goodsInfo">
      <p>{{ goodsListItem.title }}</p>
      <span class="price">{{ goodsListItem.price }}</span>
      <span class="collect">{{ goodsListItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsListItem: {
        type: Object,
        default() {
          return {};
        }
      }
    }
  }
</script>

<style scoped>
  .goodsListItem {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }

  .goodsListItem img {
    width: 100%;
    border-radius: 5px;
  }

  .goodsInfo {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;   /*元素的内容若超出了给定的宽度和高度属性，那么超出的部分将会被隐藏，不占位*/
    text-align: center;
  }

  .goodsInfo p {
    overflow: hidden;
    text-overflow: ellipsis;  /*显示省略符号来代表被修剪的文本*/
    white-space: nowrap;  /*规定段落中的文本不进行换行*/
    margin-bottom: 3px;
  }

  .goodsInfo .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goodsInfo .collect {
    position: relative;
  }

  .goodsInfo .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
