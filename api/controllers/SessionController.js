module.exports = {

  login: function (req, res) {

    Player.query(`SELECT id FROM player WHERE email = '${req.param('email')}' AND password = '${req.param('password')}'`, function (err, results) {
      if (!results.rows.length) return res.send('Unable to log in');

      req.session.name = results.rows[0].name;
      req.session.key = results.rows[0].id;
      req.session.password = req.param('password');

      return res.send('Logged in');
    });
  },

  logout: function (req, res) {
    req.session.destroy(function (err) {
      return res.send('Logged out');
    });
  },

  createToken: function (req, res) {
    if (!req.session.name) {
      res.send('No current session available, log in to receive a token!');
    }
    else {

      token = Date.now().toString();
      for(var i=0;i<30;i++) {
        start = Math.random() < 0.5 ? 65 : 97;
        token += String.fromCharCode(start+Math.floor(Math.random()*26));
      }
      
      Token.query(`insert into token (string, player, type) values ('${token}', ${req.session.key}, '${req.param('type')}')`);

      res.send(token);
    
    }
  }

}