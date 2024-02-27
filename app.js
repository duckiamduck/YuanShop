"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const stores_index = require("./stores/index.js");
require("./stores/modules/member.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/my/my.js";
  "./pages/cart/cart.js";
  "./pages/cart/cart2.js";
  "./pages/category/category.js";
  "./pages/login/login.js";
  "./pages/hot/hot.js";
  "./pages/goods/goods.js";
  "./pagesMembers/settings.js";
  "./pagesMembers/profile.js";
  "./pagesMembers/address.js";
  "./pagesMembers/address-form.js";
  "./pagesOrder/create.js";
  "./pagesOrder/detail.js";
  "./pagesOrder/payment.js";
  "./pagesOrder/list/list.js";
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "App",
  setup(__props) {
    common_vendor.onLaunch(() => {
    });
    common_vendor.onShow(() => {
    });
    common_vendor.onHide(() => {
    });
    return () => {
    };
  }
});
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/gitCode/heima-shop/src/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(stores_index.pinia);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=app.js.map
