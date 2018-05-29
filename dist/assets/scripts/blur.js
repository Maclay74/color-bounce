let BlurPostEffect = pc.createScript('blur');

// initialize code called once per entity
BlurPostEffect.prototype.initialize = function() {

    let device = this.app.graphicsDevice;
    let ps = this.app.assets.find("blurPS.glsl","shader").resource;

    ps = "precision " + device.precision + " float;\n" + ps;

    this.shader = pc.shaderChunks.createShaderFromCode(device, pc.shaderChunks.fullscreenQuadVS, ps, "fsQuadSimple");

    this.power = 0;

    //this.resolution = device.scope.resolve("resolution");
    //this.direction = device.scope.resolve("direction");

    this.post = new pc.PostEffectPass(this.app, {
        shader: this.shader,
        name: "BlurH",
        unmodifiedUvs: true,

        setup: () => {
           //this.resolution.setValue([device.width, device.height]);
            //this.direction.setValue([this.power, 0]);
        }
    });

    this.post.addToComposition(9);

    this.post = new pc.PostEffectPass(this.app, {
        shader: this.shader,
        name: "BlurV",
        unmodifiedUvs: true,

        setup: () => {
            //this.resolution.setValue([device.width, device.height]);
            //this.direction.setValue([0, this.power]);
        }
    });

    this.post.addToComposition(10);
};

