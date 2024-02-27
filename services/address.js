"use strict";
const utils_http = require("../utils/http.js");
const postMemberAddressAPI = (data) => {
  return utils_http.http({
    method: "POST",
    url: "/member/address",
    data
  });
};
const getMemberAddressAPI = () => {
  return utils_http.http({
    method: "GET",
    url: "/member/address"
  });
};
const getMemberAddressByIdAPI = (id) => {
  return utils_http.http({
    method: "GET",
    url: `/member/address/${id}`
  });
};
const putMeberAPI = (id, data) => {
  return utils_http.http({
    method: "PUT",
    url: `/member/address/${id}`,
    data
  });
};
const DeleteMeberAPI = (id) => {
  return utils_http.http({
    method: "DELETE",
    url: `/member/address/${id}`
  });
};
exports.DeleteMeberAPI = DeleteMeberAPI;
exports.getMemberAddressAPI = getMemberAddressAPI;
exports.getMemberAddressByIdAPI = getMemberAddressByIdAPI;
exports.postMemberAddressAPI = postMemberAddressAPI;
exports.putMeberAPI = putMeberAPI;
//# sourceMappingURL=address.js.map
