const Home = require('./home')

module.exports = {
  '/': {
    method: 'post',
    cb: Home
  }
}
