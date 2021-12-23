<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" ref="detailNav" :current-index="currentIndex" @titleClick="titleClick"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods-info="goodsInfo"></detail-base-info>
      <detail-shop-info :shop-info="shopInfo"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoaded="imageLoaded"></detail-goods-info>
      <detail-params-info :param-info="paramsInfo" ref="params"></detail-params-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods-list="recommends" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamsInfo from "./childComps/DetailParamsInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "../../components/common/scroll/Scroll"
  import GoodsList from "../../components/content/goodsList/GoodsList";
  import BackTop from "../../components/content/backTop/BackTop";

  import {getDetail, getRecommend, goodsInfo, shopInfo, paramsInfo} from "../../network/detail";

  import {itemListenerMixin} from "../../common/mixin";
  import {debounce} from "../../common/utils";

  export default {
    name: "Detail",
    data() {
      return {
        iid: null,        //当前选中商品的id值
        topImages: [],    //存储详情页轮播图数据
        goodsInfo: {},    //存储商品信息
        shopInfo: {},     //存储店铺信息
        detailInfo: {},   //存储商品详情数据
        paramsInfo: {},   //存储商品参数数据
        commentInfo: {},  //存储评论信息数据
        recommends: [],   //存储推荐信息数据
        themeTopY: [],    //存储标题对应内容的offsetTop
        currentIndex: 0,  //存储标题对应下标值

        isShowBackTop: false,   //是否显示回到顶部图标

        itemImgListener: null,  //存储图片加载完成刷新函数
        getThemeTopY: null,     //存储标题栏点击到对应内容函数
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamsInfo,
      DetailCommentInfo,
      DetailBottomBar,

      Scroll,
      GoodsList,
      BackTop,
    },
    created() {
      //保存传入的iid
      this.iid = this.$route.params.iid;

      //根据iid请求详情数据
      this.getDetail();

      //获取推荐数据
      this.getRecommend();

      //给getThemeTopY赋值（对给this.themeTopY赋值的操作进行防抖）
      this.getThemeTopY = debounce(() => {
        this.themeTopY = [];

        //存储标题对应内容的offsetTop
        this.themeTopY.push(0);
        this.themeTopY.push(this.$refs.params.$el.offsetTop);
        this.themeTopY.push(this.$refs.comment.$el.offsetTop);
        this.themeTopY.push(this.$refs.recommend.$el.offsetTop);

        //代码逻辑简化
        // this.themeTopY.push(Number.MAX_VALUE);
      }, 100);
    },
    // mixin: [itemListenerMixin],   //方法一：混入式做法监听图片加载（有问题）
    //方法二：
    mounted() {
      //监听item中图片加载完成
      let refresh = debounce(this.$refs.scroll.refresh, 500);
      this.itemImgListener = () => {
        refresh();
      }
      this.$bus.$on('itemImgLoad', this.itemImgListener);
    },
    destroyed() {
      //取消图片加载事件监听
      this.$bus.$off('itemImgLoad', this.itemImgListener);
    },
    //第三次获取：页面加载完成会回传一个updated方法
    // updated() {
    //   this.themeTopY = [];
    //
    //   //存储标题对应内容的offsetTop
    //   this.themeTopY.push(0);
    //   this.themeTopY.push(this.$refs.params.$el.offsetTop);
    //   this.themeTopY.push(this.$refs.comment.$el.offsetTop);
    //   this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
    //
    //   console.log(this.themeTopY);
    // },
    methods: {
      //加入购物车时
      // ...mapActions({
      //   addCart: 'addToCart'
      // }),

      /**
       * 事件监听相关方法
       */
      //图片加载
      imageLoaded() {
        this.$refs.scroll.refresh();

        //图片加载完后获取各部分offsetTop值
        this.getThemeTopY();
      },

      //点击标题滚动到相应位置
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 500);
      },

      //滚动屏幕内容对应到标题
      contentScroll(position) {
        //获取y值
        const positionY = -position.y;

        //positionY和主题中值进行对比【分两种情况做对比】
        //[0, 3221, 4066, 4356]
        //positionY在 0 和 3221 之间，index = 0
        //positionY在 3221 和 4066 之间，index = 1
        //positionY在 4006 和 4356 之间，index = 2
        //positionY超过4356，index = 3
        let length = this.themeTopY.length;
        for(let i = 0; i < length; i++) {
          //i在这里本身是字符串
          //这种情况会在最后出现错误，下标越界了
          // if(positionY > this.themeTopY[parseInt(i)] && positionY < this.themeTopY[parseInt(i)+1]) {
          //   console.log(i);
          // }

          //this.currentIndex !== i防止赋值的过程过于频繁
          if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopY[i] && positionY <
             this.themeTopY[i+1]) || (i === length - 1 && positionY >= this.themeTopY[i]))) {
            this.currentIndex = i;
            this.$refs.detailNav.currentIndex = this.currentIndex;
          }

          //简化逻辑新加一个最大值：this.themeTopY.push(Number.MAX_VALUE);
          //不用考虑内存问题，稍微多占点空间，但是性能会提高，操作系统上用空间换时间
          //注意这里的for循环需要改成length-1
          // if(this.currentIndex !== i && (positionY >= this.themeTopY[i] && positionY < this.themeTopY[i+1])) {
          //   this.currentIndex = i;
          //   this.$refs.detailNav.currentIndex = this.currentIndex;
          // }

          //是否显示回到顶部
          this.isShowBackTop = -position.y > 1000;
        }
      },

      //加入购物车
      addToCart() {
        //获取到当前商品信息
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goodsInfo.title;
        product.desc = this.goodsInfo.desc;
        product.price = this.goodsInfo.newPrice;
        product.iid = this.iid;

        //将商品加入到购物车中
        // this.$store.commit('addCart', product);
        this.$store.dispatch('addCart', product).then(() => {
          this.$toast({message: '加入购物车成功'});
        });
        // this.addCart(obj).then(() => {
        //   this.$toast({message: '加入购物车成功'})
        // });
      },

      //回到顶部
      backTop() {
        this.$refs.scroll.scrollTo(0, 0, 500);
      },

      /**
       * 网络请求相关方法
       */
      //通过iid获取当前选中商品的详细信息
      getDetail() {
        getDetail(this.iid).then(res => {
          const data = res.result;

          //获取图片轮播图信息
          this.topImages = data.itemInfo.topImages;

          //获取商品信息
          this.goodsInfo = new goodsInfo(data.itemInfo, data.columns, data.shopInfo.services);

          //获取店铺信息
          this.shopInfo = new shopInfo(data.shopInfo);

          //获取商品详情数据
          this.detailInfo = data.detailInfo;

          //获取商品参数数据
          this.paramsInfo = new paramsInfo(data.itemParams.info, data.itemParams.rule);

          //获取商品评论信息
          if(data.rate.cRate !== 0) {
            this.commentInfo = data.rate.list[0];
          }

          //第一次获取，值不对，原因是：this.$refs.params.$el压根没有渲染
          // this.themeTopY = [];
          //
          // //存储标题对应内容的offsetTop
          // this.themeTopY.push(0);
          // this.themeTopY.push(this.$refs.params.$el.offsetTop);
          // this.themeTopY.push(this.$refs.comment.$el.offsetTop);
          // this.themeTopY.push(this.$refs.recommend.$el.offsetTop);

          //第二次获取，值不对，图片没有计算在内
          //根据最新的数据，对应的DOM是已经被渲染出来的，但是图片依然是没有加载完（目前获取到的offsetTop不包含其中的图片的）
          //offsetTop值不对的时候，就是因为图片的问题
          // this.$nextTick(() => {
          //   this.themeTopY = [];
          //
          //   //存储标题对应内容的offsetTop
          //   this.themeTopY.push(0);
          //   this.themeTopY.push(this.$refs.params.$el.offsetTop);
          //   this.themeTopY.push(this.$refs.comment.$el.offsetTop);
          //   this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
          // });
        });
      },

      //获取推荐数据
      getRecommend() {
        getRecommend().then(res => {
          this.recommends = res.data.list;
        });
      }
    },
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    height: 100vh;
    background-color: #fff;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 55px);
    overflow: hidden;
  }
</style>
