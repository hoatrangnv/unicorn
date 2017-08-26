(function () {

    uc.Popup.LoadingPopup = uc.Popup.BasePopup.extend({
            ctor: function (title, message, options) {
                this._super();
            },

            customizeGUI: function () {
                this._super();
                console.log("customizeGUI")
            },

            onButtonRelease: function (button, id) {
                switch (id) {
                    case BasePopup.CLOSE:
                        uc.Popup.loadingPopup.setVisible(false);
                }
            },

            onClose: function () {
                console.log("onClose loading");
                this.setVisible(false);
            }
        }
    );

}.call(this));