const azure = require('azure-storage');
const { Readable } = require('stream');
const multer = require('multer');
const dotenv = require('dotenv');
const path = require('path')
dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

console.log('Connection String:', process.env.AZURE_STORAGE_CONNECTION_STRING);
console.log(typeof(process.env.AZURE_STORAGE_CONNECTION_STRING))
const blobService = azure.createBlobService(process.env.CONTAINER_NAME, process.env.AZURE_STORAGE_CONNECTION_STRING);


function getStream(buffer) {
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
}

exports.getHomePage = async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: true, message: 'Internal server error' });
    }
};
exports.uploadImage = (req, res) => {
    try {
        const blobName = req.file.originalname;
        const stream = getStream(req.file.buffer);

        blobService.createBlockBlobFromStream(process.env.AZURE_STORAGE_CONTAINER_NAME, blobName, stream, req.file.size, (error, result, response) => {
                        if (error) {
                            console.error('Error uploading file:', error);
                            return res.status(500).json({ error: true, message: 'Error uploading file to Azure Blob Storage' });
                        }
            
                        const imageUrl = blobService.getUrl(process.env.AZURE_STORAGE_CONTAINER_NAME, blobName);
                        res.status(200).json({ imageUrl: imageUrl });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: true, message: 'Internal server error' });
    }
};
