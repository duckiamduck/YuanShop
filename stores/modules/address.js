"use strict";
const common_vendor = require("../../common/vendor.js");
const useAddressStore = common_vendor.defineStore("address", () => {
  const SelectedAddress = common_vendor.ref();
  const changeSelectAddress = (val) => {
    SelectedAddress.value = val;
  };
  const address = null;
  return { SelectedAddress, changeSelectAddress, address };
});
exports.useAddressStore = useAddressStore;
//# sourceMappingURL=address.js.map
