class debug {

    constructor(noisy) {
        noisy = noisy || false;
        this.noisy = noisy;
    }

    log = (message, message2 = '', message3 = '') => {
        if (this.noisy) {
            console.log(message, message2, message3);
        }
    };

    shutUp = () => {
        this.noisy = false;
    }

    speakUp = () => {
        this.noisy = true;
    }

    //added for compatibility with Charlie code
    setQuiet = (newValue) => {
        this.noisy = !newValue;
    }
}
export default debug;