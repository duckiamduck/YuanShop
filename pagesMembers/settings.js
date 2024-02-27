"use strict";
const common_vendor = require("../common/vendor.js");
require("../stores/index.js");
const stores_modules_member = require("../stores/modules/member.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "settings",
  setup(__props) {
    const memberStore = stores_modules_member.useMemberStore();
    const Onlogout = () => {
      common_vendor.index.showModal({
        content: "确认退出登陆2",
        success: (res) => {
          if (res.confirm) {
            memberStore.clearProfile();
            common_vendor.index.navigateBack();
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({}, {
        a: common_vendor.unref(memberStore).profile
      }, common_vendor.unref(memberStore).profile ? {
        b: common_vendor.o(Onlogout)
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/gitCode/heima-shop/src/pagesMembers/settings.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=settings.js.map
