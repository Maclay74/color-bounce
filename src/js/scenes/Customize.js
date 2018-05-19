import Scene from "./../Scene";


export default class Customize extends Scene {

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

    title = new pc.Entity("title");
    backBtn = new pc.Entity("backBtn");
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

        this.title.addComponent("element", {
            type: pc.ELEMENTTYPE_TEXT,
            anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
            pivot: new pc.Vec2(0.5, 0.5),
            alignment: new pc.Vec2(0.5, 0.5),
            useInput: true,
            fontAsset : 1,
            color: new pc.Color(...game.config.customize.ui.color),
            fontSize: game.config.customize.ui.fontSize,
            text: game.config.customize.ui.titleText
        });

        this.backBtn.addComponent("element", {
            type: pc.ELEMENTTYPE_TEXT,
            anchor: new pc.Vec4(0, 1, 0, 1),
            pivot: new pc.Vec2(0, 1),
            alignment: new pc.Vec2(0.5, 0.5),
            useInput: true,
            fontAsset : 1,
            color: new pc.Color(...game.config.customize.ui.color),
            fontSize: game.config.customize.ui.backBtnFontSize,
            text: game.config.customize.ui.backBtnText
        });


        this.screen.addChild(this.title);
        this.screen.addChild(this.backBtn);
        this.title.setPosition(0,0.6,0);
        this.backBtn.setPosition(-0.9,0.9,0);
        this.events();
    }

    events() {
        this.backBtn.element.on("click", event => this.app.fire("game:menu"));
    }

    hide() {
        return new Promise(resolve => {
            this.backBtn.element.off();
            this.root.destroy();
            return resolve();
        })
    }

}