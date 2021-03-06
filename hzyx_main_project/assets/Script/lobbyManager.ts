// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class lobbyManager extends cc.Component {

    @property(cc.Node)
    wxSubContextView: cc.Node = null;

    @property(cc.Button)
    begin_bt: cc.Button = null;

    @property(cc.Button)
    sort_bt: cc.Button = null;

    // @property(cc.Label)
    // tips: cc.Label= null;

    // @property(cc.Sprite)
    // avatar: cc.Sprite= null;

    // @property(cc.Label)
    // nickName: cc.Label= null;

    // @property(cc.Label)
    // readme: cc.Label= null;

    // @property(cc.Node)
    // background: cc.Node

    _isShow = false;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // cc.WXSubContextView.enabled = false;

        this.begin_bt.node.on('click', this.callback_begin, this);
        this.sort_bt.node.on('click', this.callback_sort, this);
        
        this.initUserInfoButton()
    }

    // start () {
    //     this.initUserInfoButton()
    // }

    callback_begin () {
        cc.director.loadScene("game");
    }

    callback_sort () {
        this._isShow = !this._isShow;
        let _showAction = cc.moveTo(0.5, this.wxSubContextView.x, 0);
        let _hideAction = cc.moveTo(0.5, this.wxSubContextView.x, 800);
        if (this._isShow) {
            this.wxSubContextView.runAction(_showAction);
        }
        else {
            this.wxSubContextView.runAction(_hideAction);
        }

        wx.postMessage({
            message: this._isShow ? 'Show' : 'Hide'
        })
    
    }

    initUserInfoButton () {
        if (typeof wx === 'undefined') {
            return;
        }

        let systemInfo = wx.getSystemInfoSync();
        let width = systemInfo.windowWidth;
        let height = systemInfo.windowHeight;
        let button = wx.createUserInfoButton({
            type: 'text',
            text: '',
            style: {
                left: 120,
                top: 50,
                width: width,
                height: height,
                lineHeight: 40,
                backgroundColor: '#00000000',
                color: '#00000000',
                textAlign: 'center',
                fontSize: 10,
                borderRadius: 4
            }
        });

        // button.onTap((res) => {
        //     let userInfo = res.userInfo;
        //     if (!userInfo) {
        //         this.tips.string = res.errMsg;
        //         return;
        //     }

        //     this.nickName.string = userInfo.nickName;

        //     cc.loader.load({url: userInfo.avatarUrl, type: 'png'}, (err, texture) => {
        //         if (err) {
        //             console.error(err);
        //             return;
        //         }
        //         this.avatar.spriteFrame = new cc.SpriteFrame(texture);
        //     });

        //     wx.getOpenDataContext().postMessage({
        //         message: "User info get success."
        //     });

        //     this.wxSubContextView.runAction(this._showAction);
        //     this._isShow = true;

        //     button.hide();
        //     button.destroy();

        // });

        button.onTap((res) => {
            if (res.userInfo) {
                console.log("用户授权:", res);

                // wx.getUserCloudStorage({
                //     keyList: ['score'],
                //     success: function (res) {
                //         console.log('获取用户数据判断');
                //         if (res.KVDataList){
                //             console.log('已有历史数据');
                //         } else {
                //             // // 设置初始化分数
                //             // var kvDataList = new Array();
                //             // kvDataList.push({
                //             //     key: "score",
                //             //     value: "0"
                //             // });
                //             // wx.setUserCloudStorage({
                //             //     KVDataList: kvDataList
                //             // })
                //         }
                //         console.log(res.errMsg);
                //    //TODO:进行数据绑定更新
                //     }
                // });


                
                // exportJson.userInfo = res.userInfo;
                //此时可进行登录操作
                button.destroy();
            }else {
                console.log("用户拒绝授权:", res);
            }
        });
    }
}
