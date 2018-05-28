import PanelElement from "./PanelElement";

export default class SafeZoneElement extends PanelElement{

    constructor(options) {
        super(options);

        //this.block.translate(0,0, (this.options.blockWidth - super.options.blockWidth) / 2)
        //this.jumper.translate(0,0, (this.options.blockWidth - super.options.blockWidth) / 2)

        this.block.collision.off("collisionstart");

        this.block.collision.on("collisionstart", result => {
            this.block.collision.off("collisionstart");

            let animate = {scale: 1, translate: 0};

            anime({
                targets: animate,
                scale: [
                    { value: 0.9, delay: 0, easing: 'easeOutQuint'},
                    { value: 1, delay: 0, easing: 'easeOutQuint'},
                ],
                translate: [
                    { value: -0.1, delay: 0, easing: 'linear'},
                    { value: 0, delay: 0, easing: 'linear'},
                ],
                duration: 250,
                delay: 0,
                update: anime => {
                    game.ball.visual.setLocalScale(1 + (1 - animate.scale), animate.scale, 1 + (1 - animate.scale));
                    game.ball.visual.setLocalPosition(0,animate.translate,0);
                }
            });

            //game.app.fire("level:changeColor", new pc.Color(1,1,1,1));
        });
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