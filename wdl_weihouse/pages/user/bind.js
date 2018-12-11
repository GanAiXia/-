var app = getApp();

Page({
    data: {
        avatar: "/wdl_weihouse/static/images/get_avatar.png",
        username: "您还未登录",
        uid: 0
    },
    brokerinfo: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/brokeragent",
            data: {
                enews: "getinfo"
            },
            showLoading: !1,
            success: function(o) {
                200 == o.statusCode && (console.log(o.data.data.result), t.setData({
                    broker: o.data.data.result
                }));
            }
        });
    },
    formSubmit: function(o) {
        console.log("form发生了submit事件，携带数据为：", o.detail.value);
        var t = o.detail.value;
        return app.kbtools.isnull(t.nickname) ? (wx.showToast({
            title: "请输入姓名",
            icon: "none",
            duration: 2e3
        }), !1) : app.kbtools.isnull(t.mobile) ? (wx.showToast({
            title: "请输入手机号码",
            icon: "none",
            duration: 2e3
        }), !1) : (t.groupid = 0, void app.util.request({
            url: "entry/wxapp/brokeragent",
            data: t,
            method: "post",
            success: function(o) {
                wx.showToast({
                    title: "保存成功！",
                    icon: "success",
                    duration: 2e3,
                    success: function() {
                        wx.switchTab({
                            url: "/wdl_weihouse/pages/index/user"
                        });
                    }
                });
            },
            fail: function(o) {
                o.data.message && app.util.message(o.data.message, "", "error");
            }
        }));
    },
    onLoad: function(o) {
        var t = this;
        app.checkAuthorLogin(this), wx.getStorage({
            key: "userInfo",
            success: function(o) {
                console.log(o), t.setData({
                    avatar: o.data.wxInfo.avatarUrl,
                    username: o.data.wxInfo.nickName,
                    uid: o.data.memberInfo.uid
                });
            }
        }), this.brokerinfo();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.brokerinfo(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});