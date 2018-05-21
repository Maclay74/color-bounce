import Scene from "./../Scene";
import PanelElement from "./../levelElements/PanelElement";
import SafeZoneElement from "./../levelElements/SafeZoneElement";

export default class GameLoop extends Scene {

    screen = new pc.Entity("screen");
    scoreLabel = new pc.Entity("scoreLabel");
    ball = new pc.Entity("ball");

    redButton = new pc.Entity("redButton");
    greenButton = new pc.Entity("greenButton");
    blueButton = new pc.Entity("blueButton");

    score = 0;

    availableElements = [
        PanelElement
    ];

    elements = [];

    offset = 1.5;
    ballSpeed = 4;

    constructor(app) {
        super(app);

        this.events();
        this.initUi();
        this.initBall();
        this.initLevel();

        this.ball.rigidbody.teleport(0, 2, 0);
        game.camera.setPosition(0, 4, -7.6);
        game.camera.setEulerAngles(-22, 180, 0);

        game.camera.reparent(this.ball);
    }

    initUi() {
        // Init screen
        this.screen.addComponent("screen", {
            referenceResolution: pc.Vec2(1280, 720),
            scaleMode: pc.SCALEMODE_BLEND,
            scaleBlend: 0.5,
            screenSpace: true
        });
        this.root.addChild(this.screen);

        // Score
        this.scoreLabel.addComponent("element", {
            type: pc.ELEMENTTYPE_TEXT,
            anchor: new pc.Vec4(0, 1, 0, 1),
            pivot: new pc.Vec2(0, 1),
            alignment: new pc.Vec2(0.5, 0.5),
            useInput: true,
            fontAsset: 1,
            color: new pc.Color(...game.config.gameLoop.ui.color),
            fontSize: game.config.gameLoop.ui.fontSize,
            text: game.config.gameLoop.ui.scoreText + this.score
        });

        this.screen.addChild(this.scoreLabel);
        this.scoreLabel.setPosition(-0.9, 0.9, 0);

        // Colors
        this.redButton.addComponent("element", {
            type: pc.ELEMENTTYPE_IMAGE,
            anchor: new pc.Vec4(0.5, 0, 0.5, 0),
            pivot: new pc.Vec2(0.5, 0),
            useInput: true,
            width: 70,
            height: 70,
            color: new pc.Color(1,0,0)
        });

        this.greenButton.addComponent("element", {
            type: pc.ELEMENTTYPE_IMAGE,
            anchor: new pc.Vec4(0.5, 0, 0.5, 0),
            pivot: new pc.Vec2(0.5, 0),
            useInput: true,
            width: 70,
            height: 70,
            color: new pc.Color(0,1,0)
        });

        this.blueButton.addComponent("element", {
            type: pc.ELEMENTTYPE_IMAGE,
            anchor: new pc.Vec4(0.5, 0, 0.5, 0),
            pivot: new pc.Vec2(0.5, 0),
            useInput: true,
            width: 70,
            height: 70,
            color: new pc.Color(0,0,1)
        });

        this.screen.addChild(this.redButton);
        this.screen.addChild(this.greenButton);
        this.screen.addChild(this.blueButton);

        this.redButton.setLocalPosition(-100, 46, 0);
        this.greenButton.setLocalPosition(0, 46, 0);
        this.blueButton.setLocalPosition(100, 46, 0);

        let touchStart = function(event) {
            game.app.fire("level:changeColor", this.color);
        };

        this.redButton.element.on("touchstart",touchStart)
        this.greenButton.element.on("touchstart",touchStart)
        this.blueButton.element.on("touchstart",touchStart)

    }

    initBall() {

        this.ball.addComponent("model", {
            type: "sphere",
        });

        this.ball.addComponent("collision", {
            radius: game.config.gameLoop.ball.radius,
            type: "sphere"
        });

        this.ball.addComponent("rigidbody", {
            type: pc.RIGIDBODY_TYPE_DYNAMIC,
            mass: game.config.gameLoop.ball.mass,
            linearDamping: 0,
            angularDamping: 0,
            linearFactor: new pc.Vec3(0, 1, 1),
            angularFactor: pc.Vec3.ZERO,
            friction: 0,
            restitution: 1
        });

        this.ball.collision.on("collisionstart", event => {
            let velocity = this.ball.rigidbody.linearVelocity;
            this.ball.rigidbody.linearVelocity = new pc.Vec3(0, velocity.y, this.ballSpeed);
        });

        this.root.addChild(this.ball);

        game.app.fire("level:changeColor", new pc.Color(...game.config.gameLoop.ball.startColor))
    }

    initLevel() {

        this.addElement(SafeZoneElement);

        for (let i = 0; i < 9; i++) {
            this.addElement();
        }
    }

    events() {
        // When ball contacts something with special color
        game.app.on("level:checkColor", color => {
            this.checkColor(color)
        });

        game.app.on("level:jump", color => {
            this.ball.rigidbody.applyImpulse(0, 4, 0);
        });

        game.app.on("level:addElement",()=> {
            this.addElement();
        });

        game.app.on("level:changeColor", color => {
            let material = this.ball.model.model.meshInstances[0].material;
            material.diffuse = color;
            material.update();
        })

    }

    checkColor(color) {

        let ballColor = this.ball.model.model.meshInstances[0].material.diffuse;

        if (ballColor.toString() !== color.toString()) {
            game.app.fire("game:menu");
        } else {
            this.score++;
            this.scoreLabel.element.text = game.config.gameLoop.ui.scoreText + this.score;
        }

    }

    addElement(className, config) {

        className = className || this.getRandomElement();

        let panel = new className(config);
        this.root.addChild(panel.entity);

        if (this.elements.length) {
            let lastElement = this.elements[this.elements.length - 1];

            let offset = 0;
            offset += lastElement.entity.getPosition().z;
            offset += lastElement.width;
            offset += this.offset;

            panel.entity.setPosition(0, 0, offset);
        }

        panel.block.rigidbody.syncEntityToBody();

        this.elements.push(panel);

        return panel;
    }

    getRandomElement() {
        return this.availableElements[Math.floor(Math.random() * this.availableElements.length)];
    }

    hide() {
        return new Promise(resolve => {

            game.camera.reparent(game.app.root);

            game.app.off("level:addElement");
            game.app.off("level:checkColor");
            game.app.off("level:changeColor");
            game.app.off("level:jump");
            this.root.destroy();
            return resolve();
        })
    }
}
