var app = getApp();

Page({
    data: {
        category: [],
        result: [],
        shopid: 0,
        tags: 0,
        total: 0,
        page: 0,
        keyword: "",
        loadmore: "查看更多",
        currentTab: 0,
        rent_type: 0
    },
    load_salelist: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/Search",
            showLoading: !0,
            data: {
                page: a.data.page,
                tags: a.data.tags,
                keyword: a.data.keyword,
                isbroker: 1,
                shopid: a.data.shopid,
                rent_type: a.data.rent_type,
                zhutype: "4"
            },
            success: function(t) {
                a.search_callback(t);
            }
        });
    },
    search_callback: function(t) {
        var a = this, e = a.data.result;
        e = 1 < a.data.page ? e.concat(t.data.data) : t.data.data;
        var n = "查看更多";
        0 == t.data.data.length && (n = "这是底线了，没有更多哦！"), wx.hideLoading(), a.setData({
            result: e,
            page: a.data.page + 1,
            loadmore: n
        });
    },
    swichNav: function(t) {
        if (this.data.currentTab === t.target.dataset.current) return !1;
        this.setData({
            currentTab: t.target.dataset.current,
            rent_type: t.target.dataset.current
        }), this.reload_list();
    },
    search_keyword: function(t) {
        this.setData({
            keyword: t.detail.value,
            page: 1
        });
    },
    search_goto: function(t) {
        this.reload_list();
    },
    reload_list: function() {
        this.setData({
            page: 1,
            result: []
        }), this.load_salelist();
    },
    manage: function(t) {
        var n = this, s = t.currentTarget.dataset;
        "delete" == s.op ? wx.showModal({
            title: "提示",
            content: "确定删除房源吗？",
            success: function(t) {
                if (t.confirm) app.util.request({
                    url: "entry/wxapp/update",
                    showLoading: !1,
                    data: {
                        enews: "delete",
                        tablename: "1",
                        id: s.infoid,
                        value: s.value
                    },
                    success: function(t) {
                        n.reload_list();
                    }
                }); else if (t.cancel) return;
            }
        }) : "edit" == s.op ? wx.setStorage({
            key: "publish_return",
            data: "/wdl_weihouse/pages/broker/mysend",
            success: function() {
                wx.navigateTo({
                    url: "../user/myneed?id=" + s.infoid + "&rent=" + s.type
                });
            }
        }) : "plan" == s.op ? wx.navigateTo({
            url: "../broker/plan?id=" + s.infoid + "&rent=" + s.type
        }) : "down" == s.op && app.util.request({
            url: "entry/wxapp/update",
            showLoading: !1,
            data: {
                enews: "down",
                tablename: "1",
                id: s.infoid,
                value: s.value
            },
            success: function(t) {
                var a = s.key;
                console.log(s.key);
                var e = n.data.result;
                e[a].isonline = 1 == s.value ? 0 : 1, n.setData({
                    result: e
                });
            }
        });
    },
    onLoad: function(t) {
        app.kbtools.isnull(t.sid) || this.setData({
            shopid: parseInt(t.sid)
        }), app.checkAuthorLogin(this), this.load_salelist();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.reload_list(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.load_salelist();
    },
    onShareAppMessage: function() {}
});