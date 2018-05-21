import LevelElement from "./../LevelElement";

export default class PanelElement extends LevelElement{

    static count = 0;

    block = new pc.Entity("block");
    jumper = new pc.Entity("jumper");

    constructor(options) {
        super();

        this.entity.name = this.constructor.name;

        Object.assign(this.options, options);
        this.initBlock();
        this.initJumper();

        PanelElement.count++;
    }

    initBlock() {

        this.block.addComponent("model", { type: "box" });

        this.block.addComponent("rigidbody", {
            mass: 0,
            restitution: game.config.gameLoop.level.elements.panel.restitution
        });

        this.block.addComponent("collision", {
            type: "box",
            halfExtents: new pc.Vec3(this.options.blockHeight / 2, this.options.blockDepth /2, this.options.blockWidth / 2)
        });

        // When ball contacts with element we have to check it's color
        this.block.collision.on("collisionstart", result => {
            this.block.collision.off("collisionstart");
            game.app.fire("level:checkColor", this.color);
        });

        this.block.setLocalScale(this.options.blockHeight,  this.options.blockDepth, this.options.blockWidth);

        // Material
        let material = new pc.StandardMaterial();
        material.diffuse = this.getRandomColor();
        material.update();
        this.block.model.model.meshInstances[0].material = material;

        this.entity.addChild(this.block);
    }

    initJumper() {

        this.entity.addChild(this.jumper);

        //this.jumper.addComponent("model", {type: "box"});
        this.jumper.setLocalScale(this.options.blockHeight, this.options.blockDepth / 2, this.options.jumperWidth);
        this.jumper.setLocalPosition(0, this.options.blockDepth / 2, this.options.blockWidth / 2 - this.options.jumperWidth / 2);

        this.jumper.addComponent("collision", {
            type: "box",
            halfExtents: new pc.Vec3(this.options.blockHeight / 2,  this.options.blockDepth / 4, this.options.jumperWidth / 2)
        });

        // Jump on the end of platform
        this.jumper.collision.on("triggerenter", result => {
            game.app.fire("level:jump");
        });

        // Remove platform
        this.jumper.collision.on("triggerleave", result => {
            this.entity.destroy();
            game.app.fire("level:addElement");
        });
    }

    get width() {
        return this.options.blockWidth;
    }

    get color() {
        return this.block.model.model.meshInstances[0].material.diffuse;
    }

    get options() {
        return this._options || {
            blockWidth: game.config.gameLoop.level.elements.panel.blockWidth,
            blockHeight: game.config.gameLoop.level.elements.panel.blockHeight,
            blockDepth: game.config.gameLoop.level.elements.panel.blockDepth,
            jumperWidth: 1,
            colors: [
                new pc.Color(1, 0, 0),
                new pc.Color(0, 1, 0),
                new pc.Color(0, 0, 1),
                //new pc.Color(1, 1, 0),
                //new pc.Color(1, 0, 1),
                //new pc.Color(0, 1, 1),
            ]
        };
    }

    getRandomColor() {
        return this.options.colors[Math.floor(Math.random() * this.options.colors.length)];
    }

    set color(value) {
        this.block.model.model.meshInstances[0].material.diffuse = value;
        this.block.model.model.meshInstances[0].material.update();
    }
}