import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TextService } from './text/text.service';
import { TextController } from './text/text.controller';
import { TextModule } from './text/text.module';

@Module({
  imports: [TextModule],
  controllers: [AppController, TextController],
  providers: [AppService, TextService],
})
export class AppModule {}
