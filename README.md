# Protractor-reporter-and-logger

This is simple project to demonstrate reporting and logging of protractor project.
3 reporters are covered in the project:
* Allure reporter (https://www.npmjs.com/package/jasmine-allure-reporter)
* Protractor beautiful reporter (https://www.npmjs.com/package/protractor-beautiful-reporter)
* Protractor HTML reporter 2 (https://www.npmjs.com/package/protractor-html-reporter-2)

1 logger is covered:
*  Winston (https://www.npmjs.com/package/winston)

Steps:
* Download project and open in any editor of your choice (I prefer VS code)
* Install protractor: https://www.protractortest.org/#/
* Start WebDriver manager
* Open project folder in terminal and run:
    * npm install (Will install dependencies reuired by project)
    * npm run protractortest
    * npm run report (For report of allure reporter, not required for other reporters)
    * cd path_to_chrome.exe > "./chrome.exe" --allow-file-access-from-files 
    (Give file read permission to chrome, so that you can ignore installing web server to view report htmls in chrome)
* View reports in chrome
* View logs in file winston-basic.log
* Stay happy :)


