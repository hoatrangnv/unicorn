/**
 * Created by Admin on 8/18/2017.
 */
(function () {
    var popupManager = uc.Popup = {};

    popupManager._popups = [];

    popupManager.open = function (template, options, successCb, errorCb) {
        if(typeof template === "string"){
            template = this.getTemplateByName(template);
        }
        this._open(template, options, successCb, errorCb);

    };

    popupManager._open = function(template, options, successCb, errorCb){

            popup = new uc.codeLoading();
            popupX = popup.getPosition().x;
            popupY = popup.getPosition().y;
            var curScene = uc.SceneManager.getInstance().getRunningScene();
            curScene.addGUI(popup, BaseScene.INDEX_POP_UP_GUI, 0);
    };

    popupManager.closeAllPopup = function () {
        this._popups.forEach(function (item, index) {
            item.close();
        });
    };

}.call(this));