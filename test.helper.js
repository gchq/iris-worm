const jsdom = require('jsdom').jsdom;

global.document = jsdom({ file: 'index.html' }); // '<!doctype html><html><body></body></html>');

global.window = document.defaultView;

global.sinon = require('sinon');

global.expect = require('chai').expect;