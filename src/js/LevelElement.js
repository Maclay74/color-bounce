export default class LevelElement {

    entity = new pc.Entity();
    _options = null;

    constructor() {

    }


    remove() {
        this.entity.destroy();
    }

    get width() {
        throw new Error("Not implemented in the base class");
    }

    get color() {
        throw new Error("Not implemented in the base class");
    }

    get options() {
        return this._options;
    }

    set options(value) {
        this._options = value;
    }

}