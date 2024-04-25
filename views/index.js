function uploadImage() {
    const fileInput = document.querySelector('input[type="file"]');
    const file = fileInput.files[0];
    
    const formData = new FormData();
    formData.append('image', file);

    axios.post('/upload', formData)
    .then(response => {
        const imageUrl = response.data.imageUrl;
        
        console.log('Uploaded image URL:', imageUrl);
    })
    .catch(error => {
        console.error('Error uploading image:', error);
    });
}