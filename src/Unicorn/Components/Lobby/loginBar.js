(function () {
    var root = this;
    var res_Lobby = uc.commonConfigs.res_Lobby;
    var fonts = uc.fonts;

    var lobby = null;

    var LobbyLayer = uc.Lobby.LoginBar = uc.Lobby.BaseLayer.extend({
            ctor: function () {
                this._super();
                return true;
            },
            customizeGUI: function () {
                console.log("customizeGUI lobby layer");

                cc.spriteFrameCache.addSpriteFrames("res/Lobby/PlistLobby.plist", "res/Lobby/PlistLobby.png");

                var pLogin = this.pLogin = this.addLayoutStructure(this, "pLogin", cc.p(0, 350), null, cc.size(1280, 78), true);//tab Dang Nhap

                pLogin.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
                pLogin.setBackGroundColor(cc.color("#045000"));
                pLogin.setBackGroundColorOpacity(125);

                this.addSpriteStructure(this.pLogin, "sp_logo", cc.p(79, 39), res_Lobby + "/logo2.png", ccui.Widget.PLIST_TEXTURE);
                this.addTextStructure(this.pLogin, "lb_dang_nhap_voi", cc.p(224, 39), "Đăng nhập với", fonts.RobotoRegular.fontName, 22);
                this.addButtonStructure(this.pLogin, "btn_facebook_tab", LobbyLayer.BTN_FACEBOOOK_TAB, cc.p(338, 39), true, res_Lobby + "/btnFacebook.png", res_Lobby + "/btnFacebook.png", ccui.Widget.PLIST_TEXTURE);
                this.addButtonStructure(this.pLogin, "btn_google_tab", LobbyLayer.BTN_GOOGLE_TAB, cc.p(398, 39), true, res_Lobby + "/btnGoogle.png", res_Lobby + "/btnGoogle.png", ccui.Widget.PLIST_TEXTURE);
                this.addEditBoxStructure(this.pLogin, "tf_user_name_tab", cc.p(532, 39), "", "Tên Đăng nhập", fonts.RobotoRegular.fontName, 20, cc.size(167, 41), res_Lobby + "/bg_tendangnhap.png", cc.TEXT_ALIGNMENT_LEFT, 16);
                this.addEditBoxStructure(this.pLogin, "tf_pass_tab", cc.p(727, 39), "", "Mật khẩu", fonts.RobotoRegular.fontName, 20, cc.size(167, 41), res_Lobby + "/bg_tendangnhap.png", cc.TEXT_ALIGNMENT_LEFT, 16);
                this.tf_pass_tab.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);

                this.addButtonStructure(this.pLogin, "btn_dang_nhap_tab", LobbyLayer.BTN_DANG_NHAP_TAB, cc.p(899, 39), false, res_Lobby + "/btnDangNhap.png", res_Lobby + "/btnDangNhap_s.png", ccui.Widget.PLIST_TEXTURE);
                this.addButtonStructure(this.pLogin, "btn_dang_ky_tab", LobbyLayer.BTN_DANG_KY_TAB, cc.p(1037, 39), false, res_Lobby + "/btnDangKy.png", res_Lobby + "/btnDangKy_s.png", ccui.Widget.PLIST_TEXTURE);
                this.addButtonStructure(this.pLogin, "btn_quen_mk", LobbyLayer.BTN_QUEN_MK, cc.p(1190, 39), false, res_Lobby + "/btnForgetPass.png", res_Lobby + "/btnForgetPass.png", ccui.Widget.PLIST_TEXTURE);
                this.addSpriteStructure(this.pLogin, "sp_vach", cc.p(640, -4), res_Lobby + "/vachngang.png");
            },

            onButtonRelease: function (button, id) {
                switch (id) {
                    case LobbyLayer.BTN_FACEBOOOK_TAB:
                        this.s = "fb";
                        this.isFBGG = true;
                        if (!cc.sys.isNative) {
                            // this.checkLoginState();
                            this.loginFB();
                        } else {
                            socialMgr.setTarget(this, this.onGetAcsessToken);
                            socialMgr.loginFacebook();
                        }
                        break;
                    case LobbyLayer.BTN_GOOGLE_TAB:
                        //this.runDataEvent();
                        this.s = "gg";
                        this.isFBGG = true;
                        if (!cc.sys.isNative) {
                            this.loginGG();
                        } else {
                            socialMgr.setTarget(this, this.onGetAcsessToken);
                            socialMgr.loginGoogle();
                        }
                        break;
                    case LobbyLayer.BTN_DANG_NHAP_TAB:
                        this.funLogin();
                        break;
                    case LobbyLayer.BTN_DANG_KY_TAB:
                        this.isClickDangKy = true;
                        this.shadow.setVisible(false);
                        this.parserDataCaptcha();
                        //send request đăng ký tab
                        this.isFBGG = false;
                        this.pDangKy.setVisible(true);
                        //this.pn_other.setVisible(false);
                        this.pAccount.setVisible(false);
                        this.btn_chat.setVisible(false);
                        this.btn_event.setVisible(false);
                        this.pn_event.setVisible(false);
                        lobby.pn_chat.setVisible(false);
                        break;
                    case LobbyLayer.BTN_QUEN_MK:
                        this.pn_forget_pass.setVisible(true);
                        this.pn_forget_pass.runAction(cc.scaleTo(0.2, 1));
                        this.pn_otp_information.setVisible(true);
                        this.pn_otp_forget.setVisible(false);
                        this.pn_otp_thongbao.setVisible(false);
                        this.content_bm.setVisible(false);
                        this.content_no_bm.setVisible(false);
                        this.pn_chose_otp_for.setVisible(false);
                        this.pn_email_forget.setVisible(false);
                        this.pn_chose_email_otp.setVisible(false);
                        this.email_sms_chose.setVisible(false);
                        this.btn_back_forget_pass.setVisible(false);
                        this.parserDataCaptcha();
                        break;
                }
            },
        }
    )

}.call(this));