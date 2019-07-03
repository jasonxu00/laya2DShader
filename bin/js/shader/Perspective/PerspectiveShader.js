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
var PerspectiveShaderValue = /** @class */ (function (_super) {
    __extends(PerspectiveShaderValue, _super);
    function PerspectiveShaderValue() {
        var _this = _super.call(this, 0, 0) || this;
        _this.center = [0.5, 0.5];
        _this.params = [10.0, 0.8, 0.1];
        _this.timewave = 0.0;
        var _vlen = 9 * Laya.CONST3D2D.BYTES_PE;
        //设置在shader程序文件里定义的属性相关描述：【属性长度，属性类型，false，属性起始位置索引*CONST3D2D.BYTES_PE】
        _this.position = [2, Laya.WebGLContext.FLOAT, false, _vlen, 0];
        _this.texcoord = [3, Laya.WebGLContext.FLOAT, false, _vlen, 2 * Laya.CONST3D2D.BYTES_PE];
        _this.color = [4, Laya.WebGLContext.FLOAT, false, _vlen, 5 * Laya.CONST3D2D.BYTES_PE];
        return _this;
    }
    return PerspectiveShaderValue;
}(Laya.Value2D));
/*
自定义着色器
*/
var PerspectiveShader = /** @class */ (function (_super) {
    __extends(PerspectiveShader, _super);
    function PerspectiveShader() {
        //顶点着色器程序和片元着色器程序。
        var _this = this;
        var vs = "\n            attribute vec2 position;\n            attribute vec3 texcoord;\n            attribute vec4 color;\n            uniform vec2 size;\n            uniform mat4 mmat;\n            varying vec3 v_texcoord;\n            varying vec4 v_color;\n            void main(){\n                vec4 pos =mmat*vec4(position.x,position.y,0,1);\n                gl_Position = vec4((pos.x/size.x-0.5)*2.0, (0.5-pos.y/size.y)*2.0, pos.z, 1.0);\n                v_color = color;\n                v_texcoord = texcoord;\n            }";
        var ps = "\n            precision mediump float;\n            varying vec3 v_texcoord;\n            varying vec4 v_color;\n            uniform sampler2D texture;\n            void main(){\n                vec4 t_color = texture2D(texture, v_texcoord.xy / v_texcoord.z);\n                gl_FragColor = t_color.rgba * v_color.rgba;\n            }";
        _this = _super.call(this, vs, ps, "PerspectiveShader") || this;
        return _this;
    }
    /**
     *当前着色器的一个实例对象
     */
    PerspectiveShader.shader = new PerspectiveShader();
    return PerspectiveShader;
}(Laya.Shader));
//# sourceMappingURL=PerspectiveShader.js.map