// Travis-CI Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const config = require('./protractor.conf').config;

config.capabilities = {
  browserName: 'chrome',
  chromeOptions: {
    args: ['--no-sandbox']
  }
};

exports.config = config;
