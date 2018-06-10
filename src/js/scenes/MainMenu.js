import Scene from "./../Scene";
import Animation from "../Animation";
import Application from "../Application";

export default class MainMenu extends Scene {

    constructor(app, game) {
        super(app, game);

        this.startGameBtn = this.createBlockButton(Application.ICON_PLAY, "START GAME", Application.ICON_BLUE_BUTTON);
        this.customizeBtn = this.createBlockButton(Application.ICON_CUSTOMIZE, "CUSTOMIZE", Application.ICON_RED_BUTTON);
        this.creditsBtn = this.createBlockButton(Application.ICON_CREDITS, "CREDITS", Application.ICON_YELLOW_BUTTON);

        this.customizeBtn.translateLocal(0,-87,0);
        this.creditsBtn.translateLocal(0,-174,0);

        let animation = { opacity: 0, cameraSpeed: 2};

        anime({
            targets:animation,
            opacity: 1,
            cameraSpeed: 4,
            duration: 200,
            easing: "linear",

            update: anime => {
                this.startGameBtn.element.opacity = animation.opacity;
                this.customizeBtn.element.opacity = animation.opacity;
                this.creditsBtn.element.opacity = animation.opacity;

                this.startGameBtn.text.element.opacity = animation.opacity;
                this.customizeBtn.text.element.opacity = animation.opacity;
                this.creditsBtn.text.element.opacity = animation.opacity;

                this.startGameBtn.icon.element.opacity = animation.opacity;
                this.customizeBtn.icon.element.opacity = animation.opacity;
                this.creditsBtn.icon.element.opacity = animation.opacity;

                game.cameraMovingSpeed = animation.cameraSpeed;
            }
        });

        this.events();

        // Disable ball's physics
        game.ball.rigidbody.teleport(0, 0, 0);
        game.ball.rigidbody.mass = 0;

        // Calculate camera position
        let cameraPosition = game.ball.getPosition().clone();

        cameraPosition.y = 1;
        cameraPosition.z = -6;

        game.cameraMovingSpeed = 1;
        game.cameraRotationSpeed = 5;

        game.cameraTargetPosition = cameraPosition;
        game.cameraTargetRotation = (new pc.Quat).setFromEulerAngles(-22, 180, 0)
    }

    events() {
        this.startGameBtn.element.on("click", event =>  {
            this.app.fire("game:start")
        });
        this.customizeBtn.element.on("click", event => {
            let animation = { speed: 0};
            anime({
                targets: animation,
                speed: [
                    { value: 300,  easing: 'easeOutQuint', duration: 300},
                    { value: 0,  easing: 'easeOutCirc', duration: 700},
                ],
                duration: 1000,
                update: anime => {
                    game.ball.visual.rigidbody.angularVelocity = new pc.Vec3(0, animation.speed, 0);
                }
            });

            this.app.fire("game:customize")
        });
    }

    hide() {
        return new Promise(resolve => {
            this.startGameBtn.element.off();
            this.customizeBtn.element.off();
            this.creditsBtn.element.off();

            let animation = { opacity: 1};

            anime({
                targets:animation,
                opacity: 0,
                cameraSpeed: 4,
                duration: 200,
                easing: "linear",

                update: anime => {
                    this.startGameBtn.element.opacity = animation.opacity;
                    this.customizeBtn.element.opacity = animation.opacity;
                    this.creditsBtn.element.opacity = animation.opacity;

                    this.startGameBtn.text.element.opacity = animation.opacity;
                    this.customizeBtn.text.element.opacity = animation.opacity;
                    this.creditsBtn.text.element.opacity = animation.opacity;

                    this.startGameBtn.icon.element.opacity = animation.opacity;
                    this.customizeBtn.icon.element.opacity = animation.opacity;
                    this.creditsBtn.icon.element.opacity = animation.opacity;
                },
                complete: anime => {
                    this.root.destroy();
                    this.startGameBtn.destroy();
                    this.customizeBtn.destroy();
                    this.creditsBtn.destroy();

                    return resolve();
                }
            });
        })
    }

}