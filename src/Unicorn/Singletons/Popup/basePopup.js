(function () {

    var BasePopup = uc.Popup.BasePopup = uc.BaseLayer.extend({
            ctor: function () {
                this._super();
                this._showHideAnimate = true;
            },

            customizeGUI: function () {
                this.setContentSize(uc.BaseScene.MAIN_LAYER_SIZE);
                console.log("this.getContentSize()",this.getContentSize());

                var _layerColor = this._layerColor = new ccui.Layout();
                this._layerColor.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
                this._layerColor.setBackGroundColor(cc.color.BLACK);
                this._layerColor.setBackGroundColorOpacity(200);
                this._layerColor.setContentSize(uc.BaseScene.MAIN_LAYER_SIZE);
                var _self = this;

                var _contentLayer = this._contentLayer = new uc.BaseLayer();

                this.addChild(_layerColor, _contentLayer);

                this._listener = cc.EventListener.create({
                    event: cc.EventListener.TOUCH_ONE_BY_ONE,
                    swallowTouches: true,
                    onTouchBegan: function (touch, event) {
                        console.log("onTouchBegan");
                        return true;
                    },
                    onTouchMoved: function (touch, event) {

                    },
                    onTouchEnded: function (touch, event) {
                        console.log("onTouchEnded");
                        _self.onClose();
                    }
                });

                cc.eventManager.addListener(this._listener, _layerColor);

                // _layerColor.addTouchEventListener(this.onTouchEventHandler, this);

                // cc.eventManager.addListener(this._keyboardEvent, this);
            },

            onButtonRelease: function (button, id) {
                switch (id) {
                    case BasePopup.CLOSE:
                        console.log("BasePopup.CLOSE");
                        this.onClose();
                        break;
                }
            },

            onClose: function (timeAnimation) {
                console.log("onClose basePopup");
                this.removeFromParent();

                // timeAnimation = timeAnimation || 0.3;
                //
                // if (this._showHideAnimate) {
                //     this._bgShowHideAnimate.setScale(this._currentScaleBg);
                //     this._bgShowHideAnimate.runAction(cc.spawn(new cc.EaseBackIn(cc.scaleTo(timeAnimation, 1.2)), cc.fadeOut(0.2)));
                //     this.runAction(cc.sequence(cc.delayTime(timeAnimation), cc.removeSelf()));
                // } else {
                //     this.removeFromParent();
                // }
            },
            onExit : function () {
                console.log("on Exit");
            }
        }
    );

    BasePopup.CLOSE = 1;

}.call(this));