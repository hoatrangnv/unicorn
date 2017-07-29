(function () {

    var instance = undefined;

    uc.LobbyScene = function () {
        if (instance)
            return instance;
        else
            return instance = new _LobbyScene();
    };

    var _LobbyScene = uc.BaseScene.extend({
        ctor: function () {
            this._super();
        },

        onEnter: function () {
            this._super();

            var BaseLayer = cc.Layer.extend({
                ctor: function () {
                    // this._super();
                    cc.Layer.prototype.ctor.call(this);
                    return true;
                },
                onEnter: function () {
                    cc.Layer.prototype.onEnter.call(this);
                    console.log("BaseLayer on Enter");
                }
            });

            // var lobbyLayer = new uc.Lobby.MainLayer();
            var baseLobby = new BaseLayer();
            console.log("lobbyLayer.onEnter", baseLobby.ctor , baseLobby.onEnter);
            this.addChild(baseLobby);

            // var baseLayer = new uc.BaseLayer();
            // console.log("lobbyLayer.onEnter",baseLayer.onEnter);
            // lobbyLayer.addChild(baseLayer);

            var mainContent = new ccui.Layout();
            mainContent.setAnchorPoint(0.3, 0.5);
            mainContent.setContentSize(cc.size(1280, 720));
            mainContent.setTouchEnabled(true);
            mainContent.setCascadeOpacityEnabled(true);
            mainContent.setPosition(this.positionContent);

            mainContent.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            mainContent.setBackGroundColor(cc.color("#00FFF0"));

            baseLobby.addChild(mainContent);
        },
    });

}.call(this));





