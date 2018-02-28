const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const moment = require('moment');

const {returnSuccess, returnError} = require('../../lib/plugin/response');
const {number216} = require('../../lib/plugin/utils');
class HomeController extends Controller {
    async calendarInfo() {
        const {body: params} = this.ctx.request;
        const {monthPicker, type, info, tutorInfo} = params;
        const dbpath = path.join(__dirname, '../../db.json');
        if (!fs.existsSync(dbpath)) {
            fs.writeFileSync(dbpath, '', {encoding: 'utf-8'});
        }

        if (type === 'get') {
            this.getCalendarInfo(monthPicker);
        } else if (type === 'save') {
            this.saveCalendarInfo(monthPicker, info, tutorInfo);
        } else {
            this.noValidateParams(type);
        }
    }

    getCalendarInfo(monthPicker) {
        if (!monthPicker) {
            this.noValidateParams(monthPicker)
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

    saveCalendarInfo(monthPicker, info, tutorInfo) {
        const filepath = path.join(__dirname, '../../db.json');
        const dbdata = JSON.parse(fs.readFileSync(filepath, {encoding: 'utf-8'}) || '{}');
        const daysNum = moment(monthPicker).daysInMonth();
        const tutorMap = {};
        tutorInfo.map(tutor => {
            if(tutor) {
                const tutorObj = tutor.split(':');
                const name = tutorObj[0];
                const color = tutorObj[1].match(/rgb\((.*)\)/)[1].split(',');
                
                tutorMap[`${number216(color[0])}${number216(color[1])}${number216(color[2])}`] = name;
            }
        });

        if (daysNum !== info.length) {
            this.noValidateParams('日期与排班不符');
            return;
        }

        dbdata[monthPicker] = {
            info: info.map(value => {
                const color = value.color.match(/rgb\((.*)\)/)[1].split(',');
                value.color = `${number216(color[0])}${number216(color[1])}${number216(color[2])}`;
                return value;
            }),
            tutorMap
        };
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