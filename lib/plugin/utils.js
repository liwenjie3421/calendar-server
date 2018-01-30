module.exports = {
    number216
};


function number216(number) {
    let r = '';
    if (typeof number === 'number') {
        r = number.toString(16);
    } else if (typeof number === 'string') {
        r = Number(number).toString(16);
    }
    if(r < 10) {
        r = '0' + r;
    }
    return r;
}