
class PerspectiveShaderValue extends Laya.Value2D {
    public texcoord: any;

    public center: any = [0.5, 0.5];
    public params = [10.0, 0.8, 0.1];
    public timewave = 0.0;



    constructor() {
        super(0, 0);

        var _vlen: number = 9 * Laya.CONST3D2D.BYTES_PE;
        //设置在shader程序文件里定义的属性相关描述：【属性长度，属性类型，false，属性起始位置索引*CONST3D2D.BYTES_PE】
        this.position = [2, Laya.WebGLContext.FLOAT, false, _vlen, 0];
        this.texcoord = [3, Laya.WebGLContext.FLOAT, false, _vlen, 2 * Laya.CONST3D2D.BYTES_PE];
        this.color = [4, Laya.WebGLContext.FLOAT, false, _vlen, 5 * Laya.CONST3D2D.BYTES_PE];

    }
}

/*
自定义着色器
*/
class PerspectiveShader extends Laya.Shader {
    /**
     *当前着色器的一个实例对象 
     */
    public static shader: PerspectiveShader = new PerspectiveShader();
    constructor() {
        //顶点着色器程序和片元着色器程序。

        var vs: string = `
            attribute vec2 position;
            attribute vec3 texcoord;
            attribute vec4 color;
            uniform vec2 size;
            uniform mat4 mmat;
            varying vec3 v_texcoord;
            varying vec4 v_color;
            void main(){
                vec4 pos =mmat*vec4(position.x,position.y,0,1);
                gl_Position = vec4((pos.x/size.x-0.5)*2.0, (0.5-pos.y/size.y)*2.0, pos.z, 1.0);
                v_color = color;
                v_texcoord = texcoord;
            }`;

        var ps: string = `
            precision mediump float;
            varying vec3 v_texcoord;
            varying vec4 v_color;
            uniform sampler2D texture;
            void main(){
                vec4 t_color = texture2D(texture, v_texcoord.xy / v_texcoord.z);
                gl_FragColor = t_color.rgba * v_color.rgba;
            }`;


        super(vs, ps, "PerspectiveShader");
    }
}