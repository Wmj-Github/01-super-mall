<template>
  <swiper>
    <swiper-item v-for="item in banner">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoaded">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  // import Swiper from "../../components/common/swiper/Swiper";
  // import SwiperItem from "../../components/common/swiper/SwiperItem";
  import {Swiper, SwiperItem} from "../../../components/common/swiper";

  export default {
    name: "HomeSwiper",
    props: {
      banner: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        isLoad: false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      imageLoaded() {
        if(!this.isLoad) {
          this.$emit('swiperImageLoad');
          this.isLoad = true;
        }
      }
    }
  }
</script>

<style scoped>

</style>
