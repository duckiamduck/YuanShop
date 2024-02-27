"use strict";
const common_vendor = require("../common/vendor.js");
const services_order = require("../services/order.js");
const stores_modules_address = require("../stores/modules/address.js");
require("../utils/http.js");
require("../stores/index.js");
require("../stores/modules/member.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "create",
  props: {
    skuId: null,
    count: null
  },
  setup(__props) {
    const query = __props;
    const { safeAreaInsets } = common_vendor.index.getSystemInfoSync();
    const buyerMessage = common_vendor.ref("");
    const deliveryList = common_vendor.ref([
      { type: 1, text: "时间不限 (周一至周日)" },
      { type: 2, text: "工作日送 (周一至周五)" },
      { type: 3, text: "周末配送 (周六至周日)" }
    ]);
    const activeIndex = common_vendor.ref(0);
    const activeDelivery = common_vendor.computed(() => deliveryList.value[activeIndex.value]);
    const onChangeDelivery = (ev) => {
      activeIndex.value = ev.detail.value;
    };
    const orderPre = common_vendor.ref();
    const GetMemberPreOrderData = async () => {
      if (query.skuId && query.count) {
        const rs = await services_order.memberOrderPreNowAPI({ skuId: query.skuId, count: query.count });
        orderPre.value = rs.result;
      } else {
        const rs = await services_order.memberOrderPreAPI();
        orderPre.value = rs.result;
      }
    };
    common_vendor.onLoad(() => {
      GetMemberPreOrderData();
    });
    const AddressStore = stores_modules_address.useAddressStore();
    const selectAddress = common_vendor.computed(() => {
      var _a;
      return AddressStore.SelectedAddress || ((_a = orderPre.value) == null ? void 0 : _a.userAddresses.find((v) => v.isDefault));
    });
    const onOrderSubmit = async () => {
      var _a;
      if (!((_a = selectAddress.value) == null ? void 0 : _a.id)) {
        common_vendor.index.showToast({ icon: "none", title: "请选择收货地址" });
      }
      const rs = await services_order.PostMemberOrderAPI({
        addressId: selectAddress.value.id,
        buyerMessage: buyerMessage.value,
        deliveryTimeType: activeDelivery.value.type,
        goods: orderPre.value.goods.map((v) => ({ count: v.count, skuId: v.skuId })),
        payChannel: 2,
        payType: 1
      });
      common_vendor.index.redirectTo({ url: `/pagesOrder/detail?id=${rs.result.id}` });
    };
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
      return common_vendor.e({
        a: common_vendor.unref(selectAddress)
      }, common_vendor.unref(selectAddress) ? {
        b: common_vendor.t((_a = common_vendor.unref(selectAddress)) == null ? void 0 : _a.receiver),
        c: common_vendor.t((_b = common_vendor.unref(selectAddress)) == null ? void 0 : _b.contact),
        d: common_vendor.t((_c = common_vendor.unref(selectAddress)) == null ? void 0 : _c.fullLocation),
        e: common_vendor.t((_d = common_vendor.unref(selectAddress)) == null ? void 0 : _d.address)
      } : {}, {
        f: common_vendor.f((_e = orderPre.value) == null ? void 0 : _e.goods, (item, k0, i0) => {
          return {
            a: item.picture,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.attrsText),
            d: common_vendor.t(item.payPrice),
            e: common_vendor.t(item.price),
            f: common_vendor.t(item.count),
            g: item.skuId,
            h: `/pages/goods/goods?id=${item.id}`
          };
        }),
        g: common_vendor.t(common_vendor.unref(activeDelivery).text),
        h: deliveryList.value,
        i: common_vendor.o(onChangeDelivery),
        j: buyerMessage.value,
        k: common_vendor.o(($event) => buyerMessage.value = $event.detail.value),
        l: common_vendor.t((_f = orderPre.value) == null ? void 0 : _f.summary.totalPayPrice.toFixed(2)),
        m: common_vendor.t((_g = orderPre.value) == null ? void 0 : _g.summary.postFee),
        n: common_vendor.t((_h = orderPre.value) == null ? void 0 : _h.summary.totalPrice),
        o: ((_i = common_vendor.unref(selectAddress)) == null ? void 0 : _i.id) ? 1 : "",
        p: common_vendor.o(onOrderSubmit),
        q: ((_j = common_vendor.unref(safeAreaInsets)) == null ? void 0 : _j.bottom) + "px"
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/gitCode/heima-shop/src/pagesOrder/create.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=create.js.map
