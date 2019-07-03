/*
该类需继承自显示对象类
在该类中使用了自定义的着色器程序
注意：使用自定义着色器时，需要设置该显示对象类的渲染模式this._renderType |= Laya.RenderSprite.CUSTOM;并且需要重写该类的渲染处理函数
*/
class PerspectiveShaderSprite extends Laya.Box {
    /** 顶点缓冲区。		 */
    private vBuffer: laya.webgl.utils.VertexBuffer2D;
    /** 片元缓冲区。		 */
    private iBuffer: laya.webgl.utils.IndexBuffer2D;
    private vbData: Float32Array;
    private ibData: Uint16Array;
    private iNum: number = 0;
    private vertexPosList: Array<Laya.Point> = [];
    /** 着色器变量。      */
    private shaderValue: PerspectiveShaderValue;
    private _texture: Laya.Texture;
    constructor() {
        super();
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onClickSelf);
    }
    /*
    初始化此类
    texture 纹理对象
    vb 顶点数组
    ib 顶点索引数组
    */
    public init(texture: Laya.Texture): void {
        this._texture = texture;
        var ibArray: Array<any>;
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
        this.shaderValue = new PerspectiveShaderValue();
        this.shaderValue.textureHost = texture;
        this._renderType |= Laya.RenderSprite.CUSTOM;//设置当前显示对象的渲染模式为自定义渲染模式


        var texWidth: number = this._texture.width;
        var texHeight: number = this._texture.height;
        this.vertexPosList[0] = new Laya.Point(0, texHeight * 0.5);
        this.vertexPosList[1] = new Laya.Point(texWidth, texHeight * 0.5);
        this.vertexPosList[2] = new Laya.Point(texWidth, texHeight);
        this.vertexPosList[3] = new Laya.Point(0, texHeight);

        //mask
        let mask = new Laya.Sprite();
        mask.graphics.drawRect(0,0,200,200, 0xffffff);
        this.addChild(mask);
        mask.pos(200, texHeight - 200);
        this.mask = mask;
    }

    //重写渲染函数
    public customRender(context: Laya.RenderContext, x: number, y: number): void {
        this.tween();
        this.updateVBData();
        context.ctx.setIBVB(x, y, (this.iBuffer) as Laya.IndexBuffer2D, (this.vBuffer) as Laya.VertexBuffer2D, this.iNum, null, PerspectiveShader.shader, this.shaderValue, 0, 0);
    }

    private onClickSelf(event: Laya.Event): void {
        if (1 + 1 == 2) return;
        if (event.stageX > this._texture.width + 40) return;
        if (event.stageY > this._texture.height + 40) return;
        let index = 0;
        let centerX = this._texture.width * 0.5 + 20;
        let centerY = this._texture.height * 0.5 + 20;
        if (event.stageX > centerX && event.stageY <= centerY) index = 1;
        if (event.stageX > centerX && event.stageY > centerY) index = 2;
        if (event.stageX <= centerX && event.stageY > centerY) index = 3;

        this.vertexPosList[index].x = event.stageX - 20;
        this.vertexPosList[index].y = event.stageY - 20;
        this.updateVBData();
    }

    private _tweenValue: number = 0.0;
    private _tweenStep: number = 0.01;
    private tween(): void {
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
        var texWidth: number = this._texture.width;
        var texHeight: number = this._texture.height;
        this.vertexPosList[0].y = (0.45 + this._tweenValue * 0.2) * texHeight;
        this.vertexPosList[1].y = (0.65 - this._tweenValue * 0.2) * texHeight;
        this.vertexPosList[2].y = (0.95 + this._tweenValue * 0.1) * texHeight;
        this.vertexPosList[3].y = (1.05 - this._tweenValue * 0.1) * texHeight;

        this.vertexPosList[0].x = (0.1 + this._tweenValue * 0.25) * texWidth;
        this.vertexPosList[1].x = (1 - 0.1 - 0.25 + this._tweenValue * 0.25) * texWidth;
        this.vertexPosList[2].x = (1.0 - 0.0 - 0.05 + this._tweenValue * 0.05) * texWidth;
        this.vertexPosList[3].x = (0.0 + this._tweenValue * 0.05) * texWidth;

    }

    private updateVBData(): void {
        if (this.vBuffer) this.vBuffer.clear();
        else this.vBuffer = Laya.VertexBuffer2D.create();
        var vbArray: Array<any> = [];
        var texWidth: number = this._texture.width;
        var texHeight: number = this._texture.height;

        //四个顶点坐标
        let p0x = this.vertexPosList[0].x;
        let p0y = this.vertexPosList[0].y;
        let u0 = 0;
        let v0 = 0;

        let p1x = this.vertexPosList[1].x;
        let p1y = this.vertexPosList[1].y;
        let u1 = 1;
        let v1 = 0;

        let p2x = this.vertexPosList[2].x;
        let p2y = this.vertexPosList[2].y;
        let u2 = 1;
        let v2 = 1;

        let p3x = this.vertexPosList[3].x;
        let p3y = this.vertexPosList[3].y;
        let u3 = 0;
        let v3 = 1;

        let ax = p2x - p0x;
        let ay = p2y - p0y;
        let bx = p3x - p1x;
        let by = p3y - p1y;

        let cross = ax * by - ay * bx;

        if (cross != 0) {
            let cy = p0y - p1y;
            let cx = p0x - p1x;

            let s = (ax * cy - ay * cx) / cross;

            if (s > 0 && s < 1) {
                let t = (bx * cy - by * cx) / cross;

                if (t > 0 && t < 1) {
                    let q0 = 1 / (1 - t);
                    let q1 = 1 / (1 - s);
                    let q2 = 1 / t;
                    let q3 = 1 / s;

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
    }

    private __pushVbArray(vbArray: Array<any>, posx: number, posy: number, uq: number, vq: number, q: number) {

        //每个顶点的数据：（坐标x，坐标y，uq，vq，q,R,G,B,A）
        vbArray.push(posx, posy, uq, vq, q, 1, 1, 1, 1);
    }
}