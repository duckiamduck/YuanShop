"use strict";
const common_vendor = require("../common/vendor.js");
const services_address = require("../services/address.js");
const stores_modules_address = require("../stores/modules/address.js");
require("../utils/http.js");
require("../stores/index.js");
require("../stores/modules/member.js");
if (!Array) {
  const _easycom_uni_swipe_action_item2 = common_vendor.resolveComponent("uni-swipe-action-item");
  const _easycom_uni_swipe_action2 = common_vendor.resolveComponent("uni-swipe-action");
  (_easycom_uni_swipe_action_item2 + _easycom_uni_swipe_action2)();
}
const _easycom_uni_swipe_action_item = () => "../node-modules/@dcloudio/uni-ui/lib/uni-swipe-action-item/uni-swipe-action-item.js";
const _easycom_uni_swipe_action = () => "../node-modules/@dcloudio/uni-ui/lib/uni-swipe-action/uni-swipe-action.js";
if (!Math) {
  (_easycom_uni_swipe_action_item + _easycom_uni_swipe_action)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "address",
  setup(__props) {
    const addressList = common_vendor.ref([]);
    const getMemberAddressData = async () => {
      const rs = await services_address.getMemberAddressAPI();
      addressList.value = rs.result;
    };
    const onDeleteAddress = (id) => {
      common_vendor.index.showModal({
        content: "删除地址?",
        success: async (res) => {
          if (res.confirm) {
            await services_address.DeleteMeberAPI(id);
            services_address.getMemberAddressAPI();
          }
        }
      });
    };
    const onChangeStore = (item) => {
      const AddressStore = stores_modules_address.useAddressStore();
      AddressStore.changeSelectAddress(item);
      common_vendor.index.navigateBack();
    };
    common_vendor.onShow(() => {
      getMemberAddressData();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: addressList.value.length
      }, addressList.value.length ? {
        b: common_vendor.f(addressList.value, (item, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.receiver),
            b: common_vendor.t(item.contact),
            c: item.isDefault === 1
          }, item.isDefault === 1 ? {} : {}, {
            d: common_vendor.t(item.fullLocation),
            e: `/pagesMembers/address-form?id=${item.id}`,
            f: common_vendor.o(() => {
            }, item.id),
            g: common_vendor.o(($event) => onChangeStore(item), item.id),
            h: common_vendor.o(($event) => onDeleteAddress(item.id), item.id),
            i: item.id,
            j: "22ddbf93-1-" + i0 + ",22ddbf93-0"
          });
        })
      } : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/gitCode/heima-shop/src/pagesMembers/address.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=address.js.map
