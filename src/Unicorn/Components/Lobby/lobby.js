(function () {
    var root = this;

    uc.Lobby.MainLayer = uc.Lobby.BaseLayer.extend({
            ctor: function () {
              this._super();
            },
            customizeGUI: function () {
                this.addSprite(this, "shadow", cc.p(640, 360), res_Lobby + "/Shadow.jpg");

                var loginBar = new uc.Lobby.LoginBar();
                loginBar.setPosition();
                this.addChildWidthPostion(loginBar,cc.p(640, 678));

              this.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
              this.setBackGroundColor(cc.color("#96C8FF"));

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