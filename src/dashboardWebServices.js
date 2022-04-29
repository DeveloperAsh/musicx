const { json } = require('express');

module.exports = function (app, query, multer, moment, uniqid, fs) {

    var commonCode = new (require('../commonCode.js'));

    const storageMusic = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/media')
        },
        filename: function (req, file, cb) {
            let extArray = file.originalname.split(".");
            console.log("extArray " + extArray );
            let extension = extArray[extArray.length - 1];
            console.log("extension " + extension );

            cb(null, extArray[0].replace(/ /g, '_') + '_' + Date.now() + '.' + extension)
        }
    });

    const singleFileUploadMusic = multer({ storage: storageMusic });



    app.post("/adminapi/addNewMusic", singleFileUploadMusic.single("file"), function (req, res) {
        try {
            var data = JSON.parse(JSON.stringify(req.body));
            var response = new (require('../models/response.js'))();
            var count = 0;
            var missing = "";

            if (!data.hasOwnProperty('name') || data.name == "") {
                missing = missing + "name";
                count = count + 1;
            }

            if (!data.hasOwnProperty('category') || data.category == "") {
                missing = missing + "category";
                count = count + 1;
            }

            if (!data.hasOwnProperty('artist') || data.artist == "") {
                missing = missing + "artist";
                count = count + 1;
            }

            if (!data.hasOwnProperty('genre') || data.genre == "") {
                missing = missing + "genre";
                count = count + 1;
            }

            if (req.file == null) {
                missing = missing + "image error";
                count = count + 1;
            }


            if (count == 0) {

                let insertData = {};
                insertData['name'] = data.name;
                insertData['category'] = data.category;
                insertData['artist'] = data.artist;
                insertData['genre'] = data.genre;
                insertData['music_path'] = req.file.filename;

                query.insert('music_master', insertData, (result) => {

                    if (result.isSuccess) {
                        response.isSuccess = true;
                        response.message = "Music Added Succesfully";
                        res.send(JSON.stringify(response));
                    }
                    else {
                        response.isSuccess = false;
                        response.message = result.message;
                        res.send(JSON.stringify(response));
                    }

                })


            }
            else {
                response.isSuccess = false;
                missing.substring(0, missing.length - 1);
                response.message = "Enter values of " + missing;
                res.send(JSON.stringify(response));
            }
        }
        catch (error) {
            console.log(error);
            var response = {};
            response.isSuccess = false;
            response.message = error;
            response.response = {};
        }


    });


    app.post("/adminapi/updateNewMusicAudio", singleFileUploadMusic.single("file"), function (req, res) {
        try {
            var data = JSON.parse(JSON.stringify(req.body));
            var response = new (require('../models/response.js'))();
            var count = 0;
            var missing = "";

            if (!data.hasOwnProperty('id') || data.id == "") {
                missing = missing + "id";
                count = count + 1;
            }

           
            if (req.file == null) {
                missing = missing + "image error";
                count = count + 1;
            }


            if (count == 0) {

                let insertData = {};
                insertData['music_path'] = req.file.filename;

                let whereData = {};
                whereData['id'] = data.id ;

                query.updateQuery('music_master', insertData , whereData, (result) => {

                    if (result.isSuccess) {
                        response.isSuccess = true;
                        response.message = "Music Updated Succesfully";
                        res.send(JSON.stringify(response));
                    }
                    else {
                        response.isSuccess = false;
                        response.message = result.message;
                        res.send(JSON.stringify(response));
                    }

                })


            }
            else {
                response.isSuccess = false;
                missing.substring(0, missing.length - 1);
                response.message = "Enter values of " + missing;
                res.send(JSON.stringify(response));
            }
        }
        catch (error) {
            console.log(error);
            var response = {};
            response.isSuccess = false;
            response.message = error;
            response.response = {};
        }


    });


    app.post("/adminapi/updateMusic",  function (req, res) {
        try {
            var data = req.body;
            var response = new (require('../models/response.js'))();
            var count = 0;
            var missing = "";

            if (!data.hasOwnProperty('id') || data.id == "") {
                missing = missing + "id";
                count = count + 1;
            }

            if (!data.hasOwnProperty('name') || data.name == "") {
                missing = missing + "name";
                count = count + 1;
            }

            if (!data.hasOwnProperty('category') || data.category == "") {
                missing = missing + "category";
                count = count + 1;
            }

            if (!data.hasOwnProperty('artist') || data.artist == "") {
                missing = missing + "artist";
                count = count + 1;
            }

            if (!data.hasOwnProperty('genre') || data.genre == "") {
                missing = missing + "genre";
                count = count + 1;
            }


            if (count == 0) {

                let whereData = {};
                whereData['id'] = data.id ;

                let insertData = {};
                insertData['name'] = data.name;
                insertData['category'] = data.category;
                insertData['artist'] = data.artist;
                insertData['genre'] = data.genre;
 
                query.updateQuery('music_master', insertData , whereData, (result) => {

                    if (result.isSuccess) {
                        response.isSuccess = true;
                        response.message = "Music Updated Succesfully";
                        res.send(JSON.stringify(response));
                    }
                    else {
                        response.isSuccess = false;
                        response.message = result.message;
                        res.send(JSON.stringify(response));
                    }

                })


            }
            else {
                response.isSuccess = false;
                missing.substring(0, missing.length - 1);
                response.message = "Enter values of " + missing;
                res.send(JSON.stringify(response));
            }
        }
        catch (error) {
            console.log(error);
            var response = {};
            response.isSuccess = false;
            response.message = error;
            response.response = {};
        }


    });

    app.post("/adminapi/deleteMusic",  function (req, res) {
        try {
            var data = req.body;
            var response = new (require('../models/response.js'))();
            var count = 0;
            var missing = "";

            if (!data.hasOwnProperty('id') || data.id == "") {
                missing = missing + "id";
                count = count + 1;
            }

            


            if (count == 0) {

                let whereData = {};
                whereData['id'] = data.id ;

                let insertData = {};
                insertData['is_deleted'] = 1;
                
 
                query.updateQuery('music_master', insertData , whereData, (result) => {

                    if (result.isSuccess) {
                        response.isSuccess = true;
                        response.message = "Music Deleted Succesfully";
                        res.send(JSON.stringify(response));
                    }
                    else {
                        response.isSuccess = false;
                        response.message = result.message;
                        res.send(JSON.stringify(response));
                    }

                })


            }
            else {
                response.isSuccess = false;
                missing.substring(0, missing.length - 1);
                response.message = "Enter values of " + missing;
                res.send(JSON.stringify(response));
            }
        }
        catch (error) {
            console.log(error);
            var response = {};
            response.isSuccess = false;
            response.message = error;
            response.response = {};
        }


    });

    app.post("/adminapi/listMusicPage", (req, res) => {
        try {
            var data = req.body;
            var response = new (require('../models/response.js'))();
            let skip = 0;
            if (data.hasOwnProperty("skip")) {
                skip = data.skip;
            }
            var getMusicList = function () {
                query.query(`SELECT  id , name , category , artist , genre , DATE_FORMAT(created_date, "%d-%c-%y %r") as created_date , CONCAT("./music?id=",music_path) as music_path FROM music_master WHERE is_deleted=0 ORDER BY id DESC LIMIT 5 OFFSET ` + skip, function (result) {

                    if (result.isSuccess) {
                        response.isSuccess = true;
                        response.message = "Success"
                        response.response = result.response;
                        res.send(JSON.stringify(response));
                    }
                    else {
                        response.response = [];
                        response.isSuccess = false;
                        response.message = result.message;
                        res.send(JSON.stringify(response));
                    }

                })
            }
            getMusicList();
        }
        catch (error) {
            console.log(error);
            var response = {};
            response.isSuccess = false;
            response.message = error;
            response.response = {};
        }

    })


    app.post("/adminapi/listMusicPageSort", (req, res) => {
        try {
            var data = req.body;
            var response = new (require('../models/response.js'))();
            let sortId = "1";
            if (data.hasOwnProperty("sortId")) {
                sortId = data.sortId + "";
            }
            var getMusicList = function () {

                let q = `` ;
                if(sortId == "1")
                {
                    q = `SELECT  id , name , category , artist , genre , DATE_FORMAT(created_date, "%d-%c-%y %r") as created_date , CONCAT("./music?id=",music_path) as music_path FROM music_master WHERE is_deleted=0 ORDER BY category ASC` ;
                }
                else if(sortId == "2")
                {
                    q = `SELECT  id , name , category , artist , genre , DATE_FORMAT(created_date, "%d-%c-%y %r") as created_date , CONCAT("./music?id=",music_path) as music_path FROM music_master WHERE is_deleted=0 ORDER BY genre ASC`
                }

                query.query(q, function (result) {

                    if (result.isSuccess) {
                        response.isSuccess = true;
                        response.message = "Success"
                        response.response = result.response;
                        res.send(JSON.stringify(response));
                    }
                    else {
                        response.response = [];
                        response.isSuccess = false;
                        response.message = result.message;
                        res.send(JSON.stringify(response));
                    }

                })
            }
            getMusicList();
        }
        catch (error) {
            console.log(error);
            var response = {};
            response.isSuccess = false;
            response.message = error;
            response.response = {};
        }

    })

};