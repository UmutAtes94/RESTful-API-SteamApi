//------------- SCHEMA TO GAMES------------
//_________________________________________
const mongoose = require ('mongoose');
const Schema = mongoose.Schema; //şema nesnesi aldık


const SteamSchema =  new Schema({ //aldığımız nesneden SteamSchema nesnesi yarattık
    developer_id: Schema.Types.ObjectId,
    title: {
       type: String,
       required: true
   },
    category: String,
    country: String,
    year: Number,
    game_point: Number,

});
//export to use different page
module.exports = mongoose.model ('steam', SteamSchema); //baska yerde kullanmak için export ediyoruz..
