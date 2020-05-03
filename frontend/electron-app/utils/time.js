
function getFormatedUTCTime() {
    new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
}

module.exports = {
    getFormatedUTCTime,
}
