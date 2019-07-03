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
var waveShaderValue = /** @class */ (function (_super) {
    __extends(waveShaderValue, _super);
    function waveShaderValue() {
        var _this = _super.call(this, 0, 0) || this;
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
    return waveShaderValue;
}(Laya.Value2D));
/*
自定义着色器
*/
var waveShader = /** @class */ (function (_super) {
    __extends(waveShader, _super);
    function waveShader() {
        //顶点着色器程序和片元着色器程序。
        var _this = this;
        var vs = "\n\t\t\tattribute vec4 position;\n\t\t\tattribute vec4 color;\n\t\t\tattribute vec2 texcoord;\n\t\t\tuniform  mat4 mmat;\n\t\t\tuniform vec2 size;\n\t\t\tvarying vec2 vTextureCoord;\n\t\t\tvarying vec4 vColor;\n\t\t\tvoid main(){\n\t\t\t\tvColor = color;\n\t\t\t\tvec4 tmpvar_3 = mmat*position;\n\t\t\t\tgl_Position =vec4((tmpvar_3.x/size.x-0.5)*2.0,(0.5-tmpvar_3.y/size.y)*2.0,tmpvar_3.z,1.0);\n\t\t\t\tvTextureCoord = texcoord;\n            }\n\t\t\t";
        // 水纹
        var ps = [
            "precision lowp float;\n" +
                "varying vec2 vTextureCoord;",
            "varying vec4 vColor;\n",
            "uniform sampler2D texture;",
            "uniform vec2 center;",
            "uniform vec3 params;",
            "uniform float timewave;",
            "void main()",
            "{",
            "vec2 uv = vTextureCoord.xy;",
            "vec2 texCoord = uv;",
            "float dist = distance(uv, center);",
            "if ( (dist <= (timewave + params.z)) && (dist >= (timewave - params.z)) )",
            "{",
            "   float diff = (dist - timewave);",
            "   float powDiff = 1.0 - pow(abs(diff*params.x), params.y);",
            "   float diffTime = diff  * powDiff;",
            "   vec2 diffUV = normalize(uv - center);",
            "   texCoord = uv + (diffUV * diffTime);",
            "}",
            "gl_FragColor = texture2D(texture, texCoord);",
            "}"
        ].join("\n");
        _this = _super.call(this, vs, ps, "waveShader") || this;
        return _this;
    }
    /**
     *当前着色器的一个实例对象
     */
    waveShader.shader = new waveShader();
    return waveShader;
}(Laya.Shader));
//# sourceMappingURL=waveShader.js.map