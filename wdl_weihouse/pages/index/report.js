var app = getApp();

Page({
    data: {
        result: {},
        infoid: 0,
        infotype: 1,
        ftype: 9,
        house_title: ""
    },
    formSubmit: function(t) {
        var e = this, a = {
            id: e.data.infoid,
            ftype: 5,
            acttype: "report",
            title: "【举报】" + e.data.house_title,
            smalltext: e.data.items + "|其他：" + t.detail.value.extinfo
        };
        e.data.islogin ? app.util.request({
            url: "entry/wxapp/addfeed",
            data: a,
            success: function(t) {
                wx.showToast({
                    title: "提交成功",
                    success: function() {
                        wx.navigateBack();
                    }
                });
            }
        }) : (wx.showToast({
            title: "请允许授权才能提交咨询",
            icon: "none"
        }), app.util.getUserInfo(function(t) {
            t.sessionid && e.setData({
                islogin: !0
            });
        }));
    },
    checkbox_item: function(t) {
        var e = t.detail.value;
        this.setData({
            items: e.join("|")
        });
    },
    checkbox_agree: function(t) {
        var e = this.data.agree;
        e = 1 == t.detail.value.length ? 1 : 0, this.setData({
            agree: e
        });
    },
    onLoad: function(t) {
        var e = this;
        console.log(t);
        var a = t.infoid, i = 0;
        app.kbtools.isnull(t.infotype) || (i = t.infotype), app.kbtools.isnull(a) || (e.setData({
            infoid: a,
            infotype: i
        }), app.util.request({
            url: "entry/wxapp/houseinfo",
            cachetime: "0",
            data: {
                id: a
            },
            success: function(t) {
                console.log(t), e.setData({
                    result: t.data.data,
                    house_title: t.data.data.title
                });
            }
        })), app.checkAuthorLogin(this, "/wdl_weihouse/pages/index/report?infoid=" + t.infoid);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});