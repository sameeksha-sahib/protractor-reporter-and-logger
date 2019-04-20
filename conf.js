var HtmlReporter = require('protractor-beautiful-reporter');
var HTMLReport = require('protractor-html-reporter-2');
var jasmineReporters = require('jasmine-reporters');

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['./specs/*spec.js'],

    framework: 'jasmine2',

    onPrepare: function () {
        browser.ignoreSynchronization = true; // As we are testing non-angular sites
        browser.driver.manage().window().maximize();

        // To see reports from file without starting the web server, give access to chrome to read form files:
        // > cd path_to_chrome.exe > "./chrome.exe" --allow-file-access-from-files

        // Jasmine Allure reporter 
        var AllureReporter = require('jasmine-allure-reporter');
        jasmine.getEnv().addReporter(new AllureReporter({
            resultsDir: 'allure-results'
        }));
        // Take screenshot at the end of each test
        jasmine.getEnv().afterEach(function (done) {
            browser.takeScreenshot().then(function (png) {
                allure.createAttachment('Screenshot', function () {
                    return new Buffer(png, 'base64');
                }, 'image/png')();
                done();
            })
        });



        // Protractor Beautiful Reporter 
        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: 'pBeautiful-report',
            screenshotsSubfolder: 'images',
            jsonsSubfolder: 'jsons',
            takeScreenShotsOnlyForFailedSpecs: true
        }).getJasmine2Reporter());


        // Protractor HTML Reporter 2 
        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            savePath: './pHTMLReporter2',
            filePrefix: 'xmlresults'
        }));

        var fs = require('fs-extra');

        fs.emptyDir('pHTMLReporter2/screenshots/', function (err) {
            console.log(err);
        });

        jasmine.getEnv().addReporter({
            specDone: function (result) {
                if (result.status == 'failed') {
                    browser.getCapabilities().then(function (caps) {
                        var browserName = caps.get('browserName');

                        browser.takeScreenshot().then(function (png) {
                            var stream = fs.createWriteStream('pHTMLReporter2/screenshots/' + browserName + '-' + result.fullName + '.png');
                            stream.write(new Buffer(png, 'base64'));
                            stream.end();
                        });
                    });
                }
            }
        });
    },

    onComplete: function () {
        // Protractor HTML Reporter 2 
        var browserName, browserVersion;
        var capsPromise = browser.getCapabilities();
        capsPromise.then(function (caps) {
            browserName = caps.get('browserName');
            browserVersion = caps.get('version');
            platform = caps.get('platform');

            testConfig = {
                reportTitle: 'Protractor Test Execution Report',
                outputPath: './pHTMLReporter2',
                outputFilename: 'ProtractorTestReport',
                screenshotPath: './screenshots',
                testBrowser: browserName,
                browserVersion: browserVersion,
                modifiedSuiteName: false,
                screenshotsOnlyOnFailure: true,
                testPlatform: platform
            };
            new HTMLReport().from('pHTMLReporter2/xmlresults.xml', testConfig);
        });
    }
};