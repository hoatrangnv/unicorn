/**
 * Created by Admin on 8/18/2017.
 */
(function () {
    var popupManager = uc.Popup = {};

    popupManager._popups = [];

    popupManager.open = function (template, options, openCb, closeCb) {
        var curScene = uc.SceneManager.getInstance().getRunningScene();
        curScene.addGUI(template, uc.BaseScene.INDEX_POP_UP_GUI, 0);
    };

    popupManager.closeAllPopup = function () {
        this._popups.forEach(function (item, index) {
            item.close();
        });
    };

    popupManager.alert = function (tittle, message, options) {
        var alert = new uc.Popup.Alert(tittle, message, options);
        this.open(alert);
    };

    popupManager.loading = function () {
        // if(this._isloading) return;
        if(!this.loadingPopup) {
            this.loadingPopup = new uc.Popup.LoadingPopup();
            this.open(this.loadingPopup);
        }else{
            this.loadingPopup.reOpen();
        }
    };

}.call(this));