/* jshint node: true */
'use strict';

module.exports = {
  name: 'xtrpg',
  isDevelopingAddon: function() {
    return true;
  },
  included: function(app) {
    this._super.included(app);
    app.import(app.bowerDirectory + "/random/lib/random.js");
  }
};
