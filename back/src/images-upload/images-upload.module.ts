import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { ImageController } from './controller/image.controller';

@Module({
  controllers: [ImageController],
})
export class ImagesUploadModule {}
