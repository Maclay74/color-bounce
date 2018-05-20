import Scene from "./../Scene";
import PanelElement from "./../levelElements/PanelElement";
import SafeZoneElement from "./../levelElements/SafeZoneElement";

export default class GameLoop extends Scene {

    screen = new pc.Entity("screen");
    scoreLabel = new pc.Entity("scoreLabel");
    ball = new pc.Entity("ball");

    score = 0;

    availableElements = [
        PanelElement
    ];

    elements = [];

    offset = 1.5;
    ballSpeed = 4;

    constructor(app) {
        super(app);

        this.initUi();
        this.initBall();
        this.events();
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

    }

    checkColor(color) {

        let ballColor = this.ball.model.model.meshInstances[0].material.diffuse;

        if (ballColor.toString() !== color.toString()) {
            game.app.fire("game:menu");
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

            game.app.off("level:checkColor");
            game.app.off("level:jump");
            this.root.destroy();
            return resolve();
        })
    }
}
