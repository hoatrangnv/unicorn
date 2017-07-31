(function () {
    var root = this;
    var resLobbyPath = "res/Lobby";

    uc.Lobby.MainLayer = uc.Lobby.BaseLayer.extend({
            ctor: function () {
                this._super();
                return true;
            },
            onEnter: function () {
                this.setBackground();
                this._super();
            },
            setBackground : function () {
                this.setPosition(cc.p(0, 0));
                this.setAnchorPoint(0, 0);
                this.addSprite(this, "shadow", cc.p(640, 360), resLobbyPath + "/Shadow.jpg");
                this.setContentSize(cc.size(1280, 720));
            },

            customizeGUI: function () {
                var loginBar = new uc.Lobby.LoginBar();
                this.addChildWidthPostion(loginBar, cc.p(640, 308));

                // var gameList = new uc.Lobby.GameList();
                // loginBar.setPosition();
                // this.addChildWidthPostion(loginBar,cc.p(640, 678));

                // this.initPContent();
                // this.initGameInfo();
            }
        }
    );

}.call(this));