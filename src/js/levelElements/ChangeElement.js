import PanelElement from "./PanelElement";

export default class ChangeElement extends PanelElement{


    callback = function() {

    }

    constructor(options) {
        super(options);

        this.block.model.model.meshInstances[0].material.diffuse = new pc.Color(1, 1, 1, 1);
        this.block.model.model.meshInstances[0].material.update();

        this.block.collision.off("collisionstart");

        this.block.collision.on("collisionstart", result => {
            this.block.collision.off("collisionstart");
            this.callback();
        });
    }
}