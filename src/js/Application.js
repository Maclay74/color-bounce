import Scene from "./Scene";
import MainMenu from "./scenes/MainMenu";
import Customize from "./scenes/Customize";
import GameLoop from "./scenes/GameLoop";
import CustomizeBall from "./scenes/CustomizeBall";

export default class Application {

    configFile = "config/game.json";



    camera = new pc.Entity('camera');
    cameraTargetPosition = new pc.Vec3();
    cameraTargetRotation = new pc.Quat(0, 1, 0, 1);

    cameraMovingSpeed = 5;
    cameraRotationSpeed = 5;

    ballStyleId = 0;

    light = new pc.Entity('light');
    screen = new pc.Entity("screen");
    ball = new pc.Entity("ball");

    constructor(app) {

        this.app = app;
        this.scene = new Scene(this.app, this);

        // Set up game events
        this.events();

        // Get config and apply some settings
        this.loadConfig()
            .then(this.initVk.bind(this))
            .then(this.preloadAssets.bind(this))
            .then(this.hierarchy.bind(this))
            .then(() => {
                app.fire("game:menu");
            })
    }

    loadConfig() {
        return new Promise((resolve, reject) => {
            axios.get(this.configFile).then(config => {
                if (!config || !config.data) reject("An error occurred when loading config file");

                this.config = config.data;
                resolve(this.config);
            });
        })
    }

    events() {
        this.app.on("scene:set", scene => {
            this.scene = new scene(this.app, this);
        });

        this.app.on("game:menu", () => {
            this.scene.hide().then(() => {
                this.app.fire("scene:set", MainMenu);
            })
        });

        this.app.on("game:start", () => {
            this.scene.hide().then(() => {
                this.app.fire("scene:set", GameLoop);
            })
        })

        this.app.on("game:customize", () => {
            this.scene.hide().then(() => {
                this.app.fire("scene:set", Customize);
            })
        })

        this.app.on("game:customize:ball", () => {
            this.scene.hide().then(() => {
                this.app.fire("scene:set", CustomizeBall);
            })
        })

        this.app.on("game:customize:background", () => {

            this.setVkVar("ballStyle", 0);

            //todo implement that
            return;

            this.scene.hide().then(() => {
                this.app.fire("scene:set", CustomizeBackground);
            })
        })


        this.app.on("update", dt => {
            this.update(dt);
        });
    }

    update(dt) {

        // Move the camera
        let cameraPosition = this.camera.getPosition().clone();
        cameraPosition.lerp(cameraPosition, this.cameraTargetPosition, this.cameraMovingSpeed * dt);
        this.camera.setPosition(cameraPosition);

        // Rotate the camera
        let cameraRotation = this.camera.getRotation().clone();
        cameraRotation = cameraRotation.slerp(cameraRotation, this.cameraTargetRotation, this.cameraRotationSpeed * dt);
        this.camera.setRotation(cameraRotation);
    }

    preloadAssets() {
        return new Promise(resolve => {

            this.getAssets().then(assets => {
                let requests = assets.map(asset => Application.loadAsset(...asset));
                Promise.all(requests).then(assets => {
                    return resolve(assets);
                });
            });
        })
    }

    static createBall(ballId) {

        let assetUrl = `assets/models/ball/${ballId}/ball-model.json`;

        let ball = new pc.Entity("ball");
        ball.visual = new pc.Entity("ball-visual");
        ball.contact = null;

        ball.visual.addComponent("model", {
            type: "asset",
            castShadows: true,
            receiveShadows: false
        });

        ball.visual.addComponent("collision", {
            radius: 0,
            type: "sphere"
        });

        ball.visual.addComponent("rigidbody", {
            type: pc.RIGIDBODY_TYPE_KINEMATIC,
            linearDamping: 0,
            angularDamping: 0,
            linearFactor: new pc.Vec3(0, 0, 0),
            angularFactor: pc.Vec3.ZERO,
            friction: 0,
            restitution: 0
        });

        ball.visual.removeComponent("collision");

        Application.loadAsset(assetUrl, "model").then(asset => {
            ball.visual.removeComponent("model");
            ball.visual.addComponent("model", {
                asset: asset
            });

            ball.visual.model.model.meshInstances[0].material = material;
        });

        ball.addComponent("collision", {
            radius: game.config.gameLoop.ball.radius,
            type: "sphere"
        });

        ball.addComponent("rigidbody", {
            type: pc.RIGIDBODY_TYPE_DYNAMIC,
            mass: 0,
            linearDamping: 0,
            angularDamping: 0,
            linearFactor: new pc.Vec3(0, 1, 1),
            angularFactor: pc.Vec3.ZERO,
            friction: 0,
            restitution: 0
        });

        let material = new pc.StandardMaterial();

        material.diffuse = new pc.Color().fromString("#00ABFF");
        material.ambient = new pc.Color().fromString("#ffffff");
        material.ambientTint = true;
        material.emissiveIntensity = 5.34;

        material.update();

        ball.addChild(ball.visual);

        return ball;
    }

    initBackground() {

        this.backgroundLayer = new pc.Layer("background");
        this.backgroundLayer.name = "background";

        this.backgroundLayer.addCamera(this.camera.camera);
        this.backgroundLayer.addLight(this.light);

        game.app.scene.layers.insertOpaque(this.backgroundLayer, 0);
        game.app.scene.layers.insertTransparent(this.backgroundLayer, 0);

        this.backgroundScreen = new pc.Entity("background-screen");

        this.backgroundScreen.addComponent("screen", {
            screenSpace: true,
            referenceResolution: pc.Vec2(1280, 720),
            scaleMode: pc.SCALEMODE_BLEND,
            scaleBlend: 1,
        });


        this.backgroundImage = new pc.Entity("background-image");

        Application.getAsset("background.png", "texture").then(asset => {
            this.backgroundImage.addComponent("element", {
                type: pc.ELEMENTTYPE_IMAGE,
                anchor: new pc.Vec4(0,0, 1, 1),
                pivot: new pc.Vec2(0.5, 0.5),
                texture: asset.resource,
                layers: [5]
            });

            this.backgroundScreen.addChild(this.backgroundImage);
        });

        this.app.root.addChild(this.backgroundScreen);
    }

    initIcons(asset) {

        let setIcon = (rect, name) =>  {

            let id = this.iconsSprite.frameKeys.length;

            this.iconsAtlas.setFrame(id, {
                rect: new pc.Vec4(...rect),
                pivot: new pc.Vec2(0.5, 0.5),
                border: new pc.Vec4(0,0,0,0)
            });

            Application[name] = id;
            this.iconsSprite.frameKeys.push(id.toString());
        };

        if (this.iconsSprite) return;
        this.iconsSprite = new pc.Sprite(game.app.graphicsDevice);
        this.iconsSprite.frameKeys = [];
        this.iconsAtlas = new pc.TextureAtlas();

        this.iconsSprite.startUpdate();

        this.iconsSprite.atlas = this.iconsAtlas;
        this.iconsAtlas.texture = asset.resource;

        this.iconsAtlas._frames = [];

        setIcon([0, 265, 48, 48],   "ICON_PAUSE");
        setIcon([48, 265, 48, 48],  "ICON_BACK");

        setIcon([0, 179, 74, 74],   "ICON_BLUE_BACKGROUND");
        setIcon([0, 93, 74, 74],    "ICON_RED_BACKGROUND");
        setIcon([0, 7, 74, 74],     "ICON_YELLOW_BACKGROUND");

        setIcon([79, 180, 74, 74],   "ICON_BLUE_INNER");
        setIcon([79, 94, 74, 74],   "ICON_RED_INNER");
        setIcon([79, 8, 74, 74],   "ICON_YELLOW_INNER");

        setIcon([246, 177, 241, 80],   "ICON_BLUE_BUTTON");
        setIcon([246, 92, 241, 80],   "ICON_RED_BUTTON");
        setIcon([246, 5, 241, 80],   "ICON_YELLOW_BUTTON");

        setIcon([106, 267, 60, 60],   "ICON_PLAY");
        setIcon([166, 267, 60, 60],   "ICON_CUSTOMIZE");
        setIcon([226, 267, 60, 60],   "ICON_CREDITS");
        setIcon([286, 267, 60, 60],   "ICON_BALL");
        setIcon([346, 267, 60, 60],   "ICON_BACKGROUND");

        setIcon([406, 264, 34, 63],   "ICON_ARROW_LEFT");
        setIcon([440, 264, 34, 63],   "ICON_ARROW_RIGHT");
        setIcon([0, 327, 167, 60],    "ICON_DEFAULT_BUTTON_BACKGROUND");
        setIcon([168, 327, 23, 17],   "ICON_DONE");
        setIcon([168, 344, 23, 20],   "ICON_COIN");

        this.iconsSprite.endUpdate();
    }

    initBlur() {

        this.blurExtrudeLayer = new pc.Layer("blur-extrude");
        this.blurExtrudeLayer.name = "blur-extrude";

        this.blurExtrudeLayer.addCamera(this.camera.camera);
        this.blurExtrudeLayer.addLight(this.light);

        game.app.scene.layers.insertOpaque(this.blurExtrudeLayer, 11);
        game.app.scene.layers.insertTransparent(this.blurExtrudeLayer, 11);

        let device = this.app.graphicsDevice;

        let texture = new pc.Texture(device, {
            width: device.width,
            height: device.height,
            format: pc.PIXELFORMAT_R8_G8_B8_A8,
            mipmaps: false
        });

        this.blurExtrudeLayer.renderTarget =  new pc.RenderTarget({
            colorBuffer: texture,
            depth: true
        });

        this.blurExtrudeLayer.onPreRender = cameraIndex => {
            this.blurExtrudeLayer.cameras[cameraIndex].clearColor = new pc.Color(0.5,0.5,0.5,0);
        }

    }

    hierarchy() {

        return new Promise(resolve => {
            this.screen.addComponent("screen", {
                referenceResolution: pc.Vec2(1280, 720),
                scaleMode: pc.SCALEMODE_BLEND,
                scaleBlend: 0.5,
                screenSpace: true
            });

            this.app.root.addChild(this.screen);
            this.app.scene.fog = pc.FOG_LINEAR;
            this.app.scene.fogStart = 20;
            this.app.scene.fogEnd = 50;
            this.app.scene.exposure = 0.8;
            this.app.scene.fogColor =  new pc.Color().fromString("#312E57").darken(-7);
            this.app.scene.ambientLight = new pc.Color().fromString("#ffffff");

            this.camera.addComponent('camera', {
                clearColor:  new pc.Color(1,1,1,1)
            });

            this.light.addComponent('light', {
                castShadows: true,
                type: pc.LIGHTTYPE_DIRECTIONAL,
                shadowUpdateMode: pc.SHADOWUPDATE_REALTIME,
                shadowResolution: 512,
                intensity: 0.65,
                shadowDistance: 16,

                shadowType: pc.SHADOW_VSM16,
                vsmBlurMode: pc.BLUR_GAUSSIAN,
                vsmBlurSize: 15
            });

            this.light.setEulerAngles(152, -75, -121);

            this.app.root.addChild(this.camera);
            this.camera.addChild(this.light);

            this.camera.setPosition(0, 0, -0.6);
            this.camera.setEulerAngles(0, 180, 0)

            this.getVkVar("ballStyle", 0).then(styleId => {
                this.ballStyleId = styleId;
                this.ball = Application.createBall(this.ballStyleId);
                this.app.root.addChild(this.ball);
            });

            this.initBackground();
            this.initBlur();

            this.app.root.addComponent("script");

            Application.getAsset("blur.js", "script").then(asset => {
                this.app.root.script.create("blur");
            });

            Application.getAsset("fps.js", "script").then(asset => {
                //this.app.root.script.create("fps");
            });

            Application.getAsset("icons.png", "texture").then(asset => {
                this.initIcons(asset);
                resolve();
            })
        })
    }

    static getAsset(name, type) {

        return new Promise((resolve, reject) => {

            let asset = game.app.assets.find(name, type);
            if (asset.resource)
                resolve(asset);
            else {
                asset.once("load", () => {
                    resolve(asset);
                });
                game.app.assets.load(asset);
            }
        })
    }

    static loadAsset(url, type) {
        return new Promise((resolve, reject) => {

            let asset = pc.app.assets.getByUrl(url);
            if (asset) resolve(asset);

            pc.app.assets.loadFromUrl(url, type, function (err, asset) {
                if (err) return reject(err);
                return resolve(asset);
            });
        });
    }

    static getEmissiveColor(color) {
        if (color instanceof pc.Color) color = color.toString();
        let colorString = tinycolor(color).darken(40).toString();
    }

    getUrlParams() {
        return [...new URLSearchParams(document.location.search).entries()].reduce((q, [k, v]) => Object.assign(q, {[k]: v}), {})
    }

    initVk() {
        if (!VK) {
            throw new Error("VK isn't available");
        }

        return new Promise((resolve, reject) => {
            if (!VK) reject("VK isn't available");

            try {
                VK.init(() => {
                    return resolve(VK);
                }, () => {
                    //alert("VK problem, disabled");
                    return resolve("VK loading failed");
                }, '5.60');
            } catch (e) {
                //alert("VK problem, disabled");
                return resolve("VK loading failed");
            }

        })
    }

    getAssets() {

        return new Promise(resolve => {
            let assets = [
                ["assets/font/antonio-regular.json", "font"],
                ["assets/font/chathura-regular.json", "font"],
                ["assets/images/background.png", "texture"],
                ["assets/images/icons.png", "texture"],
                ["assets/scripts/fps.js", "script"],
                ["assets/scripts/blur.js", "script"],
                ["assets/models/ring/ring.json", "model"],
                ["assets/shaders/blurPS.glsl", "shader"],
                ["assets/shaders/blurExcludePS.glsl", "shader"],
                //["assets/models/ball/style-1/ball-model.json", "model"],
            ];


            Promise.all([]).then(() => {
                resolve(assets)
            });

        })

    }

    getVkVar(key, defaultValue) {
        return new Promise(resolve => {
            if (!VK._bridge) return resolve(defaultValue);
            VK.api("storage.get", {key: key}).then(response => {

                if (response.response === "") {
                    this.setVkVar(key, defaultValue);
                    return resolve(defaultValue);
                }

                return resolve(response.response);
            })
        })
    }

    setVkVar(key, value) {
        return new Promise(resolve => {
            VK.api("storage.set", {key: key, value: value}).then(response => {
                return resolve(response.response);
            })
        })
    }
}
