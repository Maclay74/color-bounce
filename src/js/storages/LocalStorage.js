import Storage from "./../Storage";

export default class LocalStorage extends Storage {

    constructor() {
        super();

        if (!window.localStorage) {
            throw new Error("This storage type is not supported")
        }
    }

    get(key, defaultValue) {
        return new Promise(resolve => {
            let item = localStorage.getItem(key);
            if (!item) return resolve(defaultValue);
            return resolve(item);
        })

    }

    set(key, value) {

        return new Promise(resolve => {
            localStorage.setItem(key, value);
            return resolve(value);
        })
    }
}
