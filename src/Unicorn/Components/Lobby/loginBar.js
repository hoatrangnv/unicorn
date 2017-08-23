(function () {
    var root = this;
    var res_Lobby = uc.commonConfigs.res_Lobby;
    var fonts = uc.fonts;
    var popup = uc.Popup;
    var request = uc.Network.request;

    var ButtonActions = {
        loginFb: "1",
        loginGG: "2",
        login: "3",
        register: "4",
        forgotPassword: "5"
    };

    var lobbyControllerId = uc.adapterManager.adapters.lobby;
    var lobbySendCmds = uc.Lobby.sendCmds;
    var lobbyReceivedCmds = uc.Lobby.receivedCmds;
    var lobbyAdapter = uc.adapterManager.getAdapterByName("lobby");

    var lobby = null;

    var LobbyLayer = uc.Lobby.LoginBar = uc.Lobby.BaseLayer.extend({
            ctor: function () {
                this._super();
                return true;
            },
            onEnter: function () {
                this._super();
                var url = "http://210.211.101.230:8081/api?c=2&nn=Tung1147&at=80e971fccd4208e4ecf8591db3d9ec6c&pf=web";
                request(url, null, false, function (data) {
                    console.log("success data",data);
                }, function (data) {
                    console.log("error data",data);
                });
            },
            listenAdapter: function () {
                lobbyAdapter.listenCmd(lobbyReceivedCmds.login, this.loginSuccess, this.loginError);
            },

            onExit: function () {
                this._super();
                lobbyAdapter.unListenCmd(lobbyReceivedCmds.login, this.loginSuccess, this.loginError);
            },

            customizeGUI: function () {

                cc.spriteFrameCache.addSpriteFrames("res/Lobby/PlistLobby.plist", "res/Lobby/PlistLobby.png");

                var pLogin = this.pLogin = this.addLayoutStructure(this, "pLogin", cc.p(0, 350), null, cc.size(1280, 78), true);//tab Dang Nhap

                // pLogin.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
                // pLogin.setBackGroundColor(cc.color("#045000"));
                // pLogin.setBackGroundColorOpacity(125);

                this.addSpriteStructure(this.pLogin, "sp_logo", cc.p(79, 39), "logo2.png", ccui.Widget.PLIST_TEXTURE);
                this.addTextStructure(this.pLogin, "lb_dang_nhap_voi", cc.p(224, 39), "Đăng nhập với", fonts.RobotoRegular.fontName, 22);
                this.addButtonStructure(this.pLogin, "btn_facebook_tab", ButtonActions.loginFb, cc.p(338, 39), true, res_Lobby + "btnFacebook.png", res_Lobby + "/btnFacebook.png", ccui.Widget.PLIST_TEXTURE);
                this.addButtonStructure(this.pLogin, "btn_google_tab", ButtonActions.loginGG, cc.p(398, 39), true, res_Lobby + "btnGoogle.png", res_Lobby + "btnGoogle.png", ccui.Widget.PLIST_TEXTURE);
                this._usernameTf = this.addEditBoxStructure(this.pLogin, "tf_user_name_tab", cc.p(532, 39), "", "Tên Đăng nhập", fonts.RobotoRegular.fontName, 20, cc.size(167, 41), res_Lobby + "bg_tendangnhap.png", cc.TEXT_ALIGNMENT_LEFT, 16);
                this._passwordTf = this.addEditBoxStructure(this.pLogin, "tf_pass_tab", cc.p(727, 39), "", "Mật khẩu", fonts.RobotoRegular.fontName, 20, cc.size(167, 41), res_Lobby + "bg_tendangnhap.png", cc.TEXT_ALIGNMENT_LEFT, 16);
                this._passwordTf.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);

                this.addButtonStructure(this.pLogin, "btn_dang_nhap_tab", ButtonActions.login, cc.p(899, 39), false, res_Lobby + "btnDangNhap.png", res_Lobby + "btnDangNhap_s.png", ccui.Widget.PLIST_TEXTURE);
                this.addButtonStructure(this.pLogin, "btn_dang_ky_tab", ButtonActions.register, cc.p(1037, 39), false, res_Lobby + "btnDangKy.png", res_Lobby + "btnDangKy_s.png", ccui.Widget.PLIST_TEXTURE);
                this.addButtonStructure(this.pLogin, "btn_quen_mk", ButtonActions.forgotPassword, cc.p(1190, 39), false, res_Lobby + "btnForgetPass.png", res_Lobby + "btnForgetPass.png", ccui.Widget.PLIST_TEXTURE);
                this.addSpriteStructure(this.pLogin, "sp_vach", cc.p(640, -4), "vachngang.png");
            },

            onButtonRelease: function (button, id) {
                switch (id.toString()) {
                    case ButtonActions.login :
                        this.loginNormal();
                        break;
                }
            },
            loginNormal: function () {
                var CmdReceivedLogin = uc.Network.CmdReceivedCommon.extend(
                    {
                        ctor: function (pkg) {
                            this._super(pkg);
                            this.readData();
                        },
                        readData: function () {
                            this.result = this.getError();
                            this.userId = this.getLong();
                            this.username = this.getString();
                            this.gold = this.getDouble();
                            this.silver = this.getDouble();
                        }

                    }
                );
                var loginData = new uc.Network.CmdSendCommon();
                loginData.initHeader(lobbyControllerId, lobbySendCmds.login);
                loginData.putData("caro12", "9a3d271a9906af2077264b5e3d27425c");
                lobbyAdapter.sendMessage(loginData);
            },
            loginSuccess: function () {

                console.log('hihi');
            },
            loginError: function (error) {
                console.log('error :', error);
                lobbyAdapter.emit("openGame", "caro");
            }
        }
    )

}.call(this));