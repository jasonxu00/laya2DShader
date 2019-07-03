
class flowShaderValue extends Laya.Value2D {
    public texcoord: any;
    public lightColor: any = [255 / 255, 255 / 255, 1, 1.0];

    public flowTween = 0.0;    


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
class flowShader extends Laya.Shader {
    /**
     *当前着色器的一个实例对象 
     */
    public static shader: flowShader = new flowShader();
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
        //流光
        let ps =
            "precision lowp float;\n" +
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

        super(vs, ps, "flowShader");
    }
}