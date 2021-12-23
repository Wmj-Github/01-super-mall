import {ADD_COUNTER, ADD_TO_CART} from "./mutations-types";

export default {
  addCart(context, playload) {
    return new Promise((resolve, reject) => {
      //playload新添加的商品
      let oldProduct = context.state.cartList.find(item => item.iid === playload.iid);

      //判断oldProduct是否有值
      if(oldProduct) {
        context.commit(ADD_COUNTER, oldProduct);
        resolve('当前的商品数量+1');
      }else {
        playload.count = 1;
        playload.checked = true;    //给选中状态赋值
        context.commit(ADD_TO_CART, playload);
        resolve('添加了新的商品');
      }
    })
  }
}
