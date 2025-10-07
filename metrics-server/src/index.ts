import express from 'express';
import client from 'prom-client';

const register = new client.Registry();
client.collectDefaultMetrics({ register, prefix: 'ms_' });

const buildGauge = new client.Gauge({
  name: 'ms_build_info',
  help: 'Build metadata',
  labelNames: ['version', 'git_sha'],
});
const prGauge = new client.Gauge({
  name: 'ms_open_pr_count',
  help: 'Open PR count',
});
register.registerMetric(buildGauge);
register.registerMetric(prGauge);

// simulate values
buildGauge.labels({ version: process.env.BUILD_VERSION || 'dev', git_sha: (process.env.GIT_SHA || 'local').slice(0,7)} as any).set(1);
setInterval(() => prGauge.set(Math.floor(Math.random()*10)), 5000);

const app = express();
app.get('/metrics', async (_req, res) => {
  res.setHeader('Content-Type', register.contentType);
  res.end(await register.metrics());
});

const port = Number(process.env.PORT) || 9101;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`metrics-server listening on :${port}`);
});
