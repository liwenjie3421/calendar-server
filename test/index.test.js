const {assert} = require('chai')
const saveCalendarInfo = require('../app/saveCalendarInfo')
const getCalendarInfo = require('../app/getCalendarInfo')

describe('saveOrGetEvent', () => {
    describe('存储一条数据', () => {
        it('存储成功', async() => {
            const ctx = {
                request: {
                    body: {
                        data: {
                            date: '2018-01-02',
                            teacher: '胡欣',
                            color: '#cccccc',
                            event: 'c'
                        }
                    }
                }
            }
            await saveCalendarInfo(ctx);
            assert.deepEqual(ctx.body, {
                code: 1,
                msg: '添加成功'
            })
        })
        it('存储失败', async() => {
            const ctx = {
                request: {
                    body: {
                        data: {
                            date: '2018-01-02',
                            color: '#cccccc',
                            event: 'c'
                        }
                    }
                }
            }
            await saveCalendarInfo(ctx);
            assert.deepEqual(ctx.body, {
                "code": -1,
                "msg": "添加失败，原因：Error: Error: SQLITE_CONSTRAINT: NOT NULL constraint failed: event_dev.t" +
                        "eacher"
            })
        })
    })
    describe('批量存储', () => {
        it('存储成功', async() => {
            const ctx = {
                request: {
                    body: {
                        batch: true,
                        batchData: [
                            {
                                date: '2018-01-02',
                                teacher: 'teacher5',
                                color: '#gfdf',
                                event: 'd'
                            }, {
                                date: '2018-01-02',
                                teacher: 'teacher6',
                                color: '#1234',
                                event: 'e'
                            }
                        ]
                    }
                }
            }
            await saveCalendarInfo(ctx);
            assert.deepEqual(ctx.body, {
                code: 1,
                msg: '批量添加成功'
            })
        })
        it('存储失败', async() => {
            const ctx = {
                request: {
                    body: {
                        batch: true,
                        data: {
                            date: '2018-01-02',
                            color: '#cccccc',
                            event: 'c'
                        }
                    }
                }
            }
            await saveCalendarInfo(ctx);
            assert.deepEqual(ctx.body, {
                "code": -1,
                "msg": "批量添加失败，原因：Error: batchData不能为空"
            })
        })
    })
    describe('读数据', ()=>{
        it('读数据', async() => {
            const ctx = {
                query: {
                    startDate: '2018-01-01',
                    endDate: '2018-04-15'
                }
            }
            await getCalendarInfo(ctx)
            assert.equal(ctx.body.code, 1)
            assert.equal(Object.prototype.toString.call(ctx.body.msg), '[object Array]')
            assert.equal(!!ctx.body.msg.length, true)
        })
    })
})