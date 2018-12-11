Page({
    data: {
        soufu_bill: [ "二成", "三成", "四成", "五成" ],
        bill_value: [ "0.2", "0.3", "0.4", "0.5" ],
        bill_index: 1,
        paymethod: 1,
        gjj_lilv_base: .0325,
        gjj_lilv: [ "基准利率", "基准利率上浮10%", "基准利率上浮15%", "基准利率上浮20%" ],
        gjj_lilv_value: [ "1", "1.1", "1.15", "1.2" ],
        gjj_lilv_index: 0,
        sy_lilv_base: .049,
        sy_lilv: [ "基准利率", "基准利率上浮10%", "基准利率上浮15%", "基准利率上浮20%" ],
        sy_lilv_value: [ "1", "1.1", "1.15", "1.2" ],
        sy_lilv_index: 0,
        fee_total: 0,
        fee_daikuan_total: "",
        fee_gjj_total: "",
        years: [],
        years_index: 15,
        benjin: {},
        benxi: {},
        tabactive: [ "active", "normal" ]
    },
    currmethod: function(a) {
        var t = a.currentTarget.dataset.index;
        this.setData({
            paymethod: t
        }), this.setData({
            benjin: {},
            benxi: {},
            fee_gjj_lilv: 0
        });
    },
    navtab: function(a) {
        for (var t = a.currentTarget.dataset.index, e = this.data.tabactive, n = 0; n < 2; n++) e[n] = "normal";
        e[t] = "active", this.setData({
            tabactive: e
        });
    },
    formSubmit: function(a) {
        var t = this, e = a.detail.value, n = t.data.bill_index, l = (t.data.bill_value[n], 
        t.data.years_index), o = 12 * (parseInt(l) + 5);
        if (3 == t.data.paymethod) {
            var i = 1e4 * e.sy_total, r = 1e4 * e.gjj_total;
            if (!i || !r) return wx.showToast({
                title: "请输入商业和公积金贷款总额",
                icon: "none"
            }), !1;
            var d = i + r, _ = t.getlilv(1), u = t.getlilv(2);
        } else {
            if (1 == t.data.paymethod) d = 1e4 * e.sy_total;
            if (2 == t.data.paymethod) d = 1e4 * e.gjj_total;
            if (!d) return wx.showToast({
                title: "请输入贷款总额",
                icon: "none"
            }), !1;
            var s = t.getlilv(t.data.paymethod);
            console.log("利率" + s);
        }
        for (var v = 0, h = [], c = {}, f = 0, y = 0; y < o; y++) {
            v += f = 3 == t.data.paymethod ? t.getMonthMoney2(_, i, o, y) + t.getMonthMoney2(u, r, o, y) : t.getMonthMoney2(s, d, o, y);
            var M = [ y + 1, f = Math.round(100 * f) / 100, x = Math.round(100 * v) / 100 ];
            h.push(M);
        }
        var g = Math.round(100 * v) / 100;
        c.all_total = Math.round(100 * g) / 100, c.accrual = Math.round(100 * (v - d)) / 100;
        for (y = 0; y < o; y++) h[y][2] = Math.round(100 * (c.all_total - h[y][2])) / 100;
        c.month_money = h, c.perdown = Math.round(100 * (c.month_money[0][1] - c.month_money[1][1])) / 100, 
        c.all_total = Math.round(100 * c.all_total / 1e4) / 100, c.accrual = Math.round(100 * c.accrual / 1e4) / 100;
        var j = {};
        h = [];
        if (3 == t.data.paymethod) var b = t.getMonthMoney1(_, i, o) + t.getMonthMoney1(u, r, o); else b = t.getMonthMoney1(s, d, o);
        var m = b * o;
        j.all_total = Math.round(100 * m) / 100, j.accrual = Math.round(100 * (m - d)) / 100;
        var x = j.all_total;
        for (y = 0; y < o; y++) {
            var p = Math.round(100 * b) / 100;
            M = [ y + 1, p, x = Math.round(100 * (x - p)) / 100 ];
            h.push(M);
        }
        j.month_money = h, j.all_total = Math.round(100 * j.all_total / 1e4) / 100, j.accrual = Math.round(100 * j.accrual / 1e4) / 100, 
        t.setData({
            benjin: c,
            benxi: j,
            fee_gjj_lilv: Math.round(1e5 * s) / 1e3
        });
    },
    getlilv: function(a) {
        var t = this;
        if (1 == a) var e = t.data.sy_lilv_index, n = t.data.sy_lilv_value[e], l = t.data.sy_lilv_base * n; else if (2 == a) e = t.data.gjj_lilv_index, 
        n = t.data.gjj_lilv_value[e], l = t.data.gjj_lilv_base * n;
        return l;
    },
    getMonthMoney2: function(a, t, e, n) {
        var l = t / e;
        return (t - l * n) * (a / 12) + l;
    },
    getMonthMoney1: function(a, t, e) {
        var n = a / 12;
        return t * n * Math.pow(1 + n, e) / (Math.pow(1 + n, e) - 1);
    },
    bindPicker_bill: function(a) {
        this.setData({
            bill_index: a.detail.value
        });
    },
    bindPicker_lilv: function(a) {
        this.setData({
            gjj_lilv_index: a.detail.value
        });
    },
    bindPicker_lilv_sy: function(a) {
        this.setData({
            sy_lilv_index: a.detail.value
        });
    },
    bindPicker_years: function(a) {
        this.setData({
            years_index: a.detail.value
        });
    },
    onLoad: function(a) {
        for (var t = [], e = 5; e < 31; e++) t.push(e + "年(" + 12 * e + "期)");
        this.setData({
            years: t
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