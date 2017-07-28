(function () {
    var root = this;
    var BaseLobby = uc.Lobby.BaseLobby = uc.BaseLayer.extend({

            ctor: function () {
                this._super("BaseLobby");

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
                this.addSprite(this, "bg", this.positionCenter, this.imageBg);
                this.addLayout(this, "main_content", this.positionContent, null, cc.size(1280, 720), true);
                return true;
            },
            onEnter: function () {
                // this._super();//??/
            },

            initGUI: function () {
                //this.main_content = this._layout.getChildByName("main_content");
                //this.main_content.setOpacity(0);
            },
            customizeGUI: function () {

            },
            addGUI: function (layer, zOrder) {
                // this.main_content.addChild(layer, zOrder);
            }
        }
    );

}.call(this));