import {request} from "./request";

//通过路由得到的id获取到对应商品数据
export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid,
    }
  })
}

//获取商品详情页推荐数据
export function getRecommend() {
  return request({
    url: '/recommend'
  });
}

//详情页商品数据
export class goodsInfo {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.realPrice = itemInfo.lowNowPrice;
  }
}

//商品对应店铺信息数据
export class shopInfo {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}

//商品对应参数数据
export class paramsInfo {
  constructor(info, rule) {
    //注：images可能没有值（某些商品有值，某些没有值）
    this.image = info.image ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}
