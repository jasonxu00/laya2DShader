var WebGL = Laya.WebGL;
// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        Laya.init(1900, 800, WebGL);
        Laya.stage.bgColor = "#cfcfcf";
        //加载一张图片
        var skinUrl = "res/Grid.png";
        Laya.loader.load(skinUrl, Laya.Handler.create(this, this.loadComplete, [skinUrl]));
        Laya.loader.load(skinUrl, Laya.Handler.create(this, this.loadComplete2, [skinUrl]));
        // // //加载一张图片
        // let url = "1.png";
        // Laya.loader.load(url, Laya.Handler.create(this, this.loadComplete3, [url]));
    }
    GameMain.prototype.loadComplete = function (skinUrl) {
        var texture = Laya.Loader.getRes(skinUrl);
        var spe2 = new PerspectiveShaderSprite();
        spe2.init(texture);
        spe2.pos(20, 20);
        Laya.stage.addChild(spe2);
        // var spe2: waveShaderSprite = new waveShaderSprite();
        // spe2.init(texture);
        // spe2.pos(20, 20);
        // Laya.stage.addChild(spe2);
        // var spe: flowShaderSprite = new flowShaderSprite();
        // spe.init(texture);
        // spe.pos(850, 20);
        // Laya.stage.addChild(spe);
    };
    GameMain.prototype.loadComplete2 = function (skinUrl) {
        // var texture: Laya.Texture = Laya.Loader.getRes(skinUrl);
        // var spe2: waveShaderSprite = new waveShaderSprite();
        // spe2.init(texture);
        // spe2.pos(texture.width + 40, 20);
        // Laya.stage.addChild(spe2);
        var img = new Laya.Image(skinUrl);
        img.pos(img.width + 40, 20);
        Laya.stage.addChild(img);
    };
    GameMain.prototype.loadComplete3 = function (skinUrl) {
        var img = new Laya.Image(skinUrl);
        img.pos(620, 20);
        Laya.stage.addChild(img);
    };
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=LayaSample.js.map