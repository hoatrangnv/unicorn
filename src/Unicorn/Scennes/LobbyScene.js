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

    onEnter: function () {
      this._super();
      var lobbyLayer = new uc.Lobby.MainLayer();
      this.addChild(lobbyLayer);
    },
  });

}.call(this));





