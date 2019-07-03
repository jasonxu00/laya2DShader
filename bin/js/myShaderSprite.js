var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
该类需继承自显示对象类
在该类中使用了自定义的着色器程序
注意：使用自定义着色器时，需要设置该显示对象类的渲染模式this._renderType |= Laya.RenderSprite.CUSTOM;并且需要重写该类的渲染处理函数
*/
var myShaderSprite = /** @class */ (function (_super) {
    __extends(myShaderSprite, _super);
    function myShaderSprite() {
        var _this = _super.call(this) || this;
        _this.iNum = 0;
        _this._tweenTick = 10000;
        _this._colorTick = 0.0;
        _this._colorIndex = 0;
        _this._tween = 0.01;
        return _this;
    }
    /*
    初始化此类
    texture 纹理对象
    vb 顶点数组
    ib 顶点索引数组
    */
    myShaderSprite.prototype.init = function (texture, st) {
        this.shader = new myShader(st);
        this._texture = texture;
        var ibArray;
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
        this.shaderValue = new myShaderValue();
        this.shaderValue.textureHost = texture;
        this._renderType |= Laya.RenderSprite.CUSTOM; //设置当前显示对象的渲染模式为自定义渲染模式
    };
    //重写渲染函数
    myShaderSprite.prototype.customRender = function (context, x, y) {
        this.updateVBData();
        this.shaderValue.tweenTime += Laya.timer.delta / 1000;
        if (this.shaderValue.tweenTime > 1) {
            this.shaderValue.tweenTime = -1;
        }
        //流光
        this.shaderValue.flowTween += 0.05;
        if (this.shaderValue.flowTween > Math.PI * 2) {
            this.shaderValue.flowTween = 0.0;
        }
        //水纹
        this.shaderValue.timewave += 0.01;
        if (this.shaderValue.timewave > 1) {
            this.shaderValue.timewave = 0.0;
        }
        context.ctx.setIBVB(x, y, (this.iBuffer), (this.vBuffer), this.iNum, null, this.shader, this.shaderValue, 0, 0);
    };
    myShaderSprite.prototype.updateVBData = function () {
        // this._tweenTick++;
        // if (this._tweenTick < 10) return;
        // this._tweenTick = 0;
        // this._colorTick += this._tween;
        // if (this._colorTick >= 1 && this._tween > 0) {
        //     this._colorIndex++;
        //     if (this._colorIndex > 2) this._colorIndex = 0;
        //     this._tween *= -1;
        //     this._colorTick = 1;
        // } else if (this._colorTick <= 0 && this._tween < 0) {
        //     this._tween *= -1;
        //     this._colorTick = 0;
        // }
        this.vBuffer = Laya.VertexBuffer2D.create();
        var vbArray = [];
        var texWidth = this._texture.width;
        var texHeight = this._texture.height;
        //定义颜色值，取值范围0~1浮点
        // var red: number = (this._colorIndex == 0) ? this._colorTick : 1;
        // var greed: number = (this._colorIndex == 1) ? this._colorTick : 1;
        // var blue: number = (this._colorIndex == 2) ? this._colorTick : 1;
        // var alpha: number = (this._colorIndex == 3) ? this._colorTick : 1;
        var red = 1;
        var greed = 1;
        var blue = 1;
        var alpha = 1;
        //在顶点数组中放入4个顶点
        //每个顶点的数据：（坐标x，坐标y，u，v，R,G,B,A）
        vbArray.push(0, 0, 0, 0, red, greed, blue, alpha);
        vbArray.push(texWidth, 0, 1, 0, red, greed, blue, alpha);
        vbArray.push(texWidth, texHeight, 1, 1, red, greed, blue, alpha);
        vbArray.push(0, texHeight, 0, 1, red, greed, blue, alpha);
        this.vbData = new Float32Array(vbArray);
        this.vBuffer.append(this.vbData);
    };
    return myShaderSprite;
}(Laya.Sprite));
//# sourceMappingURL=myShaderSprite.js.map