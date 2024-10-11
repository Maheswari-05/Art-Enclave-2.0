const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/artistportal')  // Removed deprecated options
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Could not connect to MongoDB:', error));

// Define a Schema and Model for artworks
const artworkSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  category: String,
  imageUrl: String
});

const Artwork = mongoose.model('Artwork', artworkSchema);

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Store files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);  // Create unique filenames
  }
});

const upload = multer({ storage: storage });

// Upload artwork
app.post('/upload-artwork', upload.single('image'), async (req, res) => {
  try {
    const newArtwork = new Artwork({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      imageUrl: req.file ? req.file.path : ''
    });

    await newArtwork.save();
    res.status(201).send('Artwork uploaded successfully!');
  } catch (error) {
    res.status(400).send('Error uploading artwork: ' + error.message);
  }
});

// Endpoint to fetch all artworks
app.get('/artworks', async (req, res) => {
  try {
    const artworks = await Artwork.find();
    res.json(artworks);  // Send artworks as JSON
  } catch (error) {
    res.status(500).send('Error fetching artworks: ' + error.message);
  }
});

// Start the server
const PORT = 3011;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
