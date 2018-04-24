var crypto = require('crypto')
var request = require('request');

function WXBizDataCrypt(appId, sessionKey) {
    this.appId = appId
    this.sessionKey = sessionKey
}

WXBizDataCrypt.prototype.decryptData = function (encryptedData, iv) {
    // base64 decode
    var sessionKey = new Buffer(this.sessionKey, 'base64')
    encryptedData = new Buffer(encryptedData, 'base64')
    iv = new Buffer(iv, 'base64')

    try {
        // 解密
        var decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
        // 设置自动 padding 为 true，删除填充补位
        decipher.setAutoPadding(true)
        var decoded = decipher.update(encryptedData, 'binary', 'utf8')
        decoded += decipher.final('utf8')
        decoded = decoded.replace(/.*\[{/, '{"data":[{')
        decoded = JSON.parse(decoded)

    } catch (err) {
        throw new Error(err, 'Illegal Buffer')
    }

    if (decoded.watermark.appid !== this.appId) {
        throw new Error('Illegal Buffer')
    }

    return decoded
}



module.exports = async ctx => {
    const {encryptedData, iv, code} = ctx.request.body
    const appId = 'wx847bd17af7af2a4a'

    await new Promise(reslove => {
        request({url:`https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=eac9b755ffe98f6f7514d236288920c8&js_code=${code}&grant_type=authorization_code`, gzip:true}, function (error, response, body) {
        if(response && response.statusCode == 200) {
            body = JSON.parse(body);
            const {session_key} = body
            if(session_key) {
                var pc = new WXBizDataCrypt(appId, session_key)

                var data = pc.decryptData(encryptedData, iv)

                ctx.body = data
                reslove()
            }
        }
    });
    })
    




    

    // 解密后的数据为
    //
    // data = {   "nickName": "Band",   "gender": 1,   "language": "zh_CN",
    // "city": "Guangzhou",   "province": "Guangdong",   "country": "CN",
    // "avatarUrl":
    // "http://wx.qlogo.cn/mmopen/vi_32/aSKcBBPpibyKNicHNTMM0qJVh8Kjgiak2AHWr8MHM4WgM
    // Em7GFhsf8OYrySdbvAMvTsw3mo8ibKicsnfN5pRjl1p8HQ/0",   "unionId":
    // "ocMvos6NjeKLIBqg5Mr9QjxrP1FA",   "watermark": {     "timestamp": 1477314187,
    //     "appid": "wx4f4bc4dec97d474b"   } }

}