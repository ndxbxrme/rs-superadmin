(function() {
  var dotty;

  dotty = require('dotty');

  module.exports = function(config) {
    return function(rs) {
      return rs.db.on('ready', async function() {
        var newuser, opts, user;
        opts = {};
        dotty.put(opts, rs.config.userNameField, 'superadmin@admin.com');
        user = (await rs.db.selectOne(rs.config.userTable, opts));
        if (!user) {
          newuser = {
            role: ['superadmin']
          };
          dotty.put(newuser, rs.config.userNameField, 'superadmin@admin.com');
          dotty.put(newuser, rs.config.userPassField, bcrypt.hashSync('admin', bcrypt.genSaltSync(8), null));
          return rs.db.insert(rs.config.userTable, newuser);
        }
      });
    };
  };

}).call(this);

//# sourceMappingURL=index.js.map
