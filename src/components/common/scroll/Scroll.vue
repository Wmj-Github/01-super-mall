<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';

  export default {
    name: "Scroll",
    data() {
      return {
        scroll: null,
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      //ref如果是绑定在组件中的, 那么通过this.$refs.refname获取到的是一个组件对象
      //ref如果是绑定在普通的元素中, 那么通过this.$refs.refname获取到的是一个元素对象
      //1、创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
      });

      //2、监听滚动的位置
      if(this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', (position) => {
          this.$emit('scroll', position);
        });
      }

      //3、监听上拉加载事件
      if(this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp');
        });
      }
    },
    methods: {
      //回到顶部
      scrollTo(x, y, time=300) {
        this.scroll && this.scroll.scrollTo(x, y, time);
      },

      //完成上拉加载更多
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp();
      },

      //首页图片加载刷新
      refresh() {
        this.scroll && this.scroll.refresh();
      },

      //获取当前滑动距离顶部的位置
      getScrollY() {
        return this.scroll ? this.scroll.y : 0;
      }
    }
  }
</script>

<style scoped>

</style>
