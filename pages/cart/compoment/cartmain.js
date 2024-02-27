"use strict";
const common_vendor = require("../../../common/vendor.js");
const composables_index = require("../../../composables/index.js");
const services_cart = require("../../../services/cart.js");
require("../../../stores/index.js");
const stores_modules_member = require("../../../stores/modules/member.js");
require("../../../utils/http.js");
if (!Array) {
  const _easycom_vk_data_input_number_box2 = common_vendor.resolveComponent("vk-data-input-number-box");
  const _easycom_uni_swipe_action_item2 = common_vendor.resolveComponent("uni-swipe-action-item");
  const _easycom_uni_swipe_action2 = common_vendor.resolveComponent("uni-swipe-action");
  const _easycom_XtxGuess2 = common_vendor.resolveComponent("XtxGuess");
  (_easycom_vk_data_input_number_box2 + _easycom_uni_swipe_action_item2 + _easycom_uni_swipe_action2 + _easycom_XtxGuess2)();
}
const _easycom_vk_data_input_number_box = () => "../../../components/vk-data-input-number-box/vk-data-input-number-box.js";
const _easycom_uni_swipe_action_item = () => "../../../node-modules/@dcloudio/uni-ui/lib/uni-swipe-action-item/uni-swipe-action-item.js";
const _easycom_uni_swipe_action = () => "../../../node-modules/@dcloudio/uni-ui/lib/uni-swipe-action/uni-swipe-action.js";
const _easycom_XtxGuess = () => "../../../components/XtxGuess.js";
if (!Math) {
  (_easycom_vk_data_input_number_box + _easycom_uni_swipe_action_item + _easycom_uni_swipe_action + _easycom_XtxGuess)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "cartmain",
  setup(__props) {
    const memberStore = stores_modules_member.useMemberStore();
    common_vendor.onShow(() => {
      if (memberStore.profile) {
        getCartData();
      }
    });
    const cartList = common_vendor.ref([]);
    const getCartData = async () => {
      const rs = await services_cart.GetMeberCartAPi();
      cartList.value = rs.result;
    };
    const onClickDelete = (skuId) => {
      common_vendor.index.showModal({
        content: "是否删除",
        success: async (res) => {
          if (res.confirm) {
            await services_cart.DeleteMeberCartAPi({ ids: [skuId] });
            getCartData();
          }
        }
      });
    };
    const onChangeCount = (ev) => {
      services_cart.putMemberCartBySkuIdAPI(ev.index, { count: ev.value });
    };
    const OnChangeSelect = (item) => {
      item.selected = !item.selected;
      services_cart.putMemberCartBySkuIdAPI(item.skuId, { selected: item.selected });
    };
    const ComputeSelectedAll = common_vendor.computed(() => {
      return cartList.value.length && cartList.value.every((v) => v.selected);
    });
    const OnChangeSelectAll = () => {
      const _ComputeSelectedAll = !ComputeSelectedAll.value;
      cartList.value.forEach((item) => {
        item.selected = _ComputeSelectedAll;
      });
      services_cart.putMeberSelectAll({ selected: _ComputeSelectedAll });
    };
    const selectedCartList = common_vendor.computed(() => {
      return cartList.value.filter((v) => v.selected);
    });
    const selectedAllCount = common_vendor.computed(() => {
      return selectedCartList.value.reduce((sum, item) => sum + item.count, 0);
    });
    const selcetAllCartPrice = common_vendor.computed(() => {
      return selectedCartList.value.reduce((sum, item) => sum + item.count * item.nowPrice, 0).toFixed(2);
    });
    const goPay = () => {
      if (selectedAllCount.value === 0) {
        common_vendor.index.showToast({
          icon: "none",
          title: "请选中商品"
        });
      }
      common_vendor.index.navigateTo({ url: "/pagesOrder/create" });
    };
    const { guessRef, onScrolltoLower } = composables_index.useGuessList();
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(memberStore).profile
      }, common_vendor.unref(memberStore).profile ? common_vendor.e({
        b: cartList.value.length
      }, cartList.value.length ? {
        c: common_vendor.f(cartList.value, (item, k0, i0) => {
          return {
            a: common_vendor.o(($event) => OnChangeSelect(item), item.skuId),
            b: item.selected ? 1 : "",
            c: item.picture,
            d: common_vendor.t(item.name),
            e: common_vendor.t(item.attrsText),
            f: common_vendor.t(item.nowPrice),
            g: `/pages/goods/goods?id=${item.id}`,
            h: common_vendor.o(onChangeCount, item.skuId),
            i: "3fc2bc85-2-" + i0 + "," + ("3fc2bc85-1-" + i0),
            j: common_vendor.o(($event) => item.count = $event, item.skuId),
            k: common_vendor.p({
              min: 1,
              max: item.stock,
              index: item.skuId,
              modelValue: item.count
            }),
            l: common_vendor.o(($event) => onClickDelete(item.skuId), item.skuId),
            m: item.skuId,
            n: "3fc2bc85-1-" + i0 + ",3fc2bc85-0"
          };
        })
      } : {}, {
        d: common_vendor.o(OnChangeSelectAll),
        e: common_vendor.unref(ComputeSelectedAll) ? 1 : "",
        f: common_vendor.t(common_vendor.unref(selcetAllCartPrice)),
        g: common_vendor.t(common_vendor.unref(selectedAllCount)),
        h: common_vendor.o(goPay),
        i: common_vendor.unref(selectedAllCount) === 0 ? 1 : ""
      }) : {}, {
        j: common_vendor.sr(guessRef, "3fc2bc85-3", {
          "k": "guessRef"
        }),
        k: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(onScrolltoLower) && common_vendor.unref(onScrolltoLower)(...args)
        )
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/gitCode/heima-shop/src/pages/cart/compoment/cartmain.vue"]]);
wx.createComponent(Component);
//# sourceMappingURL=cartmain.js.map
