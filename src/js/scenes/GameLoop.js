class GameLoop extends Scene {

    screen = new pc.Entity("screen");
    storeLabel = new pc.Entity("storeLabel");

    store = 0;


    constructor(app) {

        super(app);

        this.screen.addComponent("screen", {
            referenceResolution: pc.Vec2(1280, 720),
            scaleMode: pc.SCALEMODE_BLEND,
            scaleBlend: 0.5,
            screenSpace: true
        });
        this.root.addChild(this.screen);

        this.storeLabel.addComponent("element", {
            type: pc.ELEMENTTYPE_TEXT,
            anchor: new pc.Vec4(0, 1, 0, 1),
            pivot: new pc.Vec2(0, 1),
            alignment: new pc.Vec2(0.5, 0.5),
            useInput: true,
            fontAsset : 1,
            color: new pc.Color(...game.config.gameLoop.ui.color),
            fontSize: game.config.gameLoop.ui.fontSize,
            text: game.config.gameLoop.ui.storeText
        });


        this.screen.addChild(this.storeLabel);
        this.storeLabel.setPosition(-0.9,0.9,0);
    }
}