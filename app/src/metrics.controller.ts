import { Controller, Get, Res } from '@nestjs/common';
import type { FastifyReply } from 'fastify';
import { MetricsService } from './metrics.service';

@Controller()
export class MetricsController {
  constructor(private readonly metrics: MetricsService) {}

  @Get('/metrics')
  async metricsEndpoint(@Res() res: FastifyReply) {
    res.header('Content-Type', this.metrics.registry.contentType);
    res.send(await this.metrics.registry.metrics());
  }
}
