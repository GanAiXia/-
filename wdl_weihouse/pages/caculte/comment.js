var app = getApp();

Page({
    data: {
        house: {},
        id: 0,
        relation: [],
        shopname: "",
        groupid: 0,
        dialog: {},
        maskHidden: !1,
        flag0: 0,
        flag1: 0,
        flag2: 0
    },
    getHouseInfo: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/houseinfo",
            cachetime: "30",
            data: {
                id: a.data.id
            },
            success: function(t) {
                t.data.data.shopname = a.data.shopname, a.setData({
                    house: t.data.data,
                    item: t.data.data
                });
            }
        });
    },
    addfavorite: function(t) {
        t.currentTarget.dataset;
        var a = this.data.house;
        app.kbtools.add_favorite(this, {
            id: a.id,
            ftype: 0,
            url: "/wdl_weihouse/pages/house/index?id=" + a.id,
            acttype: "fav",
            title: a.title,
            smalltext: a.village_name + "|" + a.room + "房" + a.hall + "厅" + a.garder + "卫" + a.loyer + a.prix_unitaire
        });
    },
    changeColor1: function(t) {
        var a = t.currentTarget.dataset.index;
        this.setData({
            flag0: a
        });
    },
    changeColor2: function(t) {
        var a = t.currentTarget.dataset.index;
        this.setData({
            flag1: a
        });
    },
    changeColor3: function(t) {
        var a = t.currentTarget.dataset.index;
        this.setData({
            flag2: a
        });
    },
    formSubmit: function(t) {},
    onLoad: function(t) {
        app.kbtools.get_settingdata(this, function(t) {
            return !0;
        }), this.setData({
            id: parseInt(t.id)
        });
        this.getHouseInfo(), app.kbtools.siteAdvancise(app, this);
    },
    onDefRedirect: function(t) {
        app.kbtools.defRedirect(this, t);
    },
    onPreviewVrurl: function(t) {
        var a = t.currentTarget.dataset;
        console.log(a), app.kbtools.isnull(a.vrurl) ? wx.showToast({
            title: "暂无vr看房"
        }) : wx.navigateTo({
            url: "../index/link?href=" + encodeURIComponent(a.vrurl)
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.getHouseInfo(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});