const multer  = require('multer')
const mkdirp  = require('mkdirp');
const randomstring  = require('randomstring');
const ImageStorage = multer.diskStorage({
    destination : (req , file , cb) => {
        let year = new Date().getFullYear();
        let month = new Date().getMonth() + 1;
        let day = new Date().getDay();
       // let dir = `./public/uploads/images/${year}/${month}/${day}`;
        let dir = `./public/uploads/images`;

        mkdirp(dir , err => cb(err , dir))
    },
    filename: (req , file , cb) => {
       // cb(null, Date.now() +  '-' + file.originalname )
        cb(null, randomstring.generate({charset:'mytam',length:7}) +  '-' + file.originalname )
    }
});

const imageFilter = (req , file , cb) => {
    if(file.mimetype === "image/png" || file.mimetype === "image/jpeg" || file.mimetype === "image/gif") {
        cb(null , true)
    } else {
        cb(null , false)
    }
}

const uploadImage = multer({
    storage : ImageStorage,
    limits : {
        fileSize : 1024 * 1024 * 1
    },
    fileFilter : imageFilter
});


///////video
const VideoStorage = multer.diskStorage({
    destination : (req , file , cb) => {
        let dir = `./public/uploads/videos`;
        mkdirp(dir , err => cb(err , dir))
    },
    filename: (req , file , cb) => {
        cb(null, randomstring.generate({charset:'mytam',length:7}) +  '-' + file.originalname )
    }
});

const videoFilter = (req , file , cb) => {
    if(file.mimetype === "video/mp4" || file.mimetype === "video/ogg") {
        cb(null , true)
    } else {
        cb(null , false)
    }
}

const uploadVideo = multer({
    storage : VideoStorage,
    limits : {
        fileSize : 1024 * 1024 * 10
    },
    fileFilter : videoFilter
});


module.exports = {
    uploadImage ,uploadVideo
}