(function () {

    var BaseScene = uc.BaseScene = cc.Scene.extend({
        ctor: function(){
            this._super();
        },

        onEnter : function () {
            this.resizeScene();
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

            return GameScene;

        },

        addChild: function (child) {
            cc.Scene.prototype.addChild.call(this,child);
        },

        addGameGUI: function(child){
            this.removeGameGui();
            child.setTag(11);
            BaseScene.GAME_GUI.addChild(child);
            this.gameGui = child;
        },

        replaceGameGui: function(gui){
            this.removeGameGui();
            BaseScene.GAME_GUI.addChild(gui, 1);
            gui.setTag(11);
            this.gameGui = gui;
        },

        removeGameGui: function(){
            if(this.gameGui){
                this.gameGui.removeFromParent();
                this.gameGui = null;
            }
        },

        getMainLayer: function(){
            return BaseScene.GAME_GUI.getChildByTag(11);
        },

        getMainContentSize: function(){
            return MainContent.getContentSize();
        },

        addGUI: function(child, index, zOrder){
            switch(index){
                case BaseScene.INDEX_BG_GUI:
                    break;
                case BaseScene.INDEX_GAME_GUI:
                    BaseScene.GAME_GUI.addChild(child, zOrder);
                    break;
                case BaseScene.INDEX_MINIGAME_GUI:
                    BaseScene.MINI_GAME_GUI.addChild(child, zOrder);
                    break;
                case BaseScene.INDEX_INFO_GUI:
                    BaseScene.INFO_GUI.addChild(child, zOrder);
                    break;
                case BaseScene.INDEX_POP_UP_GUI:
                    BaseScene.POP_UP_GUI.addChild(child, zOrder);
                    break;
            }
        }
    });

    BaseScene.INDEX_BG_GUI            = 0;
    BaseScene.INDEX_GAME_GUI          = 1;
    BaseScene.INDEX_INFO_GUI          = 2;
    BaseScene.INDEX_MINIGAME_GUI      = 3;
    BaseScene.INDEX_POP_UP_GUI        = 4;


    BaseScene.BG_GUI = null;
    BaseScene.GAME_GUI = null;
    BaseScene.MINI_GAME_GUI = null;
    BaseScene.POP_UP_GUI = null;
    BaseScene.INFO_GUI = null;

}.call(this));





