const express = require('express');
const client = require('prom-client');

const app = express();
const PORT = 3000;

// Registry ek "container" hai jahan hum apni metrics rakhte hain
const register = new client.Registry();

// Counter: sirf badhta hai, kabhi kam nahi hota
const requestCounter = new client.Counter({
  name: 'my_app_requests_total',
  help: 'Total number of requests received',
});
register.registerMetric(requestCounter);

// Gauge: upar-neeche dono ho sakta hai
const activeConnectionsGauge = new client.Gauge({
  name: 'my_app_active_connections',
  help: 'Simulated number of active connections right now',
});
register.registerMetric(activeConnectionsGauge);

app.get('/', (req, res) => {
  requestCounter.inc(); // har baar jab koi "/" pe aaye, counter +1 ho jaye
  activeConnectionsGauge.set(Math.floor(Math.random() * 10));
  res.json({ message: 'My monitoring demo app is running' });
});

// Ye endpoint Prometheus yahan se data lega
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});