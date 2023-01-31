const today = new Date();

module.exports.getCurrentDate = function () {
    return today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
}

module.exports.getCurrentTime = function () {
    return today.getHours() + ":" + today.getMinutes();
}