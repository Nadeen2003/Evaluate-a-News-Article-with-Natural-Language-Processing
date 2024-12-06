const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());


app.use(express.static('dist'));

app.use(express.json());


app.get('/test', (req, res) => {
    res.json({message: 'Test endpoint working'});
});

app.post('/api/evaluate', async (req, res) => {
        console.log('Request received:', req.body);
        try{
            const apiKey = process.env.API_KEY;
            if (!apiKey) {
                throw new Error('API key is not found !');
            }
    
            const meaningCloudUrl = `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&url=${encodeURIComponent(req.body.url)}&lang=en`;
            
            console.log('Calling MeaningCloud API');
            const response = await fetch(meaningCloudUrl);
            const data = await response.json();
            
            console.log('API Response:', data);
            res.json(data);
        }catch (error){
            console.error('Error:', error);
            res.status(500).json({ error: error.message });
        }
});

const port = 8000;
app.listen(port, function () {
    console.log(`Server running on http://localhost:${port}`);

});