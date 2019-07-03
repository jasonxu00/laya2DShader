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
var flowShaderValue = /** @class */ (function (_super) {
    __extends(flowShaderValue, _super);
    function flowShaderValue() {
        var _this = _super.call(this, 0, 0) || this;
        _this.lightColor = [255 / 255, 255 / 255, 1, 1.0];
        _this.flowTween = 0.0;
        var _vlen = 8 * Laya.CONST3D2D.BYTES_PE;
        //设置在shader程序文件里定义的属性相关描述：【属性长度，属性类型，false，属性起始位置索引*CONST3D2D.BYTES_PE】
        _this.position = [2, Laya.WebGLContext.FLOAT, false, _vlen, 0];
        _this.texcoord = [2, Laya.WebGLContext.FLOAT, false, _vlen, 2 * Laya.CONST3D2D.BYTES_PE];
        _this.color = [4, Laya.WebGLContext.FLOAT, false, _vlen, 4 * Laya.CONST3D2D.BYTES_PE];
        return _this;
    }
    return flowShaderValue;
}(Laya.Value2D));
/*
自定义着色器
*/
var flowShader = /** @class */ (function (_super) {
    __extends(flowShader, _super);
    function flowShader() {
        //顶点着色器程序和片元着色器程序。
        var _this = this;
        var vs = "\n\t\t\tattribute vec4 position;\n\t\t\tattribute vec4 color;\n\t\t\tattribute vec2 texcoord;\n\t\t\tuniform  mat4 mmat;\n\t\t\tuniform vec2 size;\n\t\t\tvarying vec2 vTextureCoord;\n\t\t\tvarying vec4 vColor;\n\t\t\tvoid main(){\n\t\t\t\tvColor = color;\n\t\t\t\tvec4 tmpvar_3 = mmat*position;\n\t\t\t\tgl_Position =vec4((tmpvar_3.x/size.x-0.5)*2.0,(0.5-tmpvar_3.y/size.y)*2.0,tmpvar_3.z,1.0);\n\t\t\t\tvTextureCoord = texcoord;\n            }\n\t\t\t";
        //流光
        var ps = "precision lowp float;\n" +
            "varying vec2 vTextureCoord;\n" +
            "varying vec4 vColor;\n" +
            "uniform sampler2D texture;\n" +
            "uniform float flowTween;\n" +
            "void main(void) {\n" +
            "vec2 uvs = vTextureCoord.xy;\n" +
            "vec4 fg = texture2D(texture, vTextureCoord);\n" +
            "fg.rgb += sin(flowTween + uvs.x * 4. + uvs.y * 4.) * 0.1;\n" +
            "gl_FragColor = fg * vColor;\n" +
            "}";
        _this = _super.call(this, vs, ps, "flowShader") || this;
        return _this;
    }
    /**
     *当前着色器的一个实例对象
     */
    flowShader.shader = new flowShader();
    return flowShader;
}(Laya.Shader));
//# sourceMappingURL=flowShader.js.map