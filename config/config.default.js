module.exports = appInfo => {
    const config = {};
    // should change to your own
    config.keys = appInfo.name + '_1501029269140_9663';

    // add your config here
    config.security = {
        csrf: {
            enable: false
        },
        domainWhiteList: ['http://localhost:3001']
    };
    config.cors = {
        origin: '*',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    };
    return config;
};
