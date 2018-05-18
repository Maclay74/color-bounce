class Scene {

    constructor(app) {
        this.app = app;
        this.root = new pc.Entity(this.constructor.name);
        this.app.root.addChild(this.root);
    }

    hide() {
        return new Promise(resolve => {
            this.root.destroy();
            return resolve();
        })
    }

}