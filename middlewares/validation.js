module.exports = {
    getMoney: (str) => {
        const format = str.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        return format;
    }
}