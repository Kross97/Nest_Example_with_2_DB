import { Controller, Get } from '@nestjs/common';
import { StreamsService } from './streams.service';


@Controller('streams')
export class StreamsController {
  constructor(private readonly streamsService: StreamsService) {}

  @Get('example_1')
  async getExampleFirst() {
   return this.streamsService.getExampleFirst();
  }
}
