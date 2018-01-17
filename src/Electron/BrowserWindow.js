"use strict";

// module Electron.BrowserWindow

exports.newBrowserWindowImpl = function(options) {
  // require('electron') on demand so test suites can still run under node
  var BrowserWindow = require('electron').BrowserWindow;
  return function() {
    return new BrowserWindow(options);
  };
}

exports.onClose = function(browserWindow) {
  return function(callback) {
    return function() {
      return browserWindow.on('close', function() {
        callback();
      });
    };
  };
}

exports.loadURL = function(browserWindow) {
  return function(url) {
    return function() {
      return browserWindow.loadURL(url);
    };
  };
}

exports.webContents = function(browserWindow) {
  return function() {
    return browserWindow.webContents;
  };
}

exports.openDevToolsImpl = function(webContents) {
  return function(options) {
    return function() {
      webContents.openDevTools(options);
      return {};
    };
  };
}

exports.send = function(webContents) {
  return function(channel) {
    return function(arg) {
      return function() {
        webContents.send(channel, arg);
        return {};
      }
    }
  }
}

exports.onDidFinishLoad = function(webContent) {
  return function(callback) {
    return function() {
      return webContent.on('did-finish-load', function() {
        callback();
      });
    };
  };
}

exports.onNewWindow = function(webContents) {
  return function(callback) {
    return function() {
      return webContents.on('new-window', function(e, url) {
        callback(e)(url)();
      });
    };
  };
}

exports.onWillNavigate = function(webContents) {
  return function(callback) {
    return function() {
      return webContents.on('will-navigate', function(e, url) {
        callback(e)(url)();
      });
    };
  };
}

exports.onDidNavigate = function(webContents) {
  return function(callback) {
    return function() {
      return webContents.on('did-navigate', function(e, url) {
        callback(e)(url)();
      });
    };
  };
}

exports.onDidNavigateInPage = function(webContents) {
  return function(callback) {
    return function() {
      return webContents.on('did-navigate-in-page', function(e, url) {
        callback(e)(url)();
      });
    };
  };
}

exports.onDidGetRedirectRequest = function(webContents) {
  return function(callback) {
    return function() {
      return webContents.on('did-get-redirect-request', function(e, oldURL,
                newURL, isMainFrame, httpResponseCode, requestMethod,
                referrer, headers) {
          callback(e)(oldURL)(newURL)(isMainFrame)(httpResponseCode)(requestMethod)(referrer)(headers)();
      });
    };
  };
}

exports.onDomReady = function(webContents) {
  return function(callback) {
    return function() {
      return webContents.on('dom-ready', function(e) {
        callback(e)();
      });
    };
  };
}