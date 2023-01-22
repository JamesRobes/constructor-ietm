import { Module } from '@nestjs/common';
import { ImageController } from './controller/image.controller';

@Module({
  controllers: [ImageController],
})
export class ImagesUploadModule {}
