/**
 * Created by Admin on 8/18/2017.
 */
(function () {
    var popupManager = uc.Popup = {};

    popupManager._popups = [];

    popupManager.open = function (template, options, openCb, closeCb) {
        var curScene = uc.SceneManager.getInstance().getRunningScene();
        curScene.addGUI(template, BaseScene.INDEX_POP_UP_GUI, 0);
    };

    popupManager.closeAllPopup = function () {
        this._popups.forEach(function (item, index) {
            item.close();
        });
    };

    popupManager.alert = function (tittle, message, options) {
        var alert = new uc.Popup.alert(tittle, message, options);
        this.open(alert);
    };

    popupManager.loading = function () {
        if(this.loading) return;
        var loadingPopup = this.loading = new uc.Popup.LoadingPopup();
        this._open(this.loadingPopup);
    };

}.call(this));