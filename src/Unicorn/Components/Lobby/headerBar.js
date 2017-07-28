(function () {
    var root = this;
    var res_Lobby = uc.commonConfigs.res_Lobby;

    var lobby = null;

    var LobbyLayer = uc.LobbyLayer.LoginBar = uc.BaseLayer.extend({
            ctor: function () {
                this._super();
                return true;
            },
            customizeGUI: function () {
                cc.spriteFrameCache.addSpriteFrames("res/Lobby/PlistLobby.plist", "res/Lobby/PlistLobby.png");

                this.addLayout(this, "pLogin", cc.p(640, 678), null, cc.size(1280, 78), true);//tab Dang Nhap
                this.addSprite(this.pLogin, "sp_logo", cc.p(79, 39), res_Lobby + "/logo2.png", ccui.Widget.PLIST_TEXTURE);
                this.addText(this.pLogin, "lb_dang_nhap_voi", cc.p(224, 39), "Đăng nhập với", fonts.RobotoRegular.fontName, 22);
                this.addButton(this.pLogin, "btn_facebook_tab", LobbyLayer.BTN_FACEBOOOK_TAB, cc.p(338, 39), true, res_Lobby + "/btnFacebook.png", res_Lobby + "/btnFacebook.png", ccui.Widget.PLIST_TEXTURE);
                this.addButton(this.pLogin, "btn_google_tab", LobbyLayer.BTN_GOOGLE_TAB, cc.p(398, 39), true, res_Lobby + "/btnGoogle.png", res_Lobby + "/btnGoogle.png", ccui.Widget.PLIST_TEXTURE);
                this.addEditBox(this.pLogin, "tf_user_name_tab", cc.p(532, 39), "", "Tên Đăng nhập", fonts.RobotoRegular.fontName, 20, cc.size(167, 41), res_Lobby + "/bg_tendangnhap.png", cc.TEXT_ALIGNMENT_LEFT, 16);
                this.addEditBox(this.pLogin, "tf_pass_tab", cc.p(727, 39), "", "Mật khẩu", fonts.RobotoRegular.fontName, 20, cc.size(167, 41), res_Lobby + "/bg_tendangnhap.png", cc.TEXT_ALIGNMENT_LEFT, 16);
                this.tf_pass_tab.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);

                this.addButton(this.pLogin, "btn_dang_nhap_tab", LobbyLayer.BTN_DANG_NHAP_TAB, cc.p(899, 39), false, res_Lobby + "/btnDangNhap.png", res_Lobby + "/btnDangNhap_s.png", ccui.Widget.PLIST_TEXTURE);
                this.addButton(this.pLogin, "btn_dang_ky_tab", LobbyLayer.BTN_DANG_KY_TAB, cc.p(1037, 39), false, res_Lobby + "/btnDangKy.png", res_Lobby + "/btnDangKy_s.png", ccui.Widget.PLIST_TEXTURE);
                this.addButton(this.pLogin, "btn_quen_mk", LobbyLayer.BTN_QUEN_MK, cc.p(1190, 39), false, res_Lobby + "/btnForgetPass.png", res_Lobby + "/btnForgetPass.png", ccui.Widget.PLIST_TEXTURE);
                this.addSprite(this.pLogin, "sp_vach", cc.p(640, -4), res_Lobby + "/vachngang.png");
            },
        }
    )

}.call(this));