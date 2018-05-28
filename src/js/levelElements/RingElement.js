import LevelElement from "./../LevelElement";

export default class RingElement extends LevelElement{

    ring = new pc.Entity("ring");
    visual = new pc.Entity("ring-visual");

    constructor(options) {
        super();

        this.entity.name = this.constructor.name;
        Object.assign(this.options, options);

        this.initRing();
    }


    initRing() {

        this.visual.addComponent("model", {
            type: "asset",
            asset: game.app.assets.find("ring.json", "model")
        });

        this.visual.translateLocal(0, -1, 0);
        this.visual.setEulerAngles(0, 0, 90);
        this.visual.setLocalScale(0.6, 0.6, 0.6);
        this.ring.addChild(this.visual);

        this.ring.addComponent("collision", {
            type: "cylinder",
            radius: 0.7,
            height: 0.2,
        });

        this.ring.collision.on("triggerleave", result => {
            game.app.fire("level:removeElement", this);
            game.app.fire("level:addElement");
        });

        this.ring.collision.on("triggerenter", result => {
            game.app.fire("level:checkColor", this.colorSynonym());
        });

        let material = new pc.StandardMaterial();
        material.diffuse = this.getRandomColor();
        material.opacity = 0.999;
        material.blendType = pc.BLEND_NORMAL;
        material.update();
        this.visual.model.model.meshInstances[0].material = material;

        this.entity.addChild(this.ring);
        //this.ring.setLocalScale(1.4, 0.2, 1.4);
        this.ring.setEulerAngles(90, 0, 0);
        this.ring.translate(0, 1.8, 0);
    }

    beforeNextInsert(options) {
        options.offset -= options.elementOffset / 2;
    }

    afterInsert(options) {

    }

    set opacity(value) {
        this.visual.model.model.meshInstances[0].setParameter("material_opacity", value);
    }

    beforeInsert(options) {
        options.offset -= options.elementOffset / 2;
    }

    get width() {
        return 0;
    }

    get color() {
        return this.visual.model.model.meshInstances[0].material.diffuse;
    }

    get options() {
        return this._options || {
            width: 1.6,
            colors: [
                new pc.Color().fromString("#4BB0E4"),
                new pc.Color().fromString("#E95F78"),
                new pc.Color().fromString("#FBC626"),
                /*new pc.Color(1, 1, 0),
                new pc.Color(1, 0, 1),
                new pc.Color(0, 1, 1),*/
            ]
        };
    }

    getRandomColor() {
        return this.options.colors[Math.floor(Math.random() * this.options.colors.length)];
    }

    set color(value) {
        this.visual.model.model.meshInstances[0].material.diffuse = value;
        this.visual.model.model.meshInstances[0].material.update();
    }
}