const {assert} = require('chai')
const saveCalendarInfo = require('../app/saveCalendarInfo')

describe('saveEvent', () => {
    describe('存储一条数据', () => {
        it('存储成功', async() => {
            const ctx = {
                request: {
                    body: {
                        data: {
                            startTime: Number(new Date()),
                            endTime: Number(new Date()),
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
                            startTime: Number(new Date()),
                            endTime: Number(new Date()),
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
                                startTime: 1111111111111111,
                                endTime: 222222222222222222,
                                teacher: 'teacher5',
                                color: '#gfdf',
                                event: 'd'
                            }, {
                                startTime: 1333333333333333,
                                endTime: 244444444444,
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
                            startTime: Number(new Date()),
                            endTime: Number(new Date()),
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
})
