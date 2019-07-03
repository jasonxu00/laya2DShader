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
var PerspectiveShaderSprite = /** @class */ (function (_super) {
    __extends(PerspectiveShaderSprite, _super);
    function PerspectiveShaderSprite() {
        var _this = _super.call(this) || this;
        _this.iNum = 0;
        _this.vertexPosList = [];
        _this._tweenValue = 0.0;
        _this._tweenStep = 0.01;
        return _this;
    }
    /*
    初始化此类
    texture 纹理对象
    vb 顶点数组
    ib 顶点索引数组
    */
    PerspectiveShaderSprite.prototype.init = function (texture) {
        this._texture = texture;
        var ibArray;
        this.iBuffer = Laya.IndexBuffer2D.create();
        this.ibData = new Uint16Array([]);
        ibArray = [];
        //在顶点索引数组中放入组成三角形的顶点索引
        //三角形的顶点索引对应顶点数组vbArray里的点索引，索引从0开始
        ibArray.push(0, 1, 2);
        ibArray.push(3, 0, 2);
        this.iNum = ibArray.length;
        this.ibData = new Uint16Array(ibArray);
        this.iBuffer.append(this.ibData);
        this.shaderValue = new PerspectiveShaderValue();
        this.shaderValue.textureHost = texture;
        this._renderType |= Laya.RenderSprite.CUSTOM; //设置当前显示对象的渲染模式为自定义渲染模式
        var texWidth = this._texture.width;
        var texHeight = this._texture.height;
        this.vertexPosList[0] = new Laya.Point(-0.1, 0.1);
        this.vertexPosList[1] = new Laya.Point(0.7, 0.5);
        this.vertexPosList[2] = new Laya.Point(1, 0.9);
        this.vertexPosList[3] = new Laya.Point(0, 1.05);
        this.updateVBData();
    };
    //重写渲染函数
    PerspectiveShaderSprite.prototype.customRender = function (context, x, y) {
        this.tween();
        this.updateVBData();
        context.ctx.setIBVB(x, y, (this.iBuffer), (this.vBuffer), this.iNum, null, PerspectiveShader.shader, this.shaderValue, 0, 0);
    };
    PerspectiveShaderSprite.prototype.tween = function () {
        this._tweenValue += this._tweenStep;
        if (this._tweenValue > 1) {
            this._tweenValue = 1;
            this._tweenStep *= -1;
        }
        if (this._tweenValue < 0) {
            this._tweenValue = 0;
            this._tweenStep *= -1;
        }
        // this._tweenValue = 0;
        var texWidth = this._texture.width;
        var texHeight = this._texture.height;
        this.vertexPosList[0].x = -0.05 + this._tweenValue * 0.4;
        this.vertexPosList[1].x = 1 + 0.05 - 0.4 + this._tweenValue * 0.4;
        this.vertexPosList[2].x = 1.0 - 0.0 - 0.05 + this._tweenValue * 0.05;
        this.vertexPosList[3].x = 0.0 + this._tweenValue * 0.05;
        this.vertexPosList[0].y = 0.2 + this._tweenValue * 0.4;
        this.vertexPosList[1].y = 0.2 + 0.4 - this._tweenValue * 0.4;
        this.vertexPosList[2].y = 1; //0.95 + this._tweenValue * 0.1;
        this.vertexPosList[3].y = 1; //1.05 - this._tweenValue * 0.1;
    };
    PerspectiveShaderSprite.prototype.updateVBData = function () {
        if (this.vBuffer)
            this.vBuffer.clear();
        else
            this.vBuffer = Laya.VertexBuffer2D.create();
        var vbArray = [];
        var texWidth = this._texture.width;
        var texHeight = this._texture.height;
        //四个顶点坐标
        var p0x = this.vertexPosList[0].x * texWidth;
        var p0y = this.vertexPosList[0].y * texHeight;
        var u0 = 0;
        var v0 = 0;
        var p1x = this.vertexPosList[1].x * texWidth;
        var p1y = this.vertexPosList[1].y * texHeight;
        var u1 = 1;
        var v1 = 0;
        var p2x = this.vertexPosList[2].x * texWidth;
        var p2y = this.vertexPosList[2].y * texHeight;
        var u2 = 1;
        var v2 = 1;
        var p3x = this.vertexPosList[3].x * texWidth;
        var p3y = this.vertexPosList[3].y * texHeight;
        var u3 = 0;
        var v3 = 1;
        var ax = p2x - p0x;
        var ay = p2y - p0y;
        var bx = p3x - p1x;
        var by = p3y - p1y;
        var cross = ax * by - ay * bx;
        if (cross != 0) {
            var cy = p0y - p1y;
            var cx = p0x - p1x;
            var s = (ax * cy - ay * cx) / cross;
            if (s > 0 && s < 1) {
                var t = (bx * cy - by * cx) / cross;
                if (t > 0 && t < 1) {
                    var q0 = 1 / (1 - t);
                    var q1 = 1 / (1 - s);
                    var q2 = 1 / t;
                    var q3 = 1 / s;
                    //在顶点数组中放入4个顶点
                    this.__pushVbArray(vbArray, p0x, p0y, u0 * q0, v0 * q0, q0);
                    this.__pushVbArray(vbArray, p1x, p1y, u1 * q1, v1 * q1, q1);
                    this.__pushVbArray(vbArray, p2x, p2y, u2 * q2, v2 * q2, q2);
                    this.__pushVbArray(vbArray, p3x, p3y, u3 * q3, v3 * q3, q3);
                    // you can now pass (u * q, v * q, q) to OpenGL
                }
            }
        }
        //在顶点数组中放入4个顶点
        // this.__pushVbArray(vbArray, 0, 0, 0, 0);
        // this.__pushVbArray(vbArray, texWidth, 0, 1, 0);
        // this.__pushVbArray(vbArray, texWidth, texHeight, 1, 1);
        // this.__pushVbArray(vbArray, 0, texHeight, 0, 1);
        this.vbData = new Float32Array(vbArray);
        this.vBuffer.append(this.vbData);
    };
    PerspectiveShaderSprite.prototype.__pushVbArray = function (vbArray, posx, posy, uq, vq, q) {
        //每个顶点的数据：（坐标x，坐标y，uq，vq，q,R,G,B,A）
        vbArray.push(posx, posy, uq, vq, q, 1, 1, 1, 1);
    };
    return PerspectiveShaderSprite;
}(Laya.Box));
//# sourceMappingURL=PerspectiveShaderSprite.js.map