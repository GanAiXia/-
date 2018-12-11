var app = getApp();

Page({
    data: {
        infoid: 0,
        house: {},
        refresh_need_credit: !1,
        refresh_txt: "",
        refresh_pay: 0,
        istop_need_credit: !1,
        istop_txt: "",
        istop_pay: 0,
        istop_day: 1,
        istop_can_submit: !1,
        settingdata: {},
        member: {},
        topdays: [ {
            name: "1天",
            value: 1,
            checked: "true"
        }, {
            name: "2天",
            value: 2
        }, {
            name: "5天",
            value: 5
        }, {
            name: "7天",
            value: 7
        }, {
            name: "15天",
            value: 15
        } ],
        istop_need_money: 0
    },
    radioChange: function(t) {
        var e = t.detail.value, a = this.data.settingdata.credit.istop * e;
        this.setData({
            istop_day: e,
            istop_need_money: a,
            istop_txt: "支付" + a + "元，置顶一条"
        });
    },
    gethouseinfo: function() {
        var c = this;
        app.util.request({
            url: "entry/wxapp/update",
            cachetime: "0",
            data: {
                id: c.data.infoid,
                enews: "managesechouse",
                tablename: 1
            },
            success: function(t) {
                var e = t.data.data, a = !1, o = !1, s = 0, n = 0;
                if (!e.end_total) {
                    a = !0;
                    var i = Math.round(e.member.credit2);
                    if ((r = c.data.settingdata.credit.refresh) < i) {
                        s = 1;
                        var d = "支付" + r + "元，刷新一次";
                    } else d = "余额不足，请充值";
                }
                if (!e.istop_end_total) {
                    var r, u = !(o = !0);
                    i = Math.round(e.member.credit2);
                    if ((r = c.data.istop_need_money) < i) {
                        n = 1;
                        var p = "支付" + r + "元，置顶一条";
                        u = !0;
                    } else p = "余额不足，请充值", u = !1;
                }
                c.setData({
                    house: t.data.data,
                    istop_need_credit: o,
                    refresh_need_credit: a,
                    istop_txt: p,
                    refresh_txt: d,
                    refresh_pay: s,
                    istop_pay: n,
                    istop_can_submit: u,
                    member: t.data.data.member
                });
            }
        });
    },
    manage: function(t) {
        var a = this, o = t.currentTarget.dataset;
        if (console.log(o), "settop" == o.op) {
            if (0 == o.value && 0 == a.data.istop_can_submit) return void wx.showModal({
                title: "系统提示",
                content: "余额不足"
            });
            app.util.request({
                url: "entry/wxapp/update",
                showLoading: !1,
                data: {
                    enews: "setattr",
                    tablename: "1",
                    id: o.infoid,
                    value: 1 == o.value ? 0 : 1,
                    field: "istop",
                    ispay: a.data.istop_pay,
                    topday: a.data.istop_day
                },
                success: function(t) {
                    console.log(t);
                    var e = a.data.house;
                    e.istop = 1 == o.value ? 0 : 1, a.setData({
                        house: e
                    }), a.gethouseinfo(), wx.showModal({
                        title: "系统提示",
                        content: "操作成功！"
                    });
                }
            });
        }
        "refresh" == o.op && wx.showModal({
            title: "提示",
            content: "确定刷新房源吗",
            success: function(t) {
                t.confirm ? app.util.request({
                    url: "entry/wxapp/update",
                    showLoading: !1,
                    data: {
                        enews: "refresh",
                        tablename: "1",
                        id: o.infoid,
                        ispay: a.data.refresh_pay
                    },
                    success: function(t) {
                        console.log(t);
                        var e = a.data.house;
                        e.refresh_time = t.data.data.refresh_time, e.refresh_total = t.data.data.refresh_total, 
                        e.end_total = t.data.data.end_total, a.setData({
                            house: e
                        }), a.gethouseinfo(), wx.showModal({
                            title: "系统提示",
                            content: "操作成功！"
                        });
                    }
                }) : t.cancel && wx.showModal({
                    title: "系统提示",
                    content: "操作成功！"
                });
            }
        });
    },
    onLoad: function(t) {
        t.id || wx.navigateTo({
            url: "../index/user"
        }), this.setData({
            infoid: parseInt(t.id)
        }), this.gethouseinfo();
        var a = this;
        wx.getStorage({
            key: "shop",
            success: function(t) {
                if (app.kbtools.isnull(t.data.settingdata)) wx.navigateBack(); else {
                    var e = t.data.settingdata;
                    a.setData({
                        settingdata: e,
                        istop_need_money: e.credit.istop
                    });
                }
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});