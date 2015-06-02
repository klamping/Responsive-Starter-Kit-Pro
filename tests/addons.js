/*jshint node:true*/

var resolutions = [320,480,700,900,1100];


// Script assumes your BrowserStack creds are listed in JSON somewhere in your system.
// Convenient if you want to avoid storing keys in VCS. If storing in VCS is ok, just make
// config the object literal:
//
// {
//   "browserstack": {
//     "user": "MY_USER",
//     "key": "MY_KEY"
//   }
// }
//
var config = require('./credentials.json');

// create a WebdriverIO instance
var client = require('webdriverio').remote({
  desiredCapabilities: {
    'browserstack.debug': 'true',
    'browserstack.local': 'true',
    os: 'Windows',
    os_version: '7',
    browser: 'ie',
    browser_version: '9.0'
  },
  host: 'hub.browserstack.com',
  port: 80,
  user: config.browserstack.user,
  key: config.browserstack.key
});

// initialise WebdriverCSS for `client` instance
require('webdrivercss').init(client, {
    screenshotRoot: 'tests/shots-6',
    failedComparisonsRoot: 'tests/diffs-6',
    screenWidth: resolutions
});

client
    .init()
    .url('http://localhost:8080/add-ons.html')
    .webdrivercss('header', [
      {
        name: 'all',
        elem: '.site-header',
        exclude: ['#nav-primary', '#nav-primary-link']
      }
    ])
    .webdrivercss('nav menu icon', [
      {
        name: 'mobile',
        elem: '#nav-primary-link',
        screenWidth: resolutions.slice(0,2)
      }
    ])
    .setViewportSize({
        width: resolutions[0],
        height: 300
    })
    .isVisible('#nav-primary-link', function (err, isVisible) {
      if (isVisible) {
        this.click('#nav-primary-link');
        this.pause(1000);
      }
    })
    .webdrivercss('nav', [
      {
        name: 'all',
        elem: '#nav-primary'
      }
    ])
    .moveToObject('#nav-primary a', 1, 1)
    .webdrivercss('nav - hovered', [
      {
        name: 'all',
        elem: '#nav-primary',
        screenWidth: resolutions.slice(3,4)
      }
    ])
    .webdrivercss('breadcrumbs', [
      {
        name: 'all',
        elem: '.nav-breadcrumb'
      }
    ])
    .webdrivercss('article header', [
      {
        name: 'all',
        elem: '.article-header'
      }
    ])
    .end();
