import Scene from "./../Scene";
import Animation from "../Animation";
import Application from "../Application";


export default class CustomizeBall extends Scene {

    title = new pc.Entity("title");
    backBtn = new pc.Entity("backBtn");

    ballCurrent = 0;
    ballsCount = 2;
    ballsDistance = 2.3;

    balls = [];

    ballsInfo = [
        {
            name: "Default",
            price: null,
            special: null,
        },

        {
            name: "Stone",
            price: 100,
            special: null
        }
    ];

    constructor(app, game) {
        super(app, game);

        this.rotator = new pc.Entity("rotate-element");

        this.rotator.addComponent("element", {
            type: pc.ELEMENTTYPE_IMAGE,
            anchor: new pc.Vec4(0, 0, 1, 1),
            pivot: new pc.Vec2(0, 0),
            useInput: true,
            opacity: 0,
            color: new pc.Color(1,0, 0, 0)
        })

        this.screen.addChild(this.rotator);

        this.title.addComponent("element", {
            type: pc.ELEMENTTYPE_TEXT,
            anchor: new pc.Vec4(0.0, 0.0, 0, 0),
            pivot: new pc.Vec2(0.5, 0.5),
            alignment: new pc.Vec2(0.5, 0.5),
            useInput: true,
            fontAsset : 1,
            color: new pc.Color(...game.config.customize.ui.color),
            fontSize: game.config.customize.ui.fontSize,
            text: "BALL",
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

        this.screen.addChild(this.title);

        this.title.setPosition(0,0.6,0);

        this.leftButton = this.createArrowButton(Application.ICON_ARROW_LEFT);
        this.rightButton = this.createArrowButton(Application.ICON_ARROW_RIGHT);

        this.events();
        
        game.cameraTargetPosition = new pc.Vec3(0, 2.4, -6);

        this.createBalls();

        let animation = { opacity: 0};
        anime({
            targets:animation,
            opacity: 1,
            duration: 200,
            easing: "linear",
            update: anime => {
                this.backBtn.element.opacity = animation.opacity;
                this.title.element.opacity = animation.opacity;

                if (animation.opacity >= 0.2) {
                    this.leftButton.element.opacity = this.ballCurrent === 0 ? 0.2 : animation.opacity;
                    this.rightButton.element.opacity = this.ballCurrent === this.balls.length - 1 ? 0.2 : animation.opacity;
                } else {
                    this.leftButton.element.opacity = animation.opacity;
                    this.rightButton.element.opacity = animation.opacity;
                }

            }
        });

    }

    createArrowButton(icon) {
        let button = new pc.Entity("arrow-button");



        let anchor = icon === Application.ICON_ARROW_LEFT ? [0, 0.5, 0, 0.5] : [1, 0.5, 1, 0.5];
        let pivot = icon === Application.ICON_ARROW_LEFT ? [0, 0.5] : [1, 0.5];

        button.addComponent("element", {
            type: pc.ELEMENTTYPE_IMAGE,
            anchor:  new pc.Vec4(...anchor),
            pivot: new pc.Vec2(...pivot),
            useInput: true,
            width: 34,
            height: 63,
            opacity: 0,
            sprite: game.iconsSprite,
            spriteFrame: icon
        });

        this.screen.addChild(button);
        button.setPosition(0,0,0);

        if (icon === Application.ICON_ARROW_LEFT) {
            button.setLocalPosition(20, 0, 0)
        }

        if (icon === Application.ICON_ARROW_RIGHT) {
            button.setLocalPosition(-20, 0, 0)
        }

        return button;
    }

    events() {
        this.backBtn.element.on("click", event => {

            // If we have a new ball
            if (game.ballStyleId !== this.ballCurrent) {
                game.ball.visual.destroy();
                game.ball.destroy();
                game.ballStyleId = this.ballCurrent;
                game.ball = this.balls[this.ballCurrent];
                game.ball.reparent(game.app.root);


                game.ball.rigidbody.type = "static";
                game.ball.rigidbody.teleport(0, 0, 0);
                game.ball.rigidbody.type = "dynamic";
                game.camera.setPosition(0, 2.4, -6);
                game.cameraTargetPosition = new pc.Vec3(0, 2.4, -6);
            }

            let animation = { speed: 0};
            anime({
                targets: animation,

                speed: [
                    { value: 300,  easing: 'easeOutQuint', duration: 300},
                    { value: 0,  easing: 'easeOutCirc', duration: 700},
                ],
                duration: 1000,
                update: anime => {
                    game.ball.visual.rigidbody.angularVelocity = new pc.Vec3(0, -animation.speed, 0);
                }
            });

            this.app.fire("game:customize")
        });

        this.rotator.element.on("touchstart", event => {
            let touch = event.event.touches[0];
            this.lastTouchCoords = {x: touch.pageX, y: touch.pageY};
        });

        this.rotator.element.on("touchmove", event => {
            let touch = event.event.touches[0];
            let coords = {x: touch.pageX, y: touch.pageY};

            let velocity = {x: this.lastTouchCoords.x - coords.x, y: this.lastTouchCoords.y - coords.y}
            this.lastTouchCoords = coords;

            let ball = this.balls[this.ballCurrent];

            ball.visual.rigidbody.angularVelocity = new pc.Vec3(velocity.y * 50, -velocity.x * 50, 0);

            this.resetBallVelocity();

        })

        this.rotator.element.on("touchend", event => {
            this.resetBallVelocity();
        })

        let updateLabel = () => {
            let animation = {opacity: 1};

            anime({
                targets: animation,
                opacity: 0,
                duration: 150,
                easing: "linear",
                update: anime => {
                    this.label.element.opacity = animation.opacity;
                    this.label.icon.element.opacity = animation.opacity;
                    this.label.text.element.opacity = animation.opacity;
                },
                complete: () => {
                    this.label = this.createBallLabel(this.ballCurrent);

                    anime({
                        targets: animation,
                        opacity: 1,
                        duration: 150,
                        easing: "linear",
                        update: anime => {
                            this.label.element.opacity = animation.opacity;
                            this.label.icon.element.opacity = animation.opacity;
                            this.label.text.element.opacity = animation.opacity;
                        },
                    })
                }
            })
        }

        this.leftButton.element.on("click", event => {
            if (this.ballCurrent <= 0) return;

            let cameraTarget = game.cameraTargetPosition;

            game.cameraTargetPosition = new pc.Vec3(cameraTarget.x + this.ballsDistance, cameraTarget.y, cameraTarget.z);

            this.balls[--this.ballCurrent].visual.rigidbody.angularVelocity = new pc.Vec3(0,0,0);

            this.checkArrows();
            updateLabel();

        })

        this.rightButton.element.on("click", event => {
            if (this.ballCurrent === this.ballsCount -1) return;

            let cameraTarget = game.cameraTargetPosition;

            game.cameraTargetPosition = new pc.Vec3(cameraTarget.x - this.ballsDistance, cameraTarget.y, cameraTarget.z);

            this.balls[++this.ballCurrent].visual.rigidbody.angularVelocity = new pc.Vec3(0,0,0);

            this.checkArrows();
            updateLabel();

        })
    }

    checkArrows() {
        this.leftButton.element.opacity = this.ballCurrent === 0 ? 0.2 : 1;
        this.rightButton.element.opacity = this.ballCurrent === this.balls.length -1 ? 0.2 : 1;
    }

    resetBallVelocity() {

        let ball = this.balls[this.ballCurrent];

        let velocity = ball.visual.rigidbody.angularVelocity;

        let animation = {
            x: velocity.x,
            y: velocity.y
        };

        if (this.resetVelocity) this.resetVelocity.pause();

        this.resetVelocity = anime({
            targets:animation,
            x: 0,
            y: 0,
            delay: 100,
            duration: 500,
            easing: "linear",
            update: anime => {
                ball.visual.rigidbody.angularVelocity = new pc.Vec3(animation.x, animation.y, 0);
            }
        });
    }

    hide() {
        return new Promise(resolve => {
            this.backBtn.element.off();
            this.leftButton.element.off();
            this.rightButton.element.off();
            this.rotator.element.off();

            let animation = { opacity: 1};
            anime({
                targets:animation,
                opacity: 0,
                duration: 200,
                easing: "linear",
                update: anime => {
                    this.backBtn.element.opacity = animation.opacity;
                    this.title.element.opacity = animation.opacity;

                    this.label.element.opacity = animation.opacity;
                    this.label.icon.element.opacity = animation.opacity;
                    this.label.text.element.opacity = animation.opacity;

                    if (this.leftButton.element.opacity >= animation.opacity)
                        this.leftButton.element.opacity = animation.opacity;

                    if (this.rightButton.element.opacity >= animation.opacity)
                        this.rightButton.element.opacity = animation.opacity;
                },
                complete: anime => {
                    this.root.destroy();

                    this.backBtn.destroy();
                    this.title.destroy();

                    this.leftButton.destroy();
                    this.leftButton.destroy();

                    this.rotator.destroy();

                    this.label.destroy();
                    this.label.icon.destroy();
                    this.label.text.destroy();

                    return resolve();
                }
            });
        })
    }

    createBalls() {

        for (let i = 0; i < this.ballsCount; i++) {
            let ball = null;

            if (i === game.ballStyleId) {
                ball = game.ball;
            } else {
                ball = Application.createBall(i);
                ball.rigidbody.mass = 0;
                this.root.addChild(ball);
            }
            this.balls.push(ball);
        }

        this.balls.forEach((ball, i) => {
            let  x = (game.ballStyleId - i) * (-this.ballsDistance);
            ball.rigidbody.type = "static";
            ball.rigidbody.teleport(-x, 0, 0);
            ball.rigidbody.type = "dynamic";
        });

        this.ballCurrent = game.ballStyleId;
        this.label = this.createBallLabel(this.ballCurrent);
        let animation = {opacity: 0};

        anime({
            targets: animation,
            opacity: 1,
            duration: 150,
            easing: "linear",
            update: anime => {
                this.label.element.opacity = animation.opacity;
                this.label.icon.element.opacity = animation.opacity;
                this.label.text.element.opacity = animation.opacity;
            }
        })

    }

    createBallLabel(id) {

        let info = this.ballsInfo[id];
        let current = game.ballStyleId === id;

        let label = new pc.Entity("button");
        label.addComponent("element", {
            type: pc.ELEMENTTYPE_IMAGE,
            anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5),
            pivot: new pc.Vec2(0.5, 0.5),
            useInput: true,
            width: 168,
            height: 60,
            sprite: game.iconsSprite,
            opacity: 0,
            spriteFrame: current? Application.ICON_CURRENT_BUTTON_BACKGROUND : Application.ICON_DEFAULT_BUTTON_BACKGROUND
        });

        let textEntity = new pc.Entity("text");

        textEntity.addComponent("element", {
            type: pc.ELEMENTTYPE_TEXT,
            anchor: new pc.Vec4(0.5, 0, 0, 0),
            pivot: new pc.Vec2(0.5, 0.5),
            useInput: true,
            width: 242,
            height: 80,
            fontAsset: game.app.assets.find("antonio-regular.json", "font").id,
            fontSize: 24,
            opacity: 0,
            text: info.name
        });

        let iconEntity = new pc.Entity("icon");

        iconEntity.addComponent("element", {
            type: pc.ELEMENTTYPE_IMAGE,
            anchor: new pc.Vec4(0, 0, 0, 0),
            pivot: new pc.Vec2(0, 0.5),
            useInput: true,
            width: 23,
            height: 17,
            sprite: game.iconsSprite,
            opacity: 0,
            spriteFrame: Application.ICON_DONE
        });

        label.text = textEntity;
        label.icon = iconEntity;

        label.addChild(textEntity);
        //label.addChild(iconEntity);

        this.screen.addChild(label);

        label.setPosition(0,0,0);
        label.setLocalPosition(0, -100, 0);

        label.text.setPosition(0, 0, 0);
        label.icon.setPosition(0, 0, 0);

        label.text.setLocalPosition(0, 30, 0);
        label.icon.setLocalPosition(20, 30, 0);
        //label.icon.element.height = 17;

        label.element.on("click", event => {
            game.storage.set("ballStyle", id);
            this.ballCurrent = id;
            label.element.spriteFrame = Application.ICON_CURRENT_BUTTON_BACKGROUND;
        })


        return label;
    }
}