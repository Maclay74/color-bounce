export default class Animation {

    from = 0;
    time = 0;


    iterator = function() {};
    callback = function() {};

    constructor(time, iterator) {

        this.time = time;

        this.iterator = iterator;

        this.current = this.from;
        game.app.on("update", this.update, this);


    }

    update(dt) {

        this.current += dt * 1000;
        let percentDone = this.current / (this.time / 100);
        if (this.current > this.time) {
            game.app.off("update", this.update, this);

            if (this.callback)
                return this.callback();

            return true;
        } else {
            this.iterator(percentDone / 100);
        }
    }


}