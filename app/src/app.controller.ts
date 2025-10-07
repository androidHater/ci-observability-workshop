import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  root() {
    return { ok: true };
  }

  @Get('/healthz')
  health() {
    return 'ok';
  }
}
