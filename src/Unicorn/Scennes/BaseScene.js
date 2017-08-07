(function () {

    var mainContentLayers = ["BG_GUI", "GAME_GUI", "MINI_GAME_GUI", "POP_UP_GUI", "INFO_GUI"];

    uc.BaseScene = cc.Scene.extend({
        ctor: function () {
            this._super();
            this.addMainLayers();
            this.initMainContentLayers();
        },

        onEnter: function () {
            this._super();
            this.resizeScene();
        },

        addMainLayers: function () {

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

            var mainContent = this.mainContent = new ccui.Layout();
            mainContent.setAnchorPoint(0.5, 0.5);
            mainContent.setContentSize(cc.size(1280, 720));
            mainContent.setTouchEnabled(true);
            mainContent.setCascadeOpacityEnabled(true);
            mainContent.setPosition(this.positionContent);

            // mainContent.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            // mainContent.setBackGroundColor(cc.color("#000000"));
            // mainContent.setBackGroundColorOpacity(125);
            this.addChild(mainContent);
        },

        initMainContentLayers: function () {
            var mainContent = this.mainContent;
            var _self = this;
            mainContentLayers.forEach(function (item, index) {
                var child = new cc.Layer();
                _self[item] = child;
                child.retain();
                child.setName(item);
                mainContent.addChild(child, index);
            });

        },

        resizeScene: function () {

            var frameSize = cc.view.getFrameSize();
            var scaleWidth = frameSize.width / 1280;
            var scaleHeight = frameSize.height / 720;

            var globalScaleFactor = scaleHeight < scaleWidth ? scaleHeight / scaleWidth : scaleWidth / scaleHeight;
            if (cc.sys.isNative) {
                var winSize = cc.director.getWinSize();
                var originPos = cc.director.getVisibleOrigin();
                this.setPosition(originPos);

                //GameScene.setPosition(originPos.x,   winSize.height*0.5 - winSize.height*0.5*globalScaleFactor);
                //GameScene.setScale(globalScaleFactor);
                //var origame
            }

        },

        // addChild: function (child) {
        //   cc.Scene.prototype.addChild.call(this, child);
        // },

        addGameGUI: function (child) {
            this.removeGameGui();
            child.setTag(11);
            BaseScene.GAME_GUI.addChild(child);
            this.gameGui = child;
        },

        replaceGameGui: function (gui) {
            this.removeGameGui();
            BaseScene.GAME_GUI.addChild(gui, 1);
            gui.setTag(11);
            this.gameGui = gui;
        },

        removeGameGui: function () {
            if (this.gameGui) {
                this.gameGui.removeFromParent();
                this.gameGui = null;
            }
        },

        getMainLayer: function () {
            return BaseScene.GAME_GUI.getChildByTag(11);
        },

        getMainContentSize: function () {
            return MainContent.getContentSize();
        }
    });

}.call(this));





