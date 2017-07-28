(function () {
    var root = this;

    uc.Lobby.MainLayer = uc.Lobby.BaseLayer.extend({
            ctor: function () {

            },
            customizeGUI: function () {
                this.addSprite(this, "shadow", cc.p(640, 360), res_Lobby + "/Shadow.jpg");

                var loginBar = new uc.Lobby.LoginBar();
                loginBar.setPosition();
                this.addChildWidthPostion(loginBar,cc.p(640, 678));

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