const multer = require('multer');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {

        const allowedfile = ['image/png','image/jpeg','image/jpg']

        if(!allowedfile.includes(file.mimetype)){
            cb(new Error("Invalid File type")) // 1 means error
            return;
        }
        cb(null, "./uploads/"); // if two parae=meter meas success
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

module.exports = {
    multer,
    storage
};
