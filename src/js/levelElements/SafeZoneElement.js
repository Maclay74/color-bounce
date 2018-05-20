import PanelElement from "./PanelElement";

export default class SafeZoneElement extends PanelElement{

    constructor(options) {
        super(options);

        this.block.translate(0,0, (this.options.blockWidth - super.options.blockWidth) / 2)
        this.jumper.translate(0,0, (this.options.blockWidth - super.options.blockWidth) / 2)
    }



    get options() {
        return this._options || {
            blockWidth: game.config.gameLoop.level.elements.safeZone.blockWidth,
            blockHeight: game.config.gameLoop.level.elements.safeZone.blockHeight,
            blockDepth: game.config.gameLoop.level.elements.safeZone.blockDepth,
            jumperWidth: 1,
            colors: [new pc.Color(...game.config.gameLoop.level.elements.safeZone.color)]
        };
    }

    get width() {
        return this.options.blockWidth;
    }

}