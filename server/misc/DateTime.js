
module.exports = class DateTime {
    constructor() {
        this.today = new Date();
    }

    getCurrentDate() {
        let month = this.#addZeroInStart(this.today.getMonth() + 1);
        let date = this.#addZeroInStart(this.today.getDate());

        return this.today.getFullYear() + '-' + month + '-' + date;
    }

    getCurrentTime() {
        let hours = this.#addZeroInStart(this.today.getHours());
        let minutes = this.#addZeroInStart(this.today.getMinutes());
        let seconds = this.#addZeroInStart(this.today.getSeconds());

        return hours + ":" + minutes + ":" + seconds;
    }

    #addZeroInStart(value) {
        if (value < 10) {
            value = "0" + value;
        }

        return value;
    }
}