import WebGL = Laya.WebGL;
// 程序入口
class GameMain {
    private
    constructor() {
        Laya.init(1900, 800, WebGL);
        Laya.stage.bgColor = "#cfcfcf";

        //加载一张图片
        let skinUrl = "res/Grid.png";
        Laya.loader.load(skinUrl, Laya.Handler.create(this, this.loadComplete, [skinUrl]));
        Laya.loader.load(skinUrl, Laya.Handler.create(this, this.loadComplete2, [skinUrl]));
        // // //加载一张图片
        // let url = "1.png";
        // Laya.loader.load(url, Laya.Handler.create(this, this.loadComplete3, [url]));

    }

    private loadComplete(skinUrl: string): void {
        var texture: Laya.Texture = Laya.Loader.getRes(skinUrl);

        var spe2: PerspectiveShaderSprite = new PerspectiveShaderSprite();
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

    }

    private loadComplete2(skinUrl: string): void {
        // var texture: Laya.Texture = Laya.Loader.getRes(skinUrl);
        // var spe2: waveShaderSprite = new waveShaderSprite();
        // spe2.init(texture);
        // spe2.pos(texture.width + 40, 20);
        // Laya.stage.addChild(spe2);
        let img = new Laya.Image(skinUrl);
        img.pos(img.width + 40, 20);
        Laya.stage.addChild(img);
    }

    private loadComplete3(skinUrl: string): void {
        let img = new Laya.Image(skinUrl);
        img.pos(620, 20);
        Laya.stage.addChild(img);
    }
}
new GameMain();