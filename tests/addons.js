/*jshint node:true*/

var resolutions = [320,480,700,900,1100];

// create a WebdriverIO instance
var client = require('webdriverio').remote({
    desiredCapabilities: {
        browserName: 'firefox'
    }
});

// initialise WebdriverCSS for `client` instance
require('webdrivercss').init(client, {
    screenshotRoot: 'tests/shots-7',
    failedComparisonsRoot: 'tests/diffs-7',
    screenWidth: resolutions
});

client
    .init()
    .url('http://localhost:8080/add-ons.html')
    .webdrivercss('header', [
      {
        name: 'all',
        elem: '.site-header'
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
