module.exports = appInfo => {
    const config = {};
    // should change to your own
    config.keys = appInfo.name + '_1501029269140_9663';
  
    // add your config here
    config.security = {
        csrf: {
            enable: false
        }
    };
    return config;
  };
  