import Scene from "./../Scene";
import Application from "../Application";

export default class PauseMenu extends Scene {

    scoreLabel = new pc.Entity("scoreLabel");
    scoreValueLabel = new pc.Entity("scoreValueLabel");
    background = new pc.Entity("pause-background");
    title = new pc.Entity("title");

    blurPower  =  2;

    createBlockButton(icon, text, background) {
        let button = super.createBlockButton(icon, text, background);

        button.element.layers = [6];
        button.icon.element.layers = [6];
        button.text.element.layers = [6];
        return button;
    }

    constructor(app, game) {
        super(app, game);

        this.background.addComponent("element", {
            type: pc.ELEMENTTYPE_IMAGE,
            anchor: new pc.Vec4(0, 0, 1, 1),
            pivot: new pc.Vec2(0, 0),
            useInput: true,
            opacity: 0,
            color: new pc.Color().fromString("#170B48")
        });
        this.screen.addChild(this.background);
        this.resumeBtn = this.createBlockButton(Application.ICON_PLAY, "RESUME", Application.ICON_BLUE_BUTTON);
        this.mainMenuBtn = this.createBlockButton(Application.ICON_CUSTOMIZE, "MAIN MENU", Application.ICON_RED_BUTTON);
        this.mainMenuBtn.translateLocal(0,-87,0);

        // Score value
        this.title.addComponent("element", {
            type: pc.ELEMENTTYPE_TEXT,
            anchor: new pc.Vec4(0, 0, 0, 0),
            pivot: new pc.Vec2(0.5, 0.5),
            fontAsset: 1,
            lineHeight: 48,
            color: new pc.Color(...game.config.gameLoop.ui.color),
            fontSize: 48,
            opacity: 0,
            text: "PAUSE",
            layers: [6]
        });

        // Score value
        this.scoreValueLabel.addComponent("element", {
            type: pc.ELEMENTTYPE_TEXT,
            anchor: new pc.Vec4(0, 0, 0, 0),
            pivot: new pc.Vec2(0.5, 1),
            fontAsset: 1,
            lineHeight: 48,
            color: new pc.Color(...game.config.gameLoop.ui.color),
            fontSize: game.config.gameLoop.ui.fontSize,
            opacity: 0,
            text: 0,
            layers: [6]
        });

        // Score
        this.scoreLabel.addComponent("element", {
            type: pc.ELEMENTTYPE_TEXT,
            anchor: new pc.Vec4(0, 0, 0, 0),
            pivot: new pc.Vec2(0.5, 1),
            fontAsset: 2,
            color: new pc.Color().fromString("#8489C0"),
            fontSize: 40,
            text: game.config.gameLoop.ui.scoreText,
            opacity: 0,
            layers: [6]
        });

        this.screen.addChild(this.scoreLabel);
        this.screen.addChild(this.scoreValueLabel);
        this.screen.addChild(this.title);

        this.scoreLabel.setPosition(0,1, 0);
        this.scoreValueLabel.setPosition(0, 1, 0);
        this.title.setPosition(0, 0, 0);

        this.scoreValueLabel.translateLocal(0, -10, 0);
        this.scoreLabel.translateLocal(0, -70, 0);
        this.title.translateLocal(0, 100, 0);

        this.events();

        let animation = {opacity: 0, blur: 0}

        anime({
            targets: animation,
            opacity: 1,
            blur: this.blurPower,
            easing: "linear",
            duration: 300,
            update: anime => {
                this.resumeBtn.element.opacity = animation.opacity;
                this.resumeBtn.text.element.opacity = animation.opacity;
                this.resumeBtn.icon.element.opacity = animation.opacity;

                this.mainMenuBtn.element.opacity = animation.opacity;
                this.mainMenuBtn.text.element.opacity = animation.opacity;
                this.mainMenuBtn.icon.element.opacity = animation.opacity;

                this.scoreLabel.element.opacity = animation.opacity;
                this.scoreValueLabel.element.opacity = animation.opacity;

                this.title.element.opacity = animation.opacity;

                game.app.root.script.blur.power = animation.blur;

                this.background.element.opacity = animation.opacity / 3;

            }
        })
    }

    events() {
        this.resumeBtn.element.on("click", event => this.app.fire("level:unpause", this));
        this.mainMenuBtn.element.on("click", event => {

            Promise.all([this.hide(), game.scene.hide()]).then(() => {
                game.app.fire("game:menu");
            })

        });
    }

    hide() {
        return new Promise(resolve => {
            this.resumeBtn.element.off();
            this.mainMenuBtn.element.off();

            let animation = {opacity: 1, blur: this.blurPower}

            anime({
                targets: animation,
                opacity: 0,
                blur: 0,
                easing: "linear",
                duration: 300,
                update: anime => {
                    this.resumeBtn.element.opacity = animation.opacity;
                    this.resumeBtn.text.element.opacity = animation.opacity;
                    this.resumeBtn.icon.element.opacity = animation.opacity;

                    this.mainMenuBtn.element.opacity = animation.opacity;
                    this.mainMenuBtn.text.element.opacity = animation.opacity;
                    this.mainMenuBtn.icon.element.opacity = animation.opacity;

                    this.background.element.opacity = animation.opacity / 3;

                    this.title.element.opacity = animation.opacity;

                    this.scoreLabel.element.opacity = animation.opacity;
                    this.scoreValueLabel.element.opacity = animation.opacity;

                    game.app.root.script.blur.power = animation.blur;
                },
                complete: anime => {
                    this.root.destroy();
                    this.background.destroy();
                    this.resumeBtn.destroy();
                    this.mainMenuBtn.destroy();
                    this.scoreLabel.destroy();
                    this.scoreValueLabel.destroy();
                    this.title.destroy();
                    return resolve();
                }
            });

        })
    }

    set score(value) {
        this.scoreValueLabel.element.text = value;
    }

}