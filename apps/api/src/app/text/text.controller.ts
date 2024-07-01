import { Controller, Get, Query } from '@nestjs/common';
import { TextService } from './text.service';

@Controller('text')
export class TextController {
  constructor(private readonly textService: TextService) {}

  @Get()
  findAll(
    @Query('page') page?:number,
    @Query('pageSize') pageSize?: number,
    @Query('search') search?: string,
    @Query('filter') filter?: string,
  ) {
    return this.textService.findAll(page, pageSize, search, filter);
  }
}
