const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); // JSON body verisini almak için

// API isteği için proxy endpoint oluştur
app.post('/api/scan/list', async (req, res) => {
    const requestData = {
      query: "cve",
      scan_parent_id: 1,
      min_score: 0,
      max_score: 10,
      page: 1,
      per_page: 30,
      tag_slug: "web_scan_tools",
      precondition_status: 2,
      scan_category_id: 1,
      token: req.body.token // Token'ı client'dan alıyoruz
    };

    try {
      const response = await axios.post('https://api.s4e.io/api/scan/list', requestData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'API isteği başarısız oldu.' });
    }
});

// Sunucuyu başlat
app.listen(port, () => {
  console.log(`Backend sunucusu ${port} portunda çalışıyor...`);
});
