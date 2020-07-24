

// 引入工具函数
import req from "@/utils/request";

/* 获取商品数据 */
export function getGoods() {
    return req.get("/goods/goods_list");
}

/* 获取评价数据 */
export function getRatings() {
    return req.get("/shop/ratings");
}

/* 获取商家数据 */
export function getSeller() {
    return req.get("/shop/seller");
}