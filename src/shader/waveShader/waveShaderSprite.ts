/*
该类需继承自显示对象类
在该类中使用了自定义的着色器程序
注意：使用自定义着色器时，需要设置该显示对象类的渲染模式this._renderType |= Laya.RenderSprite.CUSTOM;并且需要重写该类的渲染处理函数
*/
class waveShaderSprite extends Laya.Sprite {
    /** 顶点缓冲区。		 */
    private vBuffer: laya.webgl.utils.VertexBuffer2D;
    /** 片元缓冲区。		 */
    private iBuffer: laya.webgl.utils.IndexBuffer2D;
    private vbData: Float32Array;
    private ibData: Uint16Array;
    private iNum: number = 0;
    /** 着色器变量。      */
    private shaderValue: waveShaderValue;
    private _texture: Laya.Texture;
    constructor() {
        super();
    }
    /*
    初始化此类
    texture 纹理对象
    vb 顶点数组
    ib 顶点索引数组
    */
    public init(texture: Laya.Texture): void {
        this._texture = texture;
        var ibArray: Array<any>;
        this.iBuffer = Laya.IndexBuffer2D.create();
        this.ibData = new Uint16Array([]);
        ibArray = [];
        //在顶点索引数组中放入组成三角形的顶点索引
        //三角形的顶点索引对应顶点数组vbArray里的点索引，索引从0开始
        // ibArray.push(0, 1, 5);
        // ibArray.push(1, 2, 3); 
        // ibArray.push(1, 4, 5); 
        // ibArray.push(1, 3, 4); 

        ibArray.push(0, 1, 2);
        ibArray.push(3, 0, 2);

        this.iNum = ibArray.length;
        this.ibData = new Uint16Array(ibArray);
        this.iBuffer.append(this.ibData);
        this.shaderValue = new waveShaderValue();
        this.shaderValue.textureHost = texture;
        this._renderType |= Laya.RenderSprite.CUSTOM;//设置当前显示对象的渲染模式为自定义渲染模式
        this.updateVBData();
    }

    //重写渲染函数
    public customRender(context: Laya.RenderContext, x: number, y: number): void {
        //水纹
        this.shaderValue.timewave += 0.01;
        if (this.shaderValue.timewave > 1) {
            this.shaderValue.timewave = 0.0;
        }

        context.ctx.setIBVB(x, y, (this.iBuffer) as Laya.IndexBuffer2D, (this.vBuffer) as Laya.VertexBuffer2D, this.iNum, null, waveShader.shader, this.shaderValue, 0, 0);
    }

    private updateVBData(): void {

        this.vBuffer = Laya.VertexBuffer2D.create();

        var vbArray: Array<any> = [];
        var texWidth: number = this._texture.width;
        var texHeight: number = this._texture.height;
        //定义颜色值，取值范围0~1浮点
        var red: number = 1;
        var greed: number = 1;
        var blue: number = 1;
        var alpha: number = 1;
        //在顶点数组中放入4个顶点
        //每个顶点的数据：（坐标x，坐标y，u，v，R,G,B,A）
        vbArray.push(0, 0, 0, 0, red, greed, blue, alpha);
        vbArray.push(texWidth, 0, 1, 0, red, greed, blue, alpha);
        vbArray.push(texWidth, texHeight, 1, 1, red, greed, blue, alpha);
        vbArray.push(0, texHeight, 0, 1, red, greed, blue, alpha);

        this.vbData = new Float32Array(vbArray);
        this.vBuffer.append(this.vbData);
    }

    // private _pos: number = 500;
    // private _maxPos = 500;
    // private _topOffset = 250;
    // private _tween: number = 2;
    // private updateVBData(): void {
    //     this._pos += this._tween;
    //     if (this._pos >= this._maxPos && this._tween > 0) {
    //         this._tween *= -1;
    //         this._pos = this._maxPos;
    //     } else if (this._pos <= 0 && this._tween < 0) {
    //         this._tween *= -1;
    //         this._pos = 0;
    //     }

    //     this.vBuffer = Laya.VertexBuffer2D.create();
    //     var vbArray: Array<any>;
    //     if (this._inputVB) {
    //         vbArray = this._inputVB;
    //     }
    //     else {
    //         vbArray = [];
    //         var texWidth: number = this._texture.width;
    //         var texHeight: number = this._texture.height;
    //         let pos = this._pos;
    //         let uOffset = this._topOffset / texWidth;
    //         let scaleMove = this._maxPos / texWidth - uOffset * 2;
    //         let uPos = pos / texWidth;
    //         let r = 1;
    //         //在顶点数组中放入4个顶点
    //         //每个顶点的数据：（坐标x，坐标y，u，v，R,G,B,A）
    //         vbArray.push(0, 0, uOffset + uPos * scaleMove, 0, r, 1, 1, 1);
    //         vbArray.push(texWidth * 0.5, 0, uOffset + 0.5 + uPos * scaleMove, 0, r, 1, 1, 1);
    //         vbArray.push(texWidth * 0.5, texHeight, 0.5 + uPos, 1, r, 1, 1, 1);
    //         vbArray.push(0, texHeight, 0 + uPos, 1, r, 1, 1, 1);
    //     }
    //     this.vbData = new Float32Array(vbArray);
    //     this.vBuffer.append(this.vbData);
    // }

    // private _scaleH = 0.5;

    // private updateVBData(): void {
    //     if (this.vBuffer) this.vBuffer.clear();
    //     else this.vBuffer = Laya.VertexBuffer2D.create();
    //     var vbArray: Array<any> = [];
    //     var texWidth: number = this._texture.width;
    //     var texHeight: number = this._texture.height;
    //     let r = 1;
    //     //在顶点数组中放入4个顶点
    //     //每个顶点的数据：（坐标x，坐标y，u，v，R,G,B,A）
    //     this.__pushVbArray(vbArray, texWidth * 0.25, texHeight * this._scaleH, 0, 0);
    //     this.__pushVbArray(vbArray, texWidth * 0.5, texHeight * this._scaleH, 0.5, 0);
    //     this.__pushVbArray(vbArray, texWidth * 0.75, texHeight * this._scaleH, 1, 0);
    //     this.__pushVbArray(vbArray, texWidth, texHeight, 1, 1);
    //     this.__pushVbArray(vbArray, texWidth * 0.5, texHeight, 0.5, 1);
    //     this.__pushVbArray(vbArray, 0, texHeight, 0, 1);

    //     this.vbData = new Float32Array(vbArray);
    //     this.vBuffer.append(this.vbData);
    // }

    // private __pushVbArray(vbArray: Array<any>, posx: number, posy: number, u: number, v: number) {
    //     vbArray.push(posx, posy, u, v, 1, 1, 1, 1);
    // }
}