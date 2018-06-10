import Storage from "./../Storage";

export default class VkStorage extends Storage {

    constructor() {
        super();
    }

    init() {
        return new Promise(resolve => {

            VK.init(() => {
                console.log("vk init success")
                return resolve();
            }, () => {
                console.log("vk init failed")
                return resolve();
            }, '5.60');
        });
    }

    get(key, defaultValue) {
        return new Promise(resolve => {
            if (!VK._bridge) return resolve(defaultValue);
            VK.api("storage.get", {key: key}).then(response => {

                if (response.response === "") {
                    this.set(key, defaultValue);
                    return resolve(defaultValue);
                }

                return resolve(response.response);
            })
        })

    }

    set(key, value) {
        return new Promise(resolve => {
            if (!VK._bridge) return resolve(value);
            VK.api("storage.set", {key: key, value: value}).then(response => {
                return resolve(response.response);
            })
        })
    }
}
