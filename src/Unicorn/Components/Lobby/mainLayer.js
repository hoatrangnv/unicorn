(function () {
    var root = this;

    uc.Lobby.MainLayer = uc.Lobby.BaseLayer.extend({
            ctor: function () {
                this._super();
            },
            onEnter: function () {
                this._super();
            },

            customizeGUI: function () {
                console.log("customizeGUI Lobby.MainLayer");
                this.addSprite(this, "shadow", cc.p(640, 360), res_Lobby + "/Shadow.jpg");

                // var loginBar = new uc.Lobby.LoginBar();
                // this.addChildWidthPostion(loginBar, cc.p(640, 678));

                this.setContentSize(cc.size(1280, 720));

                var mainContent = this.mainContent = new ccui.Layout();
                mainContent.setAnchorPoint(0.5, 0.5);
                mainContent.setContentSize(cc.size(280, 100));
                mainContent.setTouchEnabled(true);
                mainContent.setCascadeOpacityEnabled(true);
                mainContent.setPosition(this.positionContent);

                mainContent.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
                mainContent.setBackGroundColor(cc.color("#990000"));
                this.addChild(mainContent);

                // var gameList = new uc.Lobby.GameList();
                // loginBar.setPosition();
                // this.addChildWidthPostion(loginBar,cc.p(640, 678));
                //
                // this.initPContent();
                // this.initGameInfo();
            }
        }
    );

}.call(this));