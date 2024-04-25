const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const uploadRoutes = require('./routes/uploadRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
console.log("portaaaaaaaa: "+process.env.PORT)
app.use(express.static("views"))

app.use('/', uploadRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});