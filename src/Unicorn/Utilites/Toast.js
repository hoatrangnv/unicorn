(function () {
    var root = this;

    var Toast = uc.Toast = cc.Layer.extend({

        _time: 0,
        _message: "",

        ctor: function (time, message) {
            this._super();
            this._time = time;
            this._message = message;
            this._layerColor = new cc.LayerColor(cc.BLACK);
            this._layerColor.setOpacity(220);
            this.addChild(this._layerColor);
        },

        onEnter: function () {
            var winSize = cc.director.getWinSize();
            var contentSize = GameScene.getMainContentSize();
            var scale = cc.director.getWinSize().width / 800;
            scale = (scale > 1) ? 1 : scale;

            cc.Layer.prototype.onEnter.call(this);

            //this._label = new cc.LabelTTF(this._message);
            //this._label.setFontSize(18);
            //this._label.setOpacity(220);
            //this._label.setScale(scale);

            this._label = new ccui.Text();
            this._label.setAnchorPoint(cc.p(0.5, 0.5));
            this._label.setFontName("res/LoadingUI/fonts/tahoma.ttf");
            this._label.setFontSize(23);
            this._label.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this._label.setColor(cc.color.WHITE);
            this._label.setString(this._message);
            this._label.setScale(scale);

            this._layerColor.addChild(this._label);
            this._layerColor.setPosition(cc.p(0, 0));

            this._label.setPosition(cc.p(winSize.width / 2, 23));
            this.setPosition(cc.p(0, winSize.height));

            this.runAction(cc.sequence(new cc.EaseBackOut(cc.moveBy(.3, cc.p(0, -48))),
                cc.delayTime(this._time),
                new cc.EaseBackIn(cc.moveBy(.3, cc.p(0, 48))), cc.removeSelf()));
        }
    });


    Toast.makeToast = function (time, message, parent) {
        var instance = new Toast(time, message);
        if (parent)
            parent.addChild(instance);
        else
            SceneMgr.getInstance().getRunningScene().addChild(instance);
        instance.setLocalZOrder(198);
        return instance;
    }

    var GameToast = uc.Toast = cc.Node.extend({

        _time: 0,
        _message: "",

        ctor: function (time, message) {
            this._super();
            this._time = time;
            this._message = message;

        },

        onEnter: function () {
            var contentSize = GameScene.getMainContentSize();
            var scale = cc.director.getWinSize().width / 1280;
            scale = (scale > 1) ? 1 : scale;
            cc.Node.prototype.onEnter.call(this);

            this.bg = new cc.Scale9Sprite("res/common/9patch.png");

            this.setPosition(cc.p(0, 0));
            this.addChild(this.bg);


            this._label = new ccui.Text();
            this._label.setAnchorPoint(cc.p(0.5, 0.5));
            this._label.setFontName("res/Font/Roboto-Black.ttf");
            this._label.setFontSize(30);
            this._label.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this._label.setColor(cc.color.WHITE);

            this._label.setString("Ban da dang ky roi phong thanh cong");
            var minBg = this._label.getContentSize().width * 1.05;
            this._label.setString(this._message);

            this._label.setScale(scale);


            this.bg.width = Math.max(minBg, this._label.getContentSize().width * 1.05);
            this.bg.height = 40;
            this.bg.addChild(this._label);
            this._label.setPosition(cc.p(this.bg.width / 2, 20));


            this.setPosition(cc.p(contentSize.width / 2, contentSize.height - 20));

            this.runAction(cc.sequence(cc.fadeIn(0.3),
                cc.delayTime(this._time),
                cc.fadeOut(0.3), cc.removeSelf()));
        }
    });


    GameToast.makeToast = function (time, message, parent) {

        if (cc.sys.isNative) {
            return Toast.makeToast(time, message, parent);
        }

        var instanceGameToast = new GameToast(time, message);
        if (parent)
            parent.addChild(instanceGameToast);
        else
            SceneMgr.getInstance().getRunningScene().addChild(instanceGameToast);
        instanceGameToast.setLocalZOrder(198);
        return instanceGameToast;
    }
}.call(this));


