<template>
  <div class="bottom-bar">
    <div class="checked-area">
      <check-button class="checked-button" :is-checked="isSelectAll" @click.native="checkClick"></check-button>
      <span>全选</span>
      <span class="total-price">合计: ¥{{ totalPrice }}</span>
      <span class="buy-product">去结算({{ checkedLength }})</span>
    </div>
  </div>
</template>

<script>
  import CheckButton from "../../../components/content/checkButton/CheckButton";

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton,
    },
    data() {
      return {
        cartLists: this.$store.state.cartList,
      }
    },
    methods: {
      checkClick() {
        if(this.isSelectAll) {    //全部选中
          this.cartLists.forEach(item => item.checked = false);
        }else {
          this.cartLists.forEach(item => item.checked = true);
        }
      }
    },
    computed: {
      //计算总价
      totalPrice() {
        // for(let i in this.cartLists) {
        //   console.log(this.cartLists[i].price);
        //   console.log();
        //   let price = this.cartLists[i].price.split('~')[0].substring(1);
        // }
        return this.cartLists.filter(item => {
          return item.checked;
        }).reduce((preValue, item) => {
          return preValue + item.price.split('~')[0].substring(1) * item.count;
        }, 0).toFixed(2);
      },

      //获取选中商品数
      checkedLength() {
        return this.cartLists.filter(item => item.checked).length;
      },

      //全选
      isSelectAll() {
        if(this.cartLists.length === 0) {
          return false;
        }

        //方法一：使用filter，性能不高
        // return !(this.cartLists.filter(item => !item.checked).length);

        //方法二：使用find
        return !this.cartLists.find(item => !item.checked);

        //方法三：普通遍历
        // for(let item of this.cartLists) {
        //   if(!item.checked) {
        //     return isChecked;
        //   }
        // }
        // return true;
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    width: 100%;
    height: 40px;
    background-color: #eee;
    line-height: 40px;
    font-size: 14px;

    position: relative;
    bottom: 49px;
    left: 0;
    /*box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);*/

    padding-left: 10px;
    box-sizing: border-box;
  }

  .checked-area {
    display: flex;
    align-items: center;
  }

  .checked-area .checked-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  .checked-area .total-price {
    margin-left: 82px;
    font-size: 16px;
    color: #666;
    width: 120px;
    text-align: center;
  }

  .checked-area .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
    margin-left: 10px;
  }
</style>
