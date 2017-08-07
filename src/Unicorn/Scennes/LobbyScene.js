(function () {

    var instance = undefined;

    uc.LobbyScene = function () {
        if (instance)
            return instance;
        else
            return instance = new _LobbyScene();
    };

    var _LobbyScene = uc.BaseScene.extend({
        ctor: function () {
            this._super();
        },

        listenAdapter: function () {
            var lobbyAdapter = uc.adapterManager.getAdapterByName("lobby");

            lobbyAdapter.on("openGame", this.openGame.bind(this));
        },

        onEnter: function () {
            this._super();

            var lobbyLayer = new uc.Lobby.MainLayer();
            this.mainContent.addChild(lobbyLayer);
        },
        getMainContentSize: function () {
            return this.mainContent.getContentSize();
        },
        openGame : function () {
            var coCaroScene = new uc.Caro.CoCaroScene();
            var lobbyScene = uc.LobbyScene();
            this.GAME_GUI.addChild(coCaroScene);
        }
    });

}.call(this));





