export default class Storage {

    constructor() {

    }

    init() {
        return new Promise(resolve => {
            return resolve();
        });
    }

    get(key, defaultValue) {

        throw new Error("Not implemented in base class");
    }

    set(key, value) {
        throw new Error("Not implemented in base class");
    }

}