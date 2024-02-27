"use strict";
const utils_http = require("../utils/http.js");
const getMemberProfileAPI = () => {
  return utils_http.http({
    method: "GET",
    url: "/member/profile"
  });
};
const PutMeberProfile = (data) => {
  return utils_http.http({
    method: "PUT",
    url: "/member/profile",
    data
  });
};
exports.PutMeberProfile = PutMeberProfile;
exports.getMemberProfileAPI = getMemberProfileAPI;
//# sourceMappingURL=profile.js.map
