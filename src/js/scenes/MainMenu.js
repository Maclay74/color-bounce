import Scene from "./../Scene";

export default class MainMenu extends Scene {

    buttonConfig = {
        type: pc.ELEMENTTYPE_TEXT,
        anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
        pivot: new pc.Vec2(0.5, 0.5),
        alignment: new pc.Vec2(0.5, 0.5),
        useInput: true,
        fontAsset : 1,
        color: new pc.Color(...game.config.mainMenu.color),
        fontSize: game.config.mainMenu.fontSize
    };

    startGameBtn = new pc.Entity("startGameBtn");
    customizeBtn = new pc.Entity("customizeBtn");
    creditsBtn = new pc.Entity("creditsBtn");
    screen = new pc.Entity("screen");

    constructor(app) {
        super(app);

        this.screen.addComponent("screen", {
            referenceResolution: pc.Vec2(1280, 720),
            scaleMode: pc.SCALEMODE_BLEND,
            scaleBlend: 1,
            screenSpace: true
        });

        this.root.addChild(this.screen);

        this.startGameBtn.addComponent("element", Object.assign({}, this.buttonConfig, {
            text: game.config.mainMenu.startNewGameText
        }));

        this.customizeBtn.addComponent("element", Object.assign({}, this.buttonConfig, {
            text: game.config.mainMenu.customizeText
        }));

        this.creditsBtn.addComponent("element", Object.assign({}, this.buttonConfig, {
            text: game.config.mainMenu.creditsText
        }));

        this.screen.addChild(this.startGameBtn);
        this.screen.addChild(this.customizeBtn);
        this.screen.addChild(this.creditsBtn);
        this.startGameBtn.setPosition(0,0.3,0);
        this.customizeBtn.setPosition(0,0,0);
        this.creditsBtn.setPosition(0,-0.3,0);

        this.events();
    }

    events() {
        this.startGameBtn.element.on("click", event => this.app.fire("game:start"));
        this.customizeBtn.element.on("click", event => this.app.fire("game:customize"));
    }

    hide() {
        return new Promise(resolve => {
            this.startGameBtn.element.off();
            this.customizeBtn.element.off();
            this.root.destroy();
            return resolve();
        })
    }

}