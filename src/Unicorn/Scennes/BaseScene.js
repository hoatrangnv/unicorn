(function () {

    var mainContentLayers = ["BG_GUI", "GAME_GUI", "MINI_GAME_GUI", "POP_UP_GUI", "INFO_GUI"];

    var BaseScene = uc.BaseScene = cc.Scene.extend({
        ctor: function () {
            this._super();
            this.addMainLayers();
            this.initMainContentLayers();
        },

        onEnter: function () {
            this._super();
            this.resizeScene();
            this.listenAdapter && this.listenAdapter();
        },

        addMainLayers: function () {
            this.sizeSceen = uc.BaseScene.SCREEN_SIZE;
            this.positionCenter = uc.BaseScene.CENTER_POSITION;
            this.positionContent = uc.BaseScene.CONTENT_POSITION;

            if (cc.sys.isNative) {
                this.imageBg = "res/Base/Lobby/GUI/mobile-lobby-bg.jpg";
            } else {
                this.imageBg = "res/Base/Lobby/GUI/lobby-bg.jpg";
            }

            this.bg = new cc.Sprite(this.imageBg);
            this.bg.setPosition(this.positionCenter);
            this.addChild(this.bg);

            var mainContent = this.mainContent = new ccui.Layout();
            mainContent.setAnchorPoint(0.5, 0.5);
            mainContent.setContentSize(BaseScene.MAIN_LAYER_SIZE);
            mainContent.setTouchEnabled(true);
            mainContent.setCascadeOpacityEnabled(true);
            mainContent.setPosition(this.positionContent);

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
        },

        addGUI: function (child, index, zOrder) {
            var layerName = mainContentLayers[index];
            this[layerName].addChild(child, zOrder);
        }
    });

    BaseScene.MAIN_LAYER_SIZE = cc.size(1280, 720);
    if (cc.sys.isNative) {
        BaseScene.SCREEN_SIZE = cc.size(1280, 720);
        BaseScene.CENTER_POSITION = BaseScene.CONTENT_POSITION = cc.p(640, 360);
    } else {
        BaseScene.SCREEN_SIZE = cc.size(1920, 1080);
        BaseScene.CENTER_POSITION = BaseScene.CONTENT_POSITION = cc.p(960, 540);
    }


    mainContentLayers.forEach(function (item, index) {
        BaseScene["INDEX_" + item] = index;
    });

}.call(this));





