import {ADD_COUNTER, ADD_TO_CART} from "./mutations-types";

//mutations唯一的目的就是修改state中的状态，其中的每一个方法尽可能完成的事件比较单一一点
export default {
  // addCart(state, playload) {
  //   //playload新添加的商品
  //   let oldProduct = {};
  //   for(let item of state.cartList) {
  //     if(item.iid === playload.iid) {
  //       oldProduct = item;
  //     }
  //   }
  //
  //   //思路
  //   // let product = state.cartList.find(function (item) {
  //   //   return item.iid = playload.iid;
  //   // });
  //   // let product = state.cartList.find(item => item.iid === playload.iid);
  //
  //   //判断oldProduct是否有值
  //   if(oldProduct) {
  //     oldProduct.count += 1;
  //   }else {
  //     playload.count = 1;
  //     state.cartList.push(playload);
  //   }
  // }

  //ADD_COUNTER官方规范写法
  [ADD_COUNTER](state, playload) {
    playload.count++;
  },

  [ADD_TO_CART](state, playload) {
    state.cartList.push(playload);
  }
}
