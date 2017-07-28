(function () {

    uc.Lobby = {};

    uc.Lobby.BaseLayer = uc.BaseLayer.extend({
        ctor: function () {
            this._super();
            this.resourcePath = "res/Lobby";
            return true;
        }
    })

}.call(this));