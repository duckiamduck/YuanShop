"use strict";
const utils_http = require("../utils/http.js");
const postLoginSmipleAPI = (phoneNumber) => {
  return utils_http.http({
    method: "POST",
    url: "/login/wxMin/simple",
    data: {
      phoneNumber
    }
  });
};
exports.postLoginSmipleAPI = postLoginSmipleAPI;
//# sourceMappingURL=login.js.map
