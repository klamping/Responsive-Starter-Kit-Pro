/*jshint node:true*/

// create a WebdriverIO instance
var client = require('webdriverio').remote({
    desiredCapabilities: {
        browserName: 'firefox'
    }
});

// initialise WebdriverCSS for `client` instance
require('webdrivercss').init(client, {
    screenshotRoot: 'tests/shots-2',
    failedComparisonsRoot: 'tests/diffs-2',
});

client
    .init()
    .url('http://localhost:8080/add-ons.html')
    .webdrivercss('primary nav', [
      {
        name: 'mobile',
        elem: '#nav-primary-link',
        screenWidth: [320,480]
      },
      {
        name: 'desktop',
        elem: '#nav-primary',
        screenWidth: [700,900,1100]
      }
    ])
    .end();
