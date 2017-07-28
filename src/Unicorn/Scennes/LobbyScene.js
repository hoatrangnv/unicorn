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
            this.addMainLayers();
            // this.initLobbyScene();
        },

        addMainLayers : function () {

            if (cc.sys.isNative) {
                this.sizeSceen = cc.size(1280, 720);
                this.positionCenter = cc.p(640, 360);
                this.positionContent = cc.p(640, 360);
                this.imageBg = "res/Base/Lobby/GUI/mobile-lobby-bg.jpg";
            } else {
                this.sizeSceen = cc.size(1920, 1080);
                this.positionCenter = cc.p(960, 540);
                this.positionContent = cc.p(960, 630);
                this.imageBg = "res/Base/Lobby/GUI/lobby-bg.jpg";

            }


            this.bg = new cc.Sprite(this.imageBg);
            this.bg.setPosition(this.positionCenter);
            this.addChild(this.bg);

            var main_content = this.main_content = new ccui.Layout();
            main_content.setAnchorPoint(0.5, 0.5);
            main_content.setContentSize(cc.size(1280, 720));
            main_content.setTouchEnabled(true);
            main_content.setCascadeOpacityEnabled(true);
            main_content.setPosition(this.positionContent);
            this.addChild(main_content);
        },

        initLobbyScene: function (child) {

            var BG_GUI = new cc.Layer();
            var GAME_GUI = new cc.Layer();
            var MINI_GAME_GUI = new cc.Layer();
            var POP_UP_GUI = new cc.Layer();
            var INFO_GUI = new cc.Layer();
            BG_GUI.retain();
            GAME_GUI.retain();
            MINI_GAME_GUI.retain();
            POP_UP_GUI.retain();
            INFO_GUI.retain();

            var MainContent = baseLobby.main_content;

            GameScene.addChild(baseLobby);

            MainContent.addChild(BaseScene.BG_GUI, BaseScene.INDEX_BG_GUI);
            MainContent.addChild(BaseScene.GAME_GUI, BaseScene.INDEX_GAME_GUI);
            MainContent.addChild(BaseScene.MINI_GAME_GUI, BaseScene.INDEX_MINIGAME_GUI);
            MainContent.addChild(BaseScene.INFO_GUI, BaseScene.INDEX_INFO_GUI);
            MainContent.addChild(BaseScene.POP_UP_GUI, BaseScene.INDEX_POP_UP_GUI);

            BaseScene.BG_GUI.addChild(layer);
            // cc.log("end onEnter Lobby333");

            return GameScene;

        }
    });

}.call(this));





