"use strict";
const utils_http = require("../utils/http.js");
const getCategoryAPI = () => {
  return utils_http.http({
    method: "GET",
    url: "/category/top"
  });
};
exports.getCategoryAPI = getCategoryAPI;
//# sourceMappingURL=category.js.map
