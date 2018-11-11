//--------veritabanı bağlantısı ------
//________DATABASE CONNECTION ____________

const mongoose = require('mongoose');
module.exports = () => { //modül export ediyoruz
    mongoose.connect('mongodb://steam_user:123456a@ds159073.mlab.com:59073/steam-api',{ useNewUrlParser: true });

    mongoose.connection.on('open', () => { //trigger ile baglantı kontrolü
        console.log('MongoDB: CONNECTED...');
    });

    mongoose.connection.on('error', (err) => { //error tetiklenirse hata yakalamak için
        console.log('MongoDB: ERROR!!!', err);
    });

    mongoose.Promise = global.Promise;
};