import { Module } from '@nestjs/common';
import { TextService } from './text.service';
import { TextController } from './text.controller';

@Module({
  imports: [],
  controllers: [TextController],
  providers: [TextService],
})
export class TextModule {}
