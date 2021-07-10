const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');

const storage = new GridFsStorage({
    url: process.env.db,
    options: {useNewUrlParser:true, useUnifiedTopology:true},
    file:(req,file) => {
        const match = ["image/png","image/jpg"];

        if(match.indexOf(file.mimetype) === -1){
            const filename = `${Date.now()}-try-${file.originalname}`;
            return filename;
        }

        return{
            bucketName:"photos",
            filename: `${Date.now()}-try-${file.originalname}`
        }
    }
});

module.exports = multer({storage});