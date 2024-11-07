// Sửa lại code backend một chút
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Thêm middleware
app.use(cors());
app.use(bodyParser.json());

// Route test
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Route nhận dữ liệu
app.post('/api/orders', (req, res) => {
  const orderData = req.body;
  console.log('Dữ liệu nhận được:', orderData);
  res.status(200).send({ message: 'Dữ liệu đã được nhận!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});