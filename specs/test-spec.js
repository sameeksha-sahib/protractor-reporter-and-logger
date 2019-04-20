var logger = require('../winston_log.js');

describe('Verify titles of Different Webpages', function () {
    it('Verify title of Google.com', function () {
        browser.get("http://google.com/");
        logger.log('info','launched google.com')

        expect(browser.getTitle()).toBe("Google");
    });
    it('Verify title of Gmail.com', function () {
        browser.get("http://gmail.com/");
        logger.log('info','launched gmail.com')

        expect(browser.getTitle()).toBe("Gmail");
    });
})