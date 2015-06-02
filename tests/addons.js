/*jshint node:true*/

// create a WebdriverIO instance
var client = require('webdriverio').remote({
    desiredCapabilities: {
        browserName: 'firefox'
    }
});

// initialise WebdriverCSS for `client` instance
require('webdrivercss').init(client, {
    screenshotRoot: 'shots-1',
    failedComparisonsRoot: 'diffs-1',
    screenWidth: [320,480,700,900,1100]
});

client
    .init()
    .url('http://localhost:8080/add-ons.html')
    .webdrivercss('primary nav', [
      {
        name: 'all',
        elem: '#nav-primary'
      }
    ])
    .end();
