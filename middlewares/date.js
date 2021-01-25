
function format(value) {
    if (value < 10)
        return `0${value}`;
    else
        return value;
}

module.exports = {
    getDate: () => {
        const date = new Date()

        let dd = date.getDate();
        let mm = date.getMonth() + 1;
        let yyyy = date.getFullYear();

        let d = `${format(dd)}-${format(mm)}-${yyyy}`;
        return d;
    },
    getTime: () => {
        const date = new Date();

        let dd = date.getDate();
        let mm = date.getMonth() + 1;
        let yyyy = date.getFullYear();

        let h = date.getHours();
        let m = date.getMinutes();

        let time = `${format(h)}:${format(m)}, ${format(dd)}-${format(mm)}-${yyyy}`;
        return time;
    }
}