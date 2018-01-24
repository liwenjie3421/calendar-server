const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const moment = require('moment');

const {returnSuccess, returnError} = require('../../lib/plugin/response');
class HomeController extends Controller {
    async calendarInfo() {
        const {body: params} = this.ctx.request;
        const {monthPicker, type, info} = params;
        const dbpath = path.join(__dirname, '../../db.json');
        if (!fs.existsSync(dbpath)) {
            fs.writeFileSync(dbpath, '', {encoding: 'utf-8'});
        }

        if (type === 'get') {
            this.getCalendarInfo(monthPicker);
        } else if (type === 'save') {
            this.saveCalendarInfo(monthPicker, info);
        } else {
            this.noValidateParams(type);
        }
    }

    getCalendarInfo(monthPicker) {
        if (!monthPicker) {
            noValidateParams(monthPicker)
            return;
        }
        // 有选择日期
        const dbdata = JSON.parse(fs.readFileSync(path.join(__dirname, '../../db.json'), {encoding: 'utf-8'}) || '{}');
        const r = dbdata[monthPicker];
        if (r) {
            this.returnResult(r);
        } else {
            this.noResult();
        }
    }

    saveCalendarInfo(monthPicker, info) {
        const filepath = path.join(__dirname, '../../db.json');
        const dbdata = JSON.parse(fs.readFileSync(filepath, {encoding: 'utf-8'}) || '{}');
        const daysNum = moment(monthPicker).daysInMonth();

        if (typeof info !== 'string' || daysNum !== info.split(',').length) {
            this.noValidateParams(info);
            return;
        }

        dbdata[monthPicker] = info;
        try {
            fs.writeFileSync(filepath, JSON.stringify(dbdata), {encoding: 'utf-8'});   
            this.returnResult(true);
        } catch (error) {
            this.noResult();
        }

    }

    noValidateParams(s) {
        this.ctx.body = returnError(`validate params: ${s}`);
    }

    noResult() {
        this.ctx.body = returnError('no result');
    }

    returnResult(r) {
        this.ctx.body = returnSuccess(r);
    }
}

module.exports = HomeController;