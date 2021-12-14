<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banner="banner"></home-swiper>
      <home-recommend-view :recommend="recommend"></home-recommend-view>
      <home-feature-view></home-feature-view>
      <tab-control class="tab-control" :titles="['流行', '新款', '精选']" @tabClick="tabClick"></tab-control>
      <goods-list :goodsList="showGoods"></goods-list>
    </scroll>

    <!-- 修饰.native修饰什么时候使用? 在我们需要监听一个组件的原生事件时, 必须给对应的事件加上.native修饰符, 才能进行监听 -->
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import TabControl from "../../components/content/tabControl/TabControl";
  import GoodsList from "../../components/content/goodsList/GoodsList";
  import Scroll from "../../components/common/scroll/Scroll";
  import BackTop from "../../components/content/backtop/BackTop";

  import HomeSwiper from "./childComps/HomeSwiper";
  import HomeRecommendView from "./childComps/HomeRecommendView";
  import HomeFeatureView from "./childComps/HomeFeatureView";

  import {getHomeMultidata, getHomeGoodsList} from "../../network/home";

  export default {
    name: "Home",
    components: {
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,

      HomeSwiper,
      HomeRecommendView,
      HomeFeatureView
    },
    data() {
      return {
        banner : [],    //存储轮播图数据
        recommend: [],  //存储轮播图下方导航数据
        goodsList: {    //存储首页商品数据
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',   //首页当前选中的商品类型
        isShowBackTop: false, //是否显示回到顶部图标
      }
    },
    created() {
      //首页轮播图数据
      this.getHomeMultidata();

      //首页商品数据
      this.getHomeGoodsList('pop');
      this.getHomeGoodsList('new');
      this.getHomeGoodsList('sell');
    },
    computed: {
      showGoods() {
        return this.goodsList[this.currentType].list;
      }
    },
    methods: {
      /**
       * 时间监听相关方法
       */
      //点击首页类别切换数据
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }
      },

      //回到顶部
      backTop() {
        this.$refs.scroll.scrollTo(0, 0, 500);
      },

      //当下拉距离超出多少时显示"回到顶部"图标
      contentScroll(position) {
        this.isShowBackTop = -position.y > 1000;
      },

      //上拉加载更多
      loadMore() {
        console.log("上拉加载");
        this.getHomeGoodsList(this.currentType);
      },


      /**
       * 网络请求相关方法
       */
      //首页轮播图数据
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banner = res.data.banner.list;
          this.recommend = res.data.recommend.list;
        });
      },

      //首页商品数据
      getHomeGoodsList(type) {
        const page = this.goodsList[type].page + 1;
        getHomeGoodsList(type, page).then(res => {
          this.goodsList[type].list.push(...res.data.list);
          this.goodsList[type].page += 1;

          this.$refs.scroll.finishPullUp();
        });
      },
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    color: #fff;
    background-color: var(--color-tint);

    /*在使用浏览器原生滚动时, 为了让导航不跟随一起滚动*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 999;*/
  }

  .tab-control {
    /*position: sticky;*/
    /*top: 44px;*/
    position: relative;
    z-index: 9;
  }

  /*.content {*/
  /*height: calc(100% - 93px);*/
  /*overflow: hidden;*/
  /*margin-top: 44px;*/
  /*}*/

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
