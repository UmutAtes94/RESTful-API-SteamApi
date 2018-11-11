const express = require('express');
const router = express.Router();

//Models
const Steam = require('../models/Steam'); //model dosyasını import ettik

//-------------BÜTÜN OYUNLARI LİSTELEME---------------
//------------ LIST ALL GAMES ------------------------
router.get('/',(req,res) => {
    const promise = Steam.find ({ });
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })
});

//--------------------------------------------
//-----------TOP-10 OYUN LİSTELEME------------
//-----------LIST TOP10 GAMES-----------------

router.get('/top10',(req,res) => {
    const promise = Steam.find ({ }).limit(10).sort({'imdb_score': -1}); //promise neydi?
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })
});

//-----------------------------------------------------------
//-------- ARANAN TITLE'A GÖRE OYUN LİSTELEME ---------------
//-------- FIND GAME WITH TITLE------------------------------

router.get('/:title',(req,res,next) => { // '/:tittle' ile bir string alıp params nesnesine göndercez karşılaştıracaz

    //res.send(req.params); --yani url'ye gireceğim değer ne ise title'a atanmıs olacak...
    const promise = Steam.find({title:req.params.title}) //params'a atanan title ile eşleşen dataları getir
                                                        //süslü parantez içine yazmamızın nedeni obje olarak döndüğü için {} arasına yazılır..

      promise.then((data) =>{
          if(data == '') //eşleşen data yoksa
              next({message: 'Aranan oyun bulunamadı'});
        res.json(data);
    }).catch ((err) => {
        res.json(err);
      })
});

//----------------------------------------------
//----------------DATA SİLME -------------------
//----------------DELETE DATA-------------------

router.delete('/:title',(req,res,next) => { // '/:tittle' ile bir string alıp params nesnesine göndercez karşılaştıracaz

    //res.send(req.params); --yani url'ye gireceğim değer ne ise title'a atanmıs olacak...
    const promise = Steam.find({title:req.params.title}) //params'a atanan title ile eşleşen dataları getir
    //süslü parantez içine yazmamızın nedeni obje olarak döndüğü için {} arasına yazılır..
    promise.remove((err,data) => {
        promise.then((data) => {
            if (data == '') //eşleşen data yoksa
                next({message: 'Aranan oyun bulunamadı'});
            res.json({status: 1});
        }).catch((err) => {
            res.json(err);
        })
    });
});
//---------------------------------------------
//-----------VERİTABANI KAYIT EKLEME-----------
//-----------ADD DATA MONGODB------------------

router.post('/', function(req, res, next) { //kayıt ekleneceği için get değil post olacak
  const {title, imdb_score, category, country , year} = req.body; //requestden body'e gelen datalar neyse eşleşen değişkenlere aktarılacak

    const steam = new Steam({ //Steam'den nesne türetecez
        title: title,
        imdb_score: imdb_score,
        category: category,
        country: country,
        year: year
    });
    console.log(steam.title);

    //save işlemi
   /*steam.save((err,data)=> {
      if (err)
        res.json(err);
      res.json(data); //kaydedilen datayı döndürüyor
    }); */
   //-----------------------------------------------------
    //yukardaki yapı yerine promise yapısı kullanılabilir...

   const promise = steam.save();

   promise.then((data) => {
     res.json({ status: 1}); //hata yoksa yazdırıyorum
    }).catch((err) => { //hata varsa catchle hatayı yazdırıyorum
      res.json(err);
    })
});

//--------------------------------------------


module.exports = router;
