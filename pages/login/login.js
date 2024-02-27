"use strict";
const common_vendor = require("../../common/vendor.js");
const services_login = require("../../services/login.js");
require("../../stores/index.js");
const stores_modules_member = require("../../stores/modules/member.js");
require("../../utils/http.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "login",
  setup(__props) {
    common_vendor.onLoad(async () => {
      const res = await common_vendor.wx$1.login();
      res.code;
    });
    const OnPostLoginSmipleAPI = async () => {
      const rs = await services_login.postLoginSmipleAPI("13123456798");
      loginSuccess(rs.result);
    };
    const loginSuccess = (Logrs) => {
      let meberstore = stores_modules_member.useMemberStore();
      meberstore.setProfile(Logrs);
      common_vendor.index.showToast({ icon: "success", title: "成功" });
      setTimeout(() => {
        common_vendor.index.switchTab({ url: "/pages/my/my" });
      }, 500);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(OnPostLoginSmipleAPI)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/gitCode/heima-shop/src/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=login.js.map
