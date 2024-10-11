// Function to fetch and display artworks in the gallery
async function fetchArtworks() {
    try {
      const response = await fetch('http://localhost:3011/artworks');
      const artworks = await response.json();
      
      const gallery = document.getElementById('artworks');
      gallery.innerHTML = ''; // Clear the gallery before adding new items
  
      // Loop through each artwork and create an image element
      artworks.forEach((artwork) => {
        const img = document.createElement('img');
        img.src = artwork.imageUrl;  // Assuming the server returns the correct image path
        img.alt = artwork.title;
        gallery.appendChild(img);
      });
    } catch (error) {
      console.error('Error fetching artworks:', error);
    }
  }
  
  // Function to handle the artwork upload form submission
  document.getElementById('upload-form').addEventListener('submit', async function(event) {
    event.preventDefault();  // Prevent default form submission behavior
  
    const formData = new FormData(this);  // Collect form data
  
    try {
      const response = await fetch('http://localhost:3011/upload-artwork', {
        method: 'POST',
        body: formData
      });
  
      if (response.ok) {
        alert('Artwork uploaded successfully!');
        fetchArtworks();  // Refresh the gallery after upload
      } else {
        alert('Error uploading artwork.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error uploading artwork.');
    }
  });
  
  // Fetch artworks when the page loads
  window.onload = fetchArtworks;
  