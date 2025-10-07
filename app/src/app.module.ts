import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';

@Module({
  controllers: [AppController, MetricsController],
  providers: [MetricsService],
})
export class AppModule {}
