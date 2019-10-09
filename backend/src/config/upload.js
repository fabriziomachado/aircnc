const multer = require('multer')
const path = require('path')

module.exports = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename: (req, { originalname }, cb) => {
      const ext = path.extname(originalname)
      const name = path.basename(originalname, ext)

      cb(null, `${name}-${Date.now()}${ext}`)
    }
  })
}