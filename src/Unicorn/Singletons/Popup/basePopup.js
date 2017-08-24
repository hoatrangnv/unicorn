(function () {

    var BasePopup = uc.Popup.BasePopup = uc.BaseLayer.extend({
            ctor: function () {
                this._super();
                this._showHideAnimate = true;
            },

            customizeGUI: function () {
                this.setContentSize(uc.BaseScene.MAIN_LAYER_SIZE);

                var _layerColor = this._layerColor = new cc.LayerColor(cc.BLACK);
                this.addChild(this._layerColor);


                var _contentLayer = this._contentLayer = new uc.BaseLayer();
                this.addChild(this._layerColor, this._contentLayer);

                _layerColor.addTouchEventListener(this.onTouchEventHandler, this);

                cc.eventManager.addListener(this._keyboardEvent, this);
            },

            onButtonRelease: function (button, id) {
                switch (id) {
                    case BasePopup.CLOSE:
                        this.onClose();
                        this.pn_message_small.runAction(cc.scaleTo(0.2, 0));
                        popup.shadow_popup.setVisible(false);
                        break;
                }
            },

            onClose: function (timeAnimation) {
                console.log(onClose);
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
            }
        }
    );

    BasePopup.CLOSE = 1;

}.call(this));