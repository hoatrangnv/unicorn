(function () {

    uc.Lobby = {};

    uc.Lobby.BaseLayer = uc.BaseLayer.extend({
        ctor: function () {
            this._super();
            this.resourcePath = "res/Lobby";
        },
        onEnter: function () {
            this._super();
        },
    })

}.call(this));