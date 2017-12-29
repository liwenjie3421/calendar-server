const Controller = require('egg').Controller;

const {returnSuccess, returnError} = require('../../lib/plugin/response');
class HomeController extends Controller {
    async calendarInfo() {
       this.ctx.body = 123;
    }
}

module.exports = HomeController;