const multer = require("multer");

const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/pdf",
    "text/plain",
];

const upload = multer({
    storage: multer.memoryStorage(),

    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB
    },

    fileFilter: (req, file, cb) => {
        if (!allowedMimeTypes.includes(file.mimetype)) {
            return cb(new Error("File type not allowed. Allowed files: JPEG, PNG, WEBP, PDF, TXT."));
        }

        cb(null, true);
    }
});

module.exports = upload;