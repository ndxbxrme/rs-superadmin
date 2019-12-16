dotty = require 'dotty'
module.exports = (config) ->
  (rs) ->
    rs.db.on 'ready', ->
      opts = {}
      dotty.put opts, rs.config.userNameField, 'superadmin@admin.com'
      user = await rs.db.selectOne rs.config.userTable, opts
      if not user
        newuser =
          role: ['superadmin']
        dotty.put newuser, rs.config.userNameField, 'superadmin@admin.com'
        dotty.put newuser, rs.config.userPassField, bcrypt.hashSync 'admin', bcrypt.genSaltSync(8), null
        rs.db.insert rs.config.userTable, newuser