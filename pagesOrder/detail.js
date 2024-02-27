"use strict";
const common_vendor = require("../common/vendor.js");
const composables_index = require("../composables/index.js");
const services_contanst = require("../services/contanst.js");
const services_order = require("../services/order.js");
const services_pay = require("../services/pay.js");
require("../utils/http.js");
require("../stores/index.js");
require("../stores/modules/member.js");
if (!Array) {
  const _easycom_uni_countdown2 = common_vendor.resolveComponent("uni-countdown");
  const _easycom_XtxGuess2 = common_vendor.resolveComponent("XtxGuess");
  const _component_PageSkeleton = common_vendor.resolveComponent("PageSkeleton");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_countdown2 + _easycom_XtxGuess2 + _component_PageSkeleton + _easycom_uni_popup2)();
}
const _easycom_uni_countdown = () => "../node-modules/@dcloudio/uni-ui/lib/uni-countdown/uni-countdown.js";
const _easycom_XtxGuess = () => "../components/XtxGuess.js";
const _easycom_uni_popup = () => "../node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_countdown + _easycom_XtxGuess + _easycom_uni_popup)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "detail",
  props: {
    id: null
  },
  setup(__props) {
    const query = __props;
    const { safeAreaInsets } = common_vendor.index.getSystemInfoSync();
    const { guessRef, onScrolltoLower } = composables_index.useGuessList();
    const popup = common_vendor.ref();
    const reasonList = common_vendor.ref([
      "商品无货",
      "不想要了",
      "商品信息填错了",
      "地址信息填写错误",
      "商品降价",
      "其它"
    ]);
    const reason = common_vendor.ref("");
    const onCopy = (id) => {
      common_vendor.index.setClipboardData({ data: id });
    };
    const order = common_vendor.ref();
    const wuliu = common_vendor.ref();
    const GetMeMberOrderByIdData = async () => {
      const rs = await services_order.getMemberOrderByIdAPI(query.id);
      order.value = rs.result;
      if ([services_contanst.OrderState.DaiPingJia, services_contanst.OrderState.DaiShouHuo, services_contanst.OrderState.YiWanCheng].includes(
        order.value.orderState
      )) {
        const rs2 = await services_order.getMemberOrderLogisticsByIdAPI(query.id);
        wuliu.value = rs2.result;
      }
    };
    common_vendor.onLoad(() => {
      GetMeMberOrderByIdData();
    });
    const pages = getCurrentPages();
    const pageInstance = pages.at(-1);
    common_vendor.onReady(() => {
      pageInstance.animate(
        ".navbar",
        [{ background: "transparent" }, { backgroundColor: "#f8f8f8" }],
        1e3,
        {
          scrollSource: "#scroller",
          timeRange: 1e3,
          startScrollOffset: 120,
          endScrollOffset: 252
        }
      );
    });
    const onTimeUP = () => {
      order.value.orderState = services_contanst.OrderState.YiQuXiao;
    };
    const onOrderPay = async () => {
      {
        await services_pay.getPayMockAPI({ orderId: query.id });
      }
      common_vendor.index.redirectTo({ url: `/pagesOrder/payment?id=${query.id}` });
    };
    const isDev = true;
    const OnOrderSend = async () => {
      {
        await services_order.getMemberOrderConsignmentByIdAPI(query.id);
        order.value.orderState = services_contanst.OrderState.DaiShouHuo;
        common_vendor.index.showToast({ icon: "success", title: "发货成功" });
      }
    };
    const OnOrderConfirm = () => {
      common_vendor.index.showModal({
        content: "您确认要收货吗?",
        success: async (success) => {
          if (success.confirm) {
            const rs = await services_order.putMemberOrderReceiptByIdAPI(query.id);
            order.value = rs.result;
          }
        }
      });
    };
    const orderDelete = () => {
      common_vendor.index.showModal({
        content: "确认要删除订单吗?",
        success: async (success) => {
          if (success.confirm) {
            await services_order.deleteMemberOrderAPI({ ids: [query.id] });
            common_vendor.index.redirectTo({ url: "/pagesOrder/list/list" });
          }
        }
      });
    };
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f;
      return common_vendor.e({
        a: common_vendor.unref(pages).length > 1
      }, common_vendor.unref(pages).length > 1 ? {} : {}, {
        b: ((_a = common_vendor.unref(safeAreaInsets)) == null ? void 0 : _a.top) + "px",
        c: order.value
      }, order.value ? common_vendor.e({
        d: ((_b = order.value) == null ? void 0 : _b.orderState) === common_vendor.unref(services_contanst.OrderState).DaiFuKuan
      }, ((_c = order.value) == null ? void 0 : _c.orderState) === common_vendor.unref(services_contanst.OrderState).DaiFuKuan ? {
        e: common_vendor.t(order.value.payMoney),
        f: common_vendor.o(onTimeUP),
        g: common_vendor.p({
          second: order.value.countdown,
          color: "#fff",
          ["splitor-color"]: "#fff"
        }),
        h: common_vendor.o(onOrderPay)
      } : common_vendor.e({
        i: common_vendor.t(common_vendor.unref(services_contanst.orderStateList)[order.value.orderState].text),
        j: `/pagesOrder/create?orderId=${query.id}`,
        k: common_vendor.unref(isDev) && order.value.orderState == common_vendor.unref(services_contanst.OrderState).DaiFaHuo
      }, common_vendor.unref(isDev) && order.value.orderState == common_vendor.unref(services_contanst.OrderState).DaiFaHuo ? {
        l: common_vendor.o(OnOrderSend)
      } : {}, {
        m: order.value.orderState === common_vendor.unref(services_contanst.OrderState).DaiShouHuo
      }, order.value.orderState === common_vendor.unref(services_contanst.OrderState).DaiShouHuo ? {
        n: common_vendor.o(OnOrderConfirm)
      } : {}), {
        o: common_vendor.unref(safeAreaInsets).top + 20 + "px",
        p: common_vendor.f((_d = wuliu.value) == null ? void 0 : _d.list, (item, index, i0) => {
          return {
            a: common_vendor.t(item.text),
            b: common_vendor.t(item.time),
            c: item.id
          };
        }),
        q: common_vendor.t(order.value.receiverContact),
        r: common_vendor.t(order.value.receiverAddress),
        s: common_vendor.f(order.value.skus, (item, k0, i0) => {
          return {
            a: item.image,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.attrsText),
            d: common_vendor.t(item.curPrice),
            e: common_vendor.t(item.quantity),
            f: item.id,
            g: `/pages/goods/goods?id=${item.spuId}`
          };
        }),
        t: order.value.orderState === common_vendor.unref(services_contanst.OrderState).DaiPingJia
      }, order.value.orderState === common_vendor.unref(services_contanst.OrderState).DaiPingJia ? {} : {}, {
        v: common_vendor.t(order.value.totalMoney),
        w: common_vendor.t(order.value.postFee),
        x: common_vendor.t(order.value.payMoney),
        y: common_vendor.t(query.id),
        z: common_vendor.o(($event) => onCopy(query.id)),
        A: common_vendor.t(order.value.createTime),
        B: common_vendor.sr(guessRef, "3e956ded-1", {
          "k": "guessRef"
        }),
        C: ((_e = common_vendor.unref(safeAreaInsets)) == null ? void 0 : _e.bottom) + "px",
        D: order.value.orderState === common_vendor.unref(services_contanst.OrderState).DaiFuKuan
      }, order.value.orderState === common_vendor.unref(services_contanst.OrderState).DaiFuKuan ? {
        E: common_vendor.o(onOrderPay),
        F: common_vendor.o(($event) => {
          var _a2, _b2;
          return (_b2 = (_a2 = popup.value) == null ? void 0 : _a2.open) == null ? void 0 : _b2.call(_a2);
        })
      } : common_vendor.e({
        G: `/pagesOrder/create/create?orderId=${query.id}`,
        H: order.value.orderState === common_vendor.unref(services_contanst.OrderState).DaiShouHuo
      }, order.value.orderState === common_vendor.unref(services_contanst.OrderState).DaiShouHuo ? {} : {}, {
        I: order.value.orderState === common_vendor.unref(services_contanst.OrderState).DaiPingJia
      }, order.value.orderState === common_vendor.unref(services_contanst.OrderState).DaiPingJia ? {} : {}, {
        J: order.value.orderState >= common_vendor.unref(services_contanst.OrderState).DaiPingJia
      }, order.value.orderState >= common_vendor.unref(services_contanst.OrderState).DaiPingJia ? {
        K: common_vendor.o(orderDelete)
      } : {}), {
        L: ((_f = common_vendor.unref(safeAreaInsets)) == null ? void 0 : _f.bottom) + "px"
      }) : {}, {
        M: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(onScrolltoLower) && common_vendor.unref(onScrolltoLower)(...args)
        ),
        N: common_vendor.f(reasonList.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item),
            b: item === reason.value ? 1 : "",
            c: item,
            d: common_vendor.o(($event) => reason.value = item, item)
          };
        }),
        O: common_vendor.o(($event) => {
          var _a2, _b2;
          return (_b2 = (_a2 = popup.value) == null ? void 0 : _a2.close) == null ? void 0 : _b2.call(_a2);
        }),
        P: common_vendor.sr(popup, "3e956ded-3", {
          "k": "popup"
        }),
        Q: common_vendor.p({
          type: "bottom",
          ["background-color"]: "#fff"
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "G:/gitCode/heima-shop/src/pagesOrder/detail.vue"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=detail.js.map
