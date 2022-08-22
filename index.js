const express = require("express");
const multer = require('multer')

const PORT = process.env.PORT || 3001;

const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
	limits: {
        fileSize: 1000000 * 100 // 1000000 Bytes = 1 MB = 100 MB
	},
	fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.mp4' && ext !== '.mov' && ext !== '.mpeg' && ext !== '.webm') {
            return callback(new Error('Only videos are allowed with mp4, mov, mpeg, webm extensions'));
        }
        callback(null, true)
    },
    filename: function (req, file, cb) {
		let newName = file.originalname
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
        newName = newName
            .split(' ')
            .join('_')
            .toLowerCase();
        cb(null, Date.now() + '-' + newName)
    },
})
const upload = multer({ storage: storage })

app.post('/upload-video', upload.single('my-video'), (req, res) => {
	console.log(`Video uploaded: ${req.file.filename}`)
})

app.get("/api", (req, res) => {
	res.json({
		videos: [
		{
			url: 'https://res.cloudinary.com/codelife/video/upload/v1633232723/tiktok-clone/tiktok2_qxafx3.mp4',
			channel: 'DanceCrew',
			description: 'Video by Lara Jameson from Pexels',
			song: 'Bounce - Ruger',
			likes: 250,
			messages: 120,
			shares: 40
		  },
		  {
			url: 'https://res.cloudinary.com/codelife/video/upload/v1633232725/tiktok-clone/tiktok1_np37xq.mp4',
			channel: 'Happyfeet',
			description: '#happyfeetlegwork videos on TikTok',
			song: 'Kolo sound - Nathan',
			likes: 250,
			messages: 120,
			shares: 40
		  },
		  {
			url: 'https://res.cloudinary.com/codelife/video/upload/v1633232726/tiktok-clone/tiktok3_scmwvk.mp4',
			channel: 'thiskpee',
			description: 'The real big thug boys💛🦋 The real big thug boys💛🦋 ',
			song: 'original sound - KALEI KING 🦋',
			likes: 250,
			messages: 120,
			shares: 40
		  },]
	});
});

app.use(express.static(path.resolve(__dirname, './client/build')));
  
// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.listen(PORT, () => {
console.log(`Server listening on ${PORT}`);
});
