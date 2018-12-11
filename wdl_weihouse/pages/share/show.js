function _defineProperty(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e;
}

var app = getApp();

Page({
    data: _defineProperty({
        img: "../../images/gobg.png",
        wechat: "../../images/wechat.png",
        quan: "../../images/quan.png",
        code: "E7AI98",
        inputValue: "",
        maskHidden: !1,
        name: "",
        touxiang: ""
    }, "code", "E7A93C"),
    bindKeyInput: function(e) {
        this.setData({
            inputValue: e.detail.value
        });
    },
    btnclick: function() {
        var e = this.data.inputValue;
        wx.showToast({
            title: e,
            icon: "none",
            duration: 2e3
        });
    },
    onLoad: function(e) {
        var t = this, n = this;
        wx.getUserInfo({
            success: function(e) {
                console.log(e.userInfo, "huoqudao le "), t.setData({
                    name: e.userInfo.nickName
                }), wx.downloadFile({
                    url: e.userInfo.avatarUrl,
                    success: function(e) {
                        200 === e.statusCode && (console.log(e, "reererererer"), n.setData({
                            touxiang: e.tempFilePath
                        }));
                    }
                });
            }
        });
    },
    createNewImg: function() {
        var n = this, e = wx.createCanvasContext("mycanvas");
        e.setFillStyle("#ffe200"), e.fillRect(0, 0, 375, 667);
        e.drawImage("/images/gobg.png", 0, 0, 375, 183);
        var t = n.data.touxiang;
        console.log(t, "path1");
        e.drawImage("/images/txquan.png", 126, 186, 120, 120);
        var a = n.data.name;
        e.setFontSize(24), e.setFillStyle("#333333"), e.setTextAlign("center"), e.fillText(a, 185, 340), 
        e.stroke(), e.setFontSize(14), e.setFillStyle("#333333"), e.setTextAlign("center"), 
        e.fillText("邀请你一起去吃面", 185, 370), e.stroke(), e.drawImage("/images/heise.png", 48, 390, 280, 84), 
        e.setFontSize(40), e.setFillStyle("#ffe200"), e.setTextAlign("center"), e.fillText(n.data.code, 185, 435), 
        e.stroke(), e.drawImage("/images/wenziBg.png", 25, 520, 184, 82), e.setFontSize(12), 
        e.setFillStyle("#333"), e.setTextAlign("left"), e.fillText("进入小程序输入朋友的邀请", 35, 540), 
        e.stroke(), e.setFontSize(12), e.setFillStyle("#333"), e.setTextAlign("left"), e.fillText("码，朋友和你各自获得通用", 35, 560), 
        e.stroke(), e.setFontSize(12), e.setFillStyle("#333"), e.setTextAlign("left"), e.fillText("优惠券1张哦~", 35, 580), 
        e.stroke(), e.drawImage("/images/wenxin.png", 248, 578, 90, 25), e.arc(186, 246, 50, 0, 2 * Math.PI), 
        e.strokeStyle = "#ffe200", e.clip(), e.drawImage(t, 136, 196, 100, 100), e.draw(), 
        setTimeout(function() {
            wx.canvasToTempFilePath({
                canvasId: "mycanvas",
                success: function(e) {
                    var t = e.tempFilePath;
                    n.setData({
                        imagePath: t,
                        canvasHidden: !0
                    });
                },
                fail: function(e) {
                    console.log(e);
                }
            });
        }, 200);
    },
    baocun: function() {
        var t = this;
        wx.saveImageToPhotosAlbum({
            filePath: t.data.imagePath,
            success: function(e) {
                wx.showModal({
                    content: "图片已保存到相册，赶紧晒一下吧~",
                    showCancel: !1,
                    confirmText: "好的",
                    confirmColor: "#333",
                    success: function(e) {
                        e.confirm && (console.log("用户点击确定"), t.setData({
                            maskHidden: !1
                        }));
                    },
                    fail: function(e) {
                        console.log(11111);
                    }
                });
            }
        });
    },
    formSubmit: function(e) {
        var t = this;
        this.setData({
            maskHidden: !1
        }), wx.showToast({
            title: "装逼中...",
            icon: "loading",
            duration: 1e3
        }), setTimeout(function() {
            wx.hideToast(), t.createNewImg(), t.setData({
                maskHidden: !0
            });
        }, 1e3);
    },
    onReady: function() {},
    onShow: function() {
        var t = this, n = this;
        wx.getUserInfo({
            success: function(e) {
                console.log(e.userInfo, "huoqudao le "), t.setData({
                    name: e.userInfo.nickName
                }), wx.downloadFile({
                    url: e.userInfo.avatarUrl,
                    success: function(e) {
                        200 === e.statusCode && (console.log(e, "reererererer"), n.setData({
                            touxiang: e.tempFilePath
                        }));
                    }
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(e) {
        return {
            title: "这个是我分享出来的东西",
            success: function(e) {
                console.log(e, "转发成功");
            },
            fail: function(e) {
                console.log(e, "转发失败");
            }
        };
    }
});