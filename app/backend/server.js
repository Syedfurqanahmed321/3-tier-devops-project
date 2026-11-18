const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const client = require('prom-client');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://database:27017/devops_db';

app.use(cors());
app.use(express.json());

// Default metrics: CPU, memory, event loop
client.collectDefaultMetrics({ register: client.register });

// Custom counter: total HTTP requests
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.path,
      status_code: res.statusCode
    });
  });
  next();
});

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to 3-Tier API Service!', status: 'Healthy' });
});

app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: 'Furqan', role: 'DevOps Engineer' },
    { id: 2, name: 'Admin', role: 'Site Reliability Engineer' }
  ]);
});

app.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', client.register.contentType);
  res.send(await client.register.metrics());
});

app.listen(PORT, () => console.log(`Backend API listening on port ${PORT}`));
