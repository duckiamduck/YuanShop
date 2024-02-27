"use strict";
const common_vendor = require("../../../common/vendor.js");
const services_contanst = require("../../../services/contanst.js");
const services_order = require("../../../services/order.js");
const services_pay = require("../../../services/pay.js");
require("../../../utils/http.js");
require("../../../stores/index.js");
require("../../../stores/modules/member.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "OrderList",
  props: {
    orderState: null
  },
  setup(__props) {
    const propos = __props;
    const { safeAreaInsets } = common_vendor.index.getSystemInfoSync();
    const queryParamas = {
      page: 1,
      pageSize: 5,
      orderState: propos.orderState
    };
    const orderList = common_vendor.ref([]);
    const getMemberOrderData = async () => {
      const rs = await services_order.getMemberOrderAPI(queryParamas);
      orderList.value = rs.result.items;
    };
    common_vendor.onMounted(() => {
      getMemberOrderData();
    });
    const onOrderPay = async (id) => {
      {
        await services_pay.getPayMockAPI({ orderId: id });
      }
      common_vendor.index.showToast({
        icon: "success",
        title: "支付成功"
      });
      const order = orderList.value.find((v) => v.id === id);
      order.orderState = services_contanst.OrderState.DaiFaHuo;
    };
    return (_ctx, _cache) => {
      var _a;
      return {
        a: common_vendor.f(orderList.value, (item, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(common_vendor.unref(services_contanst.orderStateList)[item.orderState].text),
            b: common_vendor.t(item.orderState),
            c: item.orderState >= common_vendor.unref(services_contanst.OrderState).DaiPingJia
          }, item.orderState >= common_vendor.unref(services_contanst.OrderState).DaiPingJia ? {} : {}, {
            d: common_vendor.f(item.skus, (sku, k1, i1) => {
              return {
                a: sku.image,
                b: common_vendor.t(sku.name),
                c: common_vendor.t(sku.attrsText),
                d: sku.id
              };
            }),
            e: `/pagesOrder/detail?id=${item.id}`,
            f: common_vendor.t(item.totalNum),
            g: common_vendor.t(item.payMoney)
          }, common_vendor.e({
            h: item.orderState === common_vendor.unref(services_contanst.OrderState).DaiFuKuan
          }, item.orderState === common_vendor.unref(services_contanst.OrderState).DaiFuKuan ? {
            i: common_vendor.o(($event) => onOrderPay(item.id), item.id)
          } : {}), {
            l: item.id
          });
        }),
        b: common_vendor.t("没有更多数据~"),
        c: ((_a = common_vendor.unref(safeAreaInsets)) == null ? void 0 : _a.bottom) + "px"
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/gitCode/heima-shop/src/pagesOrder/list/components/OrderList.vue"]]);
wx.createComponent(Component);
//# sourceMappingURL=OrderList.js.map
