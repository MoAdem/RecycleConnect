import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

const router = express.Router();

cloudinary.config({
  cloud_name: 'dtrmseflh',
  api_key: '131837862865764',
  api_secret: '2AZTnmZx76uJSdpOsBGQMaMaV4Y',
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('file'), async (req, res) => {
try {
if (!req.file) {
return res.status(400).json({ error: 'No photo provided!' });
}

const file = req.file.buffer.toString('base64');
const cloudinaryResponse = await cloudinary.uploader.upload(
`data:${req.file.mimetype};base64,${file}`
);

const imageUrl = cloudinaryResponse.secure_url;
res.json({ imageUrl });
} catch (error) {
console.error(error);
res.status(500).json({ error: 'Error uploading to Cloudinary' });
}
});

export default upload;

/*const storage = multer.diskStorage({
destination: function (req, file, cb) {
cb(null, './uploads/'); // Specify the destination folder for uploaded files
},
filename: function (req, file, cb) {
const fileName = file.originalname.toLowerCase().split(" ").join("-");
cb(null, Date.now() + '-' + fileName); // Use a unique filename
},
});

const upload = multer({ storage: storage });

export default upload;*/