const express = require('express');
const router = express.Router();
const UserCtrl = require('../controllers/user');
const parser = require('../services/image-upload');


//const singleUpload = upload.single('image');


router.post('', UserCtrl.authMiddleware, parser.single('image'), (req, res) => {
    console.log('req.file ' + req.file) // to see what is returned to you
    const image = {};
    image.url = req.file.url;
    image.id = req.file.public_id;
    console.log('imageId ' + image.url);
    return res.json({ imageUrl: image.url });
}, (err) => {
    if (err) {
        console.log('ciao');
        return res.status(422).send({ errors: [{ title: 'Image Upload Error', detail: err.message }] });
    }
});
module.exports = router;