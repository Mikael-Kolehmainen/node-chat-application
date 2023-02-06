
class DateTime {

    /**
     * @param {YYYYMMDDHHMMSS} today
     */
    constructor(today) {
        this.today = today;
    }

    getDate() {
        return this.today.substring(6, 8)
                + "."
                + this.today.substring(4, 6)
                + "."
                + this.today.substring(0, 4);
    }

    getHourMinute() {
        return this.today.substring(8, 10)
                + ":"
                + this.today.substring(10, 12);
    }
}

export default DateTime;