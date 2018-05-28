export default class LevelElement {

    entity = new pc.Entity();
    _options = null;

    colorsSynonyms = {
        "#4BB0E4": "#00ABFF",
        "#E95F78": "#ff3a6c",
        "#FBC626": "#FFB100",
    };

    constructor() {

    }

    remove() {
        let animation = {opacity: 1}

        anime({
            targets: animation,
            opacity: 0,
            delay: 0,
            duration: 100,
            easing: "linear",
            update: anime => {
                this.opacity = animation.opacity;
            },
            complete: anime => {
                this.entity.destroy();
            }
        })
    }

    beforeNextInsert(options) {

    }

    afterInsert(options) {

    }

    beforeInsert(options) {
        options.offset += this.width / 2;
    }

    get width() {
        throw new Error("Not implemented in the base class");
    }

    colorSynonym() {
        let hex = this.color.toString();
        if ( ! this.colorsSynonyms[hex.toUpperCase()]) return this.color;
        return new pc.Color().fromString(this.colorsSynonyms[hex.toUpperCase()]);
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

    set opacity(value) {
        throw new Error("Not implemented in the base class");
    }


}