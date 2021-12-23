<template>
  <div class="check-button" :class="{checked: isChecked}" @click="selectItem">
    <img src="../../../assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      isChecked: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      selectItem() {
        this.$emit('checkedChange');
      }
    }
  }
</script>

<style scoped>
  .check-button {
    border-radius: 50%;
    border: 2px solid #aaa;
    width: 18px;
    height: 18px;
    cursor: pointer;

    position: relative;
    margin: 0;
  }

  .checked {
    border-color: var(--color-high-text);
    background-color: var(--color-high-text);
  }
</style>
