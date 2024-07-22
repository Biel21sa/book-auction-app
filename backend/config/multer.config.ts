import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModuleAsyncOptions } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';

export const multerConfig: MulterModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    limits: {
      fileSize: 5242880,
    },
    fileFilter: (req, file, callback) => {
      file.mimetype ===
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ? callback(null, true)
        : callback(null, false);
    },
    storage: diskStorage({
      destination: (req, file, callback) => {
        callback(null, configService.get<string>('TEMP_FOLDER_DEST'));
      },
      filename: (req, file, callback) => {
        const uniqueFileName = uuid();
        callback(null, uniqueFileName);
      },
    }),
  }),
  inject: [ConfigService],
};

export const multerConfigForImageFile: MulterModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    limits: {
      fileSize: 5242880,
    },
    fileFilter: (req, file, callback) => {
      file.mimetype === 'application/jpg' ||
      'application/jpeg' ||
      'application/png'
        ? callback(null, true)
        : callback(null, false);
    },
    storage: diskStorage({
      destination: (req, file, callback) => {
        callback(null, configService.get<string>('TEMP_FOLDER_DEST'));
      },
      filename: (req, file, callback) => {
        const uniqueFileName = uuid();
        callback(null, uniqueFileName);
      },
    }),
  }),
  inject: [ConfigService],
};
