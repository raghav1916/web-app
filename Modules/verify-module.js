var Cryptr = require("cryptr");
cryptr = new Cryptr("myTotalySecretKey");

var connection = require("../config");
module.exports.authenticate = function(req, res) {
  var userName = req.body.uname;
  var password = req.body.password;

  connection.query("SELECT * FROM users WHERE uname = ?", [userName], function(
    error,
    results,
    fields
  ) {
    if (error) {
      res.json({
        status: false,
        message: "there are some error with query"
      });
    } else {
      if (results.length > 0) {
        decryptedString = cryptr.decrypt(results[0].password);
        if (password == decryptedString) {
          res.json({
            //
            //status: true,
            welcome: results[0].name + results[0].lname,
            Username: results[0].uname,
            Email: results[0].email
          });
        } else {
          res.json({
            status: false,
            message: "Email and password does not match"
          });
        }
      } else {
        res.json({
          status: false,
          message: "Email does not exits"
        });
      }
    }
  });
  //JSON.stringify(json, null, 2);
};
