// routes/uploadRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadController = require('../controllers/uploadController');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST endpoint for image upload
router.get('/upload', uploadController.getHomePage)
router.post('/upload', upload.single('image'), uploadController.uploadImage);

module.exports = router;
