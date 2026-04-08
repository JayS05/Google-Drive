const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const supabase = require('../config/supabase');
const multer = require('multer');
const fileModel = require('../models/files.model');

const upload = multer({ storage: multer.memoryStorage() });


router.get('/home', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.userId;   // This comes from JWT

        if (!userId) {
            return res.redirect('/user/login');
        }

        const userFiles = await fileModel.find({ 
            user: userId 
        }).sort({ createdAt: -1 });

        res.render('home', { 
            files: userFiles,
            username: req.user.username || "User"
        });

    } catch (err) {
        console.error("Home route error:", err);
        res.status(500).send("Something went wrong");
    }
});

// Upload File
router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).send("No file uploaded");

        const file = req.file;
        const userId = req.user.userId;
        const fileName = `${Date.now()}-${file.originalname}`;
        const filePath = `${userId}/${fileName}`;

        // Upload to Supabase
        const { error } = await supabase.storage
            .from('uploads')
            .upload(filePath, file.buffer, {
                contentType: file.mimetype,
            });

        if (error) throw error;

        // Save metadata in MongoDB
        await fileModel.create({
            path: filePath,
            originalname: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            user: userId
        });

        res.redirect('/home');
    } catch (err) {
        console.error(err);
        res.status(500).send("Upload failed");
    }
});

// Download File
router.get('/download/:fileId', authMiddleware, async (req, res) => {
    try {
        const file = await fileModel.findOne({ 
            _id: req.params.fileId, 
            user: req.user.userId 
        });

        if (!file) return res.status(404).send("File not found");

        const { data, error } = await supabase.storage
            .from('uploads')
            .createSignedUrl(file.path, 60); // 60 seconds

        if (error) throw error;

        res.redirect(data.signedUrl);
    } catch (err) {
        console.error(err);
        res.status(500).send("Download failed");
    }
});

// Delete File
router.post('/delete/:fileId', authMiddleware, async (req, res) => {
    try {
        const file = await fileModel.findOne({ 
            _id: req.params.fileId, 
            user: req.user.userId 
        });

        if (!file) return res.status(404).send("File not found");

        // Delete from Supabase Storage
        const { error } = await supabase.storage
            .from('uploads')
            .remove([file.path]);

        if (error) throw error;

        // Delete from MongoDB
        await fileModel.deleteOne({ _id: file._id });

        res.redirect('/home');
    } catch (err) {
        console.error(err);
        res.status(500).send("Delete failed");
    }
});

// Logout Route
router.post('/logout', (req, res) => {
    res.clearCookie('token');           // Remove JWT cookie
    res.redirect('/user/login');        // Send user back to login page
});

module.exports = router;