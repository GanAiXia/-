var app = getApp();

Page({
    data: {
        tempFilePaths: [],
        form_image_paths: [],
        transfile: {},
        isupend: !0,
        show_progress: !1,
        progress_per: 0,
        islogin: !1,
        prive: {},
        id: 0,
        rent_type: 0,
        settingdata: {},
        info: {},
        form_field: [ "title", "area", "quan", "village_name", "house_sno", "room", "hall", "garder", "superficie", "loyer", "prix_unitaire", "prix_unitaire", "housetype", "traveaux_finition", "storey", "total_storey", "donner_sur", "build_age", "description", "publish_name", "linkphone" ],
        title: {
            value: "",
            txt: "房源标题",
            istrue: !1,
            ischeck: !0
        },
        area: {
            value: "",
            txt: "所在区域",
            istrue: !1,
            ischeck: !0
        },
        quan: {
            value: "",
            txt: "商圈",
            istrue: !1,
            ischeck: !1
        },
        village_name: {
            value: "",
            txt: "小区名称",
            istrue: !1,
            ischeck: !0
        },
        house_sno: {
            value: "",
            txt: "房源编号",
            istrue: !1,
            ischeck: !1
        },
        room: {
            value: "",
            txt: "房",
            istrue: !1,
            ischeck: !0
        },
        hall: {
            value: "",
            txt: "厅",
            istrue: !1,
            ischeck: !0
        },
        garder: {
            value: "",
            txt: "卫",
            istrue: !1,
            ischeck: !1
        },
        superficie: {
            value: "",
            txt: "建身高",
            istrue: !1,
            ischeck: !0
        },
        loyer: {
            value: "",
            txt: "期望售价",
            istrue: !1,
            ischeck: !0
        },
        prix_unitaire: {
            value: "万元",
            txt: "价格单位",
            istrue: !1,
            ischeck: !1
        },
        housetype: {
            value: "",
            txt: "类型",
            istrue: !1,
            ischeck: !1
        },
        traveaux_finition: {
            value: "",
            txt: "装修情况",
            istrue: !1,
            ischeck: !1
        },
        storey: {
            value: "",
            txt: "第几层",
            istrue: !1,
            ischeck: !1
        },
        total_storey: {
            value: "",
            txt: "共几层",
            istrue: !1,
            ischeck: !1
        },
        donner_sur: {
            value: "",
            txt: "朝向",
            istrue: !1,
            ischeck: !1
        },
        build_age: {
            value: "",
            txt: "建筑年代",
            istrue: !1,
            ischeck: !1
        },
        description: {
            value: "",
            txt: "房源描述",
            istrue: !1,
            ischeck: !1
        },
        publish_name: {
            value: "",
            txt: "发布人姓名",
            istrue: !1,
            ischeck: !0
        },
        linkphone: {
            value: "",
            txt: "联系电话",
            istrue: !1,
            ischeck: !0
        },
        broker_id: {
            value: "",
            txt: "经纪人id",
            istrue: !1
        },
        search_areas: [],
        areas_index: 0,
        search_quan: [],
        quan_index: 0,
        search_price: {},
        search_sufix: {},
        search_room: {},
        search_chaoxiang: [],
        chaoxiang_index: 0,
        search_housetype: [],
        housetype_index: 0,
        search_zhaungxiu: [],
        zhuang_index: 0,
        search_years: [],
        years_index: 0
    },
    ismodify: function() {
        var o = this, a = o.data.id;
        o.data.rent_type;
        0 < a && app.util.request({
            url: "entry/wxapp/update",
            cachetime: "0",
            data: {
                enews: "fetch",
                tablename: 1,
                id: a
            },
            success: function(a) {
                var e = a.data.data, t = 0, i = 0, s = 0, r = 0, u = 0, n = 0, l = o.data.search_areas;
                if (l) for (var d in l) if (e.area == l[d]) {
                    t = d;
                    break;
                }
                if (l = o.data.search_quan[t]) for (var d in l) if (e.quan == l[d]) {
                    n = d;
                    break;
                }
                if (l = o.data.search_housetype) for (var d in l) if (e.house_type == l[d]) {
                    i = d;
                    break;
                }
                if (l = o.data.search_zhaungxiu) for (var d in l) if (e.traveaux_finition == l[d]) {
                    s = d;
                    break;
                }
                if (l = o.data.search_chaoxiang) for (var d in l) if (e.donner_sur == l[d]) {
                    r = d;
                    break;
                }
                if (l = o.data.search_years) for (var d in l) if (e.build_age == l[d]) {
                    u = d;
                    break;
                }
                o.setData({
                    info: e,
                    areas_index: t,
                    quan_index: n,
                    housetype_index: i,
                    zhuang_index: s,
                    chaoxiang_index: r,
                    years_index: u,
                    tempFilePaths: e.attachs_url ? e.attachs_url : [],
                    form_image_paths: e.attachs ? e.attachs : []
                });
            }
        });
    },
    userprive: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/userprive",
            cachetime: "0",
            data: {},
            success: function(a) {
                console.log(a), e.setData({
                    prive: a.data.data
                });
            }
        });
    },
    onLoad: function(a) {
        app.checkAuthorLogin(this);
        var e = 0;
        a.rent && (e = a.rent), this.setData({
            id: parseInt(a.id),
            rent_type: parseInt(e)
        }), this.userprive(), this.search_params();
    },
    onReady: function() {},
    bindKeyInput: function(a) {
        var e = this, t = a.target.dataset.name, i = {};
        "title" == t && ((i = e.data.title).value = a.detail.value, i.istrue = !0, e.setData({
            title: i
        })), "village_name" == t && ((i = e.data.village_name).value = a.detail.value, i.istrue = !0, 
        e.setData({
            village_name: i
        })), "room" == t && ((i = e.data.room).value = a.detail.value, i.istrue = !0, e.setData({
            room: i
        })), "hall" == t && ((i = e.data.hall).value = a.detail.value, i.istrue = !0, e.setData({
            hall: i
        })), "garder" == t && ((i = e.data.garder).value = a.detail.value, i.istrue = !0, 
        e.setData({
            garder: i
        })), "superficie" == t && ((i = e.data.superficie).value = a.detail.value, i.istrue = !0, 
        e.setData({
            superficie: i
        })), "loyer" == t && ((i = e.data.loyer).value = a.detail.value, i.istrue = !0, 
        e.setData({
            loyer: i
        })), "storey" == t && ((i = e.data.storey).value = a.detail.value, i.istrue = !0, 
        e.setData({
            storey: i
        })), "total_storey" == t && ((i = e.data.total_storey).value = a.detail.value, i.istrue = !0, 
        e.setData({
            total_storey: i
        })), "description" == t && ((i = e.data.description).value = a.detail.value, i.istrue = !0, 
        e.setData({
            description: i
        })), "publish_name" == t && ((i = e.data.publish_name).value = a.detail.value, i.istrue = !0, 
        e.setData({
            publish_name: i
        })), "linkphone" == t && ((i = e.data.linkphone).value = a.detail.value, i.istrue = !0, 
        e.setData({
            linkphone: i
        }));
    },
    bindPicker_areas: function(a) {
        var e = this.data.area;
        e.value = this.data.search_areas[a.detail.value], this.setData({
            areas_index: a.detail.value,
            area: e
        });
    },
    bindPicker_quan: function(a) {
        var e = this.data.quan, t = this.data.areas_index;
        e.value = this.data.search_quan[t][a.detail.value], this.setData({
            quan_index: a.detail.value,
            quan: e
        });
    },
    bindPicker_housetype: function(a) {
        var e = this.data.housetype;
        e.value = this.data.search_housetype[a.detail.value], e.istrue = !0, this.setData({
            housetype_index: a.detail.value,
            housetype: e
        });
    },
    bindPicker_zhuangxiu: function(a) {
        var e = this.data.traveaux_finition;
        e.value = this.data.search_zhaungxiu[a.detail.value], e.istrue = !0, this.setData({
            zhuang_index: a.detail.value,
            traveaux_finition: e
        });
    },
    bindPicker_chaoxiang: function(a) {
        var e = this.data.donner_sur;
        e.value = this.data.search_chaoxiang[a.detail.value], e.istrue = !0, this.setData({
            chaoxiang_index: a.detail.value,
            donner_sur: e
        });
    },
    bindPicker_years: function(a) {
        var e = this.data.build_age;
        e.value = this.data.search_years[a.detail.value], e.istrue = !0, this.setData({
            years_index: a.detail.value,
            build_age: e
        });
    },
    search_params: function() {
        var o = this;
        app.kbtools.get_settingdata(o, function(a) {
            o.setData({
                settingdata: a.data.settingdata
            });
        }), app.util.request({
            url: "entry/wxapp/searchkey",
            data: {
                type: 0
            },
            cache: 60,
            success: function(a) {
                console.log(a);
                var e, t = a.data.data.areas, i = [], s = [], r = [], u = [], n = [];
                if (t) {
                    var l = a.data.data.quan;
                    for (var d in t) i.push(t[d]), app.kbtools.isnull(l) || n.push(l[t[d]]);
                }
                if (t = a.data.data.housetype) for (var d in t) s.push(t[d]);
                if (t = a.data.data.zhaungxiu) for (var d in t) r.push(t[d]);
                if (t = a.data.data.chaoxiang) for (var d in t) u.push(t[d]);
                e = a.data.data.years, o.setData({
                    search_areas: i,
                    search_quan: n,
                    area: {
                        value: i[0],
                        txt: "所在区域"
                    },
                    search_housetype: s,
                    housetype: {
                        value: s[0],
                        txt: "类型"
                    },
                    search_zhaungxiu: r,
                    traveaux_finition: {
                        value: r[0],
                        txt: "装修"
                    },
                    search_chaoxiang: u,
                    donner_sur: {
                        value: u[0],
                        txt: "朝向"
                    },
                    search_years: e,
                    build_age: {
                        value: e[0],
                        txt: "建筑年代"
                    },
                    info: {
                        linkphone: o.data.prive.prive.broker.mobile,
                        publish_name: o.data.prive.prive.broker.nickname
                    }
                }), o.ismodify();
            }
        });
    },
    removepic: function(a) {
        var e = a.currentTarget.dataset.index, t = this.data.tempFilePaths, i = this.data.form_image_paths;
        t.splice(e, 1), i.splice(e, 1), this.setData({
            tempFilePaths: t,
            form_image_paths: i
        });
    },
    uploadImages: function() {
        var i = this, s = i.data.tempFilePaths;
        wx.chooseImage({
            count: 9,
            success: function(a) {
                var e = a.tempFilePaths;
                s = s.concat(e), i.setData({
                    tempFilePaths: s,
                    isupend: !1
                });
                var t = {};
                t.path = e, i.uploadimg(t);
            }
        });
    },
    uploadimg: function(a) {
        var i = this, e = a.i ? a.i : 0, s = a.success ? a.success : 0, t = a.fail ? a.fail : 0;
        i.setData({
            show_progress: !0,
            progress_per: 0
        });
        var r = app.util.url("entry/wxapp/transfile", {
            m: "wdl_weihouse"
        });
        wx.uploadFile({
            url: r,
            filePath: a.path[e],
            name: "upfile",
            formData: {},
            success: function(a) {
                s++, i.setData({
                    show_progress: !1
                });
                var e = a.data.split("#"), t = i.data.form_image_paths;
                i.setData({
                    form_image_paths: t.concat(e[0])
                });
            },
            fail: function(a) {
                t++, console.log("fail:" + e + "fail:" + t);
            },
            complete: function() {
                ++e == a.path.length ? (console.log("执行完毕"), i.setData({
                    isupend: !0
                }), console.log("成功：" + s + " 失败：" + t)) : (a.i = e, a.success = s, a.fail = t, 
                i.uploadimg(a));
            }
        });
    },
    formSubmit: function(a) {
        var e = this, t = a.detail.value, i = e.data.prive;
        if (1 == i.needpay && 0 == i.credit_send_ok) return wx.showToast({
            title: "当前积分不足，无法发布\n请先充值！",
            icon: "none",
            duration: 2e3
        }), !1;
        for (var s in t) {
            (r = {
                target: {
                    dataset: {
                        name: ""
                    }
                },
                detail: {
                    value: ""
                }
            }).target.dataset.name = s, r.detail.value = t[s], e.bindKeyInput(r);
        }
        var r = {
            detail: {
                value: e.data.years_index
            }
        };
        e.bindPicker_years(r);
        r = {
            detail: {
                value: e.data.areas_index
            }
        };
        e.bindPicker_areas(r);
        r = {
            detail: {
                value: e.data.quan_index
            }
        };
        e.bindPicker_quan(r);
        r = {
            detail: {
                value: e.data.housetype_index
            }
        };
        e.bindPicker_housetype(r);
        r = {
            detail: {
                value: e.data.zhuang_index
            }
        };
        e.bindPicker_zhuangxiu(r);
        r = {
            detail: {
                value: e.data.chaoxiang_index
            }
        };
        e.bindPicker_chaoxiang(r);
        var u = e.data.form_field, n = !0;
        for (var l in u) {
            var d = e.data[u[l]];
            if (d.ischeck && !d.value) {
                wx.showToast({
                    title: "请输入" + d.txt,
                    icon: "none",
                    duration: 2e3
                }), n = !1;
                break;
            }
        }
        if (!n) return !1;
        app.util.request({
            url: "entry/wxapp/postsechouse",
            data: {
                id: e.data.id,
                rent_type: e.data.rent_type,
                title: e.data.title.value,
                area: e.data.area.value,
                quan: e.data.quan.value,
                village_name: e.data.village_name.value,
                house_sno: e.data.house_sno.value,
                room: e.data.room.value,
                hall: e.data.hall.value,
                garder: e.data.garder.value,
                superficie: e.data.superficie.value,
                loyer: e.data.loyer.value,
                prix_unitaire: e.data.prix_unitaire.value,
                house_type: e.data.housetype.value,
                traveaux_finition: e.data.traveaux_finition.value,
                storey: e.data.storey.value,
                total_storey: e.data.total_storey.value,
                donner_sur: e.data.donner_sur.value,
                build_age: e.data.build_age.value,
                description: e.data.description.value,
                publish_name: e.data.publish_name.value,
                linkphone: e.data.linkphone.value,
                broker_id: e.data.broker_id.value,
                thumbs: e.data.form_image_paths,
                needpay: i.needpay,
                need_credit: i.need_pay_credit
            },
            method: "post",
            success: function(a) {
                wx.showToast({
                    title: "返回" + a.data.message,
                    icon: "success",
                    duration: 2e3,
                    success: function() {
                        wx.getStorage({
                            key: "publish_return",
                            success: function(a) {
                                wx.redirectTo({
                                    url: a.data
                                });
                            },
                            fail: function() {
                                wx.redirectTo({
                                    url: "../index/user"
                                });
                            }
                        });
                    }
                });
            },
            fail: function(a) {
                a.data.message && app.util.message(a.data.message, "", "error");
            }
        });
    }
});