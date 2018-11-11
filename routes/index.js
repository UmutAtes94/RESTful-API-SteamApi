const express = require('express');
const router = express.Router();
//Models
const User = require('../models/User.js'); //User modelini import ettik...

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/register', function(req, res, next) {
  const {username, password} = req.body;//body nesnesiyle gelen değerler username ve passworde eşitlenecek
  const user = new User({ //User nesnesi yarattık ve değer ataması yaptık
      username, //username = username anlamına geliyor (modelsdeki username'e eşit)
      password
  });
    const promise = user.save(); //to save user in database..
    promise.then((data) => {
      res.json(data) //data control
    }).catch((err) => { //err control
      res.json();
    });
});
module.exports = router;
