import Scene from "./Scene";
import MainMenu from "./scenes/MainMenu";
import Customize from "./scenes/Customize";
import GameLoop from "./scenes/GameLoop";

export default class Application {

    configFile = "/config/game.json";

    preload = [
        ["/assets/font/latoregular.json", "font"],
    ];

    camera = new pc.Entity('camera');
    light = new pc.Entity('light');

    constructor(app) {

        this.app = app;
        this.scene = new Scene(this.app);

        // Set up game events
        this.events();

        // Get config and apply some settings
        this.config()
            .then(this.preloadAssets())
            .then(() => {
                this.hierarchy();
                app.fire("game:menu");
            })
    }

    config() {
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
            this.scene = new scene(this.app);
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
    }

    preloadAssets() {
        return new Promise(resolve => {

            let requests = this.preload.map(asset => Application.loadAsset(...asset));
            Promise.all(requests).then(assets => {
                return resolve(assets);
            });
        })
    }

    hierarchy() {
        this.camera.addComponent('camera', {
            clearColor: new pc.Color(...this.config.camera.clearColor)
        });

        this.light.addComponent('light', {

        });

        this.app.root.addChild(this.camera);
        this.camera.addChild(this.light);
    }

    static loadAsset(url, type) {
        return new Promise((resolve, reject) => {
            pc.app.assets.loadFromUrl(url, type, function (err, asset) {
                if (err) return reject(err);
                return resolve(asset);
            });
        });
    }
}

