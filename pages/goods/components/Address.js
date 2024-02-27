"use strict";
const common_vendor = require("../../../common/vendor.js");
const services_address = require("../../../services/address.js");
require("../../../utils/http.js");
require("../../../stores/index.js");
require("../../../stores/modules/member.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "Address",
  setup(__props) {
    const addressList = common_vendor.ref();
    const getAddress = async () => {
      const rs2 = await services_address.getMemberAddressAPI();
      addressList.value = rs2.result;
    };
    getAddress();
    const changeAddress = () => {
      common_vendor.index.showToast({ icon: "success", title: "成功" });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => _ctx.$emit("close")),
        b: common_vendor.f(addressList.value, (items, k0, i0) => {
          return {
            a: common_vendor.t(items.receiver),
            b: common_vendor.t(items.contact),
            c: common_vendor.t(items.fullLocation),
            d: common_vendor.n(items.isDefault ? "icon icon-checked" : ""),
            e: items.id,
            f: common_vendor.o(changeAddress, items.id)
          };
        })
      }, {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/gitCode/heima-shop/src/pages/goods/components/Address.vue"]]);
wx.createComponent(Component);
//# sourceMappingURL=Address.js.map
