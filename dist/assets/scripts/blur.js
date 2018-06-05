let BlurPostEffect = pc.createScript('blur');

// initialize code called once per entity
BlurPostEffect.prototype.initialize = function() {

    let device = this.app.graphicsDevice;
    let ps = this.app.assets.find("blurPS.glsl","shader").resource;
    ps = "precision " + device.precision + " float;\n" + ps;
    this.shader = pc.shaderChunks.createShaderFromCode(device, pc.shaderChunks.fullscreenQuadVS, ps, "blur");


    let psQuad = "precision " + device.precision + " float;\n\n" + this.app.assets.find("blurExcludePS.glsl","shader").resource;
    this.drawQuadShader = pc.shaderChunks.createShaderFromCode(device, pc.shaderChunks.fullscreenQuadVS, psQuad, "drawQuad");

    this.power = 0;

    this.resolution = device.scope.resolve("resolution");
    this.direction = device.scope.resolve("direction");
    this.source = device.scope.resolve("uExcludeBuffer");

    let resolution = [
        414, 736
    ]

    this.post = new pc.PostEffectPass(this.app, {
        shader: this.shader,
        name: "BlurH",
        unmodifiedUvs: true,

        setup: () => {
           this.resolution.setValue(resolution);
           this.direction.setValue([this.power, 0]);
        }
    });

    this.post.addToComposition(11);

    this.post = new pc.PostEffectPass(this.app, {
        shader: this.shader,
        name: "BlurV",
        unmodifiedUvs: false,

        setup: () => {
            this.resolution.setValue(resolution);
            this.direction.setValue([0, this.power]);
        }
    });

    this.post.addToComposition(12);

    this.post = new pc.PostEffectPass(this.app, {
        blending: true,
        shader: this.drawQuadShader,
        name: "Blur-Extended",
        unmodifiedUvs: false,
        setup: () => {
            this.source.setValue(game.blurExtrudeLayer.renderTarget.colorBuffer);
        }
    });

    this.post.addToComposition(13);
};

