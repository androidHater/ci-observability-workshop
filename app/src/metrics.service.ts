import { Injectable } from '@nestjs/common';
import client from 'prom-client';

@Injectable()
export class MetricsService {
  public readonly registry: client.Registry;
  public readonly httpDuration: client.Histogram<string>;

  constructor() {
    this.registry = new client.Registry();
    client.collectDefaultMetrics({ register: this.registry, prefix: 'app_' });

    this.httpDuration = new client.Histogram({
      name: 'app_http_request_duration_seconds',
      help: 'HTTP duration by route/method/code',
      labelNames: ['method', 'route', 'code'] as const,
      buckets: [0.05, 0.1, 0.2, 0.5, 1, 2],
    });

    this.registry.registerMetric(this.httpDuration);
  }
}
