<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="../../../assets/img/common/back.svg">
    </div>

    <div slot="center" class="title">
      <div v-for="(item, index) in titles" class="title-item"
           :class="{active: currentIndex === index}" @click="titleClick(index)">
        {{ item }}
      </div>
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from "../../../components/common/navbar/NavBar";

  export default {
    name: "DetailNavBar",
    components: {
      NavBar,
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0,  //存储选中当前titles中的下标
      }
    },
    methods: {
      //点击titles
      titleClick(index) {
        this.currentIndex = index;
        this.$emit('titleClick', index);
      },

      //返回
      backClick() {
        this.$router.back();
      },
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 13px;
  }

  .title-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }

  .back img{
    margin-top: 11px;
  }
</style>
