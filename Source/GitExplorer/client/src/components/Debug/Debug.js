class debug {

    constructor(noisy) {
        noisy = noisy || false;
        this.noisy = noisy;
    }

    log = (message) => {
        if (this.noisy) {
            console.log(message);
        }
    };

    shutUp = () => {
        this.noisy = false;
    }

    speakUp = () => {
        this.noisy = true;
    }
}
export default debug;