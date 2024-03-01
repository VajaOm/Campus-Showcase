import multer from 'multer';
import path from 'path'
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage(
    {
        destination: function(req, file, cb) {
            cb(null, './public/temp');
        },

        filename: function(req, file, cb) {
            const uniqueFilename = `${Date.now()}-${uuidv4()}${path.extname(file.originalname)}`;
            cb(null, uniqueFilename);
        }
    }
)

export const upload = multer({
    storage: storage
});