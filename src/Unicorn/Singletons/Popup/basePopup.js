(function () {
    var root = this;

    var popup = null;
    var popupX = null;
    var popupY = null;
    var popupAppear = null;

    var alert = uc.Popup.BasePopup = uc.BaseLayer.extend({
            ctor: function (title, message, options) {
                this._super();
                this.title = title || "Thông báo";
                this.message = message || "";
                this.options = options;
            },

            customizeGUI: function () {
                this._super();
                // panel alert
                this.pn_message_small = this._layout.getChildByName("pn_message_small");
                this.bg_alert = this.pn_message_small.getChildByName("bg_alert");
                this.bg_alert.setTexture("res/ResourceMenuTab/Mail/bgtab_mail_small.png");
                this.bg_title_alert = this.pn_message_small.getChildByName("bg_title_alert");
                this.bg_title_alert.setTexture("res/ResourceMenuTab/Mail/Title.png");
                this.btn_close_pn_alert = this.customButton("btn_close_pn_alert", codeLoading.BTN_CLOSE_PANEL_ALERT, this.pn_message_small);
                this.txt_content_alert_lobby = this.getControl("txt_content_alert_lobby", this.pn_message_small);
                this.pn_message_small.setScale(0);
                this.pn_message_small.setVisible(false);
                this.callbackOK = null;

                this.pn_banner_tet = this._layout.getChildByName("pn_banner_tet");
                this.btn_close_banner_tet = this.customButton("btn_close_banner_tet", codeLoading.BTN_CLOSE_BANNER_TET, this.pn_banner_tet);
                this.btn_banner_tet = this.customButton("btn_banner_tet", codeLoading.BTN_GOTO_BANNER_TET, this.pn_banner_tet);
                this.pn_banner_tet.setScale(0);
                this.pn_banner_tet.setVisible(false);
                //showLoading();
            },
            onButtonRelease: function (button, id) {
                switch (id) {
                    case codeLoading.BTN_CLOSE_PANEL_ALERT:
                        this.pn_message_small.runAction(cc.scaleTo(0.2, 0));
                        popup.shadow_popup.setVisible(false);
                        break;
                }
            },
        }
    );

    alert.CLOSE = 1;

}.call(this));