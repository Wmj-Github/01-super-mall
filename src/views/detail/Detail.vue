<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods-info="goodsInfo"></detail-base-info>
      <detail-shop-info :shop-info="shopInfo"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoaded="imageLoaded"></detail-goods-info>
      <detail-params-info :param-info="paramsInfo"></detail-params-info>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamsInfo from "./childComps/DetailParamsInfo";

  import Scroll from "../../components/common/scroll/Scroll";

  import {getDetail, goodsInfo, shopInfo, paramsInfo} from "../../network/detail";

  export default {
    name: "Detail",
    data() {
      return {
        iid: null,      //当前选中商品的id值
        topImages: [],  //存储详情页轮播图数据
        goodsInfo: {},  //存储商品信息
        shopInfo: {},   //存储店铺信息
        detailInfo: {}, //存储商品详情数据
        paramsInfo: {}, //存储商品参数数据
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamsInfo,

      Scroll,
    },
    created() {
      //保存传入的iid
      this.iid = this.$route.params.iid;

      //根据iid请求详情数据
      this.getDetail();
    },
    methods: {

      /**
       * 事件监听相关方法
       */
      imageLoaded() {
        this.$refs.scroll.refresh();
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
    height: calc(100% - 44px);
    overflow: hidden;
  }
</style>
