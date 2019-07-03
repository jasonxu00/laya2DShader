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
var myShaderValue = /** @class */ (function (_super) {
    __extends(myShaderValue, _super);
    function myShaderValue() {
        var _this = _super.call(this, 0, 0) || this;
        _this.lightColor = [255 / 255, 255 / 255, 1, 1.0];
        _this.tweenTime = -1;
        _this.flowTween = 0.0;
        _this.center = [0.5, 0.5];
        _this.params = [10.0, 0.8, 0.1];
        _this.timewave = 0.0;
        var _vlen = 8 * Laya.CONST3D2D.BYTES_PE;
        //设置在shader程序文件里定义的属性相关描述：【属性长度，属性类型，false，属性起始位置索引*CONST3D2D.BYTES_PE】
        _this.position = [2, Laya.WebGLContext.FLOAT, false, _vlen, 0];
        _this.texcoord = [2, Laya.WebGLContext.FLOAT, false, _vlen, 2 * Laya.CONST3D2D.BYTES_PE];
        _this.color = [4, Laya.WebGLContext.FLOAT, false, _vlen, 4 * Laya.CONST3D2D.BYTES_PE];
        return _this;
    }
    return myShaderValue;
}(Laya.Value2D));
//# sourceMappingURL=myShaderValue.js.map