const multer = require('multer');
const path = require('path');

// const storage = multer.diskStorage({
//   filename: function (req,file,cb) {
//     cb(null, file.originalname)
//   }
// });

// const storage = multer.memoryStorage();

// const upload = multer({storage: storage});

const storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //     cb(null, path.join(__dirname, "../../public/images/"));
    // },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + '-' + file.originalname)
    },
});

const fileFilter = (req, file, cb)=> {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb({message: 'Unsupported file Format'}, false);
    }
};

const upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024},
});

module.exports = upload;