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
        // Laya3D.init(0, 0,true);
        // Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        // Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        // Laya.Stat.show();
        // var scene = Laya.Scene.load("LayaScene_scene1/scene1.ls");
        // Laya.stage.addChild(scene);
        // //创建摄像机(横纵比，近距裁剪，远距裁剪)
        // var camera = new Laya.Camera(0, 0.3, 1000);
        // //加载到场景
        // scene.addChild(camera);
        // //移动摄像机位置
        // camera.transform.position = new Laya.Vector3(0, 0, 10);
        // //旋转摄像机角度
        // camera.transform.rotate(new Laya.Vector3(0, 0, 0), true, false);
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