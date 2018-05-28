import LevelElement from "./../LevelElement";
import PanelElement from "./PanelElement";

export default class SmallPanelElement extends PanelElement{

    constructor(options) {
        super(options);
    }

    get options() {
        return this._options || {
            blockWidth: 2,
            blockHeight: game.config.gameLoop.level.elements.panel.blockHeight,
            blockDepth: game.config.gameLoop.level.elements.panel.blockDepth,
            jumperWidth: 1,
            jumperHeight: 1,
            restitution: 0,
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


}