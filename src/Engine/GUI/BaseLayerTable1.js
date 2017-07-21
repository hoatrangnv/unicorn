/**
 * Created by PVC on 7/17/2017.
 */
var BaseLayerTable = BaseLayer.extend(
    {
        _titleText:null,
        _size:null,
        _btnExit:null,
        _bgTitle:null,
        _lbTitle:null,
        _bgLayer:null,
        _bgImage:null,
        _pContent:null,
        _pTab:null,
        _pControl:null,
        ctor: function (size, titltText){
            this._size = size;
            this._titleText = titltText;
            this._super("BaseLayerTable");

        },
        onEnter: function() {
            this._super();
        },
        customizeGUI: function(){
            this.addLayout(this,"_bgLayer",cc.p(640,360),null,cc.size(1280,720),true);
            this._bgLayer.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this._bgLayer.setBackGroundColor(cc.color.BLACK);
            this._bgLayer.setBackGroundColorOpacity(200);
            this.addImage(this,"_bgImage",cc.p(640,360),"res/Minigame/ImageChung/Bg_AllBang.png",this._size);
            var positionY = 360 + this._size.height/2 - 27;
            this.addImage(this,"_bgTitle",cc.p(640,positionY));

            this.addText(this,"_lbTitle",cc.p(640,positionY),this._titleText,RobotoRegular.fontName,46);
            this._lbTitle.setColor(cc.color(100,42,0));
            positionY = 360 + this._size.height/2 - 39;
            var positionX = 360 + this._size.height/2 - 39;
            this.addButton(this,"_btnExit",BaseLayerTable.BTN_EXIT,cc.p(positionX,positionY),true,"res/Minigame/ImageChung/btn_close_allbang.png","res/Minigame/ImageChung/btn_close_allbang.png");
            this.addLayout(this,"_pTab",cc.p(640,580),null,cc.size(BaseLayerTable.SIZE_TAB_W*this.getTiLeSize(),BaseLayerTable.SIZE_TAB_H*this.getTiLeSize()),false);
            this.addLayout(this,"",cc.p(640,316),null,cc.size(1002,450),true);
            //this.addLayout(this,"",cc.p())

        },
        onButtonRelease: function(btn, id){
            switch(id){
                case BaseLayerTable.BTN_EXIT:
                    this.removeFromParent();
                    break;
            }
        },
        setTitleText(text)
        {
            this._lbTitle.setString(text);
        },
        getTiLeSize: function()
        {
            return this._size.width/BaseLayerTable.SIZEW;
        }
        ,
        convertPosition:function(position)
        {
            var p = cc.p(position.x * this.getTiLeSize(),position.y*this.getTiLeSize());
            return p;
        }
    }

)

BaseLayerTable.BTN_EXIT = -1;
BaseLayerTable.SIZEW = 1096;
BaseLayerTable.SIZEH = 628;
BaseLayerTable.SIZE_TAB_W = 1002;
BaseLayerTable.SIZE_TAB_H = 40;


