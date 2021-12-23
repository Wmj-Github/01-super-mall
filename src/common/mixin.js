import {debounce} from "./utils";
import BackTop from "../components/content/backTop/BackTop";

//混入式做法监听图片加载（有问题）
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,  //存储图片加载完成刷新函数
    }
  },
  mounted() {
    //监听item中图片加载完成
    let refresh = debounce(this.$refs.scroll.refresh, 500);
    this.itemImgListener = () => {
      refresh();
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener);
  }
}

// export const backTopMixin = {
//   data() {
//     return {
//       isShowBackTop: false,
//     };
//   },
//   components: {
//     BackTop,
//   },
//   methods: {
//     //回到顶部
//     backTop() {
//       this.$refs.scroll.scrollTo(0, 0, 500);
//     },
//   }
// }
