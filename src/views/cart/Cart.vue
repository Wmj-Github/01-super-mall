<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ listLength }})</div>
    </nav-bar>

    <!-- 商品列表 -->
    <cart-list></cart-list>

    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";

  import NavBar from "../../components/common/navbar/NavBar";

  import {mapGetters} from 'vuex';

  export default {
    name: "Cart",
    components: {
      CartList,
      CartBottomBar,

      NavBar,
    },
    computed: {
      //数组写法
      // ...mapGetters(['cartListLength']),
      //对象写法
      ...mapGetters({
        listLength: 'cartListLength',
      }),
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
</style>
