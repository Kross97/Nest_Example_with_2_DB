import { Controller, Get, Res } from "@nestjs/common";
import { StreamsService } from "./streams.service";

@Controller("streams")
export class StreamsController {
  constructor(private readonly streamsService: StreamsService) {}

  @Get("example_1")
  async getExampleFirst(@Res() response) {
    return this.streamsService.getExampleFirst(response);
  }
}
