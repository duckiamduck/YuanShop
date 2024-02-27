"use strict";
const common_vendor = require("../../common/vendor.js");
const services_home = require("../../services/home.js");
const composables_index = require("../../composables/index.js");
require("../../utils/http.js");
require("../../stores/index.js");
require("../../stores/modules/member.js");
if (!Array) {
  const _easycom_XtxSwiper2 = common_vendor.resolveComponent("XtxSwiper");
  _easycom_XtxSwiper2();
}
const _easycom_XtxSwiper = () => "../../components/XtxSwiper.js";
if (!Math) {
  (CustomNavbar + pageSklet + _easycom_XtxSwiper + CategoryPanel + HotPanel + XtxGuess)();
}
const CustomNavbar = () => "./components/index.js";
const CategoryPanel = () => "./components/CategoryPanel.js";
const HotPanel = () => "./components/HotPanel.js";
const XtxGuess = () => "../../components/XtxGuess.js";
const pageSklet = () => "./components/pageSkeleton.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const bannerList = common_vendor.ref([]);
    const getHomeBannerData = async () => {
      const res = await services_home.getHomeBannerAPI();
      bannerList.value = res.result;
    };
    const categoryList = common_vendor.ref([]);
    const getHomeCategoryData = async () => {
      const res1 = await services_home.getHomeCategoryAPI();
      categoryList.value = res1.result;
    };
    const hotList = common_vendor.ref([]);
    const getHotPanel = async () => {
      const res = await services_home.getHomeHotAPI();
      hotList.value = res.result;
    };
    const isLoading = common_vendor.ref(false);
    common_vendor.onLoad(async () => {
      isLoading.value = true;
      await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHotPanel()]);
      isLoading.value = false;
    });
    const { guessRef, onScrolltoLower } = composables_index.useGuessList();
    const isTriggered = common_vendor.ref(false);
    const onRefresher = async () => {
      var _a, _b;
      isTriggered.value = true;
      (_a = guessRef.value) == null ? void 0 : _a.resetData();
      await Promise.all([
        getHomeBannerData(),
        getHomeCategoryData(),
        getHotPanel(),
        (_b = guessRef.value) == null ? void 0 : _b.getMore()
      ]);
      isTriggered.value = false;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isLoading.value
      }, isLoading.value ? {} : {
        b: common_vendor.p({
          list: bannerList.value
        }),
        c: common_vendor.p({
          list: categoryList.value
        }),
        d: common_vendor.p({
          list: hotList.value
        }),
        e: common_vendor.sr(guessRef, "7fcbe13e-5", {
          "k": "guessRef"
        })
      }, {
        f: common_vendor.o(onRefresher),
        g: isTriggered.value,
        h: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(onScrolltoLower) && common_vendor.unref(onScrolltoLower)(...args)
        )
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/gitCode/heima-shop/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=index.js.map
