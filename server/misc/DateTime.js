
module.exports = class DateTime {
    constructor() {
        this.today = new Date();
        this.month = this.#addZeroInStart(this.today.getMonth() + 1);
        this.date = this.#addZeroInStart(this.today.getDate());
        this.hours = this.#addZeroInStart(this.today.getHours());
        this.minutes = this.#addZeroInStart(this.today.getMinutes());
        this.seconds = this.#addZeroInStart(this.today.getSeconds());
    }

    getCurrentDate() {
        return this.today.getFullYear() + '-' + this.month + '-' + this.date;
    }

    getCurrentTime() {
        return this.hours + ":" + this.minutes + ":" + this.seconds;
    }

    getDateTime() {
        return this.today.getFullYear()
                + this.month
                + this.date
                + this.hours
                + this.minutes
                + this.seconds;
    }

    #addZeroInStart(value) {
        if (value < 10) {
            value = "0" + value;
        }

        return value;
    }
}