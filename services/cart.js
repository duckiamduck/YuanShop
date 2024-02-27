"use strict";
const utils_http = require("../utils/http.js");
const PostMeberCartAPi = (data) => {
  return utils_http.http({
    method: "POST",
    url: "/member/cart",
    data
  });
};
const GetMeberCartAPi = () => {
  return utils_http.http({
    method: "GET",
    url: "/member/cart"
  });
};
const DeleteMeberCartAPi = (data) => {
  return utils_http.http({
    method: "DELETE",
    url: "/member/cart",
    data
  });
};
const putMemberCartBySkuIdAPI = (skuId, data) => {
  return utils_http.http({
    method: "PUT",
    url: `/member/cart/${skuId}`,
    data
  });
};
const putMeberSelectAll = (data) => {
  return utils_http.http({
    method: "PUT",
    url: "/member/cart/selected",
    data
  });
};
exports.DeleteMeberCartAPi = DeleteMeberCartAPi;
exports.GetMeberCartAPi = GetMeberCartAPi;
exports.PostMeberCartAPi = PostMeberCartAPi;
exports.putMeberSelectAll = putMeberSelectAll;
exports.putMemberCartBySkuIdAPI = putMemberCartBySkuIdAPI;
//# sourceMappingURL=cart.js.map
