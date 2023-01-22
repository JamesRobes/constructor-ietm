import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
export { Request } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';

@Controller('image')
export class ImageController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const now = new Date();
          const destination = `./images/${now.getDate()}.${
            now.getMonth() + 1
          }.${now.getFullYear()}.${now.getHours()}`;
          fs.mkdirSync(destination, { recursive: true });
          callback(null, destination);
        },
        filename: (req, file, callback) => {
          const now = new Date();
          const destination = `${now.getDate()}.${
            now.getMonth() + 1
          }.${now.getFullYear()}.${now.getHours()}`;
          const uniqueSuffix =
            destination + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return {
      success: 1,
      file: {
        url: 'api/image/' + file.filename,
      },
    };
  }

  @Get(':imagename')
  getImage(@Param('imagename') image: string, @Res() res) {
    const folderName = image.split('-')[0];
    const response = res.sendFile(image, { root: './images/' + folderName });
    return {
      status: HttpStatus.OK,
      data: response,
    };
  }
}
