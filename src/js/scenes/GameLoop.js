import Scene from "./../Scene";
import PanelElement from "./../levelElements/PanelElement";
import SafeZoneElement from "./../levelElements/SafeZoneElement";
import RingElement from "../levelElements/RingElement";
import ChangeElement from "../levelElements/ChangeElement";
import SmallPanelElement from "../levelElements/SmallPanelElement";
import Application from "../Application";
import PauseMenu from "./PauseMenu";

export default class GameLoop extends Scene {


    scoreLabel = new pc.Entity("scoreLabel");
    scoreValueLabel = new pc.Entity("scoreValueLabel");
    buttonsDock = new pc.Entity("buttonsDock");
    pauseButton = new pc.Entity("pauseButton");

    blendColors = [];

    score = 0;

    availableElements = [
        PanelElement,
        //RingElement,
        //SmallPanelElement
    ];

    elements = [];

    elementOffset = 4.16;
    ballSpeed = 7;

    initElementsCount = 10;

    constructor(app, game) {
        super(app, game);

        this.events();
        this.initUI();
        this.initLevel();
        this.difficulty();

        let cameraPosition = game.camera.getPosition().clone();
        let ballPosition = game.ball.getPosition().clone();
        let diff = cameraPosition.sub(ballPosition);

        console.log(diff.data);

        game.ball.rigidbody.mass  = game.config.gameLoop.ball.mass;
        game.ball.rigidbody.type = "dynamic";
        game.ball.rigidbody.teleport(0, 2, 1);
        game.ball.contact = null;

        cameraPosition.y = 2 + diff.y;
        cameraPosition.z = 1 + diff.z;

        game.camera.setPosition(cameraPosition);
        game.cameraTargetPosition = cameraPosition;

        this.elements.forEach(element => {
            element.opacity = 0;
        });

        anime({
            targets: {time: 0},
            time: 1,
            duration: 300,
            easing: "linear",
            update: anime =>  {
                let value = anime.animations[0].currentValue;
                this.elements.forEach(element => {
                    element.opacity = value;
                });
            }
        });

        game.app.fire("level:resetBallSpeed");
    }

    createColorButton(color) {

        let button = new pc.Entity();

        button.addComponent("element", {
            type: pc.ELEMENTTYPE_IMAGE,
            anchor: new pc.Vec4(0, 0, 0, 0),
            pivot: new pc.Vec2(0.5, 0),
            useInput: false,
            width: 74,
            height: 74,
            sprite: game.iconsSprite,
        });

        let inner = new pc.Entity("button-inner");
        inner.addComponent("element", {
            type: pc.ELEMENTTYPE_IMAGE,
            anchor: new pc.Vec4(0, 0, 0, 0),
            pivot: new pc.Vec2(0.5, 0.5),
            useInput: true,
            width: 74,
            height: 74,
            sprite: game.iconsSprite,
        });
        button.addChild(inner);


        button.inner = inner;

        let targetColor = new pc.Color().fromString(color);

        let touchStart = event =>  {

            // Remove old colors from palette
            this.blendColors.map((current, i) => {
                if (current.toString() === targetColor.toString()) this.blendColors.splice(i, 1);
            });

            this.blendColors.push(targetColor);

            let color = GameLoop.blendColors(...this.blendColors);
            game.app.fire("level:changeColor", color);

            let animation = {x: 1, y: 1};

            if (inner.animation) inner.animation.pause();

            inner.animation = anime({
                targets: animation,
                x: 1.1,
                y: 1.075,
                duration: 300,
                update: anime =>  {
                    inner.setLocalScale(animation.x, animation.y, 1);
                }
            });


        };
        let touchEnd = event => {

            // Remove old colors from palette
            this.blendColors.map((current, i) => {
                if (current.toString() === targetColor.toString()) this.blendColors.splice(i, 1);
            });


            if (this.blendColors.length) {
                let color = GameLoop.blendColors(...this.blendColors);
                game.app.fire("level:changeColor", color);
            }

            let animation = {x: 1.1, y: 1.075};
            if (inner.animation) inner.animation.pause();
            inner.animation = anime({
                targets: animation,
                x: 1,
                y: 1,
                duration: 300,
                update: anime =>  {
                    inner.setLocalScale(animation.x, animation.y, 1);
                }
            });
        };

        button.inner.element.on("touchstart",touchStart, this);
        button.inner.element.on("touchend",touchEnd, this);
        button.inner.element.on("touchcancel",touchEnd, this);

        button.inner.element.on("mousedown",touchStart, this);
        button.inner.element.on("mouseup",touchEnd, this);


        return button;
    }

    initUI() {
        // Score value
        this.scoreValueLabel.addComponent("element", {
            type: pc.ELEMENTTYPE_TEXT,
            anchor: new pc.Vec4(0, 0, 0, 0),
            pivot: new pc.Vec2(0, 1),
            fontAsset: 1,
            lineHeight: 48,
            color: new pc.Color(...game.config.gameLoop.ui.color),
            fontSize: game.config.gameLoop.ui.fontSize,
            text: this.score
        });

        // Score
        this.scoreLabel.addComponent("element", {
            type: pc.ELEMENTTYPE_TEXT,
            anchor: new pc.Vec4(0, 0, 0, 0),
            pivot: new pc.Vec2(0, 1),
            fontAsset: 2,
            color: new pc.Color().fromString("#8489C0"),
            fontSize: 40,
            text: game.config.gameLoop.ui.scoreText
        });

        this.screen.addChild(this.scoreLabel);
        this.screen.addChild(this.scoreValueLabel);

        this.scoreLabel.setPosition(-1,1, 0);
        this.scoreValueLabel.setPosition(-1, 1, 0);

        this.scoreValueLabel.translateLocal(20, -10, 0);
        this.scoreLabel.translateLocal(20, -70, 0);

        // Color buttons

        this.buttonsDock.addComponent("element", {
            type: pc.ELEMENTTYPE_IMAGE,
            anchor: new pc.Vec4(0, 0, 1, 0),
            pivot: new pc.Vec2(0.5, 0),
            useInput: true,
            width: 1280,
            height: 105,
            color: new pc.Color().fromString("#16182F"),
        });

        this.screen.addChild(this.buttonsDock);

        this.blueButton = this.createColorButton("#00ABFF");
        this.redButton = this.createColorButton("#ff3a6c");
        this.yellowButton = this.createColorButton("#FFB100");

        this.blueButton.element.spriteFrame = Application.ICON_BLUE_BACKGROUND;
        this.redButton.element.spriteFrame = Application.ICON_RED_BACKGROUND;
        this.yellowButton.element.spriteFrame = Application.ICON_YELLOW_BACKGROUND;

        this.blueButton.inner.element.spriteFrame = Application.ICON_BLUE_INNER;
        this.redButton.inner.element.spriteFrame = Application.ICON_RED_INNER;
        this.yellowButton.inner.element.spriteFrame = Application.ICON_YELLOW_INNER;

        this.buttonsDock.addChild(this.blueButton);
        this.buttonsDock.addChild(this.redButton);
        this.buttonsDock.addChild(this.yellowButton);

        this.blueButton.setPosition(0, -1, 0);
        this.blueButton.translateLocal(-97, 15, 0);

        this.redButton.setPosition(0, -1, 0);
        this.redButton.translateLocal(0, 15, 0);

        this.yellowButton.setPosition(0, -1, 0);
        this.yellowButton.translateLocal(97, 15, 0);

        this.blueButton.inner.translateLocal(37, 37, 0);
        this.redButton.inner.translateLocal(37, 37, 0);
        this.yellowButton.inner.translateLocal(37, 37, 0);


        // Pause
        this.pauseButton.addComponent("element", {
            type: pc.ELEMENTTYPE_IMAGE,
            anchor: new pc.Vec4(0, 0, 0, 0),
            pivot: new pc.Vec2(1, 1),
            useInput: true,
            width: 48,
            height: 48,
            sprite: game.iconsSprite,
            spriteFrame: Application.ICON_PAUSE
        });

        this.screen.addChild(this.pauseButton);
        this.pauseButton.setPosition(1,1, 0);
        this.pauseButton.translateLocal(-20, -20, 0);
        this.pauseButton.element.on("touchstart",event => {
            game.app.fire("level:pause");
        }, this);

        this.pauseButton.element.sprite = game.iconsSprite;
        this.pauseButton.element.spriteFrame = Application.ICON_PAUSE;

    }

    initLevel() {

        this.addElement(SafeZoneElement);

        for (let i = 0; i < this.initElementsCount - 2; i++) {
            this.addElement();
        }
    }

    jump() {
        game.ball.rigidbody.applyImpulse(0, 4, 0);

        let animate = {scale: 1, translate: 0};

        if (this.ballJumpAnimation) this.ballJumpAnimation.pause();

        this.ballJumpAnimation = anime({
            targets: animate,

            scale: [
                { value: 0.9,  easing: 'easeOutQuint'},
                { value: 1,  easing: 'easeOutQuint'},
            ],
            translate: [
                { value: -0.05,  easing: 'linear'},
                { value: 0,  easing: 'linear'},
            ],
            duration: 250,
            delay: 750,
            update: anime => {
                game.ball.visual.setLocalScale(1 + (1 - animate.scale), animate.scale, 1 + (1 - animate.scale));
                game.ball.visual.setLocalPosition(0,animate.translate,0);
            }
        })
    }

    changeBallColor(color) {
        let material = game.ball.visual.model.model.meshInstances[0].material;
        let meshInstance = game.ball.visual.model.model.meshInstances[0];

        // Try to get color from shader
        let currentColor = meshInstance.getParameter("material_diffuse");

        // If it's not set, get it from material
        if (!currentColor) currentColor = material.diffuse;
        let oldColor = new pc.Color(...currentColor.data);

        if (this.colorBlendAnimation) this.colorBlendAnimation.pause();

        this.colorBlendAnimation = anime({
            targets: {time: 0},
            time: 1,
            duration: 150,
            easing: "linear",
            update: anime => {
                let value = anime.animations[0].currentValue;
                let targetColor = new pc.Color();
                targetColor.lerp(oldColor, color, value);
                meshInstance.setParameter("material_diffuse", [targetColor.r, targetColor.g, targetColor.b]);
            },
            complete: anime => {
                if (game.ball.contact) {
                    let color = game.ball.contact.colorSynonym();
                    game.app.fire("level:checkColor", color);
                }
            }
        });

        material.diffuse = color;
    }

    events() {
        // When ball contacts something with special color
        game.app.on("level:checkColor", color => {
            this.checkColor(color)
        });

        game.app.on("level:jump", color => {
            this.jump();
        });

        game.app.on("level:addElement",()=> {
            if (game.scene.elements.length < this.initElementsCount)
            this.addElement();
        });

        game.app.on("level:removeElement", element => {
            let index = this.elements.indexOf(element);
            this.elements.splice(index, 1);
            element.remove();
        });

        game.app.on("level:changeColor", color => {
            this.changeBallColor(color);
        });

        game.app.on("level:resetBallSpeed", () => {
            let ballVelocity = game.ball.rigidbody.linearVelocity;
            game.ball.rigidbody.linearVelocity = new pc.Vec3(0, ballVelocity.y, this.ballSpeed);
        });

        game.app.on("level:pause", () => {
            game.ball.rigidbody.disableSimulation();
            if (this.ballJumpAnimation) this.ballJumpAnimation.pause();
            let pauseScene = new PauseMenu(game.app, game);
            pauseScene.score = this.score;

            let animation = { opacity: 1};
            anime({
                targets:animation,
                opacity: 0,
                duration: 300,
                easing: "linear",
                update: anime => {
                    this.scoreValueLabel.element.opacity = animation.opacity;
                    this.scoreLabel.element.opacity = animation.opacity;
                    this.pauseButton.element.opacity = animation.opacity;
                }
            });
        });

        game.app.on("level:unpause", (scene) => {
            scene.hide().then(() => {
                game.ball.rigidbody.enableSimulation();
                if (this.ballJumpAnimation) this.ballJumpAnimation.play();
            });

            let animation = { opacity: 0};
            anime({
                targets:animation,
                opacity: 1,
                duration: 300,
                easing: "linear",
                update: anime => {
                    this.scoreValueLabel.element.opacity = animation.opacity;
                    this.scoreLabel.element.opacity = animation.opacity;
                    this.pauseButton.element.opacity = animation.opacity;
                }
            });
        });

        this.updateEventListener = event => {
            let ballPosition = game.ball.getPosition().clone();

            ballPosition.y = 4;
            //ballPosition.y = 2;
            ballPosition.z -= 4;

            game.cameraTargetPosition = ballPosition;

            if (game.cameraMovingSpeed < 5) {
                game.cameraMovingSpeed += 0.05;
            }
        };

        game.app.on("update", this.updateEventListener);

    }

    eventsOff() {
        game.app.off("update", this.updateEventListener);

        game.app.off("level:resetBallSpeed");
        game.app.off("level:pause");
        game.app.off("level:unpause");
        game.app.off("level:addElement");
        game.app.off("level:removeElement");
        game.app.off("level:checkColor");
        game.app.off("level:changeColor");
        game.app.off("level:jump");
    }

    difficulty() {

       /* let fn = () => {

            let changer = this.addElement(ChangeElement);
            changer.callback = () => {
                this.ballSpeed += this.ballSpeedMultiplier;
                game.app.fire("level:resetBallSpeed");
                fn();
                console.log("speedUp: " + this.ballSpeed)
            };

            this.elementOffset += this.elementOffsetMultiplier;
            this.elementOffsetMultiplier+=0.05;
        };

        if (this.score === 0) fn();
*/
        if (this.score === 1)
            this.availableElements.push(RingElement);

        if (this.score === 1)
            this.availableElements.push(SmallPanelElement);
    }

    gameover() {
        game.app.fire("game:menu");
    }

    checkColor(color) {

        let ballColor = game.ball.visual.model.model.meshInstances[0].material.diffuse;

        if (ballColor.toString() !== color.toString()) {
            this.gameover();
        } else {
            this.score++;
            this.scoreValueLabel.element.text = this.score;
            this.difficulty();
        }

    }

    static blendColors(...colors) {
        let newColor = new pc.Color(0,0,0,1);

        let r = 0, g = 0, b = 0;

        colors.forEach(color => {
            r += color.r;
            g += color.g;
            b += color.b;
        });

        newColor.r = r / colors.length;
        newColor.g = g / colors.length;
        newColor.b = b / colors.length;

        return newColor;

    }

    addElement(className, config) {


        if (!className) {
            if (this.elements.length) {
                let lastElement = this.elements[this.elements.length - 1];

                if (lastElement instanceof PanelElement) {
                    className = this.getRandomElement();
                } else {
                    className = PanelElement;
                }
            }
        }

        //if (!className) className = PanelElement;

        let element = new className(config);

        let options = {
            offset: 0,
            element: element,
            elementOffset: this.elementOffset
        };

        if (this.elements.length) {
            let lastElement = this.elements[this.elements.length - 1];
            options.offset += lastElement.entity.getPosition().z;
            options.offset += lastElement.width / 2;
            options.offset += this.elementOffset;

            lastElement.beforeNextInsert(options);
        }

        element.beforeInsert(options);

        this.root.addChild(element.entity);
        element.entity.setPosition(0, 0, options.offset);

        element.afterInsert(options);

        this.elements.push(element);

        return element;
    }

    getRandomElement() {
        return this.availableElements[Math.floor(Math.random() * this.availableElements.length)];
    }

    hide() {

        if (!this.root.children.length) {
            return new Promise(resolve => resolve());
        }

        return new Promise(resolve => {

            game.ball.rigidbody.type = "static";
            this.eventsOff();

            let currentPosition = game.ball.getPosition();
            game.ball.visual.setLocalScale(1,1,1);
            if (this.ballJumpAnimation) this.ballJumpAnimation.pause();

            game.cameraTargetPosition = new pc.Vec3(0, 6, currentPosition.z - 6);

            let animation = {opacity: 1, ballPosition: currentPosition.y };

            let moveBallPromise = new Promise(resolveBall =>  {
                anime({
                    targets: animation,
                    ballPosition: 5,
                    duration: 1000,
                    easing: "easeOutBack",
                    update: anime =>  {
                        game.ball.setPosition(0, animation.ballPosition, currentPosition.z)
                    },
                    complete: anime => {
                        game.ball.setPosition(0, 0, 0);
                        game.camera.setPosition(0, 1, -6);
                        game.cameraTargetPosition = new pc.Vec3(0, 1, -6);
                        game.ballTargetPosition = new pc.Vec3(0,0,0);
                        resolveBall();
                    }
                });
            });

            let hideUI = new Promise(resolveUI => {
                anime({
                    targets: animation,
                    opacity: 0,
                    duration: 300,
                    easing: "linear",
                    update: anime =>  {

                        this.elements.forEach(element => {
                            element.opacity = animation.opacity;
                        });

                        this.blueButton.element.opacity = animation.opacity;
                        this.blueButton.inner.element.opacity = animation.opacity;
                        this.redButton.element.opacity = animation.opacity;
                        this.redButton.inner.element.opacity = animation.opacity;
                        this.yellowButton.element.opacity = animation.opacity;
                        this.yellowButton.inner.element.opacity = animation.opacity;
                        this.buttonsDock.element.opacity = animation.opacity;

                        // Probably already hidden
                        if (this.scoreLabel.element.opacity > 0) {
                            this.scoreLabel.element.opacity = animation.opacity;
                            this.scoreValueLabel.element.opacity = animation.opacity;
                            this.pauseButton.element.opacity = animation.opacity;
                        }

                    },
                    complete: anime => {
                        this.blueButton.destroy();
                        this.blueButton.destroy();
                        this.redButton.destroy();
                        this.redButton.inner.destroy();
                        this.yellowButton.destroy();
                        this.yellowButton.inner.destroy();
                        this.buttonsDock.destroy();
                        this.scoreLabel.destroy();
                        this.scoreValueLabel.destroy();
                        this.pauseButton.destroy();
                        resolveUI();
                    }
                });
            })

            Promise.all([moveBallPromise, hideUI]).then(() => {
                this.root.destroy();
                resolve();
            });

        })
    }
}
