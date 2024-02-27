"use strict";
const common_vendor = require("../../common/vendor.js");
const services_goods = require("../../services/goods.js");
const services_cart = require("../../services/cart.js");
const services_address = require("../../services/address.js");
const stores_modules_address = require("../../stores/modules/address.js");
require("../../utils/http.js");
require("../../stores/index.js");
require("../../stores/modules/member.js");
if (!Array) {
  const _easycom_vk_data_goods_sku_popup2 = common_vendor.resolveComponent("vk-data-goods-sku-popup");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_vk_data_goods_sku_popup2 + _easycom_uni_popup2)();
}
const _easycom_vk_data_goods_sku_popup = () => "../../components/vk-data-goods-sku-popup/vk-data-goods-sku-popup.js";
const _easycom_uni_popup = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_vk_data_goods_sku_popup + Address + ServisePanel + _easycom_uni_popup)();
}
const Address = () => "./components/Address.js";
const ServisePanel = () => "./components/servicePanel.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "goods",
  props: {
    id: null
  },
  setup(__props) {
    const query = __props;
    const { safeAreaInsets } = common_vendor.index.getSystemInfoSync();
    const GoodsList = common_vendor.ref();
    const getGoodsByidAPi = async () => {
      const rs = await services_goods.getGoodsByIdAPI(query.id);
      GoodsList.value = rs.result;
      localdata.value = {
        _id: rs.result.id,
        name: rs.result.name,
        goods_thumb: rs.result.mainPictures[0],
        spec_list: rs.result.specs.map((v) => {
          return {
            name: v.name,
            list: v.values
          };
        }),
        sku_list: rs.result.skus.map((v) => {
          return {
            _id: v.id,
            goods_id: rs.result.id,
            goods_name: rs.result.name,
            image: v.picture,
            price: v.price,
            stock: v.inventory,
            sku_name_arr: v.specs.map((vv) => vv.valueName)
          };
        })
      };
    };
    common_vendor.onLoad(() => {
      getGoodsByidAPi();
      GetAddress();
    });
    const curIndex = common_vendor.ref(0);
    const onChange = (ev) => {
      var _a;
      curIndex.value = (_a = ev.detail) == null ? void 0 : _a.current;
    };
    const onTapImage = (url) => {
      common_vendor.index.previewImage({
        current: url,
        urls: GoodsList.value.mainPictures
      });
    };
    const popup = common_vendor.ref();
    const popName = common_vendor.ref();
    const openPop = (name) => {
      var _a;
      popName.value = name;
      (_a = popup.value) == null ? void 0 : _a.open();
    };
    const isShowSku = common_vendor.ref(false);
    const localdata = common_vendor.ref({});
    const mode = common_vendor.ref(
      1
      /* Both */
    );
    const openSkuPoup = (val) => {
      isShowSku.value = true;
      mode.value = val;
    };
    const skuPopRef = common_vendor.ref();
    const selectArrText = common_vendor.computed(() => {
      var _a, _b;
      return ((_b = (_a = skuPopRef.value) == null ? void 0 : _a.selectArr) == null ? void 0 : _b.join(" ").trim()) || "请选择商品规格";
    });
    const onAddcart = async (ev) => {
      await services_cart.PostMeberCartAPi({ skuId: ev._id, count: ev.buy_num });
      try {
        common_vendor.index.showToast({ icon: "success", title: "成功" });
      } catch (error) {
        common_vendor.index.showToast({ icon: "fail", title: "失败" });
      }
    };
    const onByNow = (ev) => {
      common_vendor.index.navigateTo({ url: `/pagesOrder/create?skuId=${ev._id}&count=${ev.buy_num}` });
      isShowSku.value = false;
    };
    const store = stores_modules_address.useAddressStore();
    const address = common_vendor.ref([]);
    const addressIsDefault = common_vendor.ref();
    const GetAddress = async () => {
      const rs2 = await services_address.getMemberAddressAPI();
      address.value = rs2.result;
      const rs = address.value.find((item) => item.isDefault === 1);
      addressIsDefault.value = rs == null ? void 0 : rs.fullLocation;
    };
    store.address = addressIsDefault;
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i;
      return common_vendor.e({
        a: common_vendor.sr(skuPopRef, "7e0a952e-0", {
          "k": "skuPopRef"
        }),
        b: common_vendor.o(onAddcart),
        c: common_vendor.o(onByNow),
        d: common_vendor.o(($event) => isShowSku.value = $event),
        e: common_vendor.p({
          localdata: localdata.value,
          mode: mode.value,
          ["add-cart-background-color"]: "orange",
          ["buy-now-background-color"]: "green",
          modelValue: isShowSku.value
        }),
        f: common_vendor.f((_a = GoodsList.value) == null ? void 0 : _a.mainPictures, (item, index, i0) => {
          return {
            a: common_vendor.o(($event) => onTapImage(item), item),
            b: item,
            c: item
          };
        }),
        g: common_vendor.o(onChange),
        h: common_vendor.t(curIndex.value + 1),
        i: common_vendor.t((_b = GoodsList.value) == null ? void 0 : _b.mainPictures.length),
        j: common_vendor.t((_c = GoodsList.value) == null ? void 0 : _c.price),
        k: common_vendor.t((_d = GoodsList.value) == null ? void 0 : _d.name),
        l: common_vendor.t((_e = GoodsList.value) == null ? void 0 : _e.desc),
        m: common_vendor.t(common_vendor.unref(selectArrText)),
        n: common_vendor.o(($event) => openSkuPoup(
          1
          /* Both */
        )),
        o: common_vendor.t(common_vendor.unref(store).address),
        p: common_vendor.o(($event) => openPop("address")),
        q: common_vendor.o(($event) => openPop("service")),
        r: common_vendor.f((_f = GoodsList.value) == null ? void 0 : _f.details.properties, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.value),
            c: item.name
          };
        }),
        s: common_vendor.f((_g = GoodsList.value) == null ? void 0 : _g.details.pictures, (item, k0, i0) => {
          return {
            a: item,
            b: item
          };
        }),
        t: common_vendor.f((_h = GoodsList.value) == null ? void 0 : _h.similarProducts, (item, k0, i0) => {
          return {
            a: item.picture,
            b: common_vendor.t(item.desc),
            c: common_vendor.t(item.price),
            d: item.id,
            e: `/pages/goods/goods?id=${item.id}`
          };
        }),
        v: common_vendor.o(($event) => openSkuPoup(
          2
          /* Cart */
        )),
        w: common_vendor.o(($event) => openSkuPoup(
          3
          /* Buy */
        )),
        x: ((_i = common_vendor.unref(safeAreaInsets)) == null ? void 0 : _i.bottom) + "px",
        y: popName.value === "address"
      }, popName.value === "address" ? {
        z: common_vendor.o(($event) => {
          var _a2;
          return (_a2 = popup.value) == null ? void 0 : _a2.close();
        })
      } : {}, {
        A: popName.value === "service"
      }, popName.value === "service" ? {
        B: common_vendor.o(($event) => {
          var _a2;
          return (_a2 = popup.value) == null ? void 0 : _a2.close();
        })
      } : {}, {
        C: common_vendor.sr(popup, "7e0a952e-1", {
          "k": "popup"
        }),
        D: common_vendor.p({
          type: "bottom"
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/gitCode/heima-shop/src/pages/goods/goods.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=goods.js.map
