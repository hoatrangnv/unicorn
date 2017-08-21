//
(function () {
    var root = this;

    var RoomLock = uc.RoomLock = cc.Class.extend({
        ctor:function(getId, numJoin){
            this.roomId = getId;
            this.numJoin = numJoin;
        }
    });
}.call(this));