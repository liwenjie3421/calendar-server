const otp = {};

module.exports = {
    returnSuccess(content) {
        return {
            content
        };
    },
    returnError(error) {
        return {
            error
        };
    }
};