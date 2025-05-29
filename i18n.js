const i18n = require('i18n');
const path = require('path');

i18n.configure({
  locales: ['en', 'vi'],
  directory: path.join(__dirname, 'locales'),
  defaultLocale: 'en',
  objectNotation: true,
  updateFiles: false,
  logDebugFn: function (msg) {
    console.log('i18n debug:', msg);
  },
  logWarnFn: function (msg) {
    console.log('i18n warn:', msg);
  },
  logErrorFn: function (msg) {
    console.log('i18n error:', msg);
  }
});

module.exports = i18n;