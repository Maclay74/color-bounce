export default class Scene {

    createBlockButton(icon, text, background) {

        let button = new pc.Entity("button");
        button.addComponent("element", {
            type: pc.ELEMENTTYPE_IMAGE,
            anchor: new pc.Vec4(0, 0, 0, 0),
            pivot: new pc.Vec2(0.5, 0.5),
            useInput: true,
            width: 242,
            height: 80,
            sprite: game.iconsSprite,
            opacity: 0,
            spriteFrame: background
        });

        let textEntity = new pc.Entity("text");

        textEntity.addComponent("element", {
            type: pc.ELEMENTTYPE_TEXT,
            anchor: new pc.Vec4(0, 0, 0, 0),
            pivot: new pc.Vec2(0, 0.5),
            lineHeight: 60,
            useInput: true,
            width: 242,
            height: 80,
            fontAsset: game.app.assets.find("antonio-regular.json", "font").id,
            fontSize: 24,
            opacity: 0,
            text: text
        });

        let iconEntity = new pc.Entity("icon");

        iconEntity.addComponent("element", {
            type: pc.ELEMENTTYPE_IMAGE,
            anchor: new pc.Vec4(0, 0, 0, 0),
            pivot: new pc.Vec2(0, 0),
            useInput: true,
            width: 60,
            height: 60,
            sprite: game.iconsSprite,
            opacity: 0,
            spriteFrame: icon
        });

        button.text = textEntity;
        button.icon = iconEntity;

        button.addChild(textEntity);
        button.addChild(iconEntity);

        this.screen.addChild(button);
        button.setPosition(0,0,0);

        button.text.translateLocal(70, 40, 0);
        button.icon.translateLocal(10, 10, 0);

        return button;
    }

    constructor(app, game) {
        this.app = app;
        this.root = new pc.Entity(this.constructor.name);
        this.app.root.addChild(this.root);
        this.game = game;
        this.screen = this.game.screen;
    }

    hide() {
        return new Promise(resolve => {
            this.root.destroy();
            return resolve();
        })
    }

}