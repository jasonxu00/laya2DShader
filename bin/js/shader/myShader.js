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
自定义着色器
*/
var myShader = /** @class */ (function (_super) {
    __extends(myShader, _super);
    /**
     *当前着色器的一个实例对象
     */
    // public static shader: myShader = new myShader();
    function myShader(st) {
        //顶点着色器程序和片元着色器程序。
        var _this = this;
        // var vs: string = "" +
        //     "attribute vec2 position;" +
        //     "attribute vec2 texcoord;" +
        //     "attribute vec4 color;" +
        //     "uniform vec2 size;" +
        //     "uniform mat4 mmat;" +
        //     "varying vec2 v_texcoord;" +
        //     "varying vec4 v_color;" +
        //     "void main(){" +
        //         "vec4 pos =mmat*vec4(position.x,position.y,0,1);" +
        //         "gl_Position = vec4((pos.x/size.x-0.5)*2.0, (0.5-pos.y/size.y)*2.0, pos.z, 1.0);" +
        //         "v_color = color;" +
        //         "v_texcoord = texcoord;" +
        //     "}" +
        //     ""
        // var ps: string = "" +
        //     "precision mediump float;" +
        //     "varying vec2 v_texcoord;" +
        //     "varying vec4 v_color;" +
        //     "uniform sampler2D texture;" +
        //     "void main(){" +
        //         "vec4 t_color = texture2D(texture, v_texcoord);" +
        //         "gl_FragColor = t_color.rgba * v_color.rgba;" +
        //     "}";
        var vs = "\n\t\t\tattribute vec4 position;\n\t\t\tattribute vec4 color;\n\t\t\tattribute vec2 texcoord;\n\t\t\tuniform  mat4 mmat;\n\t\t\tuniform vec2 size;\n\t\t\tvarying vec2 vTextureCoord;\n\t\t\tvarying vec4 vColor;\n\t\t\tvoid main(){\n\t\t\t\tvColor = color;\n\t\t\t\tvec4 tmpvar_3 = mmat*position;\n\t\t\t\tgl_Position =vec4((tmpvar_3.x/size.x-0.5)*2.0,(0.5-tmpvar_3.y/size.y)*2.0,tmpvar_3.z,1.0);\n\t\t\t\tvTextureCoord = texcoord;\n            }\n\t\t\t";
        //流光
        var psFlow = "precision lowp float;\n" +
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
        // 水纹
        var pswave = [
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
            "float diff = (dist - timewave);",
            "float powDiff = 1.0 - pow(abs(diff*params.x), params.y);",
            "float diffTime = diff  * powDiff;",
            "vec2 diffUV = normalize(uv - center);",
            "texCoord = uv + (diffUV * diffTime);",
            "}",
            "gl_FragColor = texture2D(texture, texCoord);",
            "}"
        ].join("\n");
        // var ps: string = `
        // 	 precision mediump float;
        // 	uniform float tweenTime;
        // 	uniform  vec4 lightColor;
        // 	uniform sampler2D texture;
        // 	uniform sampler2D lightTex;
        // 	varying vec2 v_texcoord0;
        // 	varying vec4 v_color;
        // 	void main(){
        // 		vec4 col_1;
        // 		float lightU_2;
        // 		vec4 tmpvar_3;
        // 		tmpvar_3 = texture2D (texture, v_texcoord0) ;
        // 		float tmpvar_4;
        // 		tmpvar_4 = (v_texcoord0.x - tweenTime);
        // 		lightU_2 = tmpvar_4;
        // 		vec2 tmpvar_5;
        // 		tmpvar_5.x = lightU_2;
        // 		tmpvar_5.y = v_texcoord0.y;
        // 		col_1.xyz = tmpvar_3.xyz;
        // 		if(tmpvar_3.w != 0.0)
        // 		{
        // 			col_1.xyz =  col_1.xyz+(texture2D (lightTex, tmpvar_5) * lightColor).xyz;
        // 		}
        // 		col_1.w = tmpvar_3.w;
        // 		vec4 tmpvar_6;
        // 		tmpvar_6 = (col_1 *v_color );
        // 		//tmpvar_6 = tmpvar_3;
        // 		//tmpvar_6.w = tmpvar_6.w + ( 1.0 + tmpvar_6.w);
        // 		gl_FragColor = tmpvar_6;
        //     }
        // 	 `;
        var ps;
        if (st == 0)
            ps = psFlow;
        else if (st == 1)
            ps = pswave;
        _this = _super.call(this, vs, ps, "myShader") || this;
        return _this;
    }
    return myShader;
}(Laya.Shader));
//# sourceMappingURL=myShader.js.map