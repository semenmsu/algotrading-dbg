
function getFormatedUTCTime() {
    return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
}

module.exports = {
    getFormatedUTCTime,
}
