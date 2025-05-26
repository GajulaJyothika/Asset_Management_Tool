const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Save asset data to a local JSON file
app.post('/save', (req, res) => {
    const newData = req.body;
    let allData = [];

    if (fs.existsSync('data.json')) {
        allData = JSON.parse(fs.readFileSync('data.json'));
    }

    allData.push(newData);
    fs.writeFileSync('data.json', JSON.stringify(allData, null, 2));
    res.json({ message: 'Asset data saved successfully' });
});

// View all asset data
app.get('/view', (req, res) => {
    if (fs.existsSync('data.json')) {
        const allData = JSON.parse(fs.readFileSync('data.json'));
        res.json(allData);
    } else {
        res.json([]);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
