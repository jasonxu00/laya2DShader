
class waveShaderValue extends Laya.Value2D {
    public texcoord: any;

    public center: any = [0.5, 0.5];
    public params = [10.0, 0.8, 0.1];
    public timewave = 0.0;



    constructor() {
        super(0, 0);

        var _vlen: number = 8 * Laya.CONST3D2D.BYTES_PE;
        //设置在shader程序文件里定义的属性相关描述：【属性长度，属性类型，false，属性起始位置索引*CONST3D2D.BYTES_PE】
        this.position = [2, Laya.WebGLContext.FLOAT, false, _vlen, 0];
        this.texcoord = [2, Laya.WebGLContext.FLOAT, false, _vlen, 2 * Laya.CONST3D2D.BYTES_PE];
        this.color = [4, Laya.WebGLContext.FLOAT, false, _vlen, 4 * Laya.CONST3D2D.BYTES_PE];

    }
}

/*
自定义着色器
*/
class waveShader extends Laya.Shader {
    /**
     *当前着色器的一个实例对象 
     */
    public static shader: waveShader = new waveShader();
    constructor() {
        //顶点着色器程序和片元着色器程序。

        var vs: string = `
			attribute vec4 position;
			attribute vec4 color;
			attribute vec2 texcoord;
			uniform  mat4 mmat;
			uniform vec2 size;
			varying vec2 vTextureCoord;
			varying vec4 vColor;
			void main(){
				vColor = color;
				vec4 tmpvar_3 = mmat*position;
				gl_Position =vec4((tmpvar_3.x/size.x-0.5)*2.0,(0.5-tmpvar_3.y/size.y)*2.0,tmpvar_3.z,1.0);
				vTextureCoord = texcoord;
            }
			`;

        // 水纹
        let ps = [
            "precision lowp float;\n" +
            "varying vec2 vTextureCoord;",
            "varying vec4 vColor;\n",
            "uniform sampler2D texture;",

            "uniform vec2 center;",
            "uniform vec3 params;", // 10.0, 0.8, 0.1"
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
        super(vs, ps, "waveShader");
    }
}