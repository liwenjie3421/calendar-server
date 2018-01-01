module.exports = app => {
    const { router, controller } = app;
    router.post('/calendarInfo', controller.home.calendarInfo);
    router.get('/calendarInfo', controller.home.calendarInfo);
  };