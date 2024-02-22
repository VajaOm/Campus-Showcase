import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage(
    {
        destination: function(req, res, cb) {
            cb(null, './public/temp');
        },

        filename: function(req, res, cb) {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    }
)

export const upload = multer( { storage : storage });