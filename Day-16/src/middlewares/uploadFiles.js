const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/upload")
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        const extension = path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix + extension)
    }
})

const upload = multer({storage})

module.exports = upload