import Scene from "./../Scene";
import Animation from "../Animation";
import Application from "../Application";


export default class Customize extends Scene {

    title = new pc.Entity("title");
    backBtn = new pc.Entity("backBtn");

    constructor(app, game) {
        super(app, game);

        this.title.addComponent("element", {
            type: pc.ELEMENTTYPE_TEXT,
            anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
            pivot: new pc.Vec2(0.5, 0.5),
            alignment: new pc.Vec2(0.5, 0.5),
            useInput: true,
            fontAsset : 1,
            color: new pc.Color(...game.config.customize.ui.color),
            fontSize: game.config.customize.ui.fontSize,
            text: game.config.customize.ui.titleText,
            opacity: 0,
        });

        this.backBtn.addComponent("element", {
            type: pc.ELEMENTTYPE_IMAGE,
            anchor: new pc.Vec4(0, 1, 0, 1),
            pivot: new pc.Vec2(0, 1),
            useInput: true,
            width: 48,
            height: 48,
            opacity: 0,
            sprite: game.iconsSprite,
            spriteFrame: Application.ICON_BACK
        });

        this.screen.addChild(this.backBtn);
        this.backBtn.setPosition(-1,1, 0);
        this.backBtn.translateLocal(20, -20, 0);

        this.title.setPosition(0,0.6,0);
        this.events();

        game.cameraTargetPosition = new pc.Vec3(0, 2, -6);

        let animation = { opacity: 0};
        anime({
            targets:animation,
            opacity: 1,
            duration: 200,
            easing: "linear",
            update: anime => {
                this.backBtn.element.opacity = animation.opacity;
            }
        });

    }

    events() {
        this.backBtn.element.on("click", event => this.app.fire("game:menu"));
    }

    hide() {
        return new Promise(resolve => {
            this.backBtn.element.off();

            let animation = { opacity: 1};
            anime({
                targets:animation,
                opacity: 0,
                duration: 200,
                easing: "linear",
                update: anime => {
                    this.backBtn.element.opacity = animation.opacity;
                    this.title.element.opacity = animation.opacity;
                },
                complete: anime => {
                    this.root.destroy();
                    return resolve();
                }
            });
        })
    }

}